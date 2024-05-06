import { useParams } from "react-router-dom";
import * as API from '../services/rocket';
import { Fragment, useEffect, useState } from "react";
import { Spacer, Box, Text, Flex, Spinner, Image } from "@chakra-ui/react";

export function LaunchRocketDetails() {

    const [rocket, setRocket] = useState({});
    const { rocketId } = useParams();

    //Segundo parametro ( array de dependencias)
    //se ponde launchId, porque es interesante que cada vez que cambien el launchID se vuelva a llamar a la api y se traigan los datos nuevos

    useEffect(() => {
        API.getRocketById(rocketId)
            .then(data => setRocket(data))
            .catch(err => console.log(err));
    }
        , [rocketId]);

    return (
        <Fragment>
            {Object.keys(rocket).length === 0 ? (<Spinner
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
                        <div> InfoRocket con Id {rocket.id} </div>

                        <Flex>
                            <Text fontSize='medium'>
                                <br></br>
                                Rocket Description : <br></br> {rocket.description} <br></br>
                                <Spacer />
                                Rocket name: <br></br> {rocket.name}  <br></br><br></br>
                                <br></br>
                                Altura rocket:<br></br> {rocket.height.meters} meters.
                                <br></br>
                                Masa:<br></br> {rocket.mass.kg} kgs.
                                <br></br>
                                Cost per Launch:<br></br> {rocket.cost_per_launch} dolares.
                            </Text>

                        </Flex>
                        <Flex display="">
                            <Text fontSize='medium'>
                                Rocket Image :
                            </Text>
                            <Spacer/>
                            <Image src={rocket.flickr_images[0]} fallbackSrc={rocket.flickr_images[1]} alt={"Imagen " + rocket.name + " no cargada"} width={400} height='auto' />
                        </Flex>

                    </Box>
                )}
        </Fragment>
    );

}