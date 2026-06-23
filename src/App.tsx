import { Routes, Route, Navigate } from "react-router-dom";
import { SignupPage, LoginPage, ForgotPasswordPage } from "@/pages/auth/AuthPages";
import AdminLayout from "@/components/layout/AdminLayout";
import DashboardPage from "@/pages/admin/DashboardPage";
import MerchantsPage from "@/pages/admin/MerchantsPage";
import KYBPage from "@/pages/admin/KYBPage";
import { WalletsPage, AuditPage, UserManagementPage } from "@/pages/admin/OtherPages";

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/admin" element={<AdminLayout><DashboardPage /></AdminLayout>} />
      <Route path="/admin/merchants" element={<AdminLayout><MerchantsPage /></AdminLayout>} />
      <Route path="/admin/kyb" element={<AdminLayout><KYBPage /></AdminLayout>} />
      <Route path="/admin/wallets" element={<AdminLayout><WalletsPage /></AdminLayout>} />
      <Route path="/admin/audit" element={<AdminLayout><AuditPage /></AdminLayout>} />
      <Route path="/admin/users" element={<AdminLayout><UserManagementPage /></AdminLayout>} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
