import { useContext } from "react";
import { Web3Context } from "web3-hooks";

import {
  HStack,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Link,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { SubstrAdress } from "../index";

const MetaMaskInfo = () => {
  const [web3State] = useContext(Web3Context);

  const {
    isOpen: isOpenAdressInfoModal,
    onOpen: onOpenAdressInfoModal,
    onClose: onCloseAdressInfoModal,
  } = useDisclosure();

  const {
    isOpen: isOpenWrongNetworkModal,
    onOpen: onOpenWrongNetworkModal,
    onClose: onCloseWrongNetworkModal,
  } = useDisclosure();

  let balanceEth = web3State.balance;
  let balanceXsro = 0;
  let balanceRoundedEth = Math.round(balanceEth * 100) / 100;
  let balanceRoundedXsro = Math.round(balanceXsro * 100) / 100;

  return (
    <>
      <Modal isOpen={isOpenAdressInfoModal} onClose={onCloseAdressInfoModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Box>{web3State.account}</Box>
              <Link
                href={`https://${
                  web3State.chainId !== 1 ? web3State.networkName + "." : ""
                }etherscan.io/address/${web3State.account}`}
                isExternal
              >
                View on Etherscan <ExternalLinkIcon mx="2px" />
              </Link>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Flex justifyContent="space-between" alignItems="center" mt={4}>
              <Button>Log out</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
      <HStack spacing="24px">
        <Button onClick={onOpenAdressInfoModal}>
          <SubstrAdress dataAdress={web3State.account} />
        </Button>

        <Box display={{ base: "none", md: "flex" }}>
          {balanceRoundedEth} ETH
        </Box>
        <Box display={{ base: "none", md: "flex" }}>
          {balanceRoundedXsro} XSRO
        </Box>
        {web3State.chainId === 4 ? (
          <Box display={{ base: "none", md: "flex" }} color="#f3b71e">
            {web3State.networkName}
          </Box>
        ) : (
          <Button
            onClick={onOpenWrongNetworkModal}
            bg="red"
            p="4"
            color="white"
            variant="solid"
          >
            <Flex color="white">
              <Center>
                <Box display={{ base: "none", md: "flex" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="sc-m6ivbz-6 gWhSnL"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>

                  <Text pl="2">Wrong Network</Text>
                </Box>
              </Center>
            </Flex>
          </Button>
        )}
      </HStack>
    </>
  );
};

export default MetaMaskInfo;
