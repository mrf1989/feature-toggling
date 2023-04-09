import { AddIcon } from "@chakra-ui/icons";
import {
  Box, Heading, Text, Image, Divider, TableContainer,
  Table, Thead, Tr, Th, Button, Td, IconButton, Card, CardBody,
  Stack, UnorderedList, ListItem, Tbody, Link
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FeatureToogle } from "../../lib/FeatureToggle";
import { Off } from "../../lib/Off";
import { On } from "../../lib/On";
import { userState, pricingState, pricingPlanState } from "../../state";

export default function Profile() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const features = useRecoilValue(pricingState);
  const pricing = useRecoilValue(pricingPlanState);
  const [addPetsMessages, setAddPetsMessages] = useState("");
  const [addVetsMessages, setAddVetsMessages] = useState("");

  useEffect(() => {
    if (!user.username) {
      navigate("/login");
    }

    if (pricing.nPets - user.pets > 0) {
      setAddPetsMessages(`You can register ${pricing.nPets - user.pets} more pets`);
    } else if (pricing.nPets - user.pets < 0) {
      setAddPetsMessages("You can register unlimited pets");
    } else {
      setAddPetsMessages("You cannot register more pets"); 
    }
  
    if (pricing.nVets - user.vets > 0) {
      setAddVetsMessages(`You can add ${pricing.nPets - user.pets} more vets`);
    } else if (pricing.nVets - user.vets < 0) {
      setAddVetsMessages("You can add unlimited vets");
    } else {
      setAddVetsMessages("You cannot add more vets"); 
    }
  }, [addPetsMessages, addVetsMessages, navigate, pricing.nPets, pricing.nVets, user.pets, user.username, user.vets]);

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
          <Box mb={2} display="flex" justifyContent="space-between">
            <Text fontSize={24} fontWeight="bold">Your pets</Text>
            <FeatureToogle feature="add-pet">
              <On>
                <IconButton aria-label="Add Pet" colorScheme="teal" icon={<AddIcon />} boxShadow="md" />
              </On>
              <Off>
                <IconButton isDisabled aria-label="Add Pet" colorScheme="teal" icon={<AddIcon />} boxShadow="md" />
              </Off>
            </FeatureToogle>
          </Box>
          <Text fontSize={14} mb={4}>{addPetsMessages}</Text>
          <FeatureToogle feature="advProfile">
            <On>
              <Box>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  boxShadow="md"
                  mb={4}
                >
                  <Image 
                    objectFit="cover"
                    maxW={{ base: '100%', sm: '200px' }}
                    src="https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg"
                  />
                  <Stack>
                    <CardBody>
                      <Heading size='md'>Coco</Heading>
                      <Text py='2' fontSize={16} fontWeight="thin">Dog</Text>
                      <UnorderedList>
                        <ListItem>Birth date: May 2019</ListItem>
                        <ListItem>Race: Retriever</ListItem>
                      </UnorderedList>
                    </CardBody>
                  </Stack>
                </Card>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  boxShadow="md"
                  mb={4}
                >
                  <Image 
                    objectFit="cover"
                    maxW={{ base: '100%', sm: '200px' }}
                    src="https://www.thesprucepets.com/thmb/r6z0a3Yj2CKbxYtS-Rz5YESGwBQ=/420x294/filters:no_upscale():strip_icc()/GettyImages-1185181003-b2f9c48e81304d10b93f55be4090d788.jpg"
                  />
                  <Stack>
                    <CardBody>
                      <Heading size='md'>Michis</Heading>
                      <Text py='2' fontSize={16} fontWeight="thin">Cat</Text>
                      <UnorderedList>
                        <ListItem>Birth date: Jul 2017</ListItem>
                        <ListItem>Race: Common European</ListItem>
                      </UnorderedList>
                    </CardBody>
                  </Stack>
                </Card>
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
                      <Tr>
                        <Td>Coco</Td>
                        <Td>Dog</Td>
                        <Td>May 2019</Td>
                      </Tr>
                      <Tr>
                        <Td>Michis</Td>
                        <Td>Cat</Td>
                        <Td>Jul 2017</Td>
                      </Tr>
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
              <Tr>
                <Td>John Wood</Td>
                <Td><Link href="mailto:johnclinic@petfriends.com">johnclinic@petfriends.com</Link></Td>
                <Td>1512 Marietta Street, Vallejo, CA</Td>
                <Td textAlign="end"><Button colorScheme="blue" boxShadow="md">Book date</Button></Td>
              </Tr>
              <Tr>
                <Td>Jennifer Wick</Td>
                <Td><Link href="mailto:j.wick@dogsandcat.com">j.wick@dogsandcat.com</Link></Td>
                <Td>1756 Fairway Drive, Vacaville, CA</Td>
                <Td textAlign="end"><Button colorScheme="blue" boxShadow="md">Book date</Button></Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}