import { Web3Context } from "components/contexts/Web3ContextProvider"
import { useContext } from "react"


const useWeb3 = () => {
  const web3Context = useContext(Web3Context)
  return web3Context
}

export default useWeb3