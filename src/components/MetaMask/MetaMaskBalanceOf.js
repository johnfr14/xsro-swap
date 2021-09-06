import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

import { Stack, Input, Button, Box } from "@chakra-ui/react";
import { Flex, useColorModeValue, chakra, useToast } from "@chakra-ui/react";

function MetaMaskBalanceOf({ bluetoken }) {
  const [ethBalance, setEthBalance] = useState(0);
  const [address, setAddress] = useState();
  const toast = useToast();

  const handleClickGetBalance = async () => {
    try {
      const balance = await bluetoken.balanceOf(address);
      setEthBalance(ethers.utils.formatEther(balance));
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
              BalanceOf
            </chakra.h2>

            <Stack spacing={3}>
              <Input
                variant="flushed"
                placeholder="Ethereum Address"
                id="balanceOf"
                onChange={(event) => setAddress(event.target.value)}
              />

              <Button
                colorScheme="teal"
                size="md"
                mt="5"
                mb="10"
                onClick={handleClickGetBalance}
              >
                Get Balance
              </Button>
              <chakra.h2
                fontSize="lg"
                fontWeight="bold"
                mt={2}
                color={useColorModeValue("gray.800", "white")}
              >
                Address
              </chakra.h2>

              <p className="balance-w3Address">{address}</p>
              <chakra.h2
                fontSize="lg"
                fontWeight="bold"
                mt={2}
                color={useColorModeValue("gray.800", "white")}
              >
                Balance
              </chakra.h2>
              <p className="balance-w3EthBalance">{ethBalance} BTKn</p>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default MetaMaskBalanceOf;
