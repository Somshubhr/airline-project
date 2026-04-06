import { Routes, Route } from "react-router-dom";
import UserLogin from "../pages/userLogin";

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<UserLogin />} />
    </Routes>
  );
}
