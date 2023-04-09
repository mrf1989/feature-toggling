import { Box, Button, FormControl, Input, VStack, Text } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRecoilState } from "recoil";
import { pricingState, userState, routesState, pricingPlanState } from "../state";
import { useNavigate } from "react-router-dom";
import FeatureRetriever from "../lib/FeatureRetriever";
import { Person } from "../models/PersonType";

export default function Login() {
  const navigate = useNavigate();
  const [pricing, setPricing] = useRecoilState(pricingState);
  const [routes, setRoutes] = useRecoilState(routesState);
  const [user, setUser] = useRecoilState(userState);
  const [pricingPlan, setPricingPlan] = useRecoilState(pricingPlanState);
  
  function handleLogin(values: any) {
    axios.post("/api/user/login", {
      username: values.username,
      password: values.password
    })
    .then(async response => {
      const featureRetriever = new FeatureRetriever(response.data as Person);
      const features = await featureRetriever.resolve();
      const routes = await featureRetriever.routes();
      const pricing = await featureRetriever.getPricing();
      localStorage.setItem("user", JSON.stringify(user));
      setPricing(features);
      setPricingPlan(pricing);
      setRoutes(routes);
      setUser(response.data as Person);
      navigate("/");
    })
    .catch(() => {
      console.error("Login Error!");
    })
  }

  return(
    <Box
      p={5}
      mx="auto"
      w={["80%", "60%", "35%"]}
      bg="white"
      borderRadius="md"
      display="flex"
      flexDirection="column"
      boxShadow="md"
      alignItems="center">
      <Text fontSize={24} fontWeight="bold" mb={8}>Login access</Text>
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        onSubmit={handleLogin}>
        {({
          values,
          handleChange
        }) => (
          <Form style={{ width: "100%" }}>
            <VStack w="100%" spacing="30px">
              <FormControl variant="filled">
                <Input
                  bg="white"
                  name="username"
                  onChange={handleChange}
                  placeholder="Username"
                />
              </FormControl>
              <FormControl variant="filled">
                <Input
                  type="password"
                  bg="white"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                />
              </FormControl>
              <Button colorScheme="blue" boxShadow="md" type="submit">Login</Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}