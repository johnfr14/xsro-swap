import TokenInput from "./TokenInput"
import { useContext, useState, useRef } from "react";
import { Web3Context } from "web3-hooks";
import { useForm } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

const AddLiquidity = () => {
  const [web3State, login] = useContext(Web3Context);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [tokens, setToken] = useState({ token0: null, token1: null });
  const input0 = useRef(0)
  const input1 = useRef(1)

  // const { router, factory } = useContracts();
  // const toast = useToast();

  return (
    <>
      <form onSubmit={handleSubmit()}>
        <TokenInput input={input0.current} setToken={setToken} tokens={tokens} token={tokens.token1} register={register} />
        <span>+</span>
        <TokenInput input={input1.current} setToken={setToken} tokens={tokens} token={tokens.token2} register={register}/>
        <Box>
            {web3State.isLogged && web3State.chainId ? (
              <Button
                mt={6}
                // isLoading={transactionLoading}
                loadingText="In process"
                // colorScheme={amount.from > 0 ? "yellow" : ""}
                // color={!amount.from > 0 ? "white" : "black"}
                // onClick={onOpen}
                borderRadius="5"
                height="48px"
                width="100%"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                // disabled={!(amount.from > 0)}
              >
                {/* {amount.from > 0 ? "Swap" : "Enter an amount"} */}
              </Button>
            ) : (
              <Button
                mt={6}
                colorScheme="gray"
                borderRadius="5"
                height="48px"
                width="100%"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                onClick={web3State.chainId ? login : ''}
              >
                Connect Wallet
              </Button>
            )}
        </Box>
      </form>
    </>
  );
};

export default AddLiquidity;