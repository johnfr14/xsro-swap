import { useContext } from "react";
import { Web3Context } from "web3-hooks";

import {
  Alert,
  AlertIcon,
  Stack,
  Heading,
  Button,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const MetaMaskInstalled = () => {
  const [web3State, login] = useContext(Web3Context);

  return (
    <Box
      maxW="7xl"
      mx={"auto"}
      pt={5}
      px={{ base: 2, sm: 12, md: 17 }}
      py={4}
      rounded="lg"
      shadow="lg"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Stack spacing={3} alignItems="center">
        <Heading>Connexion MetaMask</Heading>

        <Text textAlign="center" fontWeight="bold">
          MetaMask
        </Text>
        {!web3State.isMetaMask && (
          <>
            <Alert
              status="error"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="50"
            >
              <AlertIcon />
              No-Installed
            </Alert>
          </>
        )}
        {web3State.isMetaMask && (
          <>
            <Alert
              status="success"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="50"
            >
              <AlertIcon />
              Success
            </Alert>
          </>
        )}
        <Text textAlign="center" fontWeight="bold">
          Web3
        </Text>
        {!web3State.isWeb3 && (
          <>
            <Alert
              status="error"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="50"
            >
              <AlertIcon />
              No-Injected
            </Alert>
          </>
        )}
        {web3State.isWeb3 && (
          <>
            <Alert
              status="success"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="50"
            >
              <AlertIcon />
              Injected
            </Alert>
          </>
        )}
        <Text textAlign="center" fontWeight="bold">
          Logged
        </Text>
        {web3State.isLogged && (
          <>
            <Alert
              status="success"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="50"
            >
              <AlertIcon />
              Connected
            </Alert>
          </>
        )}
        {!web3State.isLogged && (
          <>
            <Alert
              status="warning"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="50"
            >
              <AlertIcon />
              Not connected
            </Alert>
            <Text textAlign="center" fontWeight="bold">
              Please connect your Wallet
            </Text>
            <Button
              mb={6}
              colorScheme="teal"
              onClick={login}
              borderRadius="50"
              height="48px"
              width="200px"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              Connect
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default MetaMaskInstalled;
