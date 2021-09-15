import { NavLink } from "react-router-dom";
import { HStack } from "@chakra-ui/react";

const NavigationLogged = () => {
  return (
    <>
      <HStack spacing={8} alignItems={"center"}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">xSRO Swap</NavLink>
        <NavLink to={{ pathname: "https://apps.sarahro.io/" }} target="_blank">SRO Marketplace</NavLink>
        <HStack as={"nav"} spacing={4} display={{ md: "flex" }}></HStack>
      </HStack>
    </>
  );
};

export default NavigationLogged;
