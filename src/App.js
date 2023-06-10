import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Nav from './Nav';
import Home from './Pages/Home/Home';
import Popular from './Pages/Popular/Popular';
import Battle from './Pages/Battle/Battle';
import Results from './Pages/Battle/Results';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "popular",
        element: <Popular/>,
      },
      {
        path: "battle",
        element: <Battle/>,
      },
      {
        path: "battle/results",
        element: <Results/>,
      },
      {
        path: "*",
        element: (<h2>error</h2>),
      },
    ]
  }
]);

const App =() =>{
  return(
    <>
     <div className='container'>
  <RouterProvider router={router} />
    </div>
    </>
)
}

export default App;