import { Box, Button, FormControl, Input, VStack } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRecoilState } from "recoil";
import { pricingState, userState } from "../state";
import { useNavigate } from "react-router-dom";
import FeatureRetriever from "../lib/FeatureRetriever";
import { Person } from "../models/PersonType";

export default function Login() {
  const navigate = useNavigate();
  const [pricing, setPricing] = useRecoilState(pricingState);
  const [user, setUser] = useRecoilState(userState);
  
  function handleLogin(values: any) {
    axios.post("/api/user/login", {
      username: values.username,
      password: values.password
    })
    .then(async response => {
      const featureRetriever = new FeatureRetriever(response.data as Person);
      const features = await featureRetriever.resolve();
      setPricing(features);
      setUser(response.data as Person);
      navigate("/");
    })
    .catch(() => {
      console.error("Login Error!");
    })
  }

  return(
    <Box mx="auto" w="60%" display="flex" alignItems="center">
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
              <Button colorScheme="blue" type="submit">Login</Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}