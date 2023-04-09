import { Box, Heading, Text } from "@chakra-ui/react";
import { userState } from "../state";
import { useRecoilValue } from "recoil";

export default function Welcome() {
  const user = useRecoilValue(userState);
  return (
    <>
      <Heading mb="10px" textAlign="center">Welcome to Pet Clinic{user.username && `, ${user.username}!`}</Heading>
      <Text mb="20px" align="center">Simple featurized Pet Clinic app using ReactJS</Text>
      <Box
        mt={10}
        backgroundImage="url('https://www.wealthmanagement.com/sites/wealthmanagement.com/files/styles/article_featured_retina/public/veterinary-clinic.jpg?itok=F4svyoEZ')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat" 
        minH="calc(50vh - 100px)">
      </Box>
    </>
  );
}
