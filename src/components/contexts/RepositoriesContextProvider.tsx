import ProjectRepository from "repositories/ProjectRepository"
import React, { ReactNode, useMemo } from "react"
import AuthenticationRepository from "repositories/AuthenticationRepository"
import AxiosHTTPClient from "lib/httpclient/AxiosHTTPClient"
import useAuthenticationStore from "stores/useAuthenticationStore"
import ICPTransactionRepository from "repositories/ICPTransactionRepository"
import useWeb3 from "hooks/useWeb3"
import MaticTransactionRepository from "repositories/MaticTransactionRepository"

type Props = {
  children: ReactNode
}

type Context = {
  projectRepository?: ProjectRepository
  authenticationRepository?: AuthenticationRepository
  icpTransactionRepository?: ICPTransactionRepository
  maticTransactionRepository?: MaticTransactionRepository
}

export const RepositoriesContext = React.createContext<Context>({})

const RepositoriesContextProvider: React.FC<Props> = ({children}) => {
  const {
    rbOriReblockICActor,
    nnsLedgerActorReblockICActor,
    accounts
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
        ) : undefined,
        maticTransactionRepository: accounts ? new MaticTransactionRepository(accounts) : undefined
    }
  }, [
    authenticationStore.token,
    rbOriReblockICActor,
    nnsLedgerActorReblockICActor,
    accounts
  ])

  return (
    <RepositoriesContext.Provider value={repositories}>
      {children}
    </RepositoriesContext.Provider>
  )
}

export default RepositoriesContextProvider