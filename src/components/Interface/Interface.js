import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue } from "@chakra-ui/react"
import  Swap  from './Swap'
import  AddLiquidity  from "./AddLiquidity"
import  Faucet  from "./Faucet"

export const Interface = () => {
    return (
        <Tabs 
        isFitted variant="enclosed"  maxW="7xl"
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
            <TabList mb='1rem'>
            <Tab>Swap</Tab>
            <Tab>Add liquidity</Tab>
            <Tab>Faucet</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Swap />
                </TabPanel>
                <TabPanel>
                    <AddLiquidity />
                </TabPanel>
                <TabPanel>
                    <Faucet />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}