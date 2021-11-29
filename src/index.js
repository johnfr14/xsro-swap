import React from "react";
import ReactDOM from "react-dom";
import { Web3Provider } from "web3-hooks";
import { ChakraProvider } from "@chakra-ui/react";
import { ContractContextProvider } from "./context/ContractContext";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Web3Provider>
        <ContractContextProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </ContractContextProvider>
      </Web3Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
