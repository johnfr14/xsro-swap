import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Web3Context } from "web3-hooks";
import { HStack } from "@chakra-ui/react";
import NavigationLogged from "./NavigationLogged";

const Navigation = () => {
  const [web3State] = useContext(Web3Context);
  return (
    <div>
      {web3State.isLogged && (
        <>
          <NavigationLogged />
        </>
      )}
      {!web3State.isLogged && (
        <>
          <HStack spacing={8} alignItems={"center"}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/">xSRO Swap</NavLink>
            <NavLink to={{ pathname: "https://apps.sarahro.io/" }} target="_blank">SRO Marketplace</NavLink>
          </HStack>
        </>
      )}
    </div>
  );
};

export default Navigation;
