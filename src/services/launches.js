export const API_URL = "https://api.spacexdata.com/v4";
const API_URLv3 = "https://api.spacexdata.com/v3";

export async function getAllLaunches() {
    try {
        const response = await fetch(`${API_URL}/launches`);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("ERROR en la API con mensaje: ", error.message);

    }
}

export async function getLaunchByLaunchId( launchId) {
    //Para obtener un lanzamiento en API v4: https://api.spacexdata.com/v4/launches/:id
    

    try {
        const response = await fetch(`${API_URL}/launches/${launchId}`);
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error("ERROR en la API con mensaje: ", error.message);
    }
}

export async function getLaunchByFlightNumber( flightNumber) {
    
    //Para obtener un lanzamiento en API v3: https://api.spacexdata.com/v3/launches/{{flight_number}} ( v3 deprecated November 2020)
    try {
        const response = await fetch(`${API_URLv3}/launches/${flightNumber}`);
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error("ERROR en la API con mensaje: ", error.message);
    }
}
/*
el try/catch no te va a funcionar con una cadena de promesas. Una función con async bloquea la ejecución en cada await, y a efectos prácticos, la función se ejecuta 
de forma secuencial (línea a línea). Si en cualquiera de esas líneas se lanza una excepción, el try/catch puede atraparla. 
Eso no es posible con los .then(). 
—¿Por qué?— Porque sin un await las intrucciones asíncronas no bloquean la función, devuelven la promesa y la función continua ejecutándose. 
Es decir, la ejecución saldrá del try/catch antes de que la callback (la función que le has pasado al .then()) sea llamada. 
Por tanto, si ocurre una excepción dentro de la callback el try/catch no la atrapará. La gestión de errores con cadenas, se hace por medio del 2º parámetro del .then() 
(i.e. .then(onSuccess, onError) o encadenando un .catch(onError) (i.e. .then(…).catch(…)).

Necesitas prefijar el fetch() con un return (i.e. return fetch(…)) si quieres obtener la respuesta. Y la función que llama a getAllLaunches(), 
ha de utilizar un .then() (i.e. getAllLaunches().then(…)) o un await (i.e. … = await getAllLaunches()) para gestionar la asincronía (igual que tú has gestionado 
    la asincronía de fetch()).
*/
export async function getAllLaunchesThen() {

    const data = fetch(`${API_URL}/launches`)
                    .then( response => response.json())
                    .catch ( (error) => {
                                console.error("ERROR en la API con mensaje: ", error.message);
                                }
                            );
    return data;
}
/**/