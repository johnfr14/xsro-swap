import { useContext, useState, useEffect } from "react";
import { Web3Context, useContract } from "web3-hooks";
// contracts/ethers
import { SwapAddress, SwapAbi } from "../../contracts/Swap";
import { xSROAddress, xSROAbi } from "../../contracts/xSRO";
import { ethers } from "ethers";

import {
  Stack,
  Button,
  Box,
  Text,
  useColorModeValue,
  Input,
  Flex,
  Center,
  useToast,
  Container,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

const Swap = () => {
  const [web3State, login] = useContext(Web3Context);
  // contracts & xSRO balance
  const swap = useContract(SwapAddress, SwapAbi);
  const xsro = useContract(xSROAddress, xSROAbi);
  const toast = useToast();
  const [userBalance, setUserBalance] = useState({
    roundedXsro: 0,
    roundedEth: 0,
  });
  const [rate, setRate] = useState();
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [amount, setAmount] = useState({ from: 0, to: 0 });
  let chainId = web3State.chainId === 4;


  // uncontrolle
  const handleMaxButton = () => {
    setAmount({ from: web3State.balance, to: web3State.balance * rate });
  };

  const handleChange = (e) => {
    if (e.target.name === "from") {
      setAmount({ from: e.target.value, to: e.target.value * rate });
    } else {
      setAmount({ from: e.target.value / rate, to: e.target.value });
    }
  };

  // swap
  const handleSwapToken = async () => {
    const amount = document.getElementById("swap").value;
    const EtherAmount = ethers.utils.parseEther(amount.toString());
    try {
      setTransactionLoading(true);
      const tx = await swap.swapTokens({
        value: EtherAmount,
      });
      toast({
        title: "Transaction in progress",
        status: "info",
        duration: 10000000000000,
        isClosable: false,
      });
      await tx.wait();
    } catch (e) {
      toast({
        title: `${e.message}`,
        status: "error",
        isClosable: true,
      });
    } finally {
      setTransactionLoading(false);
    }
  };

  // get Rate
  useEffect(() => {
    if (swap) {
      const getInfo = async () => {
        try {
          const rate = await swap.rate();
          setRate(rate.toNumber());
        } catch (e) {
          toast({
            title: `${e.message}`,
            status: "error",
            isClosable: true,
          });
        } finally {
        }
      };
      getInfo();
    }
  }, [swap, toast]);

  // xsro user balance
  useEffect(() => {
    if (xsro) {
      const getInfo = async () => {
        try {
          const balance = await xsro.balanceOf(web3State.account);
          setUserBalance({
            roundedXsro:
              Math.round(ethers.utils.formatEther(balance) * 100) / 100,
            roundedEth: Math.round(web3State.balance * 100) / 100,
          });
        } catch (e) {
          toast({
            title: `${e.message}`,
            status: "error",
            isClosable: true,
          });
        }
      };
      getInfo();
    }
  }, [xsro, web3State.account, web3State.balance, toast]);

  useEffect(() => {
    if (swap) {
      const listener = (swapper, ethAmount, sroAmount) => {
        toast.closeAll();
        toast({
          title: "Tokens Swapped",
          description: `From: ${swapper}, ETH pay: ${ethers.utils.formatEther(
            ethAmount
          )}, xSRO received: ${ethers.utils.formatEther(sroAmount)}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      };
      const filter = swap.filters.Swapped(web3State.account);
      swap.on(filter, listener);
      return () => {
        swap.off(filter, listener);
      };
    }
  }, [swap, web3State.account, toast]);

  return (
    <>
      {userBalance.roundedEth === 0 && <Box maxW='md' borderWidth='1px' borderRadius='lg'>
        <Container p='0.5rem' textAlign={'center'}>
          <p>👇 Don't have ETH ? Get some here 👇</p>
          <Center m={'0.5rem'}>
            <Button as='a' href="https://faucets.chain.link/rinkeby" target='_blank'>Get 0.1 ETH</Button>
          </Center>
          <Text fontWeight={'bold'}>Network: <Text as='i' color={'yellow.300'}>Ethereum rinkeby</Text></Text>  
          <Text fontWeight={'bold'}>Testnet account address: <Text as='i' color={'yellow.300'}>{web3State.account}</Text></Text> 
        </Container>
      </Box>}
      <Box
        maxW="7xl"
        mx={"auto"}
        pt={5}
        px={{ base: 2, sm: 5, md: 17 }}
        py={4}
        mt="50px"
        rounded="lg"
        shadow="lg"
        boxShadow="2xl"
        bg={useColorModeValue("white", "gray.900")}
      >
        <Stack
          spacing={3}
          alignItems="left"
          width={{ base: "100%", md: "400px" }}
        >
          <Box
            p="6"
            rounded="md"
            bg={useColorModeValue("gray.100", "gray.800")}
          >
            <Text mb="2" textAlign="left">
              From
            </Text>
            <Stack spacing="6">
              <Flex color="white">
                <Input
                  variant="unstyled"
                  name="from"
                  type="number"
                  placeholder="0.0"
                  mr="5px"
                  fontSize="2xl"
                  fontWeight="bold"
                  color={useColorModeValue("gray.900", "white")}
                  value={amount.from}
                  onChange={handleChange}
                  id="swap"
                  required
                />
                <Button
                  color={useColorModeValue("gray.900", "white")}
                  size="sm"
                >
                  ETH
                </Button>
              </Flex>
            </Stack>
            {web3State.isLogged && (
              <>
                <Flex>
                  <Center>
                    <Text mr="5px" fontSize="xs">
                      Solde : {userBalance.roundedEth} ETH
                    </Text>
                    <Button
                      onClick={handleMaxButton}
                      colorScheme="yellow"
                      size="xs"
                    >
                      Max
                    </Button>
                  </Center>
                </Flex>
              </>
            )}
          </Box>
          <Box textAlign="center">
            <ArrowDownIcon />
          </Box>

          <Box
            p="6"
            rounded="md"
            bg={useColorModeValue("gray.100", "gray.800")}
          >
            <Text mb="2" textAlign="left">
              To
            </Text>
            <Stack spacing="6">
              <Flex color="white">
                <Input
                  variant="unstyled"
                  name="to"
                  type="number"
                  placeholder="0.0"
                  mr="5px"
                  fontSize="2xl"
                  fontWeight="bold"
                  color={useColorModeValue("gray.900", "white")}
                  value={amount.to}
                  onChange={handleChange}
                  required
                />
                <Button
                  color={useColorModeValue("gray.900", "white")}
                  size="sm"
                >
                  XSRO
                </Button>
              </Flex>
            </Stack>
            {web3State.isLogged && (
              <>
                <Flex>
                  <Center>
                    <Text mr="5px" fontSize="xs">
                      Solde : {userBalance.roundedXsro} XSRO
                    </Text>
                  </Center>
                </Flex>
              </>
            )}
          </Box>

          <Box>
            {web3State.isLogged ? (
              <>
                {chainId ? (
                  <Button
                    mt={6}
                    isLoading={transactionLoading}
                    loadingText="In process"
                    colorScheme={amount.from > 0 ? "yellow" : ""}
                    color={!amount.from > 0 ? "white" : "black"}
                    onClick={handleSwapToken}
                    borderRadius="5"
                    height="48px"
                    width="100%"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    disabled={!(amount.from > 0)}
                  >
                    {amount.from > 0 ? "Swap" : "Enter an amount"}
                  </Button>
                  ) : (
                    <Button
                      mt={6}
                      colorScheme="red"
                      borderRadius="5"
                      height="48px"
                      width="100%"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                    >
                      Connect to Rinkeby
                    </Button>
                  )}
              </>
            ) : (
              <Button
                mt={6}
                colorScheme="gray"
                borderRadius="5"
                height="48px"
                width="100%"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                onClick={ login }
              >
                Connect Wallet
              </Button>
            )}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Swap;
