import "./App.css";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Alert from "./Components/Alert";
import { useState } from "react";
import Login from "./Components/Login";
import Home from "./Components/Home";
import BlogState from "./Context/Blogs/BlogState";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
      <BlogState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/register"
                element={<Signup showAlert={showAlert} />}
              />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </BlogState>
    </>
  );
}

export default App;
