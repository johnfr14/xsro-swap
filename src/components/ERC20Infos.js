import React from "react";
import { Flex, Stack, Box, chakra } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

function ERC20Infos({ tokenName, tokenSymbol, tokenTotalSupply, userBalance }) {
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
              ERC20 Infos
            </chakra.h2>
            <Stack spacing={3}>
              <Box mt={5}>
                <p>Name Token : {tokenName}</p>
                <p>Symbol Token : {tokenSymbol}</p>
                <p>
                  Your Balance : {userBalance} {tokenSymbol}
                </p>
                <p>
                  Total Supply : {tokenTotalSupply} {tokenSymbol}
                </p>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default ERC20Infos;
