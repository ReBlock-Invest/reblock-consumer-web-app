import { initJuno } from "@junobuild/core";
import { useEffect } from "react";

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
        <RouterProvider router={router} />
      </WagmiContextProvider>
    </div>
  );
}

export default App;
