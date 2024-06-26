/*React ChatBotify is an intuitive and versatile chatbot library tailored to streamline your development 
process while providing the flexibility to implement advanced features

    Web: https://github.com/tjtanjin/react-chatbotify
    Author:https://github.com/tjtanjin
    Install: npm install react-chatbotify
*/

import ChatBot from 'react-chatbotify';
import myBotOptions from '../../styles/ChatBotifyOptions.jsx';

const model = 'llama3';
let messageHistory = [];

//import {fetchDataOpenAI as fetchData, openai as client}  from './ollamaOpenAi.jsx';

//import {fetchData as fetchData, ollama as ollama}  from './ollamajs.jsx';

import {fetchData as fetchData, ollama as ollama}  from './ollamajsstream.jsx';

function updateMessages(rol, content) {
    messageHistory.push({ role: rol, content: content });
    return messageHistory;
}

export default function ComponentReactChatBotiflyOllama() {


    const flow = {
        start: {
            message: async (params) => {
                //This will clear the existing array by setting its length to 0. It also works when using "strict mode"
                messageHistory.length=0;
                updateMessages('system', 'You are a helpful assistant. You are here to help the user with their queries. Be kind and short in your responses.');
                await params.injectMessage("Hi my name is Edubot. Im here to help you");
                await params.injectMessage("Can you write your username, so i can address you ?");
                updateMessages('assistant', 'Hi my name is Edubot. Im here to help you');
                updateMessages('assistant', 'Can you write your username, so i can address you ?');
            },
            path: "askname"
        },
        askname: {
            message: async (params) => {
                updateMessages('user', `${params.userInput}`);
                await params.injectMessage(`Nice to meet you ${params.userInput}!`);
                updateMessages('assistant', `Nice to meet you ${params.userInput}!`);
                await params.injectMessage("Ask anything i will try to help you!");
                updateMessages('user', 'Ask anything i will try to help you!');
            },
            path: "loop",
        },
        loop: {
            message: async (params) => {
                updateMessages('user', `${params.userInput}`);
                const [result, error]  = await fetchData(model, messageHistory, params);
                console.log("Resultado en loop", result);
                if (error === 0) {
                    //No error found. Update messages and show message to the user
                    await params.injectMessage(`${result}`);
                    updateMessages('assistant', `${result}`);
                }
                else if (error === 100) {
                    //Code 100 is for streaming response. No need to inject message only update the messages array
                   // params.injectMessage(`${result}`);
                    updateMessages('assistant', `${result}`);
                }
                else {
                    //Error message. only show message to the user
                    await params.injectMessage(`Oh no, i got an error: ${result}!`);
                }
               // return result;
            },
            path: "loop",
        }
    }
    return (
        <ChatBot options={myBotOptions} flow={flow} />
        //<ChatBot options={{ theme: { embedded: false }, chatHistory: { storageKey: "example_simulation_stream" }, botBubble: { simStream: true } }} flow={flow} />
    )
}
