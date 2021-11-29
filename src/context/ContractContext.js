import { createContext, useContext } from "react"
import { useContract } from "web3-hooks"; 
import { SwapAddress, SwapAbi } from "../contracts/Swap";
import { xSROAddress, xSROAbi } from "../contracts/xSRO";
import { FactoryAddress, FactoryAbi } from "../contracts/Factory"
import { RouterAddress, RouterAbi } from "../contracts/Router"

export const ContractContext = createContext()

export const ContractContextProvider = ({children}) => {
  const swap = useContract(SwapAddress, SwapAbi)
  const xsro = useContract(xSROAddress, xSROAbi)
  const factory = useContract(FactoryAddress, FactoryAbi)
  const router = useContract(RouterAddress, RouterAbi)
  
  return (
    <ContractContext.Provider value={{ swap, xsro, factory, router }}>
      {children}
    </ContractContext.Provider>
  )
}

export const useContracts = () => {
  const context = useContext(ContractContext)
  if (context === undefined) {
    throw new Error(`You try to use UserContext outside of its provider.`)
  }
  return context
}

