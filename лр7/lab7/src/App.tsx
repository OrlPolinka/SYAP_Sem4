import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ResetPassword from "./ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-up/*" element={<SignUp />} >
          <Route path="sign-in" element={<SignIn />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
    </Router>
  );
}

export default App;
export{};