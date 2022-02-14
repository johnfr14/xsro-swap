import { NavLink } from "react-router-dom";
import { HStack } from "@chakra-ui/react";

const NavigationLogged = () => {
  return (
    <>
      <HStack spacing={8} alignItems={"center"}>
        <NavLink to="/">Home</NavLink>
        <a href="https://sro-training-markeplace.netlify.app/" target="_blank" rel="noreferrer">SRO Marketplace</a>
        <HStack as={"nav"} spacing={4} display={{ md: "flex" }}></HStack>
      </HStack>
    </>
  );
};

export default NavigationLogged;
