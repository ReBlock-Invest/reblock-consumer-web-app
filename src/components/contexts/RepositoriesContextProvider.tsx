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
    return {
      projectRepository: new ProjectRepository(),
    }
  }, [])

  return (
    <RepositoriesContext.Provider value={repositories}>
      {children}
    </RepositoriesContext.Provider>
  )
}

export default RepositoriesContextProvider