import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'NO STEALING FOR YOU!!', // defaults to process.env["OPENAI_API_KEY"]
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'What are dry erase markers?' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(chatCompletion.choices);
}

main();
