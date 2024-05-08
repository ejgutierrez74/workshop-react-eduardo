import { Fragment } from "react";
import { Spinner } from "@chakra-ui/react";

export function LoadComponent() {
    return (<Fragment>
        <h2>🌀 Loading...</h2>
        <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
        />
    </Fragment>
    )
}