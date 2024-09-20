import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "../src/contexts/themeContext/ThemeContext.jsx";
import App from "./App.jsx";
import "./index.css";
import DetailsPage from "./pages/DetailsPage.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import Search from "./pages/Search.jsx";
import Shows from "./pages/Shows.jsx";

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

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </>
);
