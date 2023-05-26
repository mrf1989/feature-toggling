import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Text, UnorderedList, IconButton } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { FeatureContext } from "../..";
import { Link as ReactLink } from "react-router-dom";

export default function Dates() {
  const featureContext = useContext(FeatureContext);
  const [user, setUser] = useState(featureContext.getUser());
  const [dates, setDates] = useState([]);

  useEffect(() => {
    function fetchDates() {
      fetch(`/api/vet/customer/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setDates(data);
        }).catch(error => {
          console.log(error);
        });
    }
    fetchDates();
  }, [user]);

  return (
    <>
      <Box p={5} mx="auto" w={["95%", "85%", "75%"]} bg="white" borderRadius="md" boxShadow="md">
        <Box display="flex" justifyContent="space-between">
          <Text fontSize={32} mb={5}>My Vet Dates</Text>
          <IconButton as={ReactLink} to="/me" size="md" aria-label="Go back" colorScheme="blue" icon={<ArrowBackIcon />} boxShadow="md" />
        </Box>
        <Box>
          {dates.map((date: any) => (
            <Box key={date.id} p={5} mb={5} bg="gray.100" borderRadius="md">
              <UnorderedList>
                {
                  date.dates.map((d: any) => (
                    <li key={d.id}>{d.date}</li>
                  ))
                }
              </UnorderedList>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}