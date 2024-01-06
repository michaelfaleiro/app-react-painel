import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";

import App from "./App.tsx";
import "./index.css";
import ErrorPage from "./pages/ErrorPage/Index.tsx";
import Orcamentos from "./pages/Orcamentos/Index.tsx";
import { queryClient } from "./services/queryClient.ts";
import OrcamentoDetalhes from "./pages/Orcamentos/Orcamento.tsx";

const router = createBrowserRouter([
  {
    path: "/app-react-painel/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/app-react-painel/",
        element: <Orcamentos />,
      },
      {
        path: "/app-react-painel/orcamento/:id",
        element: <OrcamentoDetalhes />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
