import { Box, Button, FormControl, FormLabel, Select, Text, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../";
import { useNavigate } from "react-router-dom";
import { TogglePoint } from "../../lib/components/TogglePoint";
import { On } from "../../lib/components/On";
import { Off } from "../../lib/components/Off";
import { Role } from "../../models/UserType";

export default function VetForm() {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [toggleRouter, setToggleRouter] = useState(appContext);
  const pricing = toggleRouter.getPricing();
  const [user, setUser] = useState(toggleRouter.getUser());
  const [vets, setVets] = useState([]);

  useEffect(() => {
    async function fetchVets() {
      const response = await fetch("/api/user");
      const data = await response.json();
      const vets = data.filter((user: any) => user.role === Role.VET);
      setVets(vets);
    }
    fetchVets();

    function handleToggleRouterChange() {
      setUser(appContext.getUser());
      setToggleRouter(appContext);
    }

    appContext.subscribe(handleToggleRouterChange);

    return () => {
      appContext.unsubscribe(handleToggleRouterChange);
    };
  }, [appContext, toggleRouter, user]);

  function handleAddVet(values: any) {
    const vetAdscription = {
      vetId: values.vet,
      customerId: user.id,
    };

    fetch("/api/vet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vetAdscription),
    }).then((response) => {
      if (response.ok) {
        appContext.updateUser({ vets: user.vets + 1 });
        navigate("/me");
      }
    }).catch((error) => {
        console.error("Error:", error);
      }
    );
  }

  return (
    <>
      <Box p={5} mx="auto" w={["95%", "85%", "75%"]} bg="white" borderRadius="md" boxShadow="md">
        <Text fontSize={32} mb={5}>Add vet</Text>
        <Formik
          initialValues={{
            vet: "",
            specialty: ""
          }}
          onSubmit={handleAddVet}>
        {({
          values,
          handleChange
        }) => (
          <Form style={{ width: "100%" }}>
            <VStack w="100%" spacing="30px">
              <FormControl id="vet" mb={5}>
                <FormLabel>Vet</FormLabel>
                <Select name="vet" placeholder="Select a vet" onChange={handleChange}>
                  {
                    vets.map((vet: any, index: any) => (
                      <option key={index} value={vet.id}>{vet.name}</option>
                    ))
                  }
                </Select>
              </FormControl>
              <FormControl id="specialty" mb={5}>
                <FormLabel>Specialty</FormLabel>
                <Select name="specialty" placeholder="Select a speciality" onChange={handleChange}>
                  <TogglePoint feature="veterinarySpecialities">
                    <On>
                      <option value="Dogs">Dogs</option>
                      <option value="Cats">Cats</option>
                      <option value="Birds">Birds</option>
                      <option value="Reptiles">Reptiles</option>
                      <option value="Rodents">Rodents</option>
                      <option value="Rabbits">Fishes</option>
                      <option value="Horses">Horses</option>
                      <option value="Ferrets">Others</option>
                    </On>
                    <Off>
                    {
                      pricing.veterinarySpecialities.map((specialty: any, index: any) => (
                        <option key={index} value={specialty}>{specialty}</option>
                      ))
                    }
                    </Off>
                  </TogglePoint>
                </Select>
              </FormControl>  
              <Button colorScheme="blue" type="submit">Add vet</Button>
            </VStack>
          </Form>
        )}
        </Formik>
      </Box>
    </>
  );
}