import { useState } from "react";
import { Badge, Pagination, SearchInput, ConfirmModal, InfoModal, Toast } from "@/components/ui";
import { MERCHANTS } from "@/lib/mockData";
import { paginate, cn } from "@/lib/utils";
import { ChevronRight, Filter, Download } from "lucide-react";
import type { Merchant, KYBStatus } from "@/types";

const STATS = [
  { label: "TOTAL KYB", value: "259" },
  { label: "APPROVED KYB", value: "251" },
  { label: "PENDING KYB", value: "5" },
  { label: "REJECTED KYB", value: "3" },
];

const TABS = ["All KYB", "Approved KYB", "Pending KYB", "Rejected KYB"] as const;
type Tab = typeof TABS[number];

function KYBDetail({ merchant, onBack, onAccept, onReject }: {
  merchant: Merchant; onBack: () => void;
  onAccept: () => void; onReject: () => void;
}) {
  const docs = [
    { label: "Certificate of Incorporation", file: "Doc 23412.JPEG", size: "Certificate of Incorporation · 2.5KB" },
    { label: "Proof of Business Address (Utility Bill or Tenancy Agreement)", file: "Doc 23412.JPEG", size: "Proof of Address · 2.5KB" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
          <button onClick={onBack} className="hover:text-[#0D1B2A]">KYB</button>
          <ChevronRight size={12} />
          <span className="text-[#0D1B2A] font-medium">KYB Details</span>
        </div>
        <div className="flex gap-2">
          <button onClick={onAccept}
            className="flex items-center gap-1.5 border border-[#10B981] text-[#10B981] font-semibold px-4 py-2 rounded-xl text-sm hover:bg-[#D1FAE5] transition-colors">
            ✓ Accept
          </button>
          <button onClick={onReject}
            className="flex items-center gap-1.5 border border-[#EF4444] text-[#EF4444] font-semibold px-4 py-2 rounded-xl text-sm hover:bg-[#FEE2E2] transition-colors">
            ✕ Reject
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 mb-5">
        <div className="grid grid-cols-3 gap-8">
          <div><p className="text-xs text-[#4F7FAF] mb-1">Business Name</p><p className="text-base font-bold text-[#0D1B2A]">{merchant.name}</p></div>
          <div><p className="text-xs text-[#4F7FAF] mb-1">STATUS</p><Badge type="pending" /></div>
          <div><p className="text-xs text-[#4F7FAF] mb-1">Category</p><p className="text-sm font-medium text-[#0D1B2A]">{merchant.category}</p></div>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
        <div className="grid grid-cols-2 gap-10">
          <div>
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-4">BUSINESS INFORMATION</p>
            <div className="space-y-3">
              {[["Business Name", merchant.name],["RC Number", merchant.rcNumber],["Tax ID", merchant.taxId],
                ["Business Age", merchant.businessAge],["Business Type", merchant.businessType]].map(([l,v]) => (
                <div key={l} className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">{l}</span><span className="font-medium text-[#0D1B2A]">{v}</span>
                </div>
              ))}
            </div>
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mt-6 mb-4">ADDRESS INFORMATION</p>
            <div className="space-y-3">
              {[["Business Address", merchant.businessAddress],["Phone Number", merchant.phoneNumber]].map(([l,v]) => (
                <div key={l} className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">{l}</span><span className="font-medium text-[#0D1B2A]">{v}</span>
                </div>
              ))}
            </div>
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mt-6 mb-4">DIRECTOR DETAILS</p>
            <p className="text-xs font-semibold text-[#0D1B2A] mb-3">Director 1</p>
            <div className="space-y-3">
              {[["Name", merchant.directorName],["BVN", merchant.directorBvn],["NIN", merchant.directorNin]].map(([l,v]) => (
                <div key={l} className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">{l}</span><span className="font-medium text-[#0D1B2A]">{v}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm"><span className="text-[#6B7280]">NIN Document</span></div>
            </div>
          </div>
          <div>
            {docs.map((doc, i) => (
              <div key={i} className="mb-5">
                <p className="text-xs text-[#6B7280] mb-2">{doc.label}</p>
                <div className="flex items-center justify-between bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#EEF3F8] rounded-lg flex items-center justify-center"><span className="text-xs">📄</span></div>
                    <div><p className="text-xs font-semibold text-[#0D1B2A]">{doc.file}</p><p className="text-[10px] text-[#6B7280]">{doc.size}</p></div>
                  </div>
                  <button className="flex items-center gap-1 bg-[#0D1B2A] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#1a2d40]">📋 View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KYBPage() {
  const [tab, setTab] = useState<Tab>("All KYB");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Merchant | null>(null);
  const [modal, setModal] = useState<"accept_confirm"|"accepted"|"reject_confirm"|"rejected"|null>(null);
  const [toast, setToast] = useState("");

  const filtered = MERCHANTS.filter(m => {
    if (tab === "Approved KYB") return m.kybStatus === "approved";
    if (tab === "Pending KYB") return m.kybStatus === "pending";
    if (tab === "Rejected KYB") return m.kybStatus === "rejected";
    return true;
  }).filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  const { items, total, totalPages } = paginate(filtered, page);

  if (selected) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">KYB</h1>
        <KYBDetail merchant={selected}
          onBack={() => setSelected(null)}
          onAccept={() => setModal("accept_confirm")}
          onReject={() => setModal("reject_confirm")} />

        {modal === "accept_confirm" && (
          <ConfirmModal icon="info" title="Accept KYB?"
            message="Are you sure you want to approve this KYB submission?"
            onCancel={() => setModal(null)} onConfirm={() => setModal("accepted")}
            cancelLabel="Cancel" confirmLabel="Accept" />
        )}
        {modal === "accepted" && (
          <InfoModal title="KYB Approved" message="This merchant's KYB has been successfully approved."
            onClose={() => { setModal(null); setSelected(null); setToast("KYB approved successfully."); }} />
        )}
        {modal === "reject_confirm" && (
          <ConfirmModal icon="warning" title="Reject KYB?"
            message="Are you sure you want to reject this KYB submission? The merchant will be notified."
            onCancel={() => setModal(null)} onConfirm={() => setModal("rejected")}
            cancelLabel="Cancel" confirmLabel="Reject" />
        )}
        {modal === "rejected" && (
          <InfoModal title="KYB Rejected" message="This merchant's KYB has been rejected."
            onClose={() => { setModal(null); setSelected(null); setToast("KYB rejected."); }} />
        )}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">KYB</h1>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {STATS.map(s => (
          <div key={s.label} className="stat-card">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">{s.label}</p>
            <p className="text-2xl font-bold text-[#0D1B2A]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[#E5E7EB] px-5">
          {TABS.map(t => (
            <button key={t} onClick={() => { setTab(t); setPage(1); }}
              className={cn("py-3.5 px-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                t === tab ? "border-[#0D1B2A] text-[#0D1B2A]" : "border-transparent text-[#9CA3AF] hover:text-[#6B7280]")}>
              {t}
              {t === "Pending KYB" && <span className="ml-1 w-5 h-5 bg-[#E8392A] text-white text-[10px] font-bold rounded-full inline-flex items-center justify-center">3</span>}
            </button>
          ))}
        </div>

        {/* Search + controls */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-[#F3F4F6]">
          <div className="flex-1"><SearchInput value={search} onChange={setSearch} placeholder="Search" /></div>
          <button className="flex items-center gap-1.5 border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm hover:border-[#0D1B2A] text-[#0D1B2A] font-medium">
            <Filter size={14} />Filter<ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-1.5 border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm hover:border-[#0D1B2A] text-[#0D1B2A] font-medium">
            <Download size={14} />Export
          </button>
        </div>

        <table className="w-full">
          <thead><tr>
            {["MERCHANT NAME","MERCHANT ID","CATEGORY","KYB STATUS","REGISTRATION DATE"].map(h => <th key={h} className="table-th">{h}</th>)}
          </tr></thead>
          <tbody>
            {items.map(m => (
              <tr key={m.id} onClick={() => setSelected(m)} className="hover:bg-[#F9FAFB] transition-colors cursor-pointer">
                <td className="table-td font-medium">{m.name}</td>
                <td className="table-td text-[#6B7280]">{m.merchantId}</td>
                <td className="table-td text-[#6B7280]">{m.category}</td>
                <td className="table-td"><Badge type={m.kybStatus} /></td>
                <td className="table-td text-[#6B7280]">{m.registrationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-[#E5E7EB]">
          <Pagination page={page} totalPages={totalPages} total={total} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}

function ChevronDown({ size }: { size: number }) {
  return <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
}
