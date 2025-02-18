// import OpenAI from "openai";
import { ChatGPTUnofficialProxyAPI } from 'chatgpt';


export default {
    async fetch(request, env, ctx) {
/*        const openai = new OpenAI({
            apiKey: env.OPENAI_KEY,
        });
*/
        try {
            if (request.url.split("LOL")[1].toString() == "favicon.ico") {
                return new Response("Go home, icon");
            }
        } catch {
            ;
        }
        const input = request.url.split("?p=")[1].toString();
        /*
        const response = await openai.chat.completions.create({
            messages: [{ role: "user", content: input }],
            model: "gpt-3.5-turbo",
        });
        const data = await response;

        const responseBody = response.choices[0].message.content;
*/

        const api = new ChatGPTUnofficialProxyAPI({
            accessToken: "ABSOLUTELY NOT",
          apiReverseProxyUrl: 'https://api.pawan.krd/backend-api/conversation'
        })
      const res = await api.sendMessage(input)
        const responseBody = res.text.replace(/%20/g, " ");

        // Return the response to the client
        return new Response(responseBody, {
          status: 200,
          headers: {
              'Content-Type': 'text/plain',
              'Access-Control-Allow-Methods': 'GET, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Origin': "*"
          },
        });
    }
}
