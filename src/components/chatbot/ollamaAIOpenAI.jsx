import OpenAI from 'openai';

/*This should be in the same file as the function that uses it
let prompts = [];
let responses = [];
const client = new OpenAI({
    base_url: 'http://localhost:11434/v1/',
    api_key: 'ollama',
});
*/

/*
export function getPromptChatFromMessages(messageHistory, verbose = false) {
    
    let prompt_chat = "";
    if (verbose) {
        console.log(`Longitud mensajes:\n${messageHistory.length}\n`);
       // console.log(`Longitud repuestas:\n${responses.length}\n`);
    }

    let size = 0;
    let previousMessage = null;

    messageHistory.map( (message) => {
        if (message.role === 'user') {
            prompt_chat += `<s>[INST] \n${message.content}\n [/INST] \n`;
        } 
        else if (message.role === 'assistant')) {
            prompt_chat += `${message.content}</s> \n`;
        }
        else if (message.role === 'system')) {
            prompt_chat += `<s>[INST]<<SYS>>${message.content}<</SYS>> \n`;
        }
        for (let responseActual of responses) {
        prompt_chat += `<s>[INST] \n${prompts[size]}\n [/INST] \n${responseActual}\n </s>`;
        size = size + 1;
    }

    // Añadimos el ultimo prompt
    prompt_chat += `<s>[INST] \n${prompts[prompts.length - 1]}\n [/INST] \n`;

    return prompt_chat;
}
*/

export function get_prompt_chatv2(prompts, responses, verbose = false) {
    let prompt_chat = "";
    if (verbose) {
        console.log(`Longitud prompts:\n${prompts.length}\n`);
        console.log(`Longitud repuestas:\n${responses.length}\n`);
    }

    if (prompts.length !== responses.length + 1) {
        console.log("\n Error: Numero de prompts debe ser numero de responses + 1.");
        return prompt_chat;
    }

    let size = 0;
    for (let responseActual of responses) {
        prompt_chat += `<s>[INST] \n${prompts[size]}\n [/INST] \n${responseActual}\n </s>`;
        size = size + 1;
    }

    // Añadimos el ultimo prompt
    prompt_chat += `<s>[INST] \n${prompts[prompts.length - 1]}\n [/INST] \n`;

    return prompt_chat;
}
    

export function llama_openaiv2(prompt, add_inst = true, model = "llama2", temperature = 0.0, max_tokens = 1024, verbose = false) {
    if (add_inst) {
        prompt = `[INST]${prompt}[/INST]`;
    }

    if (verbose) {
        console.log(`Prompt:\n${prompt}\n`);
        console.log(`model: ${model}`);
    }

    let error = 0;
    let response;

    try {
        response = client.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            model: model,
            max_tokens: max_tokens,
            temperature: temperature,
        });
    } catch (e) {
        if (e instanceof OpenAI.APIError) {
            console.log(`Model ${model}: OpenAI API returned an API Error:${e}`);
            error = 1;
        } else if (e instanceof OpenAI.APIConnectionError) {
            console.log(`Model ${model}: Failed to connect to OpenAI API:${e}`);
            error = 2;
        } else if (e instanceof OpenAI.RateLimitError) {
            console.log(`Model ${model}: OpenAI API request exceeded rate limit:${e}`);
            error = 3;
        } else {
            console.log(`Model ${model}: Error general no reconegut: ${e}`);
            error = 4;
        }
    }

    if (error === 0) {
        return [response.choices[0].message.content, error];
    }

    return ["Default Value", error];
}

export function llama_chat_openaiv2(promptActual, prompts, responses, model = "llama2", temperature = 0.0, max_tokens = 1024, verbose = false) {
    
    prompts.push(promptActual);

    const prompt = get_prompt_chatv2(prompts, responses);

    let error = 0;

    const [response, err] = llama_openaiv2(prompt, false, model, temperature, max_tokens, verbose);
    error = err;

    if (error === 0) {
        responses.push(response);
        return response;
    } else {
        console.log(`\nError en la ejecucion. El codigo de error es:${error}`);
        prompts.splice(prompts.indexOf(promptActual), 1);
        return "Error conversacion no valida. Se ha producido error";
    }
}
