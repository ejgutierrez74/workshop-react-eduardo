/*React ChatBotify is an intuitive and versatile chatbot library tailored to streamline your development 
process while providing the flexibility to implement advanced features

    Web: https://github.com/tjtanjin/react-chatbotify
    Author:https://github.com/tjtanjin
    Install: npm install react-chatbotify
*/
/*Ollama:
Install : npm i ollama
Usage:
const openai = new OpenAI({
  baseURL: 'http://localhost:11434/v1/',

  // required but ignored
  apiKey: 'ollama',
})

const chatCompletion = await openai.chat.completions.create({
  messages: [{ role: 'user', content: 'Say this is a test' }],
  model: 'llama3',
})
*/
import ChatBot from 'react-chatbotify';
/*
import OpenAI from 'openai';


const openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1/',
    // required but ignored
    apiKey: 'ollama',
  })
*/
import { Ollama} from 'ollama';

const ollama = new Ollama({ host: 'http://localhost:11434' })



let messageHistory = [];

async function fetchData() {
    const response = await ollama.chat({
        model: 'llama3',
        messages: messageHistory,
      })
      return response.message.content;
    /*  
    const chatCompletion = await ollama.chat.completions.create({
        messages: messageHistory,
        model: 'llama3',
      })
      return chatCompletion.data.choices[0].message.content;
*/
      /*
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        return data.title;
    } catch (error) {
        return "Oh no I don't know what to say!";
    }
*/
}

function updateMessages( rol, content) {
    messageHistory.push({ role: rol, content: content });
    return messageHistory;
}
export default function ComponentChatBotReactChatBotifly() {


    const flow = {
        start: {
            message: (params) => {
                updateMessages('system','You are a helpful assistant. You are here to help the user with their queries. Be kind and short in your responses.');
                params.injectMessage("Hi my name is Edubot. Im here to help you");
                params.injectMessage("Can you write your username, so i can address you ?");
                updateMessages('assistant','Hi my name is Edubot. Im here to help you');
                updateMessages('assistant','Can you write your username, so i can address you ?');
            },
            path: "askname"
        },
        askname: {
            message: (params) => {
                updateMessages('user',`${params.userInput}`);
                params.injectMessage(`Nice to meet you ${params.userInput}!`);
                updateMessages('assistant',`Nice to meet you ${params.userInput}!`);
                params.injectMessage("Ask anything i will try to help you!");
                updateMessages('user','Ask anything i will try to help you!');
            },
            path: "loop",
        },
        loop: {
            message: async (params) => {
                updateMessages('user',`${params.userInput}`);
                const result = await fetchData();
                return result;
            },
            path: "loop",
        }
    }
    return (
        <ChatBot options={{ theme: { embedded: false }, chatHistory: { storageKey: "example_simulation_stream" }, botBubble: { simStream: true } }} flow={flow} />
    )
}
