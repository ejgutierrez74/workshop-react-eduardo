// useOllamaBot.jsx

import { useState } from 'react';
import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://localhost:11434' });

const useOllamaBot = (model) => {

  const [messageHistory, setMessageHistory] = useState([]);
/*
  const updateMessages = (role, content) => {
    setMessageHistory(prevMessages => [...prevMessages, { role, content }]);
  };
*/
  function updateMessages(rol, content) {
    messageHistory.push({ role: rol, content: content });
    return messageHistory;
}

  const sendMessage = async (userInput) => {
    const currentMessage = { role: 'user', content: userInput };
    //updateMessages(prevMessages => [...prevMessages, currentMessage]);

    setTimeout(() => {
      console.log('\nAborting request...\n');
      ollama.abort();
    }, 60000); // 1000 milliseconds = 1 second

    try {
      const response = await ollama.chat({
        model: model,
        messages: messageHistory, // Usamos el historial actualizado de mensajes
      });
      console.log("Messagehistory: ", messageHistory);
      //ollama role of the message sender is user, system or assistant
      const botMessage = { role: 'assistant', content: response.message.content };
      //updateMessages(prevMessages => [...prevMessages, botMessage]); // Añadimos la respuesta al historial

      //  await streamMessage(response.message.content);
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
            updateMessages('assistant', 'Ask anything i will try to help you!');
        },
        path: "loop",
    },
    loop: {
        message: async (params) => {
            updateMessages('user', `${params.userInput}`);
            console.log("Pregunta usuario: ", params.userInput);
            console.log("Message history: ", messageHistory);
            const [result, error]  = await sendMessage(params.userInput);
            console.log("Resultado en loop del asistente", result);
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


return { sendMessage, messageHistory, updateMessages,flow };
};

export default useOllamaBot;
