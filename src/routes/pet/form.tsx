import { Box, Button, FormControl, FormLabel, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Pet } from "../../models/PetType";
import { FeatureContext } from "../../";
import { useNavigate } from "react-router-dom";
import { Role } from "../../models/PersonType";

export default function PetForm() {
  const featureContext = useContext(FeatureContext);
  const navigate = useNavigate();
  const [featureRetriever, setFeatureRetriever] = useState(featureContext);
  const [user, setUser] = useState(featureRetriever.getUser());

  useEffect(() => {
    function handleFeatureRetrieverChange() {
      setUser(featureContext.getUser());
      setFeatureRetriever(featureContext);
    }

    featureContext.subscribe(handleFeatureRetrieverChange);

    return () => {
      featureContext.unsubscribe(handleFeatureRetrieverChange);
    };
  }, [featureContext, featureRetriever, user]);

  function handleAddPet(values: any) {
    const pet: Pet = {
      ...values,
      owner: user.id,
      category: { id: parseInt(values.category) }
    };

    fetch("/api/pet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pet)
    }).then(response => {
      if (response.ok) {
        featureContext.updateUser({ pets: user.pets + 1 });
        navigate("/me");
      } else {
        console.log(response);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  function handlePetToAdoption(values: any) {
    const pet: Pet = {
      ...values,
      owner: null,
      inAdoption: true,
      category: { id: parseInt(values.category) }
    };

    fetch("/api/pet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pet)
    }).then(response => {
      if (response.ok) {
        navigate("/pet/adoption");
      } else {
        console.log(response);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <>
      <Box p={5} mx="auto" w={["95%", "85%", "75%"]} bg="white" borderRadius="md" boxShadow="md">
        <Text fontSize={32} mb={5}>Add a pet</Text>
        <Formik
          initialValues={{
            name: "",
            category: "",
            race: "",
            birth: "",
            photo: ""
          }}
          onSubmit={handleAddPet}>
        {({
          values,
          handleChange
        }) => (
          <Form style={{ width: "100%" }}>
            <VStack w="100%" spacing="30px">
              <FormControl id="name" mb={5}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="birth" mb={5}>
                <FormLabel>Birth</FormLabel>
                <Input
                  type="text"
                  name="birth"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="category" mb={5}>
                <FormLabel>Category</FormLabel>
                <Select placeholder="Select a category" name="category" onChange={handleChange}>
                  <option value="1">Dog</option>
                  <option value="2">Cat</option>
                  <option value="3">Bird</option>
                  <option value="4">Reptile</option>
                  <option value="5">Rodent</option>
                  <option value="6">Horse</option>
                  <option value="7">Fish</option>
                  <option value="8">Other</option>
                </Select>
              </FormControl>
              <FormControl id="race" mb={5}>
                <FormLabel>Race</FormLabel>
                <Input
                  type="text"
                  name="race"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="photo" mb={5}>
                <FormLabel>Photo</FormLabel>
                <Input
                  type="text"
                  name="photo"
                  onChange={handleChange}
                />
              </FormControl>
              <HStack spacing="16px">
                <Button colorScheme="blue" type="submit">Add pet</Button>
              {user.role === Role.ADMIN && (
                <Button colorScheme="green" onClick={() => handlePetToAdoption(values)}>Add to adoption</Button>
              )}
              </HStack>
            </VStack>
          </Form>
        )}
        </Formik>
      </Box>
    </>
  );
}