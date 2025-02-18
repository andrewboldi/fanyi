import { ChatGPTUnofficialProxyAPI } from 'chatgpt'

async function example() {
 // const api = new ChatGPTUnofficialProxyAPI({
//  })
    const api = new ChatGPTUnofficialProxyAPI({
    accessToken: "HAHAHA",
  apiReverseProxyUrl: 'https://ai.fakeopen.com/api/conversation'
})
  const res = await api.sendMessage('在段落"I’ve had salespeople pitch me their AI expertise only to find the algorithms in their pitchbooks mislabeled.  I’ve been told that a product was “driven by AI” only to find out it was driven by “if-then” statements. I’ve been told that documents and disparate knowledge could be stripped and stitched back together again using the finest in NLP technology, only to find out that the tech that stitched it together again were human hands and keystrokes, in between cigarette breaks, at an office building in Southeast Asia."  中，解释 "disparate" 的含义.回复 75 个字以内')
  console.log(res.text)
}
example();
