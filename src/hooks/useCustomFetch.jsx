import { useEffect, useState } from "react";

export default function useCustomFetch(url) {

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
            finally{
                setIsLoading(false); // Turn off loading indicator..The data is already in the session storage
            }
        } else {

            //We don't have cached data, so we fetch the data

            //Para posibilitar la cancelación de fetch, pasa la propiedad signal de un AbortController como una opción de fetch:
            //El método fetch conoce cómo trabajar con AbortController. Este escuchará eventos abort sobre signal.

            fetch(url, { signal })
                .then(response => {
                    if (!response.ok) {
                        throw Error('Failed to fetch data');
                    }
                    //Devuelve una promesa pero con un objeto json. Equivale a usar JSON.parse().
                    return response.json();
                })
                .then(
                    //data is the response body as a JSON object
                    data => {
                        sessionStorage.setItem('my-data', JSON.stringify(data));
                        setData(data); // Set the fetched data
                        setError(null); // Clear any previous errors
                    })
                .catch((error) => {
                    if (error.name === "AbortError") {
                        console.log("Fetch aborted"); // Log a message when the request is intentionally aborted
                    }
                    else {
                        console.log("Error fetching data: ", error.message);
                        setError(error.message); // Handle and set the error message
                    }
                })
                .finally(() => setIsLoading(false)); // Turn off loading indicator
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