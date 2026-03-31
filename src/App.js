import React from "react"; //eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  
import Login from "./pages/login/Login";
import Forget from "./pages/forget/Forget";
import Reset from "./pages/reset/Reset";
import OTP from "./pages/otp/Otp";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateEmployee from "./pages/createemployee/CreateEmployee";
import AddEmployee from "./pages/createemployee/AddEmployee";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/*Public Routes*/}
      <Route path="/" element={<Login />} />
      <Route path="/forget" element={<Forget />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/otp" element={<OTP />} />
{/*Protected Routes */}
<Route element={<ProtectedRoute/>}>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createemployee" element={<CreateEmployee />} />
         <Route path="/addemployee" element={<AddEmployee />} />
      </Route>
      </Route>
    </Routes>
  );
}

export default App;
