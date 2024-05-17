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

const model = 'llama3';
let messageHistory = [];

/*
import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://localhost:11434' })




//
// Fetches data from the chatbot API.
// @returns {Promise<[string, number]>} A promise that resolves to an array containing the response message content and an error code.
// 
async function fetchData(model) {
   
    try {
        const response = await ollama.chat({
            model: model,
            messages: messageHistory,
        })
        return [response.message.content, 0];
    }
    catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return [`Server responded with status code: ${error.response.status}`, 1];
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in Node.js
            console.log(error.request);
            return ["No response received from the server", 2];
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            return [`Request setup error: ${error.message}`, 3];
        }
    }
}
*/
//Using OpenAI
import OpenAI from 'openai';


const openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1/',
    // required but ignored
    apiKey: 'ollama',
    //// required for testing on browser side, not recommended. API key should be kept secret and stored in server.
    dangerouslyAllowBrowser: true  
    
  })

//
 // Fetches data from OpenAI chat API.
 //
 // @param {string} model - The model to use for chat completion.
 // @returns {Promise<[string, number]>} - A promise that resolves to an array containing the chat completion response and a status code.
 //
async function fetchDataOpenAI(model) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: messageHistory,
            model: model,
          })
          return [chatCompletion.data.choices[0].message.content,0];
    }
    catch (error) { 
        return ["Oh no I don't know what to say!",1];
    }
}
   


function updateMessages(rol, content) {
    messageHistory.push({ role: rol, content: content });
    return messageHistory;
}

export default function ComponentChatBotReactChatBotifly() {


    const flow = {
        start: {
            message: (params) => {
                messageHistory.clear();
                updateMessages('system', 'You are a helpful assistant. You are here to help the user with their queries. Be kind and short in your responses.');
                params.injectMessage("Hi my name is Edubot. Im here to help you");
                params.injectMessage("Can you write your username, so i can address you ?");
                updateMessages('assistant', 'Hi my name is Edubot. Im here to help you');
                updateMessages('assistant', 'Can you write your username, so i can address you ?');
            },
            path: "askname"
        },
        askname: {
            message: (params) => {
                updateMessages('user', `${params.userInput}`);
                params.injectMessage(`Nice to meet you ${params.userInput}!`);
                updateMessages('assistant', `Nice to meet you ${params.userInput}!`);
                params.injectMessage("Ask anything i will try to help you!");
                updateMessages('user', 'Ask anything i will try to help you!');
            },
            path: "loop",
        },
        loop: {
            message: async (params) => {
                updateMessages('user', `${params.userInput}`);
                const [result, error]  = await fetchData(model);
                if (error !== 0) {
                    //Error message 
                    params.injectMessage('${result}');
                }
                return result;
            },
            path: "loop",
        }
    }
    return (
        <ChatBot options={{ theme: { embedded: false }, chatHistory: { storageKey: "example_simulation_stream" }, botBubble: { simStream: true } }} flow={flow} />
    )
}
