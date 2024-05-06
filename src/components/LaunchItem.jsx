
import { Box, Text, Button, Flex, Spacer, Tag } from '@chakra-ui/react';
import { HiCalendar } from 'react-icons/hi';
import { Link } from 'react-router-dom';

function formatDate(date) {
    const data = new Date(date);
    return data.getFullYear();
}

export function LaunchItem(launch) {

    return (
        <Box
            maxW='50rem'
            bg='gray.100'
            p={4}
            m={4}
            borderRadius='lg'
        >
            <Flex display='flex'>
                <Text fontSize='2xl'>
                    Mision : <strong>{launch.name}</strong> <br></br>
                    Fecha mision : {formatDate(launch.date_local)}  <br></br>
                </Text>

                <Spacer />
                <Tag p={2} colorScheme={launch.success ? "green" : "red"}>
                    {launch.success ? "Exito" : "Fracaso"}
                </Tag>
            </Flex>

            <Flex align='center'>
                <HiCalendar color="#718096" />
                <Text ml={1} fontSize="sm" color="gray.500"> {launch.date_local.split("T")[0]}
                </Text>
            </Flex>
            <Link to={`/launches/${launch.id}`}>
                <Button colorScheme='purple' mt={2}>
                    Details of mission
                </Button>
            </Link>
        </Box>
    );

}