import { useState, createContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import Intro from "./components/Header/Intro";
import LoadingBar from "react-top-loading-bar";
import RegisterUser from "./components/RegisterUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginUser from "./components/LoginUser";
import AboutUs from "./components/AboutUs";
import Profile from "./components/Profile";
import { useSelector } from "react-redux";
import OspShow from "./components/Custom/OspShow";
import OspCreate from "./components/Custom/OspCreate";
import Community from "./components/Custom/Community";

// eslint-disable-next-line react-refresh/only-export-components
export const barContext = createContext();

function App() {
  const [progress, setProgress] = useState(0);

  const topLoad = () => {
    setProgress(30);
    setTimeout(() => {
      setProgress(100);
    }, 100);
  };

 const { isAuthenticated } = useSelector(
    (state) => state.user
  ); 

  return (
    <>
      <Router>
        <barContext.Provider value={() => topLoad()}>
          <ToastContainer
            position="top-center" 
            autoClose={5000}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={true}
            pauseOnHover={false}
            theme="dark"
          />
          <LoadingBar
            color="#212529"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            loaderSpeed={1000}
            height={4}
            shadow={true}
          />

          <Navbar />
          <Routes>
            <Route exact path="/" element={<Intro />} />
            <Route exact path="/Sign" element={isAuthenticated?<Profile/>:<RegisterUser />} />
            <Route exact path="/Log" element={isAuthenticated?<Profile/>:<LoginUser/>} />
            <Route exact path="/AboutUs" element={<AboutUs/>} />
            <Route exact path="/profile" element={isAuthenticated?<Profile/>:<LoginUser/>} />
            <Route exact path="/osp-show/:id" element={<OspShow/>} />
            <Route exact path="/osp-create" element={<OspCreate/>} />
            <Route exact path="/Community" element={<Community/>} />
          </Routes>
        </barContext.Provider>
      </Router>
    </>
  );
}

export default App;
