import { ServiceContext } from "components/contexts/ServiceContextProvider"
import { useContext } from "react"

const useServices = () => {
  const repositories = useContext(ServiceContext)
  return repositories
}

export default useServices