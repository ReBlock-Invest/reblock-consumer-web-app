import AxiosHTTPClient from "lib/httpClient/libraries/AxiosHTTPClient"
import ProjectRepository from "repositories/ProjectRepository"
import React, { ReactNode, useMemo } from "react"

type Props = {
  children: ReactNode
}

type Context = {
  projectRepository?: ProjectRepository
}

export const RepositoriesContext = React.createContext<Context>({})

const RepositoriesContextProvider: React.FC<Props> = ({children}) => {

  const repositories = useMemo(() => {
    const httpClient = new AxiosHTTPClient()
    return {
      projectRepository: new ProjectRepository(httpClient),
    }
  }, [])

  return (
    <RepositoriesContext.Provider value={repositories}>
      {children}
    </RepositoriesContext.Provider>
  )
}

export default RepositoriesContextProvider