import { LaunchItem } from "./LaunchItem";
import { Fragment, useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import * as API from "../services/launches";
import { LoadComponent } from "./LoadComponent";
import { ErrorAPI } from "./ErrorComponents/ErrorAPI";

export default function LaunchAllList() {

    const [launches, setLaunches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [page, setPage] = useState(0);

    useEffect(() => {
        // Create an AbortController for managing the requests
        const abortController = new AbortController();

        const cachedData = sessionStorage.getItem('my-data');

        if (cachedData) {
            try {
                const parsedData = JSON.parse(cachedData);
                setLaunches(parsedData);
            } catch (error) {
                console.error("Error parsing cached data:", error);
                sessionStorage.removeItem('my-data');
            }

        } else {
            API.getAllLaunches()
                .then(data => {
                    sessionStorage.setItem('my-data', JSON.stringify(data));
                    setLaunches(data); // Set the fetched data
                    setError(null); // Clear any previous errors
                })
                .catch((error) => {
                    if (error.name === "AbortError") {
                        console.log("Fetch aborted"); // Log a message when the request is intentionally aborted
                        return; // Exit the function to prevent further error handling
                    }
                    setError(error.message); // Handle and set the error message
                })
                .finally(() => setIsLoading(false)); // Turn off loading indicator
        }
        setIsLoading(false);

        return () => {
            // al desmontar el componente, abortamos la petición
            // sólo funcionará si la petición sigue en curso
            abortController.abort();
            setIsLoading(false); // Turn on loading indicator
        }

    }, []); // Run the effect only once on component mount

    return (
        <Fragment>
            <Heading as='h1' size='lg' m={8}> Space X Launches</Heading>
            <section>

                {/* Display errors if any */}
                {error && <ErrorAPI error={error} />}

                {/* Display loading indicator */}
                {isLoading && <LoadComponent />}
                {
                    launches.map(launch => (

                        <LaunchItem key={launch.id} {...launch} />
                    ))
                }

            </section>
        </Fragment>
    );
}