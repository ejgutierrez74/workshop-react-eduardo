// useGeminiBot.js
//El hook useGeminiBot encapsula la lógica para interactuar con la API de Gemini.
// Este hook maneja la inicialización de la sesión de chat y el envío de mensajes.

import { useState, useEffect } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const useGeminiBot = () => {

  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY_GEMINI;

  //useState inicializa chatSession como null.
  const [chatSession, setChatSession] = useState(null);

 /* Efecto useEffect:

    Inicializa una instancia de GoogleGenerativeAI con la clave API.
    Configura el modelo generativo y las configuraciones de generación y seguridad.
    Inicia una nueva sesión de chat y la guarda en el estado chatSession.*/

  useEffect(() => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    const newChatSession = model.startChat({ generationConfig, safetySettings, history: [] });
    setChatSession(newChatSession);

    // [apiKey] Ejecuta el efecto cuando la clave API cambia ( en principio no haria falta, ya que la apikey no cambia si no cambias fichero .env)
    // [] Si sabes que la clave API no cambiará, puedes dejar la lista de dependencias vacía para que el efecto solo se ejecute una vez cuando el componente se monte.
  }, []); 

  const sendMessage = async (userInput, streamMessage) => {
    
    if (!chatSession) return await streamMessage("Error chatSession no iniciada.");
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
  };

  return { sendMessage };
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