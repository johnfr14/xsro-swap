import { Flex, useColorModeValue } from "@chakra-ui/react";
import { HeaderComp as Header, Swap } from "../components";

function HomePage() {
  return (
    <>
      <Header />
      <Flex
        flexDirection="column"
        p={10}
        bgGradient={useColorModeValue(
          "white",
          "linear(gray.800 0%, gray.700 0%, gray.800 80%)"
        )}
      >
        <Swap />
      </Flex>
    </>
  );
}

export default HomePage;
