// ChatBotComponent.jsx
//Este componente se encarga de configurar y renderizar el bot de chat, utilizando el hook useGeminiBot para la lógica específica del proveedor.

import React, { useEffect } from 'react';
import ChatBot from 'react-chatbotify';
import myBotOptions from '../../styles/ChatBotifyOptions.jsx';
import useChatBotProvider from '../../hooks/useChatBotProvider';

const ChatBotComponent = ({ provider, model }) => {
  
  const { sendMessage, messageHistory, updateMessages, flow } = useChatBotProvider(provider, model);


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