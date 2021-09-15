import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

import {
  Flex,
  Stack,
  Input,
  Button,
  Box,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

function MetaMaskTransfer({ bluetoken }) {
  const [address, setAddress] = useState("0x");
  const [eth2Send, setEth2Send] = useState("0");
  const [addressFrom, setAddressFrom] = useState("0x");
  const [addressTo, setAddressTo] = useState("0x");
  const [eth2SendFrom, setEth2SendFrom] = useState("0");
  const [approveAddress, setApproveAddress] = useState("0x");
  const [approveAmount, setApproveAmount] = useState("0");
  const [allowanceFrom, setAllowanceFrom] = useState("0x");
  const [allowanceTo, setAllowanceTo] = useState("0x");
  const [allowanceAmount, setAllowanceAmount] = useState("0");
  const toast = useToast();
  const [btnLoadingTransfer, setBtnLoadingTransfer] = useState(false);
  const [btnLoadingTransferFrom, setBtnLoadingTransferFrom] = useState(false);
  const [btnLoadingApprove, setBtnLoadingApprove] = useState(false);

  const handleClickSend = async () => {
    setBtnLoadingTransfer(true);
    const weiAmount = ethers.utils.parseEther(eth2Send);
    try {
      const tx = await bluetoken.transfer(address, weiAmount);
      await tx.wait();
      toast({
        title: `Transfer Done bg`,
        status: "success",
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: `${e.message}`,
        status: "error",
        isClosable: true,
      });
    } finally {
      setBtnLoadingTransfer(false);
    }
  };

  const handleClickSendFrom = async () => {
    setBtnLoadingTransferFrom(true);
    const weiAmount = ethers.utils.parseEther(eth2SendFrom);
    try {
      const tx = await bluetoken.transferFrom(
        addressFrom,
        addressTo,
        weiAmount
      );
      await tx.wait();
      toast({
        title: `Nice TransferFrom`,
        status: "success",
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: `${e.message}`,
        status: "error",
        isClosable: true,
      });
    } finally {
      setBtnLoadingTransferFrom(false);
    }
  };

  const handleApprove = async () => {
    setBtnLoadingApprove(true);
    const weiAmount = ethers.utils.parseEther(approveAmount);
    try {
      const tx = await bluetoken.approve(approveAddress, weiAmount);
      await tx.wait();
      toast({
        title: "Approved wonderfully",
        status: "success",
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: `${e.message}`,
        status: "error",
        isClosable: true,
      });
    } finally {
      setBtnLoadingApprove(false);
    }
  };

  const handleAllowance = async () => {
    try {
      const allowance = await bluetoken.allowance(allowanceFrom, allowanceTo);
      setAllowanceAmount(ethers.utils.formatEther(allowance));
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
              Transfer
            </chakra.h2>
            <Stack spacing={3}>
              <Box mt={5}>
                <Box>
                  <p>Choose destination address</p>
                  <div>
                    <label htmlFor="chooseAddress">{null}</label>

                    <Input
                      variant="flushed"
                      placeholder="Ethereum Address"
                      id="chooseAddress"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </div>
                </Box>
                <Box mt={5}>
                  <p>Choose amount to transfer</p>
                  <Stack spacing={3}>
                    <Input
                      variant="flushed"
                      id="eth2Send"
                      type="number"
                      value={eth2Send}
                      onChange={(event) => setEth2Send(event.target.value)}
                    />
                  </Stack>
                  <Button
                    isLoading={btnLoadingTransfer}
                    loadingText="In process"
                    spinnerPlacement="start"
                    colorScheme="teal"
                    size="md"
                    mt="5"
                    onClick={handleClickSend}
                  >
                    send
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
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
              TransferFrom
            </chakra.h2>
            <Stack spacing={3}>
              <Box mt={5}>
                <Box>
                  <p>Choose sender address</p>
                  <div>
                    <label htmlFor="senderAddress">{null}</label>

                    <Input
                      variant="flushed"
                      placeholder="Ethereum Address"
                      id="allowanceAddress"
                      value={addressFrom}
                      onChange={(event) => setAddressFrom(event.target.value)}
                    />
                  </div>
                </Box>
                <Box mt={5}>
                  <p>Choose destination address</p>
                  <div>
                    <label htmlFor="destinationAddress">{null}</label>

                    <Input
                      variant="flushed"
                      placeholder="Ethereum Address"
                      id="destinationAddress"
                      value={addressTo}
                      onChange={(event) => setAddressTo(event.target.value)}
                    />
                  </div>
                </Box>
                <Box mt={5}>
                  <p>Choose amount to transfer</p>
                  <Stack spacing={3}>
                    <Input
                      variant="flushed"
                      id="eth2Send"
                      type="number"
                      value={eth2SendFrom}
                      onChange={(event) => setEth2SendFrom(event.target.value)}
                    />
                  </Stack>
                  <Button
                    isLoading={btnLoadingTransferFrom}
                    loadingText="In process"
                    spinnerPlacement="start"
                    colorScheme="teal"
                    size="md"
                    mt="5"
                    onClick={handleClickSendFrom}
                  >
                    send
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Flex>
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
              Approve
            </chakra.h2>
            <Stack spacing={3}>
              <Box mt={5}>
                <Box>
                  <p>Choose destination address</p>
                  <div>
                    <label htmlFor="approveAddress">{null}</label>

                    <Input
                      variant="flushed"
                      placeholder="Ethereum Address"
                      id="approveAddress"
                      value={approveAddress}
                      onChange={(event) =>
                        setApproveAddress(event.target.value)
                      }
                    />
                  </div>
                </Box>
                <Box mt={5}>
                  <p>Choose Approve to transfer</p>
                  <Stack spacing={3}>
                    <Input
                      variant="flushed"
                      id="eth2Send"
                      type="number"
                      value={approveAmount}
                      onChange={(event) => setApproveAmount(event.target.value)}
                    />
                  </Stack>
                  <Button
                    isLoading={btnLoadingApprove}
                    loadingText="In process"
                    spinnerPlacement="start"
                    colorScheme="teal"
                    size="md"
                    mt="5"
                    onClick={handleApprove}
                  >
                    send Approve
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
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
              Allowance
            </chakra.h2>
            <Stack spacing={3}>
              <Box mt={5}>
                <Box>
                  <p>Choose Allowance address</p>
                  <div>
                    <label htmlFor="allowanceAddress">{null}</label>

                    <Input
                      variant="flushed"
                      placeholder="Ethereum Address"
                      id="allowanceFrom"
                      value={allowanceFrom}
                      onChange={(event) => setAllowanceFrom(event.target.value)}
                    />
                  </div>
                </Box>
                <Box mt={5}>
                  <p>Choose Allowance address</p>
                  <div>
                    <label htmlFor="allowanceAddress">{null}</label>

                    <Input
                      variant="flushed"
                      placeholder="Ethereum Address"
                      id="allowanceTo"
                      value={allowanceTo}
                      onChange={(event) => setAllowanceTo(event.target.value)}
                    />
                  </div>
                </Box>
                <Box mt={5}>
                  <Button
                    colorScheme="teal"
                    size="md"
                    mt="5"
                    onClick={handleAllowance}
                  >
                    Get Allowance
                  </Button>
                </Box>
                <Box mt={5}>
                  <chakra.h2
                    fontSize="lg"
                    fontWeight="bold"
                    mt={2}
                    color={useColorModeValue("gray.800", "white")}
                  >
                    Allowance
                  </chakra.h2>
                  <p>{allowanceAmount} BTKn</p>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default MetaMaskTransfer;
