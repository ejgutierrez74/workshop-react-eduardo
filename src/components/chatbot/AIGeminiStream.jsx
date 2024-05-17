/*
import { GoogleGenerativeAI } from "@google/generative-ai";

      // Fetch your API_KEY
      const API_KEY = "..."

;

      // Access your API key (see "Set up your API key" above)
      const genAI = new GoogleGenerativeAI(API_KEY);

      // ...

      const model = genAI.getGenerativeModel({ model: "MODEL_NAME});

*/

/*The api key and has_error should be in the component managing the chatbot,
    let api_key = null;
	let has_error = false;
*/

	// example gemini stream
	// you can replace with other LLMs or even have a simulated stream
import { GoogleGenerativeAI } from "@google/generative-ai";

      // Fetch your API_KEY
      const API_KEY = "";
	const gemini_stream = async (params) => {
		
        try {
			const genAI = new GoogleGenerativeAI(API_KEY);
			const model = genAI.getGenerativeModel({ model: "gemini-pro"});
			const result = await model.generateContentStream(params.userInput);

			let text = "";
			let offset = 0;
			for await (const chunk of result.stream) {
				const chunkText = chunk.text();
				text += chunkText;
				for (let i = offset; i < chunkText.length; i++) {
					// while this example shows params.streamMessage taking in text input,
					// you may also feed it custom JSX.Element if you wish
					await params.streamMessage(text.slice(0, i + 1));
					await new Promise(resolve => setTimeout(resolve, 30));
				}
				offset += chunkText.length;
			}

			// in case any remaining chunks are missed (e.g. timeout)
			// you may do your own nicer logic handling for large chunks
			for (let i = offset; i < text.length; i++) {
				await params.streamMessage(text.slice(0, i + 1));
				await new Promise(resolve => setTimeout(resolve, 30));
			}
			await params.streamMessage(text);
		} catch {
			await params.injectMessage("Unable to load model, is your API Key valid?");
			//has_error = true;
		}
	}
export { gemini_stream };