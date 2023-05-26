import { Box, Text, Button, HStack, Image } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FeatureContext } from "../../";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { FeatureToogle } from "../../lib/components/FeatureToggle";
import { On } from "../../lib/components/On";
import { Off } from "../../lib/components/Off";
import { Pet } from "../../models/PetType";
import { Role } from "../../models/PersonType";

export default function AdoptionSys() {
  const featureContext = useContext(FeatureContext);
  const navigate = useNavigate();
  const [featureRetriever, setFeatureRetriever] = useState(featureContext);
  const [user, setUser] = useState(featureRetriever.getUser());
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function handlePets() {
      const response = await fetch("/api/pet/list");
      if (response.ok) {
        const pets = await response.json();
        setPets(pets.filter((pet: any) => pet.inAdoption === true));
      }
    }
    handlePets();

    function handleFeatureRetrieverChange() {
      setUser(featureContext.getUser());
      setFeatureRetriever(featureContext);
    }

    featureContext.subscribe(handleFeatureRetrieverChange);

    return () => {
      featureContext.unsubscribe(handleFeatureRetrieverChange);
    };
  }, [featureContext, featureRetriever, user]);

  function handleAdoptPet(pet: Pet) {
    const petToAdopt: Pet = {
      ...pet,
      inAdoption: false,
      owner: user.id
    };

    fetch("/api/pet", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Is-Adopted": "true"
      },
      body: JSON.stringify(petToAdopt)
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

  return(
    <Box p={5} mx="auto" w={["95%", "85%", "75%"]} bg="white" borderRadius="md" boxShadow="md">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Text fontSize={32}>Adoption System</Text>
        {
          (user.role === Role.ADMIN || user.role === Role.VET) &&
          <Button as={ReactLink} to="/pet/add">Add Pet</Button>
        }
      </Box>
      <Box mt={5}>
        <Box>
          <Text fontSize={24}>Pets</Text>
          <FeatureToogle feature="add-pet">
            <Off>
              <Text fontSize={16} color="red.500">You can't add more pets</Text>
            </Off>
          </FeatureToogle>
        </Box>
        {
          pets.map((pet: any) => (
            <Box key={pet.id} p={5} mt={5} bg="gray.100" borderRadius="md">
              <HStack justify="space-between">
                <HStack>
                {pet.photo ? 
                  <Image 
                    objectFit="cover"
                    maxW={{ base: '100%', sm: '200px' }}
                    src={pet.photo}
                  /> : 
                  <Image
                    objectFit="cover"
                    maxW={{ base: '100%', sm: '200px' }}
                    src="/media/pet-placeholder.jpg"
                  />
                }
                  <Box>
                    <Text fontSize={20}>{pet.name}</Text>
                    <Text fontSize={16}>{pet.category.name}</Text>
                    <Text fontSize={14}>{pet.birth}</Text>
                  </Box>
                </HStack>
                <FeatureToogle feature="add-pet">
                  <On>
                    <Button bg="blue.300" onClick={() => handleAdoptPet(pet)}>Adopt</Button>
                  </On>
                </FeatureToogle>
              </HStack>
            </Box>))
        }
        {
          pets.length === 0 && <Text fontSize={16} mt={5}>No pets available to adopt</Text>
        }
      </Box>
    </Box>
  );
}