import { initJuno } from "@junobuild/core";
import { useEffect } from "react";

import {
  createBrowserRouter,
  RouterProvider,  
} from "react-router-dom"
import HomePage from './pages/home'
import ProjectPage from './pages/project'
import ServiceContextProvider from './components/contexts/ServiceContextProvider'
import QueryClientContextProvider from './components/contexts/QueryClientContextProvider'
import {App as AntdApp, ConfigProvider} from 'antd'
import AppThemeConfig from "components/themes/AppThemeConfig";
import Web3ContextProvider from "components/contexts/Web3ContextProvider";
import Authentication from "components/modules/authentication/Authentication";
import PersonalInquiryModal from "components/modules/kyc/modals/PersonaInquiryModal";
import ConnectWalletModal from "components/modules/wallets/modals/ConnectWalletsModal";
import WindowContextProvider from "components/contexts/WindowContextProvider";
import PrivacyPolicyPage from "pages/privacy-policy";
import AdminProjectsPage from "pages/admin/projects";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/project/:projectId",
    element: <ProjectPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/TfjFOUiXuVuhFqBcHIlb/projects",
    element: <AdminProjectsPage />
  }
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
              <ServiceContextProvider>
                <PersonalInquiryModal />
                <ConnectWalletModal />

                <Authentication />
                <WindowContextProvider>
                  <RouterProvider router={router} />
                </WindowContextProvider>
              </ServiceContextProvider>
            </Web3ContextProvider>
          </AntdApp>
        </ConfigProvider>
      </QueryClientContextProvider>    
    </div>
  )
}

export default App
