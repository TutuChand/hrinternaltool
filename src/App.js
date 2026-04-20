import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/reactdatepicker.css";
import Login from "./pages/login/Login";
import Forget from "./pages/forget/Forget";
import Reset from "./pages/reset/Reset";
import OTP from "./pages/otp/Otp";
import Dashboard from "./pages/dashboard/Dashboard";
import EmployeeList from "./pages/createemployee/Employeelist";
import BulkImport from "./pages/createemployee/BulkImport";
import CreateEmployee from "./pages/createemployee/PersonalInfo";
import AddEmployee from "./pages/createemployee/EmployeeDetails";
import Documents from "./pages/createemployee/Documents";
import EmployeeForm from "./pages/createemployee/Wrapper";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Hiring from "./pages/Hiring/HiringList";
import HiringList from "./pages/Hiring/HiringList";
import Attendance from "./pages/Attendance/Attendance";
import Birthday from "./pages/Birthdays/Birthday";
import Leave from "./pages/Leavemanagement/LeaveManagement";
import Round from "./pages/RoundDesignation/Round";
import Announcements from "./pages/Announcements/Announcements";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/otp" element={<OTP />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Employee routes */}
            <Route path="/employee">
              <Route index element={<EmployeeList />} />
              <Route path="list" element={<EmployeeList />} />
              <Route path="bulk" element={<BulkImport />} />

              {/* Multi-step employee creation */}
              <Route path="" element={<EmployeeForm />}>
                <Route index element={<CreateEmployee />} />
                <Route path="personal" element={<CreateEmployee />} />
                <Route path="details" element={<AddEmployee />} />
                <Route path="documents" element={<Documents />} />
              </Route>
            </Route>
            {/* Hiring routes */}
            <Route path="/hiring">
              <Route index element={<Hiring />} />
              <Route path="list" element={<HiringList />} />
              {/* <Route path="create" element={<CreateHiring />} /> */}
            </Route>

            {/*Attendance routes */}
            <Route path="/attendance">
              <Route index element={<Attendance />} />
            </Route>

            {/*Birthday routes */}
            <Route path="/birthday">
              <Route index element={<Birthday />} />
            </Route>

            {/*Leave Management routes */}
            <Route path="/leave">
              <Route index element={<Leave />} />
            </Route>
            {/*Round & Designations routes */}
            <Route path="/round">
              <Route index element={<Round />} />
            </Route>
            {/*Announcement routes */}
            <Route path="/announcement">
              <Route index element={<Announcements />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
