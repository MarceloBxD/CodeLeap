import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./contexts/ContextApi.jsx";

import router from "./routes/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AppProvider>
  </React.StrictMode>
);
