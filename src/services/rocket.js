
import {API_URL} from "./launches";

export async function getRocketById(rocketId) {
    //Para obtener un lanzamiento en API v4: https://api.spacexdata.com/v4/launches/:id
    

    try {
        const response = await fetch(`${API_URL}/rockets/${rocketId}`);
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error("ERROR en la API con mensaje: ", error.message);
    }
}