import { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui";
import {
  LayoutDashboard, Users, FileText, Wallet,
  ClipboardList, UserCog, ChevronDown,
} from "lucide-react";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard",       to: "/admin" },
  { icon: Users,           label: "Merchants",       to: "/admin/merchants" },
  { icon: FileText,        label: "KYB",             to: "/admin/kyb",     badge: 1 },
  { icon: Wallet,          label: "Wallets",         to: "/admin/wallets" },
  { icon: ClipboardList,   label: "Audit Trail",     to: "/admin/audit" },
  { icon: UserCog,         label: "User Management", to: "/admin/users" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[220px] flex-shrink-0 border-r border-[#E5E7EB] flex flex-col bg-white">
        <div className="px-5 py-4 border-b border-[#E5E7EB]">
          <Logo showAdmin />
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ icon: Icon, label, to, badge }) => (
            <NavLink key={to} to={to} end={to === "/admin"}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#F3F4F6] text-[#0D1B2A] border-l-2 border-[#0D1B2A] rounded-l-none"
                  : "text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#0D1B2A]"
              )}>
              <Icon size={17} />
              <span className="flex-1">{label}</span>
              {badge != null && (
                <span className="w-5 h-5 bg-[#E8392A] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        {/* Admin card */}
        <div className="p-3 border-t border-[#E5E7EB]">
          <div className="bg-[#0D1B2A] rounded-xl p-3 text-white">
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-semibold">BS-123450</span>
            <p className="text-xs font-semibold mt-2">Admin Name</p>
            <p className="text-[10px] text-white/60">re***m@gmail.com · <span className="text-white/80">Super Admin</span></p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-14 border-b border-[#E5E7EB] flex items-center justify-end px-6 gap-3 bg-white flex-shrink-0">
          <span className="text-sm font-semibold text-[#0D1B2A]">SUPER ADMIN</span>
          <div className="w-9 h-9 rounded-full bg-[#E8392A] flex items-center justify-center text-white text-sm font-bold">TM</div>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-[#6B7280] hover:text-[#0D1B2A]">
            <ChevronDown size={16} />
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
