import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import LoginChoice from "./pages/loginChoice";
import UserLogin from "./customerEntry/pages/userLogin";
import AdminLogin from "./adminEntry/pages/adminLogin";
import AdminDashboard from "./adminEntry/pages/adminDashboard";
import FlightEntryPage from "./adminEntry/pages/flightEntryPage";
import UserDashboard from "./customerEntry/pages/userDashboard";


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LoginChoice />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/flights" element={<FlightEntryPage />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
