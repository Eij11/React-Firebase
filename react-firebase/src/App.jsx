import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";
import About from "./pages/About";
import Header from "./components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Header />
          <ToastContainer position="top-center" />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/add" element={<AddEdit />} />
            <Route path="/update/:id" element={<AddEdit />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
