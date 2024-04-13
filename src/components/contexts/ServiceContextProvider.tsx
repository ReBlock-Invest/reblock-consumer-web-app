import React, { ReactNode, useMemo } from "react"
import AxiosHTTPClient from "lib/httpclient/AxiosHTTPClient"
import useAuthenticationStore from "stores/useAuthenticationStore"
import AuthenticationService from "services/AuthenticationService"
import ProjectService from "services/ProjectService"
import RBPoolService from "services/RBPoolService"
import TransactionService from "services/TransactionService"
import ProjectICActorRepository from "repositories/ProjectICActorRepository"
import RBPoolICActorRepository from "repositories/RBPoolICActorRepository"
import dummy_usdc from 'lib/web3/idls/dummy_usdc.did'
import rb_pool from 'lib/web3/idls/rb_pool.did'

type Props = {
  children: ReactNode
}

type Context = {
  authenticationService: AuthenticationService
  projectService: ProjectService
  rbPoolService: RBPoolService
  transactionService: TransactionService
}

const rbPoolICActorRepository = new RBPoolICActorRepository(
  process.env.REACT_APP_RB_POOL_CANISTER_ID as string,
  rb_pool
)
//TODO
//- Add another project canister here
const projectICActorRepository = new ProjectICActorRepository(
  process.env.REACT_APP_DUMMY_USDC_CANISTER_ID as string, 
  dummy_usdc
)

const projectICActorRepositoryRegistry: Record<string, ProjectICActorRepository> = {}
projectICActorRepositoryRegistry['dummy_usdc'] = projectICActorRepository

export const ServiceContext = React.createContext<Context>({
  authenticationService: new AuthenticationService(
    process.env.REACT_APP_RBSVC_HOST as string,
    new AxiosHTTPClient(''),
    false
  ),
  projectService: new ProjectService(
    projectICActorRepositoryRegistry,
    rbPoolICActorRepository
  ),
  rbPoolService: new RBPoolService(
    rbPoolICActorRepository
  ),
  transactionService: new TransactionService(),
})

const ServiceContextProvider: React.FC<Props> = ({ children }) => {
  const authenticationStore = useAuthenticationStore()

  const services = useMemo(() => {
    const authenticationHttpClient = new AxiosHTTPClient(authenticationStore.token)
    return {
      authenticationService: new AuthenticationService(
        process.env.REACT_APP_RBSVC_HOST as string,
        authenticationHttpClient,
        !!authenticationStore.token
      ),
      projectService: new ProjectService(
        projectICActorRepositoryRegistry,
        rbPoolICActorRepository
      ),
      rbPoolService: new RBPoolService(
        rbPoolICActorRepository
      ),
      transactionService: new TransactionService(),
    }
  }, [authenticationStore.token])

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  )
}

export default ServiceContextProvider