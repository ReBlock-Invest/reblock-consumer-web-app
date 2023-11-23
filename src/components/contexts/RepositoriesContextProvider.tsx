import ProjectRepository from "repositories/ProjectRepository"
import React, { ReactNode, useMemo } from "react"
import AuthenticationRepository from "repositories/AuthenticationRepository"
import AxiosHTTPClient from "lib/httpclient/AxiosHTTPClient"
import useAuthenticationStore from "stores/useAuthenticationStore"
import ICPTransactionRepository from "repositories/ICPTransactionRepository"
import useWeb3 from "hooks/useWeb3"

type Props = {
  children: ReactNode
}

type Context = {
  projectRepository?: ProjectRepository
  authenticationRepository?: AuthenticationRepository
  icpTransactionRepository?: ICPTransactionRepository
}

export const RepositoriesContext = React.createContext<Context>({})

const RepositoriesContextProvider: React.FC<Props> = ({children}) => {
  const {
    rbOriReblockICActor,
    nnsLedgerActorReblockICActor
  } = useWeb3()
  const authenticationStore = useAuthenticationStore()

  const repositories = useMemo(() => {
    const authenticationHttpClient = new AxiosHTTPClient(authenticationStore.token)
    return {
      projectRepository: new ProjectRepository(),
      authenticationRepository: new AuthenticationRepository(
        process.env.REACT_APP_RBSVC_HOST as string,
        authenticationHttpClient,
        !!authenticationStore.token
      ),
      icpTransactionRepository: rbOriReblockICActor && nnsLedgerActorReblockICActor ? 
        new ICPTransactionRepository(
          rbOriReblockICActor,
          nnsLedgerActorReblockICActor
        ) : undefined
    }
  }, [
    authenticationStore.token,
    rbOriReblockICActor,
    nnsLedgerActorReblockICActor
  ])

  return (
    <RepositoriesContext.Provider value={repositories}>
      {children}
    </RepositoriesContext.Provider>
  )
}

export default RepositoriesContextProvider