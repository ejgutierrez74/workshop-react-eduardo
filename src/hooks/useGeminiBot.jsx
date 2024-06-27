// useGeminiBot.js
//El hook useGeminiBot encapsula la lógica para interactuar con la API de Gemini.
// Este hook maneja la inicialización de la sesión de chat y el envío de mensajes.

import { useState, useEffect } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const useGeminiBot = (modelSelected) => {

  // const apiKey = import.meta.env.VITE_REACT_APP_API_KEY_GEMINI;

  //useState inicializa chatSession como null.
  const [chatSession, setChatSession] = useState(null);

  /* Efecto useEffect:
 
     Inicializa una instancia de GoogleGenerativeAI con la clave API.
     Configura el modelo generativo y las configuraciones de generación y seguridad.
     Inicia una nueva sesión de chat y la guarda en el estado chatSession.*/

  useEffect(() => {
    const apiKey = import.meta.env.VITE_REACT_APP_API_KEY_GEMINI;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: modelSelected,
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];


    /* History of chat has this structure:
    The history is a list of all the previous things said in the chat. Each chat item contains a role that specifies who was talking. 
    It can either be user if the user is the one who spoke or model if it was the reply of the model. There is also parts that contains 
    what was said. Make sure to end the history with an item where the role is model! 
    Not doing so causes a GoogleGenerativeAIError: [400 Bad Request] Please ensure that multiturn requests ends with a user role or a function response error !
    The history array represents the conversation history between the user and the model. The model expects the first message to come from the user, hence the role 'user'.
    The history you provide within the model.startChat() options is used to set the initial context of the conversation. Once the session is started, the API handles 
    the history internally, and you cannot manipulate it directly using chatSession.history.push.
    history: [
        {
          role: "user",
          parts: [
            {text: "cuantos son dos mas dos\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Dos más dos son **cuatro**. \n"},
          ],
        },
        ....
        ]
        */
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        /* Esto me gustaria pero de momento no se puede hacer,las conversaciones han de comenzar con user y terminar con model
        {
            role: "model",
            parts: [{ text: "Hi my name is Edubot. Im here to help you" }],
        },
        {
            role: "model",
            parts: [{ text: "Can you write your username, so i can address you ?" }],
        },
        */
      ],
    });



    /*
            let chunks = [];
            for await (const part of result.response) {
                // Handle the streamed response
                //await params.streamMessage(part.message.content);
                chunks.push(part.text());
                let partialMessage = chunks.join('');
                await params.streamMessage(partialMessage);
                console.log("Chunk the streaming" + part.text());
               // chunks.push(part.message.content);
            }
    */
    setChatSession(chatSession);

    // [apiKey] Ejecuta el efecto cuando la clave API cambia ( en principio no haria falta, ya que la apikey no cambia si no cambias fichero .env)
    // [] Si sabes que la clave API no cambiará, puedes dejar la lista de dependencias vacía para que el efecto solo se ejecute una vez cuando el componente se monte.
  }, []);

  const sendMessage = async (params) => {

    if (!chatSession) return await streamMessage("Error chatSession no iniciada.");
    try {
      // Asks the model a question and generates a response
      const result = await chatSession.sendMessageStream(params.userInput);

      let partialResponse = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        //JSON.stringify(chunk) ??
        console.log(chunkText);
        partialResponse += chunkText;
        await params.streamMessage(partialResponse);
      }

    } catch (err) {
      console.log(err);
      await params.injectMessage("Connection error.Did you provide a valid API key?");

    }
  };

  const flow = {
    start: {
      message: async (params) => {
        //This will clear the existing array by setting its length to 0. It also works when using "strict mode"
        await params.injectMessage("Hi my name is Edubot. Im here to help you");
        await params.injectMessage("Can you write your username, so i can address you ?");
      },
      path: "askname"
    },
    askname: {
      message: async (params) => {
        await params.injectMessage(`Nice to meet you ${params.userInput}!`)
        await params.injectMessage("Ask anything i will try to help you!");
      },
      path: "loop",
    },
    loop: {
      message: async (params) => {
        await sendMessage(params);
      },
      path: "loop",
    }
  }

  return { sendMessage, flow };
};

export default useGeminiBot;

// Usando declaración de función asíncrona
/*
async function sendMessage(userInput, streamMessage) {
  if (!chatSession) return;
  try {
    const result = await chatSession.sendMessageStream(userInput);
    let partialResponse = '';
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      partialResponse += chunkText;
      await streamMessage(partialResponse);
    }
  } catch (err) {
    console.error(err);
    await streamMessage("Connection error. Did you provide a valid API key?");
  }
}
*/