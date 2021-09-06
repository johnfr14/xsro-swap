import { useContext, useState } from "react";
import { Web3Context } from "web3-hooks";

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
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

const Swap = () => {
  const [web3State, login] = useContext(Web3Context);

  const {
    isOpen: isOpenWrongNetworkModal,
    onOpen: onOpenWrongNetworkModal,
    onClose: onCloseWrongNetworkModal,
  } = useDisclosure();

  let balance = web3State.balance;
  let balanceRounded = Math.round(balance * 1000) / 1000;

  const [amount, setAmount] = useState();
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * 10;
  } else {
    toAmount = amount;
    fromAmount = amount / 10;
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
            Please connect to the appropriate Ethereum network.
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
                      Solde : {balanceRounded} ETH
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
                  SRO
                </Button>
              </Flex>
            </Stack>
          </Box>

          <Box>
            {web3State.isLogged && chainId ? (
              <Button
                mt={6}
                colorScheme="yellow"
                onClick={""}
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
