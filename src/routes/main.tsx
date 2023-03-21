import { Box, HStack, Image } from "@chakra-ui/react";
import { Outlet, Link } from "react-router-dom";
import { FeatureToogle } from "../lib/FeatureToggle";
import { On } from "../lib/On";
import { userState } from "../state";
import { useRecoilValue } from "recoil";

export default function Main() {
  const user = useRecoilValue(userState);
  
  return (
    <>
      <HStack
        as="header"
        w="100%"
        h="50px"
        justify="space-between"
        bg="#dbffc2"
        boxShadow="0 2px 6px #0003"
        px="50px"
        py="10px"
        position="relative"
      >
        <HStack h="100%">
          <Image h="100%" src="/media/logo.svg" alt="logo" />
          <h1>Pet Shop</h1>
        </HStack>
        <HStack spacing="20px">
          <Link to="/">Home</Link>
          <FeatureToogle feature="petHostel">
            <On>
              <Link to="/pet/hostel">Pet Hostel</Link>
            </On>
          </FeatureToogle>
          {
            user.role === "ADMIN" &&
            <Link to="admin">Admin Panel</Link>
          }
          <Link to="/login">Login</Link>
        </HStack>
      </HStack>
      <main>
        <Box bg="#eee" minH="calc(100vh - 50px)" py="50px">
          <Outlet />
        </Box>
      </main>
    </>
  );
}
