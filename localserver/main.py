import openai

# Load your API key from an environment variable or secret management service
openai.api_key = "API KEY"

while True:
    message = input("Enter Message: ")
    chat_completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        stream=True,
        messages=[{"role": "user", "content": message}],
        temperature=1.5,
    )

    chat = []
    for i, chunk in enumerate(chat_completion):
        if i == 0:
            continue

        chat.append(chunk["choices"][0]["delta"])
        print(str(chat[-1]).split('content": "')[1], end="")
        print("##")
