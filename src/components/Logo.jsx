import { Box, Image } from "@chakra-ui/react"
import logo from "../assets/spacex-logo.png";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Image src={logo} width={300} height='auto' />
    </Box>
  )
}
