import { useState } from "react";
import { ethers } from "ethers";
import {
  Flex,
  chakra,
  Button,
  Box,
  Stack,
  useColorModeValue,
  Input,
  useToast,
} from "@chakra-ui/react";

const OwnerOptions = ({ faucet, setAmount }) => {
  const [transferAmount, setTransferAmount] = useState();
  const [delay, setDelay] = useState();
  const toast = useToast();

  const handleSetTransferAmount = async () => {
    const newAmount = ethers.utils.parseEther(transferAmount);
    try {
      const tx = await faucet.setTransferAmount(newAmount);
      await tx.wait();
      const combien = await faucet.transferAmount();
      setAmount(combien.toString());
    } catch (e) {
      toast({
        title: `${e.message}`,
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleSetDelay = async () => {
    try {
      const tx = await faucet.setDelay(delay);
      await tx.wait();
      toast({
        title: `Delay changed`,
        position: "top",
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: `${e.message}`,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex p={5} alignItems="center" justifyContent="center">
        <Box
          mx="auto"
          px={8}
          py={4}
          rounded="lg"
          shadow="lg"
          bg={useColorModeValue("gray.100", "gray.900")}
          maxW="2xl"
          w="400px"
        >
          <Box mt={2}>
            <chakra.h2
              fontSize="lg"
              fontWeight="bold"
              mt={2}
              color={useColorModeValue("gray.800", "white")}
            >
              Owner Option
            </chakra.h2>
            <Stack spacing={3}>
              <chakra.h3 mt={2} color={useColorModeValue("gray.800", "white")}>
                Change the transfer amount
              </chakra.h3>
              <Box>
                <Input
                  variant="flushed"
                  placeholder="Amount"
                  type="number"
                  onChange={(e) => setTransferAmount(e.target.value)}
                />

                <Button
                  colorScheme="teal"
                  size="md"
                  mt="5"
                  mb="10"
                  isDisabled={!transferAmount}
                  onClick={handleSetTransferAmount}
                >
                  Change Amount
                </Button>
              </Box>
              <Box>
                <chakra.h3
                  mt={2}
                  color={useColorModeValue("gray.800", "white")}
                >
                  Change the delay to hours
                </chakra.h3>
                <Input
                  variant="flushed"
                  placeholder="Delay"
                  type="number"
                  min="1"
                  onChange={(e) => setDelay(e.target.value)}
                />

                <Button
                  colorScheme="teal"
                  size="md"
                  mt="5"
                  mb="10"
                  isDisabled={!delay}
                  onClick={handleSetDelay}
                >
                  Change Delay
                </Button>
                <p>Current Delay : 3 days</p>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default OwnerOptions;
