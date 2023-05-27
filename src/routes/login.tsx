import { Box, Button, FormControl, Input, VStack, Text } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { User } from "../models/UserType";
import { useContext } from "react";
import { AppContext } from "..";

export default function Login() {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  
  function handleLogin(values: any) {
    axios.post("/api/user/login", {
      username: values.username,
      password: values.password
    })
    .then(async response => {
      const user = response.data as User;
      appContext.updateInstance(user.id, user.pricingType)
        .then(() => {
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/me");
        })
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