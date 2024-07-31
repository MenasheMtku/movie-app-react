import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Movies from "./pages/movies/Movies.jsx";
import Shows from "./pages/shows/Shows.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage.jsx";
import Search from "./pages/search/Search.jsx";
import { ThemeProvider } from "../src/contexts/themeContext/ThemeContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/shows",
        element: <Shows />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/:type/:id",
        element: <DetailsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* <App /> */}
    {/* <div className="h-[20px] w-full"> */}
    <ThemeProvider>
      <RouterProvider router={router} />
      {/* <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/search" element={<Search />} />
          <Route path="/:type/:id" element={<DetailsPage />} />
        </Routes>
      </Router> */}
    </ThemeProvider>
    {/* </div> */}
  </>
);
