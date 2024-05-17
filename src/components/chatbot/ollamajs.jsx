import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://localhost:11434' })

//
// Fetches data from the chatbot API.
// @returns {Promise<[string, number]>} A promise that resolves to an array containing the response message content and an error code.
// 
async function fetchData(model, messageHistory) {
   
    try {
        const response = await ollama.chat({
            model: model,
            messages: messageHistory,
        })
        return [response.message.content, 0];
    }
    catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return [`Server responded with status code: ${error.response.status}`, 1];
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in Node.js
            console.log(error.request);
            return ["No response received from the server", 2];
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            return [`Request setup error: ${error.message}`, 3];
        }
    }
}

export { fetchData, ollama };
