/*React ChatBotify is an intuitive and versatile chatbot library tailored to streamline your development 
process while providing the flexibility to implement advanced features

    Web: https://github.com/tjtanjin/react-chatbotify
    Author:https://github.com/tjtanjin
    Install: npm install react-chatbotify
*/

import ChatBot from 'react-chatbotify';
import myBotOptions from '../../styles/ChatBotifyOptions.jsx';

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_REACT_APP_API_KEY_GEMINI;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];


/* History of chat has this structure:
The history is a list of all the previous things said in the chat. Each chat item contains a role that specifies who was talking. 
It can either be user if the user is the one who spoke or model if it was the reply of the model. There is also parts that contains 
what was said. Make sure to end the history with an item where the role is model! 
Not doing so causes a GoogleGenerativeAIError: [400 Bad Request] Please ensure that multiturn requests ends with a user role or a function response error !
The history array represents the conversation history between the user and the model. The model expects the first message to come from the user, hence the role 'user'.
The history you provide within the model.startChat() options is used to set the initial context of the conversation. Once the session is started, the API handles 
the history internally, and you cannot manipulate it directly using chatSession.history.push.
history: [
    {
      role: "user",
      parts: [
        {text: "cuantos son dos mas dos\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "Dos más dos son **cuatro**. \n"},
      ],
    },
    ....
    ]
    */
const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
        /* Esto me gustaria pero de momento no se puede hacer,las conversaciones han de comenzar con user y terminar con model
        {
            role: "model",
            parts: [{ text: "Hi my name is Edubot. Im here to help you" }],
        },
        {
            role: "model",
            parts: [{ text: "Can you write your username, so i can address you ?" }],
        },
        */
    ],
});



/*
        let chunks = [];
        for await (const part of result.response) {
            // Handle the streamed response
            //await params.streamMessage(part.message.content);
            chunks.push(part.text());
            let partialMessage = chunks.join('');
            await params.streamMessage(partialMessage);
            console.log("Chunk the streaming" + part.text());
           // chunks.push(part.message.content);
        }
*/
export default function ComponentReactChatBotiflyGemini() {
// Use streaming with multi-turn conversations (like chat)

async function promptGemini(params) {

    try {
        // Asks the model a question and generates a response
        const result = await chatSession.sendMessageStream(params.userInput);

        let partialResponse = '';
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            //JSON.stringify(chunk) ??
            console.log(chunkText);
            partialResponse += chunkText;
            await params.streamMessage(partialResponse);
        }

    } catch (err) {
        console.log(err);
        await params.injectMessage("Connection error.Did you provide a valid API key?");

    }
}

    const flow = {
        start: {
            message: async (params) => {
                //This will clear the existing array by setting its length to 0. It also works when using "strict mode"
                await params.injectMessage("Hi my name is Edubot. Im here to help you");
                await params.injectMessage("Can you write your username, so i can address you ?");
            },
            path: "askname"
        },
        askname: {
            message: async (params) => {
                await params.injectMessage(`Nice to meet you ${params.userInput}!`)
                await params.injectMessage("Ask anything i will try to help you!");
            },
            path: "loop",
        },
        loop: {
            message: async (params) => {
                await promptGemini(params);
            },
            path: "loop",
        }
    }
    return (
        <ChatBot options={myBotOptions} flow={flow} />
        //<ChatBot options={{ theme: { embedded: false }, chatHistory: { storageKey: "example_simulation_stream" }, botBubble: { simStream: true } }} flow={flow} />
    )
}
