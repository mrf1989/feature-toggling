import { Box, Button, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PricingPlan } from "../models/PricingPlan";

export default function Pricing() {
  const [basic, setBasic] = useState({} as PricingPlan);
  const [advanced, setAdvanced] = useState({} as PricingPlan);
  const [pro, setPro] = useState({} as PricingPlan);

  useEffect(() => {
    async function fetchPricing() {
      const response = await fetch("/api/pricing");
      if (response.ok) {
        const princings = await response.json();
        setBasic(princings[0]);
        setAdvanced(princings[1]);
        setPro(princings[2]);
      }
    }

    fetchPricing();
  }, []);

  return (
    <>
      <Box p={5} mx="auto" w={["95%", "85%", "75%"]} bg="white" borderRadius="md" boxShadow="md">
        <Text fontSize={32} mb={5}>Pricing Plans</Text>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Features</Th>
                <Th>Basic</Th>
                <Th>Advanced</Th>
                <Th>Pro</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Advanced profile</Td>
                <Td>
                  {basic.advProfile ? "Yes" : "No"}
                </Td>
                <Td>
                  {advanced.advProfile ? "Yes" : "No"}
                </Td>
                <Td>
                  {pro.advProfile ? "Yes" : "No"}
                </Td>
              </Tr>
              <Tr>
                <Td>Vet history</Td>
                <Td>
                  {basic.vetHistory ? "Yes" : "No"}
                </Td>
                <Td>
                  {advanced.vetHistory ? "Yes" : "No"}
                </Td>
                <Td>
                  {pro.vetHistory ? "Yes" : "No"}
                </Td>
              </Tr>
              <Tr>
                <Td>Adoption system</Td>
                <Td>
                  {basic.adoptionSys ? "Yes" : "No"}
                </Td>
                <Td>
                  {advanced.adoptionSys ? "Yes" : "No"}
                </Td>
                <Td>
                  {pro.adoptionSys ? "Yes" : "No"}
                </Td>
              </Tr>
              <Tr>
                <Td>Pet hotel</Td>
                <Td>
                  {basic.petHostel ? "Yes" : "No"}
                </Td>
                <Td>
                  {advanced.petHostel ? "Yes" : "No"}
                </Td>
                <Td>
                  {pro.petHostel ? "Yes" : "No"}
                </Td>
              </Tr>
              <Tr>
                <Td>Max number of pets</Td>
                <Td>
                  {basic.nPets > 0 ? basic.nPets : "Unlimited"}
                </Td>
                <Td>
                  {advanced.nPets > 0 ? advanced.nPets : "Unlimited"}
                </Td>
                <Td>
                  {pro.nPets > 0 ? pro.nPets : "Unlimited"}
                </Td>
              </Tr>
              <Tr>
                <Td>Max number of vets</Td>
                <Td>
                  {basic.nVets > 0 ? basic.nVets : "Unlimited"}
                </Td>
                <Td>
                  {advanced.nVets > 0 ? advanced.nVets : "Unlimited"}
                </Td>
                <Td>
                  {pro.nVets > 0 ? pro.nVets : "Unlimited"}
                </Td>
              </Tr>
              <Tr>
                <Td>Max number of dates</Td>
                <Td>
                  {basic.nDates > 0 ? basic.nDates : "Unlimited"}
                </Td>
                <Td>
                  {advanced.nDates > 0 ? advanced.nDates : "Unlimited"}
                </Td>
                <Td>
                  {pro.nDates > 0 ? pro.nDates : "Unlimited"}
                </Td>
              </Tr>
              <Tr>
                <Td>Veterinary specialities</Td>
                <Td>
                  {basic.veterinarySpecialities}
                </Td>
                <Td>
                  {advanced.veterinarySpecialities}
                </Td>
                <Td>
                  {pro.veterinarySpecialities}
                </Td>
              </Tr>
              <Tr>
                <Td><b>Price</b></Td>
                <Td>{basic.cost > 0 ? basic.cost + " €/month" : "Free"}</Td>
                <Td>{advanced.cost > 0 ? advanced.cost + " €/month" : "Free"}</Td>
                <Td>{pro.cost > 0 ? pro.cost + " €/month" : "Free"}</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td><Button colorScheme="blue" boxShadow="md" >Join it</Button></Td>
                <Td><Button colorScheme="blue" boxShadow="md" >Join it</Button></Td>
                <Td><Button colorScheme="blue" boxShadow="md" >Join it</Button></Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}