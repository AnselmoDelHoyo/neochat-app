import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/normalize.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import PrivatePage from "./pages/PrivatePage.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Chat from "./components/Chat.jsx";
import Chats from "./components/Chats.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "*",
    Component: NotFound,
  },
  {
    path: "/",
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      {
        path: "chats",
        Component: PrivatePage,
        children: [
          { index: true, Component: Chats },
          { path: ":id", Component: Chat }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
