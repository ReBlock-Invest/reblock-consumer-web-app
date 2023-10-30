import React from 'react';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/home';
import WagmiContextProvider from 'components/contexts/WagmiContextProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

function App() {
  return (
    <div className="App">
      <WagmiContextProvider>
        <RouterProvider router={router} />
      </WagmiContextProvider>
    </div>
  );
}

export default App;
