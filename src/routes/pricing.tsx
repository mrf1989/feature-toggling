import { Box, Button, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userState } from "../state";
import { useRecoilState } from "recoil";
import { PricingPlan, PricingType } from "../models/PricingPlan";
import { useLogout } from "../utils/logout";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";

export default function Pricing() {
  const navigate = useNavigate();
  const logout = useLogout();
  const [basic, setBasic] = useState({} as PricingPlan);
  const [advanced, setAdvanced] = useState({} as PricingPlan);
  const [pro, setPro] = useState({} as PricingPlan);
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPricing() {
      const response = await fetch("/api/pricing");
      if (response.ok) {
        const princings = await response.json();
        setBasic(princings[0]);
        setAdvanced(princings[1]);
        setPro(princings[2]);
        isLoading && setIsLoading(false);
      }
    }
    fetchPricing();
  }, []);

  async function updateUserPricing(type: string) {
    const response = await fetch(`/api/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pricingType: type
      })
    });

    if (response.ok) {
      logout();
      navigate("/login");
    }
  }

  return (
    <>
      {!isLoading && <Box p={5} mx="auto" w={["95%", "85%", "75%"]} bg="white" borderRadius="md" boxShadow="md">
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
                  {basic.advProfile ? <CheckCircleIcon color="green.500" /> : <CloseIcon color="red.500" />}
                </Td>
                <Td>
                  {advanced.advProfile ? <CheckCircleIcon color="green.500" /> : <CloseIcon color="red.500" />}
                </Td>
                <Td>
                  {pro.advProfile ? <CheckCircleIcon color="green.500" /> : <CloseIcon color="red.500" />}
                </Td>
              </Tr>
              <Tr>
                <Td>Vet history</Td>
                <Td>
                  {basic.vetHistory ? <CheckCircleIcon color="green.500" /> : <CloseIcon color="red.500" />}
                </Td>
                <Td>
                  {advanced.vetHistory ? <CheckCircleIcon color="green.500" /> :<CloseIcon color="red.500" />}
                </Td>
                <Td>
                  {pro.vetHistory ? <CheckCircleIcon color="green.500" /> : <CloseIcon color="red.500" />}
                </Td>
              </Tr>
              <Tr>
                <Td>Adoption system</Td>
                <Td>
                  {basic.adoptionSys ? <CheckCircleIcon color="green.500" /> : <CloseIcon color="red.500" />}
                </Td>
                <Td>
                  {advanced.adoptionSys ? <CheckCircleIcon color="green.500" /> : <CloseIcon color="red.500" />}
                </Td>
                <Td>
                  {pro.adoptionSys ? <CheckCircleIcon color="green.500" /> : <CloseIcon color="red.500" />}
                </Td>
              </Tr>
              <Tr>
                <Td>Pet hotel</Td>
                <Td>
                  {basic.petHostel ? <CheckCircleIcon color="green.500" /> : <CloseIcon color="red.500" />}
                </Td>
                <Td>
                  {advanced.petHostel ? <CheckCircleIcon color="green.500" /> : <CloseIcon color="red.500" />}
                </Td>
                <Td>
                  {pro.petHostel ? <CheckCircleIcon color="green.500" /> : <CloseIcon color="red.500" />}
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
                  {basic.veterinarySpecialities.join(", ")}
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
                <Td>
                  { user.pricingType === basic.type ? "Current plan" : 
                  <Button colorScheme="blue" boxShadow="md" onClick={() => updateUserPricing(PricingType.BASIC)} >Join it</Button> }
                </Td>
                <Td>
                  { user.pricingType === advanced.type ? "Current plan" :
                  <Button colorScheme="blue" boxShadow="md" onClick={() => updateUserPricing(PricingType.ADVANCED)}>Join it</Button> }
                </Td>
                <Td>
                  { user.pricingType === pro.type ? "Current plan" :
                  <Button colorScheme="blue" boxShadow="md" onClick={() => updateUserPricing(PricingType.PRO)}>Join it</Button> }
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>}
    </>
  );
}