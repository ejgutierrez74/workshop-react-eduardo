import { useParams } from "react-router-dom";
import * as API from '../services/launches';
import { Fragment, useEffect, useState } from "react";
import { Spacer, Box, Text, Flex, Tag, Spinner, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
            {Object.keys(launch).length === 0 ? (<Spinner
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
                            Fecha mision : {launch.date_local.split("T")[0]}  <br></br>
                        </Text>

                        <Spacer />
                        <Tag p={2} colorScheme={launch.success ? "green" : "red"}>
                            {launch.success ? "Exito" : "Fracaso"}
                        </Tag>
                    </Flex>
                    <Flex>
                        <Text fontSize='medium'>
                            <br></br>
                            Link Article : <br></br><strong><a href={ launch.links.article}>{ launch.links.article} </a></strong> <br></br>
                            <br></br>
                            Link Wikipedia : <br></br> <a href={launch.links && launch.links.wikipedia}>{launch.links && launch.links.wikipedia}</a>  <br></br><br></br>
                            <br></br>
                            Detalles Mision:<br></br> {launch.details}
                        </Text>
                   
                    </Flex>
                    <Flex>                       
                        <Link to={`/rockets/${launch.rocket}`}>
                            <Button colorScheme='purple' mt={6}>
                                Info about Rocket
                            </Button>
                        </Link>
                    </Flex>

                </Box>
            )}
        </Fragment>
    );

}