import { useState, useEffect, useContext } from "react";
import {
  Flex,
  Heading,
  Button,
  Box,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { HeaderComp as Header, Countdown, OwnerOptions } from "../components";
import { useContract } from "web3-hooks";
import { FaucetAddress, FaucetAbi } from "../contracts/Faucet";
import { ethers } from "ethers";
import { Web3Context } from "web3-hooks";

function FaucetPage() {
  const [web3State] = useContext(Web3Context);
  const faucet = useContract(FaucetAddress, FaucetAbi);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [counter, setCounter] = useState(0);
  const [owner, setOwner] = useState(0);
  const toast = useToast();

  const handleClaimToken = async () => {
    try {
      setBtnLoading(true);
      const tx = await faucet.claimToken();
      await tx.wait();
      const rest = await faucet.timeRest();
      setCounter(Number(rest.toString()));
    } catch (e) {
      toast({
        title: `${e.message}`,
        status: "error",
        isClosable: true,
      });
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    if (faucet) {
      const timeRest = async () => {
        try {
          const rest = await faucet.timeRest();
          const combien = await faucet.transferAmount();
          setCounter(Number(rest.toString()));
          setAmount(combien.toString());
        } catch (e) {
          toast({
            title: `${e.message}`,
            status: "error",
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      };
      timeRest();
    }
  }, [faucet, toast]);

  // owner
  useEffect(() => {
    if (faucet) {
      const owner = async () => {
        try {
          const owner = await faucet.owner();
          setOwner(owner.toLowerCase());
        } catch (e) {
          toast({
            title: `${e.message}`,
            status: "error",
            isClosable: true,
          });
        }
      };
      owner();
    }
  }, [faucet, toast]);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  useEffect(() => {
    if (faucet) {
      const listener = (claimer, amount) => {
        toast({
          title: "Tokens Claimed",
          description: `Claimer: ${claimer}, Amount: ${
            ethers.utils.formatEther(amount).split(".")[0]
          } BTKn to the mooon`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      };
      const filter = faucet.filters.Claimed(web3State.account);
      faucet.on(filter, listener);
      return () => {
        faucet.off(filter, listener);
      };
    }
  }, [faucet, web3State.account, toast]);

  return (
    <>
      <Header />
      <Flex flexDirection="column" alignItems="center" m={4}>
        <Heading
          textAlign="center"
          as="h1"
          size="4xl"
          isTruncated
          p={3}
          marginBottom="10"
        >
          Faucet Page
        </Heading>
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
              <Stack spacing={3}>
                {loading ? (
                  <p>Loading...</p>
                ) : counter === 0 ? (
                  <Button
                    isLoading={btnLoading}
                    loadingText="In process"
                    spinnerPlacement="start"
                    colorScheme="teal"
                    size="lg"
                    onClick={handleClaimToken}
                  >
                    Get {ethers.utils.formatEther(amount).split(".")[0]} BTKn
                  </Button>
                ) : (
                  <Countdown counter={counter} />
                )}
              </Stack>
            </Box>
          </Box>
        </Flex>
        {web3State.account === owner && (
          <OwnerOptions faucet={faucet} setAmount={setAmount} />
        )}
      </Flex>
    </>
  );
}

export default FaucetPage;
