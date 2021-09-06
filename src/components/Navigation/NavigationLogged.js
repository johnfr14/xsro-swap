import { NavLink } from "react-router-dom";
import { HStack } from "@chakra-ui/react";

const NavigationLogged = () => {
  return (
    <>
      <HStack spacing={8} alignItems={"center"}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">XSRO Swap</NavLink>
        <HStack as={"nav"} spacing={4} display={{ md: "flex" }}></HStack>
      </HStack>
    </>
  );
};

export default NavigationLogged;
