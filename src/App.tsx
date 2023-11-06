import { initJuno } from "@junobuild/core";
import { useEffect } from "react";
import React from 'react'

import {
  createBrowserRouter,
  RouterProvider,  
} from "react-router-dom"
import HomePage from './pages/home'
import ProjectPage from './pages/project'
import WagmiContextProvider from 'components/contexts/WagmiContextProvider'
import RepositoriesContextProvider from './components/contexts/RepositoriesContextProvider'
import QueryClientContextProvider from './components/contexts/QueryClientContextProvider'
import {App as AntdApp} from 'antd'

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
  // TODO (galih): consider moving this to somewhere better
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "fr33d-ayaaa-aaaal-adbpa-cai",
      }))();
  }, []);

  return (
    <div className="App">
      <WagmiContextProvider>
        <RepositoriesContextProvider>
          <QueryClientContextProvider>
            <AntdApp>
              <RouterProvider router={router} />
            </AntdApp>
          </QueryClientContextProvider>
        </RepositoriesContextProvider>
      </WagmiContextProvider>
    </div>
  )
}

export default App
