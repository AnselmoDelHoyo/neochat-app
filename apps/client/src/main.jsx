import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import Login from "./components/Login.jsx";
import Chat from "./components/Chat.jsx";
import "./styles/normalize.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import Home from "./components/Home.jsx";
import Chats from "./components/Chats.jsx";

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
        Component: Chats,
        children: [
          { path: ":id", Component: Chat }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
