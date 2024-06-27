/*Avalaible providers and models as June 2024:
OLLAMA models: Se descargan y ejecutan en local. ollama serve para ejecutar el servidor y ollama run llama2 para ejecutar el modelo llama2.
( ollama pull phi3 para descargar modelos disponibles, en este caso descargar phi3 -> despues debes ejecutar el modelo con el ollama run)
Model library

Ollama supports a list of models available on ollama.com/library

Here are some example models that can be downloaded:
Model 	Parameters 	Size 	Download
Llama 3 	8B 	4.7GB 	ollama run llama3
Llama 3 	70B 	40GB 	ollama run llama3:70b
Phi 3 Mini 	3.8B 	2.3GB 	ollama run phi3
Phi 3 Medium 	14B 	7.9GB 	ollama run phi3:medium
Gemma 	2B 	1.4GB 	ollama run gemma:2b
Gemma 	7B 	4.8GB 	ollama run gemma:7b
Mistral 	7B 	4.1GB 	ollama run mistral
Moondream 2 	1.4B 	829MB 	ollama run moondream
Neural Chat 	7B 	4.1GB 	ollama run neural-chat
Starling 	7B 	4.1GB 	ollama run starling-lm
Code Llama 	7B 	3.8GB 	ollama run codellama
Llama 2 Uncensored 	7B 	3.8GB 	ollama run llama2-uncensored
LLaVA 	7B 	4.5GB 	ollama run llava
Solar 	10.7B 	6.1GB 	ollama run solar

GOOGLE models: edufissure@gmail.com
 Estado de prueba gratuita: crédito por €280.10 y 55 días restantes. 
 Tienes un periodo de prueba grautuita de 60 dias y 300 dolares de crédito. Cuando se acaba se ha de activar una forma de pago y un plan
En junio de 2024 los modelos principales disponibles eran:
gemini-1.5-flash
gemini-1.5-pro
gemini-1.0-pro

OPENAI models: Usuario: egutie9@xtec.cat...tienes un API key generico de usuario, pero recomiendan utilizar una API Key diferente por cada proyecto.
Tienes que tener una forma de pago activa para poder utilizar la API aunque al final no te cobren, si no tienes error de rate limit.
En teoria tienes un plan gratuito que deberia funcionar en los limites, pero si no tienes una forma de pago activa te da error de rate limit.
En junio de 2024 los modelos principales disponibles eran:
gpt-4o
gpt-4-turbo
gpt-3.5-turbo
*/


export const avalaibleProvidersandModels = [
    {
        provider: "ollama",
        model: "llama1"
    },
    {
        provider: "ollama",
        model: "llama3"
    },
    {
        provider: "google",
        model: "gemini-1.5-pro-latest"
    },
    {
        provider: "google",
        model: "gemini-1.5-flash"
    },
    {
        provider: "google",
        model: "gemini-1.0-pro"
    },
    {
        provider: "openai",
        model: "gpt-4o"
    },
    {
        provider: "openai",
        model: "gpt-3.5-turbo"
    },
]