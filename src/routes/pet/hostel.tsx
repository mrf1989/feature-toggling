import {
  Box, Button, Divider, FormControl, FormHelperText, FormLabel,
  Heading, HStack, Image, Radio, RadioGroup, Select, Text, Textarea
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FeatureContext } from "../../";
import { Pet } from "../../models/PetType";

export default function PetHostel() {
  const featureContext = useContext(FeatureContext);
  const navigate = useNavigate();
  const user = featureContext.getUser();
  const [pets, setPets] = useState([]);
  const [pet, setPet] = useState({} as Pet);

  useEffect(() => {
    async function handlePets() {
      const response = await fetch(`/api/pet/owner/${user.id}`);
      if (response.ok) {
        const pets = await response.json();
        setPets(pets);
      }
    }
    handlePets();
  });

  function handleSelectChange(event: any) {
    const pet = pets.find((pet: Pet) => pet.id === parseInt(event.target.value));
    setPet(pet!);
  }

  function handleCheckIn() {
    if (pet) {
      const petToHostel: Pet = {
        ...pet,
        inHostal: true
      };
  
      fetch(`/api/pet`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petToHostel)
      }).then(response => {
        if (response.ok) {
          navigate("/me");
        } else {
          console.log(response);
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }

  function handleCheckOut(pet: Pet) {
    if (pet) {
      const petToHostel: Pet = {
        ...pet,
        inHostal: false
      };

      fetch(`/api/pet`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petToHostel)
      }).then(response => {
        if (response.ok) {
          navigate("/me");
        } else {
          console.log(response);
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }

  return(
    <Box p={5} mx="auto" display={{ base: "block", md: "flex" }} w={["95%", "85%", "75%"]} bg="white" borderRadius="md" boxShadow="md">
      <Box display="flex" w={{ base: "100%", md: "40%" }}>
        <Box alignSelf="start">
          <Box display="flex" justifyContent="center">
            <Image
              w="80%"
              src="https://hawaii.armymwr.com/application/files/8216/0459/7182/GettyImages-157668281.jpg"
              mb={6}/>
          </Box>
          <Heading fontSize={32}>Welcome to<br />Pet Hostel Service</Heading>
          <Text mb={6} fontSize={16} fontWeight="thin">The safe and animal-friendly space for your pets</Text>
        </Box>
      </Box>
      <Box w={{ base: "100%", md: "60%" }}>
        <Box>
          <Text fontSize={24} fontWeight="bold" mb={3}>Your pets in the hostel</Text>
          {
            pets
              .filter((pet: Pet) => pet.inHostal)
              .map((pet: Pet) => (
                <Box
                  key={pet.id}
                  p={5}
                  mt={5}
                  bg="gray.100"
                  borderRadius="md"
                  display="flex"
                  justifyContent="space-between"
                >
                  <HStack spacing="16px">
                    <Text fontSize={20}>{pet.name}</Text>
                    <Text fontSize={16}>{pet.category.name}</Text>
                  </HStack>
                  <Button boxShadow="md" colorScheme="teal" onClick={() => handleCheckOut(pet)}>Check out</Button>
                </Box>
              ))
          }
          {
            pets.filter((pet: Pet) => pet.inHostal).length === 0 &&
            <Text fontSize={16} fontWeight="thin">You don't have any pet in the hostel</Text>
          }
          <Divider orientation="horizontal" my={5} />
        </Box>
        <Box>
          <Text fontSize={18} fontWeight="bold" mb={2}>Check in for another pet</Text>
          <FormControl mb={3}>  
            <FormLabel></FormLabel>
              <Select
                placeholder="Your pets available"
                onChange={handleSelectChange}
                value={pet.id}>
                {
                  pets
                    .filter((pet: Pet) => !pet.inHostal)
                    .map((pet: Pet) => (
                      <option key={pet.id} value={pet.id}>{pet.name}</option>
                    ))
                }
              </Select>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Does your pet have a special diet?</FormLabel>
            <RadioGroup defaultValue='0'>
              <HStack spacing="24px">
                <Radio value='0'>No</Radio>
                <Radio value="1">Yes</Radio>
              </HStack>
            </RadioGroup>
            <FormHelperText>If yes, please provide details in comments</FormHelperText>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Does your pet have any medical treatment?</FormLabel>
            <RadioGroup defaultValue='0'>
              <HStack spacing="24px">
                <Radio value='0'>No</Radio>
                <Radio value="1">Yes</Radio>
              </HStack>
            </RadioGroup>
            <FormHelperText>If yes, please provide details in comments</FormHelperText>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Comments</FormLabel>
            <Textarea size="sm" />
          </FormControl>
          <Button boxShadow="md" colorScheme="teal" onClick={handleCheckIn}>Check in</Button>
        </Box>
      </Box>
    </Box>
  );
}