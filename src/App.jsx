// import "./App.css";
import Layout from "./components/Layout.jsx";
import { Outlet } from "react-router-dom";

const App = () => {
  console.log("App");

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default App;
