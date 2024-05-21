// useChatBotProvider.js
import useGeminiBot from './useGeminiBot';
import useOllamaBot from './useOllamaBot';

const useChatBotProvider = (provider, model) => {
  const geminiBot = useGeminiBot(model);
  const ollamaBot = useOllamaBot(model);

  const sendMessage = async (userInput, streamMessage) => {
    if (provider === 'gemini') {
      await geminiBot.sendMessage(userInput, streamMessage);
    } else if (provider === 'ollama') {
      await ollamaBot.sendMessage(userInput, streamMessage);
    }
    // Agregar lógica para otros proveedores aquí según sea necesario
  };

  let messageHistory = [];
  let updateMessages = () => {};

  if (provider === 'ollama') {
    messageHistory = ollamaBot.messageHistory;
    updateMessages = ollamaBot.updateMessages;
  }

  return { sendMessage, messageHistory, updateMessages };
};

export default useChatBotProvider;





/*
// En nuestro caso va donde ChatBotApp.jsx
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