import { LaunchItem } from "./LaunchItem";
import { Fragment, useCustomFetch } from "react";
import { Heading } from "@chakra-ui/react";
import { LoadComponent } from "./LoadComponent";
import { ErrorAPI } from "./ErrorComponents/ErrorAPI";


export default function LaunchAllListHook() {
    const url= 'https://api.spacexdata.com/v4/launches'

    const { data: launches, error, isLoading, handleCancelRequest } = useCustomFetch(url);

    return (
        <Fragment>
            <Heading as='h1' size='lg' m={8}> Space X Launches</Heading>
            <button onClick={handleCancelRequest}>Cancel Request</button>
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