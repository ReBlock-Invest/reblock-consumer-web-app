import { initJuno } from "@junobuild/core";
import { useEffect } from "react";

import {
  createBrowserRouter,
  RouterProvider,  
} from "react-router-dom"
import HomePage from './pages/home'
import ProjectPage from './pages/project'
import RepositoriesContextProvider from './components/contexts/RepositoriesContextProvider'
import QueryClientContextProvider from './components/contexts/QueryClientContextProvider'
import {App as AntdApp, ConfigProvider} from 'antd'
import AppThemeConfig from "components/themes/AppThemeConfig";
import Web3ContextProvider from "components/contexts/Web3ContextProvider";
import Authentication from "components/modules/authentication/Authentication";
import PersonalInquiryModal from "components/modules/kyc/modals/PersonaInquiryModal";
import ConnectWalletModal from "components/modules/wallets/modals/ConnectWalletsModal";
import WindowContextProvider from "components/contexts/WindowContextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/project/:projectId",
    element: <ProjectPage />,
  },
])

function App() {

  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: process.env.REACT_APP_SATELLITE_ID as string,
      }))();
  }, []);

  return (
    <div className="App">      
      <QueryClientContextProvider>
        <ConfigProvider theme={AppThemeConfig}>
          <AntdApp>
            <Web3ContextProvider>
              <RepositoriesContextProvider>
                <PersonalInquiryModal />
                <ConnectWalletModal />

                <Authentication />
                <WindowContextProvider>
                  <RouterProvider router={router} />
                </WindowContextProvider>
              </RepositoriesContextProvider>
            </Web3ContextProvider>
          </AntdApp>
        </ConfigProvider>
      </QueryClientContextProvider>    
    </div>
  )
}

export default App
