import { LaunchItem } from "./LaunchItem";
import { Fragment, useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import * as API from "../services/launches";

export function LaunchAllList() {

    const [launches, setLaunches] = useState([]);

    useEffect(() => {
        API.getAllLaunches().then(data => setLaunches(data))
    }
        , []);

    return (
        <Fragment>
            <Heading as='h1' size='lg' m={8}> Space X Launches</Heading>
            <section>
                {
                    launches.map(launch => (

                        <LaunchItem key={launch.id} {...launch} />
                    ))
                }
            </section>
        </Fragment>
    );
}