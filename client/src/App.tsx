import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { UserInfo } from "./pages/UserInfo";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userInfo" element={<UserInfo />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
    </Routes>
  );
}

export default App;
