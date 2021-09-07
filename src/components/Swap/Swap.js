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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

const Swap = () => {
  const [web3State, login] = useContext(Web3Context);
  // contracts & xSRO balance
  const swap = useContract(SwapAddress, SwapAbi);
  const xsro = useContract(xSROAddress, xSROAbi);
  const [userBalance, setUserBalance] = useState();
  const [rate, setRate] = useState();
  const toast = useToast();

  const {
    isOpen: isOpenWrongNetworkModal,
    onOpen: onOpenWrongNetworkModal,
    onClose: onCloseWrongNetworkModal,
  } = useDisclosure();

  let balanceEth = web3State.balance;
  let balanceXsro = userBalance;
  let balanceRoundedEth = Math.round(balanceEth * 100) / 100;
  let balanceRoundedXsro = Math.round(balanceXsro * 100) / 100;

  // uncontrolled
  const [amount, setAmount] = useState();
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * rate;
  } else {
    toAmount = amount;
    fromAmount = amount / rate;
  }

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  let chainId = web3State.chainId === 4;

  // swap
  const handleSwapToken = async () => {
    const amount = document.getElementById("swap").value;
    const EtherAmount = ethers.utils.parseEther(amount.toString());
    try {
      const tx = await swap.swapTokens({
        value: EtherAmount,
      });
      await tx.wait();
    } catch (e) {
      toast({
        title: `${e.message}`,
        status: "error",
        isClosable: true,
      });
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
          setUserBalance(ethers.utils.formatEther(balance));
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

  // event listen setRate

  return (
    <>
      <Modal
        isOpen={isOpenWrongNetworkModal}
        onClose={onCloseWrongNetworkModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Wrong Network</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="5">
            Please connect to the appropriate Rinkeby network.
          </ModalBody>
        </ModalContent>
      </Modal>
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
                  name="inputIN"
                  type="number"
                  placeholder="0.0"
                  mr="5px"
                  fontSize="2xl"
                  fontWeight="bold"
                  color={useColorModeValue("gray.900", "white")}
                  value={fromAmount}
                  onChange={handleFromAmountChange}
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
                      Solde : {balanceRoundedEth} ETH
                    </Text>
                    <Button colorScheme="yellow" size="xs">
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
                  name="inputOUT"
                  type="number"
                  placeholder="0.0"
                  mr="5px"
                  fontSize="2xl"
                  fontWeight="bold"
                  color={useColorModeValue("gray.900", "white")}
                  value={toAmount}
                  onChange={handleToAmountChange}
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
                      Solde : {balanceRoundedXsro} XSRO
                    </Text>
                  </Center>
                </Flex>
              </>
            )}
          </Box>

          <Box>
            {web3State.isLogged && chainId ? (
              <Button
                mt={6}
                colorScheme="yellow"
                onClick={handleSwapToken}
                borderRadius="5"
                height="48px"
                width="100%"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                Swap
              </Button>
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
                onClick={chainId ? login : onOpenWrongNetworkModal}
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
