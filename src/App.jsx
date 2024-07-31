// import "./App.css";
import Layout from "./components/Layout.jsx";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../src/contexts/themeContext/ThemeContext.jsx";

const App = () => {
  console.log("App");

  return (
    <>
      <ThemeProvider>
        <Layout>
          <Outlet />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default App;
