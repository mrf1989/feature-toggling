import { AddIcon } from "@chakra-ui/icons";
import {
  Box, Heading, Text, Image, Divider, TableContainer,
  Table, Thead, Tr, Th, Button, Td, IconButton, Card, CardBody,
  Stack, UnorderedList, ListItem, Tbody, Link, HStack
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { FeatureContext } from "..";
import { FeatureToogle } from "../lib/components/FeatureToggle";
import { Off } from "../lib/components/Off";
import { On } from "../lib/components/On";
import { Person } from "../models/PersonType";

export default function Profile() {
  const featureContext = useContext(FeatureContext);
  const [featureRetriever, setFeatureRetriever] = useState(featureContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(featureRetriever.getUser());
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([] as any[]);

  if (!user.username) {
    navigate("/login");
  }
  
  useEffect(() => {
    async function handlePets() {
      const response = await fetch(`/api/pet/owner/${user.id}`);
      if (response.ok) {
        const pets = await response.json();
        setPets(pets);
      }
    }
    handlePets();

    let vets: any[] = [];
    async function handleVets() {
      fetch(`/api/vet/customer/${user.id}`)
        .then((response) => {
          if (response.ok) {
            const vetAdscriptions = response.json();
            vetAdscriptions.then((adscriptions) => {
              adscriptions.forEach((adscription: any) => {
                vets.push(fetch(`/api/user/${adscription.vetId}`));
              });
              Promise.all(vets).then((responses) => {
                Promise.all(responses.map((response) => response.json())).then((vets) => {
                  setVets(vets);
                });
              });
            });
          }
        });
    }
    handleVets();

    function handleFeatureRetrieverChange() {
      setUser(featureContext.getUser());
      setFeatureRetriever(featureContext);
    }

    featureContext.subscribe(handleFeatureRetrieverChange);

    return () => {
      featureContext.unsubscribe(handleFeatureRetrieverChange);
    };
  }, [featureContext, featureRetriever, user]);

  function handleBookDateWithVet(vet: Person) {
    const vetAdscription = {
      vetId: vet.id,
      customerId: user.id
    };

    fetch("/api/vet", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(vetAdscription)
    }).then(response => {
      if (response.ok) {
        featureContext.updateUser({ dates: user.dates + 1 });
      } else {
        console.log(response);
      }
    }
    ).catch(error => {
      console.log(error);
    });
  }

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
                            <HStack spacing="8px">
                              <Heading size='md'>{pet.name}</Heading>
                              {
                                pet.inHostal && <Text fontSize={14} color="red.500" fontWeight="700">IN PET HOSTEL</Text>
                              }
                            </HStack>
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
          <Box display="flex" justifyContent="space-between">
            <HStack>
              <Text fontSize={18} fontWeight="bold" alignSelf="center" me={4}>Selected Vets</Text>
              <FeatureToogle feature="add-vet">
                <On>
                  <Box display="flex" alignItems="center" gap={3}>
                    <IconButton
                      as={ReactLink}
                      to={"/vet/add"}
                      size="sm"
                      aria-label="Add Vet"
                      colorScheme="blue"
                      icon={<AddIcon />}
                      boxShadow="md"
                    />
                    <Text alignSelf="center" fontSize={14}>You can add more vets</Text>
                  </Box>
                </On>
                <Off>
                  <Box display="flex" alignItems="center" gap={3}>
                    <IconButton isDisabled size="sm" aria-label="Add Vet" colorScheme="blue" icon={<AddIcon />} boxShadow="md" />
                    <Text alignSelf="center" fontSize={14} color="red.500">You cannot add more vets</Text>
                  </Box>
                </Off>
              </FeatureToogle>
            </HStack>
            <HStack spacing="8px">
              <FeatureToogle feature="add-date">
                <Off>
                  <Text color="red.500" fontSize={14}>Limit of booked dates reached</Text>
                </Off>
              </FeatureToogle>
              <Text>You have {user.dates} vets dates</Text>
            </HStack>
          </Box>
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
                        <Td textAlign="end">
                          <FeatureToogle feature="add-date">
                            <On>
                              <Button size="sm" colorScheme="blue" boxShadow="md" onClick={() => handleBookDateWithVet(vet)}>Book date</Button>
                            </On>
                          </FeatureToogle>
                        </Td>
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