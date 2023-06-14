import { useState, createContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import Intro from "./components/Header/Intro";
import LoadingBar from "react-top-loading-bar";
import RegisterUser from "./components/RegisterUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  return (
    <>
      <Router>
        <barContext.Provider value={() => topLoad()}>
          {/* <ToastContainer autoClose={3000} draggable={true} position="POSITION.TOP_CENTER"/> */}
          <ToastContainer
            position="top-center" // Set the position to top center
            autoClose={5000}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={true}
            pauseOnHover={false}
            theme="dark" // Use the dark theme
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
            <Route exact path="/LogSign" element={<RegisterUser />} />
          </Routes>
        </barContext.Provider>
      </Router>
    </>
  );
}

export default App;
