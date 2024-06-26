// useChatBotProvider.js
import useGeminiBot from './useGeminiBot';
import useOllamaBot from './useOllamaBot';

const useChatBotProvider = (provider, model) => {
  let botHook;

  if (provider === 'google') {
    botHook = useGeminiBot(model);
  } else if (provider === 'ollama') {
    botHook = useOllamaBot(model);
  }
  
  /*Colocar mas proveedores....me aseguro que proveedor y modelo existan proque vienen del array avaliableProvidersandModels "hecho a mano"
  con los diferentes modelos y proveedores que se pueden usar*/

  const { sendMessage, messageHistory, updateMessages, flow } = botHook;

  return { sendMessage, messageHistory, updateMessages,flow };
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