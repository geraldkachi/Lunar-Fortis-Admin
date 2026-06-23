import { useState } from "react";
import { Badge, Pagination, SearchInput, InfoModal, Select } from "@/components/ui";
import {
  WALLET_ENTRIES, WALLET_TRANSACTIONS, AUDIT_ENTRIES, ADMIN_USERS,
  formatPrice,
} from "@/lib/mockData";
import { paginate, cn } from "@/lib/utils";
import { Filter, Download, X, Plus, MoreVertical } from "lucide-react";
import type { AdminUser } from "@/types";

// ──────────────────────────────────────────────────────────────────────────────
// Receipt Modal
// ──────────────────────────────────────────────────────────────────────────────
function ReceiptModal({ tx, onClose }: { tx: (typeof WALLET_TRANSACTIONS)[0]; onClose: () => void }) {
  const isSuccess = tx.status === "successful";
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-end z-50 pr-8">
      <div className="bg-white rounded-2xl w-80 shadow-modal p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[#0D1B2A]">Transaction Receipt</h3>
          <button onClick={onClose} className="text-[#6B7280] hover:text-[#0D1B2A]"><X size={16} /></button>
        </div>
        <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">TRANSACTION DETAILS</p>
        <div className="space-y-2 mb-4">
          {[["Amount", formatPrice(tx.amount)],["Type", tx.type],["Recipient Bank","Paycom/OPAY"],
            ["Account Number","8123235569"],["Description","Tolulope Afolayan to Flutterwave/LunaFORTIS"],
            ["Date","09 April 2026, 10:45 AM"]].map(([l,v]) => (
            <div key={l} className="flex justify-between text-xs">
              <span className="text-[#6B7280]">{l}</span>
              <span className="font-medium text-[#0D1B2A] text-right max-w-[55%]">{v}</span>
            </div>
          ))}
          <div className="flex justify-between text-xs">
            <span className="text-[#6B7280]">Transaction Status</span>
            <span className={isSuccess ? "text-[#10B981] font-semibold" : "text-[#EF4444] font-semibold"}>
              {isSuccess ? "Successful" : "Failed"}
            </span>
          </div>
        </div>
        <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">OTHER DETAILS</p>
        <div className="space-y-2 mb-4">
          {[["Transaction Reference","pocket_disburse_1155470048562623"],
            ["Session ID","090405260430150036372237066022"]].map(([l,v]) => (
            <div key={l} className="flex flex-col gap-0.5 text-xs">
              <span className="text-[#6B7280]">{l}</span>
              <span className="text-[#0D1B2A] font-medium break-all">{v}</span>
            </div>
          ))}
        </div>
        <button className="w-full border border-[#E5E7EB] text-[#0D1B2A] text-xs font-semibold py-2.5 rounded-xl hover:bg-gray-50">Share Receipt</button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Withdraw modal
// ──────────────────────────────────────────────────────────────────────────────
function WithdrawModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [amount, setAmount] = useState("250,000");
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-modal p-6">
        <h3 className="text-base font-bold text-[#0D1B2A] mb-1">Withdraw to Bank</h3>
        <p className="text-xs text-[#6B7280] mb-5">Transfer your available earnings securely to your registered bank account.</p>
        <div className="mb-5">
          <label className="lf-label">Amount</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#6B7280]">₦</span>
            <input value={amount} onChange={e => setAmount(e.target.value)} className="lf-input pl-7" />
          </div>
        </div>
        <button onClick={onSuccess} className="btn-primary w-full">Withdraw</button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Wallets Page
// ──────────────────────────────────────────────────────────────────────────────
export function WalletsPage() {
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [receipt, setReceipt] = useState<(typeof WALLET_TRANSACTIONS)[0] | null>(null);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const totalStats = [
    { label: "ALL WALLET", value: selectedMerchant ? "1" : "124" },
    { label: "TOTAL INFLOW", value: "₦ 534,000,000" },
    { label: "TOTAL OUTFLOW", value: "₦ 50,000,000" },
    { label: "TOTAL WALLET BALANCE", value: "₦ 584,000,000" },
  ];

  const { items: txItems, total: txTotal, totalPages: txPages } = paginate(WALLET_TRANSACTIONS, page);
  const { items: walletItems, total: wTotal, totalPages: wPages } = paginate(WALLET_ENTRIES, page);

  if (selectedMerchant) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Wallets</h1>
        {/* Merchant detail stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[["MERCHANT NAME","Adey Houses"],["TOTAL INFLOW","₦ 534,000,000"],["TOTAL WITHDRAWAL","₦ 50,000,000"],["TOTAL WALLET BALANCE","₦ 584,000,000"]].map(([l,v]) => (
            <div key={l} className="stat-card">
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">{l}</p>
              <p className={l === "MERCHANT NAME" ? "text-sm font-bold text-[#0D1B2A]" : "text-xl font-bold text-[#0D1B2A]"}>{v}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E5E7EB]">
            <h2 className="text-sm font-bold text-[#0D1B2A] uppercase tracking-wider">RECENT TRANSACTIONS</h2>
            <div className="flex gap-2">
              <div className="relative">
                <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-1.5 border border-[#E5E7EB] px-3 py-2 rounded-xl text-sm hover:border-[#0D1B2A] text-[#0D1B2A] font-medium">
                  <Filter size={14} />Filter<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {filterOpen && (
                  <div className="absolute right-0 top-11 bg-white border border-[#E5E7EB] rounded-xl shadow-modal z-10 w-52 p-4">
                    <p className="text-xs font-semibold text-[#6B7280] mb-3">Transaction Type</p>
                    <div className="mb-3">
                      <p className="text-xs text-[#6B7280] mb-2">Status</p>
                      {["Successful","Failed"].map(s => <label key={s} className="flex items-center gap-2 text-sm mb-1.5 cursor-pointer"><input type="checkbox" className="rounded" />{s}</label>)}
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] mb-2">From Date</p>
                      <div className="relative mb-2"><input type="date" defaultValue="2020-12-12" className="lf-input pr-9 text-xs" /></div>
                      <p className="text-xs text-[#6B7280] mb-2">To Date</p>
                      <div className="relative"><input type="date" defaultValue="2020-12-12" className="lf-input pr-9 text-xs" /></div>
                    </div>
                  </div>
                )}
              </div>
              <button className="flex items-center gap-1.5 border border-[#E5E7EB] px-3 py-2 rounded-xl text-sm hover:border-[#0D1B2A] text-[#0D1B2A] font-medium">
                <Download size={14} />Export
              </button>
            </div>
          </div>
          <div className="px-5 py-2">
            <SearchInput value="" onChange={() => {}} placeholder="Search" />
          </div>
          <table className="w-full">
            <thead><tr>{["TRANSACTION ID","AMOUNT","TYPE","STATUS","DATE"].map(h => <th key={h} className="table-th">{h}</th>)}</tr></thead>
            <tbody>
              {txItems.map(tx => (
                <tr key={tx.id} onClick={() => setReceipt(tx)} className="hover:bg-[#F9FAFB] transition-colors cursor-pointer">
                  <td className="table-td font-medium text-xs">{tx.transactionId}</td>
                  <td className="table-td font-semibold">{formatPrice(tx.amount)}</td>
                  <td className="table-td text-[#6B7280]">{tx.type}</td>
                  <td className="table-td"><Badge type={tx.status} /></td>
                  <td className="table-td text-[#6B7280]">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-[#E5E7EB]">
            <Pagination page={page} totalPages={txPages} total={txTotal} onChange={setPage} />
          </div>
        </div>
        {receipt && <ReceiptModal tx={receipt} onClose={() => setReceipt(null)} />}
        {showWithdraw && (
          <WithdrawModal onClose={() => setShowWithdraw(false)} onSuccess={() => { setShowWithdraw(false); setShowWithdrawSuccess(true); }} />
        )}
        {showWithdrawSuccess && (
          <InfoModal title="Withdrawal Successful" message="You have successfully withdrawn ₦ 250,000"
            onClose={() => setShowWithdrawSuccess(false)} />
        )}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Wallets</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {totalStats.map(s => (
          <div key={s.label} className="stat-card">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">{s.label}</p>
            <p className="text-xl font-bold text-[#0D1B2A]">{s.value}</p>
          </div>
        ))}
      </div>

      {walletItems.length === 0 ? (
        <div className="bg-white border border-[#E5E7EB] rounded-xl py-20 flex flex-col items-center">
          <div className="w-20 h-20 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-4"><span className="text-3xl">🔍</span></div>
          <p className="text-sm font-semibold text-[#0D1B2A]">No Merchant Wallet Found</p>
          <p className="text-xs text-[#6B7280] mt-1 text-center">No merchant wallet found. Your recent activity will show up here.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E5E7EB]">
            <SearchInput value="" onChange={() => {}} placeholder="Search" />
            <div className="flex gap-2 ml-3">
              <button className="flex items-center gap-1.5 border border-[#E5E7EB] px-3 py-2 rounded-xl text-sm hover:border-[#0D1B2A] text-[#0D1B2A] font-medium">
                <Filter size={14} />Filter<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <button className="flex items-center gap-1.5 border border-[#E5E7EB] px-3 py-2 rounded-xl text-sm hover:border-[#0D1B2A] text-[#0D1B2A] font-medium">
                <Download size={14} />Export
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead><tr>{["MERCHANT NAME","WALLET BALANCE","LAST UPDATE"].map(h => <th key={h} className="table-th">{h}</th>)}</tr></thead>
            <tbody>
              {walletItems.map(w => (
                <tr key={w.id} onClick={() => setSelectedMerchant(w.merchantName)} className="hover:bg-[#F9FAFB] transition-colors cursor-pointer">
                  <td className="table-td font-medium">{w.merchantName}</td>
                  <td className="table-td font-semibold">{formatPrice(w.walletBalance)}</td>
                  <td className="table-td text-[#6B7280]">{w.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-[#E5E7EB]">
            <Pagination page={page} totalPages={wPages} total={wTotal} onChange={setPage} />
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Audit Trail Page
// ──────────────────────────────────────────────────────────────────────────────
export function AuditPage() {
  const [hasData] = useState(true);
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const { items, total, totalPages } = paginate(AUDIT_ENTRIES, page);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Audit Trail</h1>
      {!hasData ? (
        <div className="bg-white border border-[#E5E7EB] rounded-xl py-20 flex flex-col items-center">
          <div className="w-20 h-20 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-4"><span className="text-3xl">🔍</span></div>
          <p className="text-sm font-semibold text-[#0D1B2A]">No Audit Trail</p>
          <p className="text-xs text-[#6B7280] mt-1">No audit trail found. Your recent activity will show up here.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E5E7EB]">
            <div className="flex-1"><SearchInput value="" onChange={() => {}} placeholder="Search" /></div>
            <div className="flex gap-2 ml-3 relative">
              <button onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-1.5 border border-[#E5E7EB] px-3 py-2 rounded-xl text-sm hover:border-[#0D1B2A] text-[#0D1B2A] font-medium">
                <Filter size={14} />Filter<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {filterOpen && (
                <div className="absolute right-20 top-11 bg-white border border-[#E5E7EB] rounded-xl shadow-modal z-10 w-52 p-4">
                  <Select label="Action Type" value="" onChange={() => {}} options={[{value:"kyb",label:"KYB"},{value:"user",label:"User"}]} />
                  <Select label="" value="" onChange={() => {}} placeholder="Admin" options={[{value:"admin",label:"Admin"},{value:"super",label:"Super Admin"}]} />
                  <div className="mt-3">
                    <p className="text-xs text-[#6B7280] mb-2">Status</p>
                    {["Successful","Failed"].map(s => <label key={s} className="flex items-center gap-2 text-sm mb-1.5 cursor-pointer"><input type="checkbox" className="rounded" />{s}</label>)}
                  </div>
                  <p className="text-xs text-[#6B7280] mt-3 mb-2">From Date</p>
                  <input type="date" defaultValue="2020-12-12" className="lf-input text-xs mb-2" />
                  <p className="text-xs text-[#6B7280] mb-2">To Date</p>
                  <input type="date" defaultValue="2020-12-12" className="lf-input text-xs" />
                </div>
              )}
              <button className="flex items-center gap-1.5 border border-[#E5E7EB] px-3 py-2 rounded-xl text-sm hover:border-[#0D1B2A] text-[#0D1B2A] font-medium">
                <Download size={14} />Export
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead><tr>{["ADMIN NAME","TYPE OF ACTION","STATUS","DATE"].map(h => <th key={h} className="table-th">{h}</th>)}</tr></thead>
            <tbody>
              {items.map(a => (
                <tr key={a.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="table-td font-medium">{a.adminName}</td>
                  <td className="table-td text-[#6B7280]">{a.typeOfAction}</td>
                  <td className="table-td"><Badge type={a.status} /></td>
                  <td className="table-td text-[#6B7280]">{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-[#E5E7EB]">
            <Pagination page={page} totalPages={totalPages} total={total} onChange={setPage} />
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// User Management Page
// ──────────────────────────────────────────────────────────────────────────────
function AddUserModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", level: "", role: "", status: "Active" });
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-modal p-6">
        <h3 className="text-base font-bold text-[#0D1B2A] mb-5">Add New User</h3>
        <div className="space-y-4">
          <div><label className="lf-label">Name</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Tolulope Afolayan |" className="lf-input" /></div>
          <div><label className="lf-label">Email Address</label><input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="tolulope@gmail.com" className="lf-input" /></div>
          <Select label="Admin Level" value={form.level} onChange={v => setForm(f => ({ ...f, level: v }))} placeholder="Select Admin Level"
            options={[{value:"super",label:"Super Admin"},{value:"admin",label:"Admin"}]} />
          <Select label="Roles" value={form.role} onChange={v => setForm(f => ({ ...f, role: v }))} placeholder="Select Roles"
            options={[{value:"merchant",label:"Create Merchant"},{value:"kyb",label:"Modify KYB"},{value:"product",label:"Flag Product"}]} />
          <Select label="Status" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} placeholder=""
            options={[{value:"Active",label:"Active"},{value:"Disable",label:"Disable"}]} />
          <button onClick={onSuccess} className="btn-primary w-full">Add New User</button>
        </div>
      </div>
    </div>
  );
}

function ModifyUserModal({ user, onClose }: { user: AdminUser; onClose: () => void }) {
  const [name, setName] = useState(user.name);
  const [level, setLevel] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(user.status);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-modal p-6">
        <h3 className="text-base font-bold text-[#0D1B2A] mb-1">Modify User</h3>
        <p className="text-xs text-[#6B7280] mb-5">Edit the fields below to modify a user</p>
        <div className="space-y-4">
          <div><label className="lf-label">Name</label><input value={name} onChange={e => setName(e.target.value)} className="lf-input" /></div>
          <div><label className="lf-label">Email Address</label><input value={user.email} readOnly className="lf-input opacity-60" /></div>
          <Select label="Admin Level" value={level} onChange={setLevel} placeholder="Select Admin Level"
            options={[{value:"super",label:"Super Admin"},{value:"admin",label:"Admin"}]} />
          <Select label="Roles" value={role} onChange={setRole} placeholder="Select Roles"
            options={[{value:"merchant",label:"Create Merchant"},{value:"kyb",label:"Modify KYB"},{value:"product",label:"Flag Product"}]} />
          <Select label="State" value={status} onChange={v => setStatus(v as any)}
            options={[{value:"active",label:"Active"},{value:"disabled",label:"Disable"}]} />
          <button onClick={onClose} className="btn-primary w-full">Update User</button>
        </div>
      </div>
    </div>
  );
}

export function UserManagementPage() {
  const [users] = useState<AdminUser[]>(ADMIN_USERS);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [modifyUser, setModifyUser] = useState<AdminUser | null>(null);
  const [modifySuccess, setModifySuccess] = useState(false);
  const [dropdownId, setDropdownId] = useState<string | null>(null);

  const statsData = [
    { label: "ALL USERS", value: String(users.length) },
    { label: "ACTIVE USERS", value: String(users.filter(u => u.status === "active").length) },
    { label: "DISABLED USERS", value: String(users.filter(u => u.status === "disabled").length) },
  ];

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  const { items, total, totalPages } = paginate(filtered, page);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">User Management</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {statsData.map(s => (
          <div key={s.label} className="stat-card">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">{s.label}</p>
            <p className="text-2xl font-bold text-[#0D1B2A]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E5E7EB]">
          <div className="flex-1"><SearchInput value={search} onChange={setSearch} placeholder="Search" /></div>
          <div className="flex gap-2 ml-3">
            <button className="flex items-center gap-1.5 border border-[#E5E7EB] px-3 py-2 rounded-xl text-sm text-[#0D1B2A] font-medium hover:border-[#0D1B2A]">
              <Filter size={14} />Filter<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <button className="flex items-center gap-1.5 border border-[#E5E7EB] px-3 py-2 rounded-xl text-sm text-[#0D1B2A] font-medium hover:border-[#0D1B2A]">
              <Download size={14} />Export
            </button>
            <button onClick={() => setAddModal(true)}
              className="flex items-center gap-1.5 bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
              <Plus size={14} />Add New User
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead><tr>{["ADMIN","EMAIL ADDRESS","ROLES","STATUS","LAST ACTIVE","ACTION"].map(h => <th key={h} className="table-th">{h}</th>)}</tr></thead>
          <tbody>
            {items.map(u => (
              <tr key={u.id} className="hover:bg-[#F9FAFB] transition-colors">
                <td className="table-td font-medium">{u.name}</td>
                <td className="table-td text-[#6B7280]">{u.email}</td>
                <td className="table-td capitalize">{u.role}</td>
                <td className="table-td"><Badge type={u.status} /></td>
                <td className="table-td text-[#6B7280]">{u.lastActive}</td>
                <td className="table-td relative">
                  <button onClick={() => setDropdownId(dropdownId === u.id ? null : u.id)}
                    className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical size={16} className="text-[#6B7280]" />
                  </button>
                  {dropdownId === u.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setDropdownId(null)} />
                      <div className="absolute right-4 top-8 bg-white border border-[#E5E7EB] rounded-xl shadow-modal z-20 w-36 py-1">
                        <button onClick={() => { setModifyUser(u); setDropdownId(null); }}
                          className="w-full text-left px-4 py-2.5 text-xs text-[#0D1B2A] hover:bg-[#F9FAFB] flex items-center gap-2">
                          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          Modify User
                        </button>
                        <button className="w-full text-left px-4 py-2.5 text-xs text-[#EF4444] hover:bg-[#FEF2F2] flex items-center gap-2">
                          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          Delete User
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-[#E5E7EB]">
          <Pagination page={page} totalPages={totalPages} total={total} onChange={setPage} />
        </div>
      </div>

      {addModal && (
        <AddUserModal onClose={() => setAddModal(false)}
          onSuccess={() => { setAddModal(false); setAddSuccess(true); }} />
      )}
      {addSuccess && (
        <InfoModal title="User Updated" message="You have successfully made changes on this user."
          onClose={() => setAddSuccess(false)} />
      )}
      {modifyUser && (
        <ModifyUserModal user={modifyUser} onClose={() => { setModifyUser(null); setModifySuccess(true); }} />
      )}
      {modifySuccess && (
        <InfoModal title="User Updated" message="You have successfully made changes on this user."
          onClose={() => setModifySuccess(false)} />
      )}
    </div>
  );
}
