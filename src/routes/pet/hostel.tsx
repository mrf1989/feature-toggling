import {
  Box, Button, Divider, FormControl, FormHelperText, FormLabel, Heading, HStack, Image, ListItem, Radio,
  RadioGroup, Select, Text, Textarea, UnorderedList
} from "@chakra-ui/react";

export default function PetHostel() {
  return(
    <Box p={5} mx="auto" display={{ base: "block", md: "flex" }} w={["95%", "85%", "75%"]} bg="white" borderRadius="md" boxShadow="md">
      <Box display="flex" w={{ base: "100%", md: "40%" }}>
        <Box alignSelf="start">
          <Box display="flex" justifyContent="center">
            <Image
              w="80%"
              src="https://hawaii.armymwr.com/application/files/8216/0459/7182/GettyImages-157668281.jpg"
              mb={6}/>
          </Box>
          <Heading fontSize={32}>Welcome to<br />Pet Hostel Service</Heading>
          <Text mb={6} fontSize={16} fontWeight="thin">The safe and animal-friendly space for your pets</Text>
        </Box>
      </Box>
      <Box w={{ base: "100%", md: "60%" }}>
        <Box>
          <Text fontSize={24} fontWeight="bold" mb={3}>Your pets in the hostel</Text>
          <UnorderedList>
            <ListItem>Rufus</ListItem>
            <ListItem>Lola</ListItem>
            <ListItem>Talismán</ListItem>
          </UnorderedList>
          <Divider orientation="horizontal" my={5} />
        </Box>
        <Box>
          <Text fontSize={18} fontWeight="bold" mb={2}>Check in for another pet</Text>
          <FormControl mb={3}>
            <FormLabel></FormLabel>
              <Select placeholder="Your pets available">
                <option value="1">Carl</option>
                <option value="2">Mouse</option>
              </Select>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Does your pet have a special diet?</FormLabel>
            <RadioGroup defaultValue='0'>
              <HStack spacing="24px">
                <Radio value='0'>No</Radio>
                <Radio value="1">Yes</Radio>
              </HStack>
            </RadioGroup>
            <FormHelperText>If yes, please provide details in comments</FormHelperText>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Does your pet have any medical treatment?</FormLabel>
            <RadioGroup defaultValue='0'>
              <HStack spacing="24px">
                <Radio value='0'>No</Radio>
                <Radio value="1">Yes</Radio>
              </HStack>
            </RadioGroup>
            <FormHelperText>If yes, please provide details in comments</FormHelperText>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Comments</FormLabel>
            <Textarea size="sm" />
          </FormControl>
          <Button boxShadow="md" colorScheme="teal">Check in</Button>
        </Box>
      </Box>
    </Box>
  );
}