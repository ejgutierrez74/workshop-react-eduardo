
import { Text, Image } from '@chakra-ui/react';
import Maxar1Mission from "../assets/Maxar1Mission.png";
import { Fragment } from 'react';

export function About() {
    return (
        <Fragment>
            <Text
                color="#2F8D46"
                fontSize="5xl"
                textAlign="center"
                fontWeight="600"
                mt="1rem"
            >
                MAKING HISTORY
            </Text>
            <Text
                color="#000"
                fontSize="1rem"
                textAlign="center"
                fontWeight="500"
                mb="2rem"
            >
                Space X
            </Text>
            <Image
                borderRadius='15'
                boxSize='sm'
                src={Maxar1Mission}
                objectFit='cover' 
                mx="auto" // Add this line to center the image horizontally
                alt='Maxar 1 Mission, 2 May 2024'
            />
            <Text p={4} fontSize="medium" >SpaceX has gained worldwide attention for a series of historic milestones.
                It is the only private company capable of returning a spacecraft from low-Earth orbit, and in 2012 our
                Dragon spacecraft became the first commercial spacecraft to deliver cargo to and from the International Space Station.
                And in 2020, SpaceX became the first private company to take humans there as well.
                Click through the timeline above to see some of our milestone accomplishments.
            </Text>
        </Fragment>
    )
}


