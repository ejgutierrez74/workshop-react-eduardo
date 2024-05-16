/*React ChatBotify is an intuitive and versatile chatbot library tailored to streamline your development 
process while providing the flexibility to implement advanced features

    Web: https://github.com/tjtanjin/react-chatbotify
    Author:https://github.com/tjtanjin
    Install: npm install react-chatbotify
*/

import ChatBot from 'react-chatbotify';

async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        return data.title;
    } catch (error) {
        return "Oh no I don't know what to say!";
    }
}

export default function ComponentChatBotReactChatBotifly() {


    const flow = {
        start: {
            message: (params) => {
                params.injectMessage("Hi my name is Edubot. Im here to help you");
                params.injectMessage("Can you write your username, so i can address you ?");
            },
            path: "askname"
        },
        askname: {
            message: (params) => {
                params.injectMessage(`Nice to meet you ${params.userInput}!`);
                params.injectMessage("Ask anything i will try to help you!");
            },
            path: "loop",
        },
        loop: {
            message: async (params) => {
                console.log(params);
                const result = await fetchData();
                return result;
            },
            path: "loop",
        }
    }
    return (
        <ChatBot options={{ theme: { embedded: true }, chatHistory: { storageKey: "example_simulation_stream" }, botBubble: { simStream: true } }} flow={flow} />
    )
}
