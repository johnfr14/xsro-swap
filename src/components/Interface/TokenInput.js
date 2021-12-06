import { useContext, useEffect, useState, useCallback } from "react";
import { SearchIcon } from '@chakra-ui/icons'
import { Web3Context, useContract } from "web3-hooks";
import { ERC20Abi } from '../../contracts/ERC20'
import { TokensList } from "../../contracts/Tokens";
import { Token } from '@uniswap/sdk'
import { ethers } from "ethers";

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
    Spacer,
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
    Heading,
  } from "@chakra-ui/react";

const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  
const TokenInput = ({ input, setToken, tokens, register }) => {
  const [web3State, login] = useContext(Web3Context);
  const { isOpen, onOpen, onClose} = useDisclosure();
  const [tokenImported, setTokenImported] = useState(null)

  const onClickButton = (e) => {
    setToken({...tokens, [`token${input}`]: e.target.value})
    onClose()
  }

  const onTokenImported = async() => {
    try {
      TokensList.unshift(tokenImported)
      setTokenImported(null)
    } catch (error) {
      console.error(error)
    }
  }
  
  const onChangeSearch = async(e) => {
    try {
      const address = e.target.value
      if(web3.utils.isAddress(address)) {
        const token = new ethers.Contract(address, ERC20Abi, web3State.provider)
        const name = await token.name()
        const symbol = await token.symbol()
        const decimals = await token.decimals()
        const importedToken = new Token(4, address, decimals, symbol, name);
        setTokenImported(importedToken)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={'inside'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tokens list</ModalHeader>
          <ModalBody>
            <InputGroup>
            <InputLeftAddon><SearchIcon/></InputLeftAddon>
            <Input onChange={onChangeSearch} placeholder='search tokens' size='md' />
            </InputGroup>
            {tokenImported !== null ?

              <Flex spacing={8} my={5} rounded='md'>
                <Heading size='md'>{tokenImported.symbol}</Heading>
                <Spacer />
                <Button onClick={onTokenImported} _hover={{ boxShadow: 'dark-lg', color: "yellow.500" }} value={tokenImported.symbol} width='33%' boxShadow='Dark-lg' borderColor='gray.200'>import</Button>
              </Flex>

              :

              TokensList.map((el, idx) => {
                return (
                  <Box key={idx} _hover={{ boxShadow: 'dark-lg', color: "yellow.500" }} my={5} rounded='md'>
                      <Button key={idx} onClick={onClickButton} value={el.symbol} width='100%' boxShadow='Dark-lg' borderColor='gray.200'>{el.symbol}</Button>
                  </Box>
                )
              })
            }
          </ModalBody>
          <ModalFooter>
            <ModalCloseButton />
                <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Box
          p="6"
          rounded="md"
          bg={useColorModeValue("gray.100", "gray.800")}
      >
          <Text mb="2" textAlign="left">
          Token {input}
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
              <Button color={useColorModeValue("gray.900", "white")} size="sm" onClick={onOpen}>
              {input === 0 ? tokens.token0 || 'ETH' : tokens.token1 || 'Select a token' }
              </Button>
          </Flex>
          </Stack>

          {web3State.isLogged && (
            <>
              <Flex>
              <Center>
                  <Button colorScheme="yellow" size="xs"> Max </Button>
              </Center>
              </Flex>
            </>
          )}

      </Box>
    </>
  )
}

export default TokenInput