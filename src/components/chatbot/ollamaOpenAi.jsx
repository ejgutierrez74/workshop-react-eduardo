//Using OpenAI
import OpenAI from 'openai';

/*Ollama ( includes the OpenAI API compatibility):
Install : npm i ollama
Usage:
    const openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1/',

    // required but ignored
    apiKey: 'ollama',
    //// required for testing on browser side, not recommended. API key should be kept secret and stored in server.
        dangerouslyAllowBrowser: true  
    })

    const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'llama3',
    })
*/

const openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1/',
    // required but ignored
    apiKey: 'ollama',
    //// required for testing on browser side, not recommended. API key should be kept secret and stored in server.
    dangerouslyAllowBrowser: true,
  })

//
 // Fetches data from OpenAI chat API.
 //
 // @param {string} model - The model to use for chat completion.
 // @returns {Promise<[string, number]>} - A promise that resolves to an array containing the chat completion response and a status code.
 //
async function fetchDataOpenAI(model, messageHistory) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: messageHistory,
            model: model,
          })
          return [chatCompletion.data.choices[0].message.content,0];
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

export { fetchDataOpenAI, openai};