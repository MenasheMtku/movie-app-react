import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "../src/contexts/themeContext/ThemeContext.tsx";
import App from "./App.tsx";
import "./index.css";
import DetailsPage from "./pages/DetailsPage.tsx";
import Home from "./pages/Home.tsx";
import Movies from "./pages/Movies.tsx";
import Search from "./pages/Search.tsx";
import Shows from "./pages/Shows.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Home as the index route
      { index: true, element: <Home /> },
      { path: "movies", element: <Movies /> },
      { path: "shows", element: <Shows /> },
      { path: "search", element: <Search /> },
      // Dynamic route
      { path: ":type/:id", element: <DetailsPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </>
);
