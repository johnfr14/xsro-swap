import { ChainId, Token, WETH, Pair, TokenAmount } from "@uniswap/sdk";

const chainId = ChainId.RINKEBY;
const decimals = 18;

export const WBTC = new Token(chainId, '0xc06562a8663b0BE3179ae5b0408177EdE2f789ED', decimals, "WBTC", "Wrapped bitcoin");
export const DAI =  new Token(chainId, "0x08151BF2e2F4349C449FF829F0C9f1be37fD5327", decimals, "DAI", "Dai Stablecoin");
export const TokensList = [WBTC, DAI]


export async function getPair() {
  const pairAddress = Pair.getAddress(DAI, WETH[DAI.chainId]);

  const reserves = [
    await pairAddress.getReserves()
  ];
  const [reserve0, reserve1] = reserves;

  const tokens = [DAI, WETH[DAI.chainId]];
  const [token0, token1] = tokens[0].sortsBefore(tokens[1])
    ? tokens
    : [tokens[1], tokens[0]];

  const pair = new Pair(
    new TokenAmount(token0, reserve0),
    new TokenAmount(token1, reserve1)
  );
  return pair;
}