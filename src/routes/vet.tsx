import {
  Box, Text, Textarea, Button, VStack, FormControl, FormLabel, Select
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Vet() {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function handlePets() {
      const response = await fetch("/api/pet/list");
      if (response.ok) {
        const pets = await response.json();
        setPets(pets);
      }
    }
    handlePets();
  }, []);

  async function handleAddVet(values: any) {
    const date = new Date()
      .toISOString()
      .slice(0, 16)
      .replace('T', ' / ');
    
    const response = await fetch(`/api/pet/${values.pet}/add-history`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date,
        comments: values.comments
      })
    });

    if (response.ok) {
      navigate(`/vet/history/${values.pet}`);
    }
  }

  return (
    <>
      <Box p={5} mx="auto" w={["95%", "85%", "75%"]} bg="white" borderRadius="md" boxShadow="md">
        <Text fontSize={32} mb={5}>Add Pet History</Text>
        <Formik
          initialValues={{
            pet: "",
            comments: ""
          }}
          onSubmit={handleAddVet}>
        {({
          values,
          handleChange
        }) => (
          <Form style={{ width: "100%" }}>
            <VStack w="100%" spacing="30px">
              <FormControl id="pet" mb={5}>
                <FormLabel>Pet</FormLabel>
                <Select name="pet" placeholder="Select a pet" onChange={handleChange}>
                  {
                    pets.map((pet: any, index: any) => (
                      <option key={index} value={pet.id}>{`(ID ${pet.id}) ${pet.name} - ${pet.category.name}`}</option>
                    ))
                  }
                </Select>
              </FormControl>
              <FormControl id="comments" mb={5}>
                <FormLabel>Comments</FormLabel>
                <Textarea name="comments" placeholder="Comments here..." onChange={handleChange} />
              </FormControl>  
              <Button colorScheme="blue" type="submit">Add Pet History</Button>
            </VStack>
          </Form>
        )}
        </Formik>
      </Box>
    </>
  );
}