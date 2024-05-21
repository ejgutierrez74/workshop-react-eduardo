// useOllamaBot.jsx

import { useState } from 'react';
import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://localhost:11434' });

const useOllamaBot = (model) => {
  const [messageHistory, setMessageHistory] = useState([]);

  const updateMessages = (role, content) => {
    setMessageHistory(prevMessages => [...prevMessages, { role, content }]);
  };

  const sendMessage = async (userInput, streamMessage) => {
    const currentMessage = { role: 'user', content: userInput };
    setMessageHistory(prevMessages => [...prevMessages, currentMessage]);

    setTimeout(() => {
      console.log('\nAborting request...\n');
      ollama.abort();
    }, 60000); // 1000 milliseconds = 1 second

    try {
      const response = await ollama.chat({
        model: model,
        messages: messageHistory, // Usamos el historial actualizado de mensajes
      });

      const botMessage = { role: 'bot', content: response.message.content };
      setMessageHistory(prevMessages => [...prevMessages, botMessage]); // Añadimos la respuesta al historial

      await streamMessage(response.message.content);
      return [response.message.content, 0];
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('The request has been aborted');
        return [`The request has been aborted by Timeout: ${error.response.status}`, 1];
      } else if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return [`Server responded with status code: ${error.response.status}`, 2];
      } else if (error.request) {
        console.log(error.request);
        return ["No response received from the server", 3];
      } else {
        console.log('Error', error.message);
        return [`Request setup error: ${error.message}. Make sure you have ollama running (ollama serve) and running the model you need (ollama run model_name)`, 4];
      }
    }
  };

  return { sendMessage, messageHistory, updateMessages };
};

export default useOllamaBot;
