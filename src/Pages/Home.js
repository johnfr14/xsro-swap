import { Flex, useColorModeValue } from "@chakra-ui/react";
import { HeaderComp as Header } from "../components";
import { Interface } from "../components/Interface/Interface"

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
        <Interface />
      </Flex>
    </>
  );
}

export default HomePage;
