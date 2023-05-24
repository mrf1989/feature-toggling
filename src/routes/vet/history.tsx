import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pet, PetHistory } from "../../models/PetType";

export default function VetHistory() {
  const [pet, setPet] = useState({} as Pet);
  const { id } = useParams();

  useEffect(() => {
    async function handlePet() {
      const response = await fetch(`/api/pet/${id}`);
      if (response.ok) {
        const pet = await response.json();
        pet.history = pet.history.reverse();
        setPet(pet);
      }
    }
    handlePet();
  }, [id]);

  return (
    <>
      <Box p={5} mx="auto" w={["95%", "85%", "75%"]} bg="white" borderRadius="md" boxShadow="md">
        {pet.name && (<Box>
          <Text fontSize={32} mb={5}>{pet.name}{pet.name[pet.name.length-1] === 's' ? "'" : "'s"} Pet History</Text>
          <Box>
            {pet.history && pet.history.map((history: PetHistory) => (
              <Box key={history.date} mb={5} bg="#eee" borderRadius="md" boxShadow="md" py={2} px={3}>
                <Text fontSize={20} mb={2} fontWeight={700}>{history.date}</Text>
                <Text>{history.comments}</Text>
              </Box>
            ))}
          </Box>
        </Box>)}
      </Box>
    </>
  );
}