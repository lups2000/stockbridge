import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { UserInfo } from "./pages/UserInfo";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userInfo" element={<UserInfo />} />
      </Routes>
    </>
  );
}

export default App;
