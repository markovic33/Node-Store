import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";




const Navbar = () => {

    const {colorMode, toggleColorMode} = useColorMode();
    

  return (
    <Container maxW={"1140px"} px={4}>
        <Flex 
            h={16} 
            alignItems={"center"} 
            justifyContent={"space-between"} 
            flexDir={{base: "column", sm: "row"}}    
        >
            <Text
                bgGradient='linear(to-r, cyan.400, blue.500)'
                bgClip='text'
                fontSize={{base: "22", sm: "28"}}
                fontWeight='extrabold'
                textAlign={"center"}
                textTransform={"uppercase"}
            >
                    <Link to={"/"}>Product Strore</Link>
            </Text>

            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                    <Button>
                        <CiSquarePlus fontSize={20}  />
                    </Button>
                </Link>

                
                 <Button onClick={toggleColorMode}>
                 {colorMode === "light" ? <FaMoon fontSize={20} /> : <CiLight fontSize={20} />}
                 </Button>
    
            </HStack>

        </Flex>
    </Container>
  )
}

export default Navbar