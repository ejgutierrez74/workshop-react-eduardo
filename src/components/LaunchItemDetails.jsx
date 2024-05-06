import { useParams } from "react-router-dom";
import * as API from '../services/launches';
import { Fragment, useEffect, useState } from "react";
import { Spacer, Box, Text, Flex, Tag, Spinner } from "@chakra-ui/react";

export function LaunchItemDetails() {

    const [launch, setLaunch] = useState({});
    const { launchId } = useParams();

    //Segundo parametro ( array de dependencias)
    //se ponde launchId, porque es interesante que cada vez que cambien el launchID se vuelva a llamar a la api y se traigan los datos nuevos

    useEffect(() => {
        API.getLaunchByLaunchId(launchId)
            .then(data => setLaunch(data))
            .catch(err => console.log(err));
    }
        , [launchId]);

    return (
        <Fragment>
            {!launch ? (<Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />) 
            : (
                <Box
                    maxW='50rem'
                    bg='gray.100'
                    p={4}
                    m={4}
                    borderRadius='lg'
                >
                    <div> La mision clicada es {launchId} </div>
                    <Flex display='flex'>
                        <Text fontSize='2xl'>
                            Mision : <strong>{launch.name}</strong> <br></br>
                            Fecha mision : {launch.date_local}  <br></br>
                        </Text>

                        <Spacer />
                        <Tag p={2} colorScheme={launch.success ? "green" : "red"}>
                            {launch.success ? "Exito" : "Fracaso"}
                        </Tag>
                    </Flex>
                    <Flex>
                        <Text fontSize='xl'>
                            Link Article : <strong>{launch.links}</strong> <br></br>
                            Link Wikipedia : {launch.details}  <br></br>
                        </Text>
                    </Flex>

                </Box>
            )}
        </Fragment>
    );

}