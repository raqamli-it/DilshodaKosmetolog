
import React, { useContext, useEffect, useState } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePg";
import ProtectedRoutes from "./context/ProtectedRoutes";
import Layout from "./layout/Layout";
import UserProfile from "./pages/UserProfile";
import CreatedUser from "./pages/CreatedUser";
import { GlobalContext, GlobalContextProvider } from "./context/GlobalContext";
import Login from "./pages/Login";
import ActiveUser from "./pages/ActiveUser";
import DebtorUser from "./pages/DebtorUser";
import RecovredUser from "./pages/RecovredUser";
import NotifiPage from "./pages/NotifiPage";
import UpdateUser from "./pages/UpdateUser";



function App() {
  const { user, alReady, dispatch } = useContext(GlobalContext); // Login holatini olish
  console.log(user, "bu user");

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes >
          <Layout />
        </ProtectedRoutes>
      ),
      children: [
        { index: true, element: <HomePage /> },
        { path: "/created_users", element: <CreatedUser /> },
        { path: "/active_users", element: <ActiveUser /> },
        { path: "/debtor_users", element: <DebtorUser /> },
        { path: "/recovered_patients", element: <RecovredUser /> },
        { path: "/notification", element: <NotifiPage /> },
        { path: "/update_user/:id", element: <UpdateUser /> },
        { path: "/details/:id", element: <UserProfile /> },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to='/' /> : <Login />,
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token && !user) {
      dispatch({ type: "LOGIN", payload: { token } });
    }
    dispatch({ type: "READY_ST" });
  }, [dispatch, user]);


  return (
    <GlobalContextProvider>
      <>{alReady && <RouterProvider router={routes} />}</>
    </GlobalContextProvider>
  );
}

export default App;
``