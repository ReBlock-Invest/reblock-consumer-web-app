import { RepositoriesContext } from "components/contexts/RepositoriesContextProvider"
import { useContext } from "react"

const useRepositories = () => {
  const repositories = useContext(RepositoriesContext)
  return repositories
}

export default useRepositories