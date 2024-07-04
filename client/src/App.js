import { BrowserRouter, Navigate, Outlet, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import RoutesLayout from "./RoutesLayout";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import User from "./Components/User";
import { useEffect, useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoutesLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "signin", element: <Login /> },
      { path: "signup", element: <Register /> }
    ]
  }
]);



function App() {

  const [user, setUser] = useState(null);
  useEffect(function () {
    setUser({ name: "Moin" });
  }, []);

  function ProtectRoute({ negate, path }) {
    let token = localStorage.getItem("token");
    let auth = false;
    if (token) {
      auth = true;
      if(!user){
        auth = false;
      }
    }

    if (negate) {
      auth = !auth;
    }
    return (auth ? <Outlet /> : <Navigate to={path ? path : "/login"} />);
  }

  return (
    <>

      <BrowserRouter>
        {/* Routes */}
        <Routes>
          {/* Layout */}
          <Route  path="/" element={<RoutesLayout />} >
            {/* Protected */}
            <Route element={<ProtectRoute />}>
              <Route path="" element={<Home />} />
              <Route path="/user" element={<User />} />
            </Route>
            {/* Must be not login */}
            <Route element={<ProtectRoute path="/" negate={true} />}>
              <Route path="login" element={<Login />} />
            </Route>

            {/* Unprotected Routes */}

          </Route>
          {/* Layout */}
        </Routes>
        {/* Routes */}
      </BrowserRouter>
    </>
  )
}

export default App;
