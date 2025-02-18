import torch
from transformers import AutoTokenizer
from petals import AutoDistributedModelForCausalLM

model_name = "petals-team/StableBeluga2"
# You could also use "meta-llama/Llama-2-70b-chat-hf" or any other supported model from 🤗 Model Hub

tokenizer = AutoTokenizer.from_pretrained(
    model_name, use_fast=True, add_bos_token=False
)
model = AutoDistributedModelForCausalLM.from_pretrained(model_name)
model = model.cuda()

inputs = tokenizer(
    'In the sentence "Recent work demonstrates the potential of multilingual pretraining of creating one model that can be used for various tasks in different languages. Previous work in multilingual pretraining has demonstrated that machine translation systems can be created by finetuning on bitext", multilingual means: "',
    return_tensors="pt",
)["input_ids"].cuda()
outputs = model.generate(inputs, max_new_tokens=3)
print(tokenizer.decode(outputs[0]))

fake_token = tokenizer("^")["input_ids"][
    0
]  # Workaround to make tokenizer.decode() keep leading spaces

text = "What is a good chatbot? Answer:"
prefix = tokenizer(text, return_tensors="pt")["input_ids"].cuda()

with model.inference_session(max_length=1024) as sess:
    while True:
        prompt = input("Human: ")
        if prompt == "":
            break
        prefix = f"Human: {prompt}\nFriendly AI:"
        prefix = tokenizer(prefix, return_tensors="pt")["input_ids"].cuda()
        print("Friendly AI:", end="", flush=True)

        while True:
            outputs = model.generate(
                prefix,
                max_new_tokens=1,
                session=sess,
                do_sample=True,
                temperature=0.9,
                top_p=0.6,
            )
            outputs = tokenizer.decode([fake_token, outputs[0, -1].item()])[1:]

            # Now, let's print one new token at a time
            print(outputs, end="", flush=True)

            if "\n" in outputs or "</s>" in outputs:
                break
            prefix = (
                None  # Prefix is passed only for the 1st token of the bot's response
            )
