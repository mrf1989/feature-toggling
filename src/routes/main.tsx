import { Box, Button, Hide, HStack, IconButton, Image, Link, ListItem, Menu, MenuButton, MenuItem, MenuList, Show, Text, UnorderedList } from "@chakra-ui/react";
import { Outlet, Link as ReactLink, useNavigate } from "react-router-dom";
import { FeatureToogle } from "../lib/FeatureToggle";
import { On } from "../lib/On";
import { userState, pricingState, routesState } from "../state";
import { useRecoilState } from "recoil";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Main() {
  const navigate = useNavigate();
  const [pricing, setPricing] = useRecoilState(pricingState);
  const [routes, setRoutes] = useRecoilState(routesState);
  const [user, setUser] = useRecoilState(userState);
  const authUser = localStorage.getItem("user");
  const userStored = authUser && JSON.parse(authUser);

  function logout() {
    localStorage.removeItem("user");
    setUser({});
    setPricing({});
    setRoutes([]);
    navigate("/");
  }
  
  return (
    <>
      <Box
        display="flex"
        as="header"
        w="100%"
        h="50px"
        justifyContent="space-between"
        bg="#dbffc2"
        boxShadow="0 2px 6px #0003"
        px="50px"
        py="10px"
        position="relative"
      >
        <Box as={ReactLink} alignSelf="center" to="/" display="flex">
          <Image maxW="25%" me={3} src="/media/logo.svg" alt="logo" />
          <Text alignSelf="center">Pet Shop</Text>
        </Box>
        <Show above="md">
          <HStack spacing="20px">
            {
              user.role === "ADMIN" &&
              <Link as={ReactLink} to="admin">Admin Panel</Link>
            }
            <FeatureToogle feature="petHostel">
              <On>
                <Link as={ReactLink} to="/pet/hostel">Pet Hostel</Link>
              </On>
            </FeatureToogle>
            {
              userStored &&
              <>
                <Link as={ReactLink} to="/me">Profile</Link>
                <Button size="sm" boxShadow="md" onClick={logout}>Logout</Button>
              </>
            }
            {
              !userStored &&
              <Link as={ReactLink} to="/login">Login</Link>
            }
          </HStack>
        </Show>
        <Hide above="md">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
              alignSelf="center"
            />
            <MenuList>
              {
                userStored &&
                <Link as={ReactLink} to="/me"><MenuItem>Profile</MenuItem></Link>
              }
              <FeatureToogle feature="petHostel">
                <On>
                  <Link as={ReactLink} to="/pet/hostel"><MenuItem>Pet Hostel</MenuItem></Link>
                </On>
              </FeatureToogle>
              {
                user.role === "ADMIN" &&
                <Link as={ReactLink} to="admin"><MenuItem>Admin Panel</MenuItem></Link>
              }
              {
                userStored &&
                <Link as="a" onClick={logout}><MenuItem>Logout</MenuItem></Link>
              }
              {
                !userStored &&
                <Link as={ReactLink} to="/login"><MenuItem>Login</MenuItem></Link>
              }
            </MenuList>
          </Menu>
        </Hide>
      </Box>
      <Box as="main" bg="#eee" minH="calc(100vh - 50px)" py="50px">
        <Outlet />
      </Box>
      <Box textColor="gray.100" as="footer" bg="gray.800" minH="calc(40vh - 50px)" >
        <Box mx="auto" py={10} display={{ base: "block", md: "flex" }} w={["90%", "75%"]} justifyContent="space-between">
            <Box minW="20%">
              <UnorderedList textAlign={{ base: "center", md: "start" }} styleType="none">
                <ListItem pb={2}><Link as={ReactLink} to="#">About us</Link></ListItem>
                <ListItem pb={2}><Link as={ReactLink} to="#">Pricing</Link></ListItem>
                <ListItem pb={2}><Link as={ReactLink} to="#">Contact</Link></ListItem>
              </UnorderedList>
            </Box>
            <Box minW="20%" mb={6}>
              <UnorderedList textAlign={{ base: "center", md: "start" }} styleType="none">
                {
                  userStored &&
                  <ListItem pb={2}><Link as={ReactLink} to="/me">Profile</Link></ListItem>
                }
                <FeatureToogle feature="petHostel">
                  <On>
                    <ListItem pb={2}><Link as={ReactLink} to="/pet/hostel">Pet Hostel</Link></ListItem>
                  </On>
                </FeatureToogle>
                {
                  user.role === "ADMIN" &&
                  <ListItem pb={2}><Link as={ReactLink} to="admin">Admin Panel</Link></ListItem>
                }
              </UnorderedList>
            </Box>
            <Box display={{ base: "block", md: "flex" }} justifyContent="end">
              <Box display="flex" flexDirection="column" alignItems={{ base: "center", md: "end" }}>
                <Image
                src="media/logo_footer.png"
                maxW="35%" />
                <Text fontSize={18} fontWeight="semibold">Pet Clinic, Inc.</Text>
              </Box>
              <Box ms={4} maxW={{ base: "100%", md: "30%" }}>
                <Text textAlign={{ base: "center", md: "start" }} fontSize={14}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nobis debitis sunt soluta doloribus. Nemo quod impedit dolor optio, quos hic, quaerat, eos officiis in et iusto explicabo perferendis eius!</Text>
              </Box>
            </Box>
        </Box>
        <Box py={6}>
          <Text textAlign="center">&copy; 2023. Trabajo Fin de Máster</Text>
        </Box>
      </Box>
    </>
  );
}