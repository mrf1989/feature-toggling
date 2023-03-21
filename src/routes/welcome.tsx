import { Heading, Text } from "@chakra-ui/react";
import { userState } from "../state";
import { useRecoilValue } from "recoil";

export default function Welcome() {
  const user = useRecoilValue(userState);
  return (
    <>
      <Heading mb="10px">Welcome to Pet Shop{user.username && `, ${user.username}!`}</Heading>
      <Text mb="20px">Simple featurized Pet Shop app using ReactJS</Text>
    </>
  );
}
