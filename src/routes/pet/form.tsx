import { Box, Button, FormControl, FormLabel, Input, Select, Text } from "@chakra-ui/react";

export default function PetForm() {
  return (
    <>
      <Box p={5} mx="auto" w={["95%", "85%", "75%"]} bg="white" borderRadius="md" boxShadow="md">
        <Text fontSize={32} mb={5}>Add a pet</Text>
        <form>
          <FormControl id="name" mb={5}>
            <FormLabel>Name</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="type" mb={5}>
            <FormLabel>Type</FormLabel>
            <Select>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="fish">Fish</option>
              <option value="reptile">Reptile</option>
              <option value="other">Other</option>

            </Select>
          </FormControl>
          <FormControl id="breed" mb={5}>
            <FormLabel>Breed</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="age" mb={5}>
            <FormLabel>Age</FormLabel>
            <Input type="number" />
          </FormControl>
          </form>
          <Button colorScheme="blue" type="submit">Add pet</Button>
      </Box>
    </>
  );
}