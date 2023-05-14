import { AddIcon } from "@chakra-ui/icons";
import {
  Box, Heading, Text, Image, Divider, TableContainer,
  Table, Thead, Tr, Th, Button, Td, IconButton, Card, CardBody,
  Stack, UnorderedList, ListItem, Tbody, Link
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FeatureToogle } from "../lib/FeatureToggle";
import { Off } from "../lib/Off";
import { On } from "../lib/On";
import { userState, pricingState, pricingPlanState } from "../state";

export default function Profile() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const features = useRecoilValue(pricingState);
  const pricing = useRecoilValue(pricingPlanState);
  const [addPetsMessages, setAddPetsMessages] = useState("");
  const [addVetsMessages, setAddVetsMessages] = useState("");
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([] as any[]);

  
  useEffect(() => {
    if (!user.username) {
      navigate("/login");
    }
    
    async function handlePets() {
      const response = await fetch(`/api/pet/owner/${user.id}`);
      if (response.ok) {
        const pets = await response.json();
        setPets(pets);
      }
    }
    handlePets();

    async function handleVets() {
      const response = await fetch(`/api/vet/customer/${user.id}`);
      if (response.ok) {
        const vetAdscriptions = await response.json();
        let vets: any[] = [];
        vetAdscriptions.forEach(async (adscription: any) => {
          const response = await fetch(`/api/user/${adscription.vetId}`);
          if (response.ok) {
            const vet = await response.json();
            vets.push(vet);
            setVets(vets);
          }
        });
      }
    }
    handleVets();
  
    if (pricing.nVets - user.vets > 0) {
      setAddVetsMessages(`You can add ${pricing.nPets - user.pets} more vets`);
    } else if (pricing.nVets - user.vets < 0) {
      setAddVetsMessages("You can add unlimited vets");
    } else {
      setAddVetsMessages("You cannot add more vets"); 
    }
  }, [addVetsMessages, navigate, pricing.nPets, pricing.nVets, user.id, user.pets, user.username, user.vets]);

  return(
    <Box p={5} mx="auto" bg="white" borderRadius="md" boxShadow="md" w={["95%", "85%", "75%"]}>
      <Box display={{ base: "block", md: "flex" }}>
        <Box display="flex" w={{ base: "100%", md: "40%" }} justifyContent="center">
          <Box display="flex" flexDirection="column">
            <FeatureToogle feature="advProfile">
              <On>
                <Box mb={3} display="flex" justifyContent="center">
                  <Image borderRadius="full" boxSize="120px" src="/media/profile.jpg" boxShadow="md" />
                </Box>
              </On>
            </FeatureToogle>
            <Heading fontSize={32} textAlign="center">Hi, {user.username}!</Heading>
            <Text fontSize={16} textAlign="center" fontWeight="thin">Welcome to your profile</Text>
          </Box>
        </Box>
        <Box px={4} >
          <Divider orientation="vertical" />
        </Box>
        <Box display="flex" flexDirection="column" w={{ base: "100%", md: "60%" }}>
          <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
            <Text fontSize={24} fontWeight="bold">Your pets</Text>
            <FeatureToogle feature="add-pet">
              <On>
                <Box display="flex" alignItems="center" gap={3}>
                  <Text fontSize={14}>You can register more pets</Text>
                  <IconButton as={ReactLink} to="/pet/add" aria-label="Add Pet" colorScheme="teal" icon={<AddIcon />} boxShadow="md" />
                </Box>
              </On>
              <Off>
                <Box display="flex" alignItems="center" gap={3}>
                  <Text fontSize={14} color="red.500">You cannot register more pets</Text>
                  <IconButton isDisabled aria-label="Add Pet" colorScheme="teal" icon={<AddIcon />} boxShadow="md" />
                </Box>
              </Off>
            </FeatureToogle>
          </Box>
          <FeatureToogle feature="advProfile">
            <On>
              <Box>
                {
                  pets.map((pet: any) => {
                    return(
                      <Card
                        direction={{ base: "column", sm: "row" }}
                        overflow="hidden"
                        variant="outline"
                        boxShadow="md"
                        mb={4}
                        key={pet.id}
                      >
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
                        />}
                        <Stack>
                          <CardBody>
                            <Heading size='md'>{pet.name}</Heading>
                            <Text py='2' fontSize={16} fontWeight="thin">{pet.category.name}</Text>
                            <UnorderedList>
                              <ListItem>Birth date: {pet.birth}</ListItem>
                              <ListItem>Race: {pet.race}</ListItem>
                            </UnorderedList>
                            <FeatureToogle feature="vetHistory">
                              <On>
                                <Button mt='2' as={ReactLink} to={`/vet/history/${pet.id}`}>Vet history</Button>
                              </On>
                            </FeatureToogle>
                          </CardBody>
                        </Stack>
                      </Card>
                    )
                  })
                }
              </Box>
            </On>
            <Off>
              <Box>
                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Species</Th>
                        <Th>Birth</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        pets.map((pet: any) => {
                          return (
                            <Tr key={pet.id}>
                              <Td>{pet.name}</Td>
                              <Td>{pet.category.name}</Td>
                              <Td>{pet.birth}</Td>
                            </Tr>
                          );
                        })
                      }
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Off>
          </FeatureToogle>
        </Box>
      </Box>
      <Divider my={3} orientation="horizontal" />
      <Box>
        <Box ps={5} mb={4}>
          <Box display="flex">
            <Text fontSize={18} fontWeight="bold" alignSelf="center" me={4}>Selected Vets</Text>
            <FeatureToogle feature="add-vet">
              <On>
                <IconButton size="sm" aria-label="Add Vet" colorScheme="blue" icon={<AddIcon />} boxShadow="md" />
              </On>
              <Off>
                <IconButton isDisabled size="sm" aria-label="Add Vet" colorScheme="blue" icon={<AddIcon />} boxShadow="md" />
              </Off>
            </FeatureToogle>
          </Box>
          <Text alignSelf="center" mt={2} fontSize={14}>{addVetsMessages}</Text>
        </Box>
        { vets.length > 0 &&
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Address</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  vets.map((vet: any) => {
                    return (
                      <Tr key={vet.id}>
                        <Td>{vet.name}</Td>
                        <Td><Link href={`mailto:${vet.email}`}>{vet.email}</Link></Td>
                        <Td>{vet.address}</Td>
                        <Td textAlign="end"><Button size="sm" colorScheme="blue" boxShadow="md">Book date</Button></Td>
                      </Tr>
                    );
                  })
                }
              </Tbody>
            </Table>
          </TableContainer>
        }
      </Box>
    </Box>
  );
}