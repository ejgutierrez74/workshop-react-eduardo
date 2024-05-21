// ChatBotComponent.jsx
//Este componente se encarga de configurar y renderizar el bot de chat, utilizando el hook useGeminiBot para la lógica específica del proveedor.

import React, { useEffect } from 'react';
import ChatBot from 'react-chatbotify';
import myBotOptions from '../../styles/ChatBotifyOptions.jsx';
import useChatBotProvider from './useChatBotProvider';

const ChatBotComponent = ({ provider, model }) => {
  const { sendMessage, messageHistory, updateMessages } = useChatBotProvider(provider, model);

  const flow = {
    start: {
      message: async (params) => {
        await params.injectMessage("Hi my name is Edubot. I'm here to help you.");
        await params.injectMessage("Can you write your username, so I can address you?");
        if (provider === 'ollama') {
          updateMessages('system', 'You are a helpful assistant. You are here to help the user with their queries. Be kind and short in your responses.');
          updateMessages('assistant', "Hi my name is Edubot. I'm here to help you.");
          updateMessages('assistant', "Can you write your username, so I can address you?");
        }
      },
      path: "askname",
    },
    askname: {
      message: async (params) => {
        await params.injectMessage(`Nice to meet you ${params.userInput}!`);
        await params.injectMessage("Ask anything, I will try to help you!");
        if (provider === 'ollama') {
          updateMessages('user', params.userInput);
          updateMessages('assistant', `Nice to meet you ${params.userInput}!`);
          updateMessages('assistant', "Ask anything, I will try to help you!");
        }
      },
      path: "loop",
    },
    loop: {
      message: async (params) => {
        const userInput = params.userInput;
        const streamMessage = params.streamMessage;
        
        if (provider === 'ollama') {
          updateMessages('user', userInput);
        }

        await sendMessage(userInput, streamMessage);

        if (provider === 'ollama') {
          updateMessages('assistant', streamMessage);
        }
      },
      path: "loop",
    }
  };

  return (
    <ChatBot options={myBotOptions} flow={flow} />
  );
};

export default ChatBotComponent;


/*
Refactor your main component to use the ChatBotComponent:

// App.jsx
import React from 'react';
import ChatBotComponent from './ChatBotComponent';

export default function App() {
  return (
    <div>
      {// Pasa el proveedor y el modelo deseado como props }
      <ChatBotComponent provider="ollama" model="llama2" />
    </div>
  );
}
*/