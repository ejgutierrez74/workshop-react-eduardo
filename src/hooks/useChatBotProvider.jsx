// useChatBotProvider.js
// useChatBotProvider.js
import useGeminiBot from './useGeminiBot';
import useOllamaBot from './useOllamaBot';

const useChatBotProvider = (provider, model) => {
    
    const { sendMessage: sendGeminiMessage } = useGeminiBot(model);
    const { sendMessage: sendOllamaMessage } = useOllamaBot(model);

    const sendMessage = async (userInput, streamMessage) => {

        if (provider === 'gemini') {
            await sendGeminiMessage(userInput, streamMessage);
        } else if (provider === 'ollama') {
            const messageHistory = [{ role: 'user', content: userInput }]; // Define el historial de mensajes
            await sendOllamaMessage(model, messageHistory, streamMessage);
        }
        // Agregar lógica para otros proveedores aquí según sea necesario
    };

    return { sendMessage };
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