import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/adminLogin";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
}
