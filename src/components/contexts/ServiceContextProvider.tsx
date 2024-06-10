import React, { ReactNode, useMemo } from "react"
import AxiosHTTPClient from "lib/httpclient/AxiosHTTPClient"
import useAuthenticationStore from "stores/useAuthenticationStore"
import AuthenticationService from "services/AuthenticationService"
import ProjectService from "services/ProjectService"
import RBPoolService from "services/RBPoolService"
import TransactionService from "services/TransactionService"
import CKUSDCActorRepository from "repositories/CKUSDCActorRepository"
import RBPoolICActorRepository from "repositories/RBPoolICActorRepository"
import ckusdc from 'lib/web3/idls/ckusdc.did'
import rb_pool from 'lib/web3/idls/rb_pool.did'
import factory from 'lib/web3/idls/factory.did'
import RBFactoryICActorRepository from "repositories/RBFactoryICActorRepository"

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

const rbFactoryICActorRepository = new RBFactoryICActorRepository(
  process.env.REACT_APP_RB_POOL_FACTORY_CANISTER_ID as string,
  factory
)

const ckUSDCActorRepository = new CKUSDCActorRepository(
  process.env.REACT_APP_CKUSDC_CANISTER_ID as string, 
  ckusdc
)


export const ServiceContext = React.createContext<Context>({
  authenticationService: new AuthenticationService(
    process.env.REACT_APP_RBSVC_HOST as string,
    new AxiosHTTPClient(''),
    false
  ),
  projectService: new ProjectService(
    ckUSDCActorRepository,
    rbPoolICActorRepository,
    rbFactoryICActorRepository
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
        ckUSDCActorRepository,
        rbPoolICActorRepository,
        rbFactoryICActorRepository
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