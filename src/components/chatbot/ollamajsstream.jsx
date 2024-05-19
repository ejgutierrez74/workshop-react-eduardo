import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://localhost:11434' })

//
// Fetches data from the chatbot API.
// @returns {Promise<[string, number]>} A promise that resolves to an array containing the response message content and an error code.
// 
async function fetchData(model, messageHistory, params) {
    // Set a timeout to abort the request after 60 second
    setTimeout(() => {
        console.log('\nAborting request...\n')
        ollama.abort()
    }, 60000) // 1000 milliseconds = 1 second


    try {
        const response = await ollama.chat({
            model: model,
            messages: messageHistory,
            stream: true // Stream the response
        })

        let chunks = [];
        for await (const part of response) {
            // Handle the streamed response
            //await params.streamMessage(part.message.content);
            chunks.push(part.message.content);
            let partialMessage = chunks.join('');
            params.streamMessage(partialMessage);
            console.log("Chunk the streaming" + part.message.content);
           // chunks.push(part.message.content);
        }

        // get all the chunks to get the final response
        let fullMessage = chunks.join('');
        console.log("Full message: " + fullMessage);
        //Return error code 100 -> as is a streaming response no need to injectMessage
        return [fullMessage, 100];
    }
    catch (error) {
        if (error.name === 'AbortError') {
            console.log('The request has been aborted');
            return [`The request has been aborted by Timeout: ${error.response.status}`, 1];
        }
        else if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return [`Server responded with status code: ${error.response.status}`, 2];
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in Node.js
            console.log(error.request);
            return ["No response received from the server", 3];
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            return [`Request setup error: ${error.message}. Make sure you have ollama running ( ollama serve) and running the model you need ( ollam run model_name)`, 4];
        }
    }
}

export { fetchData, ollama };
