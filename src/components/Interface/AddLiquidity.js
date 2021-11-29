import { useContext, useState, useEffect } from "react";
import { WETH } from "@uniswap/sdk";
import { TokensList } from "../../contracts/Tokens";
import { Web3Context } from "web3-hooks";
import { useContracts } from "../../context/ContractContext";
import { useForm } from "react-hook-form";
import { SearchIcon } from '@chakra-ui/icons'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import {
  Stack,
  Button,
  Box,
  Text,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftAddon,
  Flex,
  Center,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

const AddLiquidity = () => {
  const [web3State, login] = useContext(Web3Context);
  const { router, factory } = useContracts();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const toast = useToast();
  const [tokens, setTokens] = useState({token0: WETH[4], token1: null})
  console.log(TokensList[0].symbol)

  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclosure();


  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
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

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior={'inside'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tokens list</ModalHeader>
          <ModalBody>
            <InputGroup>
              <InputLeftAddon><SearchIcon/></InputLeftAddon>
              <Input placeholder='search tokens' size='md' {...register("search")}/>
            </InputGroup>
            {TokensList.map(el => {
              return (
              <Box _hover={{ boxShadow: 'dark-lg', color: "yellow.500" }} my={5} rounded='md'>
                <Button width='100%' boxShadow='Dark-lg' borderColor='gray.200'>{el.symbol}</Button>
              </Box>
              )
            })
          }
          </ModalBody>
          <ModalCloseButton />
            <Button onClick={onClose}>Close</Button>
        </ModalContent>
      </Modal>


      <Box>
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
              Token 1
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
                  // value={amount.from}
                  // onChange={handleChange}
                  id="swap"
                  required
                  {...register("token0")}
                />
                <Button
                  color={useColorModeValue("gray.900", "white")}
                  size="sm"
                  onClick={onOpen}
                >
                  {tokens.token0.symbol}
                </Button>
              </Flex>
            </Stack>
            {web3State.isLogged && (
              <>
                <Flex>
                  <Center>
                    <Button
                      // onClick={handleMaxButton}
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
              Token2
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
                  // value={amount.to}
                  // onChange={handleChange}
                  required
                  {...register("token1")}
                />
                <Button
                  color={useColorModeValue("gray.900", "white")}
                  size="sm"
                  onClick={onOpen}
                >
                  {tokens.token1 ? tokens.token1.name : 'Select a token' }
                </Button>
              </Flex>
            </Stack>
            {web3State.isLogged && (
              <>
                <Flex>
                  <Center>
        
                  </Center>
                </Flex>
              </>
            )}
          </Box>

          <Box>
            {web3State.isLogged && web3State.chainId ? (
              <Button
                mt={6}
                // isLoading={transactionLoading}
                loadingText="In process"
                // colorScheme={amount.from > 0 ? "yellow" : ""}
                // color={!amount.from > 0 ? "white" : "black"}
                // onClick={onOpen}
                borderRadius="5"
                height="48px"
                width="100%"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                // disabled={!(amount.from > 0)}
              >
                {/* {amount.from > 0 ? "Swap" : "Enter an amount"} */}
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
                onClick={web3State.chainId ? login : ''}
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

export default AddLiquidity;
