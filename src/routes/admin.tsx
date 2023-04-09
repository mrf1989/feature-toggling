import {
  Box,
  Text,
  Textarea,
  Switch,
  useToast,
  NumberInput, NumberInputField, NumberIncrementStepper, NumberInputStepper, NumberDecrementStepper,
  TableContainer, Table,Thead, Tr, Th, Tbody, Td, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PricingPlan } from "../models/PricingPlan";

export default function Admin() {
  const [basic, setBasic] = useState({} as PricingPlan);
  const [advanced, setAdvanced] = useState({} as PricingPlan);
  const [pro, setPro] = useState({} as PricingPlan);
  const toast = useToast(); 

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

  async function savePricing(type: string) {
    let body = undefined;

    switch (type) {
      case "basic":
        body = basic;
        break;
      case "advanced":
        body = advanced;
        break;
      case "pro":
        body = pro;
        break;
    }

    const response = await fetch(`/api/pricing/${type}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      toast({
        title: "Successfully updated",
        description: `${type} pricing`,
        status: "success",
        duration: 9000,
        isClosable: true
      });
    } else {
      toast({
        title: "Error",
        description: "Try again, please",
        status: "error",
        duration: 9000,
        isClosable: true
      })
    }
  }

  function updateAdvProfile(pricingType: string) {
    switch (pricingType) {
      case "basic":
        basic.advProfile = !basic.advProfile;
        break;
      case "advanced":
        advanced.advProfile = !advanced.advProfile;
        break;
      case "pro":
        pro.advProfile = !pro.advProfile;
        break;
    }
  }

  function updateVetHistory(pricingType: string) {
    switch (pricingType) {
      case "basic":
        basic.vetHistory = !basic.vetHistory;
        break;
      case "advanced":
        advanced.vetHistory = !advanced.vetHistory;
        break;
      case "pro":
        pro.vetHistory = !pro.vetHistory;
        break;
    }
  }

  function updateAdoptionSystem(pricingType: string) {
    switch (pricingType) {
      case "basic":
        basic.adoptionSys = !basic.adoptionSys;
        break;
      case "advanced":
        advanced.adoptionSys = !advanced.adoptionSys;
        break;
      case "pro":
        pro.adoptionSys = !pro.adoptionSys;
        break;
    }
  }

  function updatePetHostel(pricingType: string) {
    switch (pricingType) {
      case "basic":
        basic.petHostel = !basic.petHostel;
        break;
      case "advanced":
        advanced.petHostel = !advanced.petHostel;
        break;
      case "pro":
        pro.petHostel = !pro.petHostel;
        break;
    }
  }

  return(
    <>
      <Box p={5} mx="auto" w={["95%", "85%", "75%"]} bg="white" borderRadius="md" boxShadow="md">
        <Text fontSize={32} mb={5}>Admin Pricing Panel</Text>
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
                  {basic.advProfile && <Switch defaultChecked onChange={() => updateAdvProfile("basic")} />}
                  {!basic.advProfile && <Switch onChange={() => updateAdvProfile("basic")} />}
                </Td>
                <Td>
                  {advanced.advProfile && <Switch defaultChecked onChange={() => updateAdvProfile("advanced")} />}
                  {!advanced.advProfile && <Switch onChange={() => updateAdvProfile("advanced")} />}
                </Td>
                <Td>
                  {pro.advProfile && <Switch defaultChecked onChange={() => updateAdvProfile("pro")} />}
                  {!pro.advProfile && <Switch onChange={() => updateAdvProfile("pro")} />}
                </Td>
              </Tr>
              <Tr>
                <Td>Vet history</Td>
                <Td>
                  {basic.vetHistory && <Switch defaultChecked onChange={() => updateVetHistory("basic")} />}
                  {!basic.vetHistory && <Switch />}
                </Td>
                <Td>
                  {advanced.vetHistory && <Switch defaultChecked onChange={() => updateVetHistory("advanced")} />}
                  {!advanced.vetHistory && <Switch onChange={() => updateVetHistory("advanced")} />}
                </Td>
                <Td>
                  {pro.vetHistory && <Switch defaultChecked onChange={() => updateVetHistory("basic")} />}
                  {!pro.vetHistory && <Switch onChange={() => updateVetHistory("pro")} />}
                </Td>
              </Tr>
              <Tr>
                <Td>Adoption system</Td>
                <Td>
                  {basic.adoptionSys && <Switch defaultChecked onChange={() => updateAdoptionSystem("basic")} />}
                  {!basic.adoptionSys && <Switch onChange={() => updateAdoptionSystem("basic")} />}
                </Td>
                <Td>
                  {advanced.adoptionSys && <Switch defaultChecked onChange={() => updateAdoptionSystem("advanced")} />}
                  {!advanced.adoptionSys && <Switch onChange={() => updateAdoptionSystem("advanced")} />}
                </Td>
                <Td>
                  {pro.adoptionSys && <Switch defaultChecked onChange={() => updateAdoptionSystem("pro")} />}
                  {!pro.adoptionSys && <Switch onChange={() => updateAdoptionSystem("pro")} />}
                </Td>
              </Tr>
              <Tr>
                <Td>Pet hotel</Td>
                <Td>
                  {basic.petHostel && <Switch defaultChecked onChange={() => updatePetHostel("basic")} />}
                  {!basic.petHostel && <Switch onChange={() => updatePetHostel("basic")} />}
                </Td>
                <Td>
                  {advanced.petHostel && <Switch defaultChecked onChange={() => updatePetHostel("advanced")} />}
                  {!advanced.petHostel && <Switch onChange={() => updatePetHostel("advanced")} />}
                </Td>
                <Td>
                  {pro.petHostel && <Switch defaultChecked onChange={() => updatePetHostel("pro")} />}
                  {!pro.petHostel && <Switch onChange={() => updatePetHostel("pro")} />}
                </Td>
              </Tr>
              <Tr>
                <Td>Max number of pets</Td>
                <Td>
                  <NumberInput
                    min={-1}
                    maxW={20}
                    value={basic.nPets}
                    onChange={(value) => setBasic({ ...basic, nPets: Number(value)})}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
                <Td>
                  <NumberInput
                    min={-1}
                    maxW={20}
                    value={advanced.nPets}
                    onChange={(value) => setAdvanced({ ...advanced, nPets: Number(value)})}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
                <Td>
                  <NumberInput
                    min={-1}
                    maxW={20}
                    value={pro.nPets}
                    onChange={(value) => setPro({ ...pro, nPets: Number(value)})}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
              </Tr>
              <Tr>
                <Td>Max number of vets</Td>
                <Td>
                  <NumberInput
                    min={-1}
                    maxW={20}
                    value={basic.nVets}
                    onChange={(value) => setBasic({ ...basic, nVets: Number(value)})}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
                <Td>
                  <NumberInput
                    min={-1}
                    maxW={20}
                    value={advanced.nVets}
                    onChange={(value) => setAdvanced({ ...advanced, nVets: Number(value)})}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
                <Td>
                  <NumberInput
                    min={-1}
                    maxW={20}
                    value={pro.nVets}
                    onChange={(value) => setPro({ ...pro, nVets: Number(value)})}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
              </Tr>
              <Tr>
                <Td>Max number of dates</Td>
                <Td>
                  <NumberInput
                    min={-1}
                    maxW={20}
                    value={basic.nDates}
                    onChange={(value) => setBasic({ ...basic, nDates: Number(value)})}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
                <Td>
                  <NumberInput
                    min={-1}
                    maxW={20}
                    value={advanced.nDates}
                    onChange={(value) => setAdvanced({ ...advanced, nDates: Number(value)})}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
                <Td>
                  <NumberInput
                    min={-1}
                    maxW={20}
                    value={pro.nDates}
                    onChange={(value) => setPro({ ...pro, nDates: Number(value)})}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
              </Tr>
              <Tr>
                <Td>Veterinary specialities</Td>
                <Td>
                  <Textarea
                    size="xs"
                    value={basic.veterinarySpecialities}
                    onChange={(e) => setBasic({ ...basic, veterinarySpecialities: e.target.value.split(",") })} />
                </Td>
                <Td>
                  <Textarea
                    size="xs"
                    value={advanced.veterinarySpecialities}
                    onChange={(e) => setAdvanced({ ...advanced, veterinarySpecialities: e.target.value.split(",") })} />
                </Td>
                <Td>
                  <Textarea
                    size="xs"
                    value={pro.veterinarySpecialities}
                    onChange={(e) => setPro({ ...pro, veterinarySpecialities: e.target.value.split(",") })} />
                </Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td><Button colorScheme="blue" boxShadow="md" onClick={() => savePricing("basic")}>Save</Button></Td>
                <Td><Button colorScheme="blue" boxShadow="md" onClick={() => savePricing("advanced")}>Save</Button></Td>
                <Td><Button colorScheme="blue" boxShadow="md" onClick={() => savePricing("pro")}>Save</Button></Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}