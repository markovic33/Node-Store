import { Box,Text,Input, Button, Heading, Image, HStack, IconButton, useColorModeValue, useToast, Modal, useDisclosure, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, ModalFooter } from '@chakra-ui/react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useProductStore } from '../store/product';
import { useState } from 'react';

const ProductCard = ({product}) => {

    const [updatedProduct, setUpdateProduct] = useState(product);

    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg= useColorModeValue("white", "gray.900")

    const {deleteProduct, updateProduct} = useProductStore()
    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleDelete = async(id) => {
        const {success, message} = await deleteProduct(id);
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
            });
         }else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
            });
         }
    }



    const handleUpdate = async (id, updatedProduct) => {
        const {success, message} = await updateProduct(id, updatedProduct);
        onClose();
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
            });
         }else {
            toast({
                title: "Success",
                description: "Product succesfully updated",
                status: "success",
                isClosable: true,
            });
         }
    }

  return (
    <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        hover={{transform: "translateY(-5px)", shadow:"xl"}}
        bg={bg}
    >
        <Image src={product.image} 
               alt={product.name}
               h={48} w={"full"}
               objectFit="cover"
        />

        <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                ${product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton icon={<CiEdit />} onClick={onOpen} colorScheme='blue' />
                <IconButton icon={<MdDelete />} onClick={() => handleDelete(product._id)} colorScheme='red' />
            </HStack>
        </Box>


        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <VStack spacing={4}>
                        <Input  
                            placeholder="Product name"
                            name="name"
                            value={updatedProduct.name}
                            onChange={(e) => setUpdateProduct({...updatedProduct, name: e.target.value})}
                        />
                        <Input  
                            placeholder="Product price"
                            name="price"
                            value={updatedProduct.price}
                            onChange={(e) => setUpdateProduct({...updatedProduct, price: e.target.value})}
                        />
                           
                        <Input  
                            placeholder="Product Image URL"
                            name="image"
                            value={updatedProduct.image}
                            onChange={(e) => setUpdateProduct({...updatedProduct, image: e.target.value})}
                        />
                            
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}
                            onClick={() => handleUpdate(product._id, updatedProduct)}
                    >
                        Update
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>

    </Box>
  )
}

export default ProductCard