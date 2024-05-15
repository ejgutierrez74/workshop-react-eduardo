import axios from "axios";
import { useEffect, useState } from "react";

/*
Axios is a third-party promise-based HTTP client that we can add to our project via package manager to make HTTP requests.

It is a wrapper over the native Fetch API. It offers a comprehensive feature set, intuitive API, ease of use, and additional functionality compared to Fetch.

Let’s use Axios to fetch post data from our usual endpoint. We’ll start by installing it:

npm install axios
*/
export default function useCustomFetchAxios(url) {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [controller, setController] = useState(null);
    // const [page, setPage] = useState(0);

    useEffect(() => {
        // Create an AbortController for managing the requests. This is used to cancel the fetch request if the component is unmounted
        //or the user cancel the request or the request is no longer needed
        //Example: Netflix episode you are watching is changed, so the previous request is no longer needed
        //If the request is not cancelled, it will still be running in the background and consume resources

        const abortController = new AbortController();

        //Signal is some kind of rastreable object that can be used to cancel the fetch request
        const signal = abortController.signal;
        const cachedData = sessionStorage.getItem('my-data');

        //Initializes the controller a null and setLoading to true
        setController(abortController);
        setIsLoading(true);

        //We have two options: if we have cached data, we can use it, otherwise we fetch the data

        if (cachedData) {
            try {
                const parsedData = JSON.parse(cachedData);
                setData(parsedData);
            } catch (error) {
                console.error("Error parsing cached data:", error);
                sessionStorage.removeItem('my-data');
            }
            finally {
                setIsLoading(false); // Turn off loading indicator..The data is already in the session storage
            }
        } else {

            //We don't have cached data, so we fetch the data

            //Para posibilitar la cancelación de fetch, pasa la propiedad signal de un AbortController como una opción de fetch:
            //El método fetch conoce cómo trabajar con AbortController. Este escuchará eventos abort sobre signal.

            const fetchDataAxios = async () => {
                try {
                    //Unlike the fetch() method, the response returned from this library contains the JSON format we need.
                    //A better and cleaner way of handling promises is through the async/await keywords. You start by specifying the caller function as async. 
                    //Then use the await keyword with the function call. Due to the await keyword, the asynchronous function pauses until the promise is resolved. 

                    const response = await axios.get(url, { signal });
                    //It also has the advantage of robust error handling, so we don’t need to check and throw an error like we did earlier with the fetch() method.
                    setData(response.data);
                    setError(null);
                }
                catch (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                    setError(error.message);
                    setData(null);
                }
                finally {
                    setIsLoading(false);
                }

            }
            fetchDataAxios();
        }

        //useEffect has a cleanup function that runs when the component is unmounted
        //when the component is unmounted ? 
        //when the user navigates to another page or the component is no longer needed and is not rendered to the user
        // Example: the user closes the tab or the browser or changes url

        return () => {
            // When the compoment is aborted we abort the request
            // sólo funcionará si la petición sigue en curso
            abortController.abort();
            // setIsLoading(false); // Turn on loading indicator
        }

    }, []); // Run the effect only once on component mount

    //Function to cancel the request using a button
    const handleCancelRequest = () => {
        if (controller) {
            controller.abort();
            setError("Request Cancelled");
        }
    }

    return { data, error, isLoading, handleCancelRequest };
}

/* Example of use:

export default function LaunchAllList() {

    const { data: launches, error, isLoading, handleCancelRequest } = useFetch('https://api.spacexdata.com/v4/launches');
    
    return (
        <Fragment>
            <Heading as='h1' size='lg' m={8}> Fetch like a pro</Heading>
            //Add a button to cancel the request
            <button onClick={handleCancelRequest}>Cancel Request</button>
            <section>

                {/* Display errors if any }
                {error && <li> Error : {error} </li>} or better own ErrorComponent customised <ErrorAPI error={error} />}

                {/* Display loading indicator }
                {isLoading && <li> Is loading Data</li> or better a customised component showing <LoadComponent />}
                {
                    data?.map(dataItem => (
                        <li key={dataItem.id}> Data {...dataItem} </li>
                       //Or use a customized component to show results <LaunchItem key={dataItem.id} {...dataItem} />
                    ))
                }

            </section>
        </Fragment>
    );
}

*/