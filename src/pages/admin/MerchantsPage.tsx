import { useState } from "react";
import { Badge, Pagination, SearchInput, InfoModal, Toast, Select } from "@/components/ui";
import { MERCHANTS, formatPrice } from "@/lib/mockData";
import { paginate, cn } from "@/lib/utils";
import { ArrowLeft, CalendarDays, ChevronDown, ChevronRight, Plus, Filter, Download, X } from "lucide-react";
import type { Merchant, KYBStatus } from "@/types";

const STATS = [
  { label: "TOTAL MERCHANTS", value: "259" },
  { label: "ACTIVE MERCHANTS", value: "251" },
  { label: "PENDING MERCHANTS", value: "5" },
  { label: "DEACTIVATED MERCHANTS", value: "3" },
];

const TABS = ["All Merchants", "Active Merchants", "Pending Merchants", "Rejected Merchants"] as const;
type Tab = typeof TABS[number];

// ── Create Merchant 4-step form ───────────────────────────────────────────────
const FORM_STEPS = ["Business Details", "Address Information", "Documents", "Directors & Shareholder Details"];

function CreateMerchantStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex flex-col gap-0 mr-8 w-44 flex-shrink-0">
      {FORM_STEPS.map((label, i) => (
        <div key={label} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className={cn("w-3 h-3 rounded-full border-2 mt-0.5 flex-shrink-0",
              i < currentStep ? "bg-[#10B981] border-[#10B981]"
              : i === currentStep ? "bg-[#0D1B2A] border-[#0D1B2A]"
              : "bg-white border-[#E5E7EB]")} />
            {i < FORM_STEPS.length - 1 && (
              <div className={cn("w-0.5 h-8 mt-0.5", i < currentStep ? "bg-[#10B981]" : "bg-[#E5E7EB]")} />
            )}
          </div>
          <p className={cn("text-xs pt-0 leading-tight", i === currentStep ? "font-semibold text-[#0D1B2A]" : i < currentStep ? "text-[#10B981]" : "text-[#9CA3AF]")}>
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

function StepBusinessDetails({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex-1">
      <h2 className="text-xl font-bold text-[#0D1B2A] mb-1">Business Registration Details</h2>
      <p className="text-xs text-[#6B7280] mb-6">Provide business registration details for merchant</p>
      <div className="space-y-4 max-w-lg">
        <div><label className="lf-label">Registered Business Name *</label><input defaultValue="Adekay Houses" className="lf-input" /></div>
        <p className="flex items-center gap-1.5 text-xs text-[#6B7280] -mt-2">
          <span className="w-4 h-4 bg-[#3B82F6] rounded-full text-white text-[9px] flex items-center justify-center font-bold flex-shrink-0">i</span>
          As stated in CAC document
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="lf-label">RC Number *</label><input defaultValue="123456890" className="lf-input" /></div>
          <div><label className="lf-label">Tax ID *</label><input defaultValue="TIN-123456890" className="lf-input" /></div>
          <div><label className="lf-label">RC Number *</label><input defaultValue="123456890" className="lf-input" /></div>
          <div>
            <label className="lf-label">Date of Registration/Incorporation</label>
            <div className="relative"><input type="date" defaultValue="2020-12-12" className="lf-input pr-9" />
              <CalendarDays size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" /></div>
          </div>
        </div>
        <Select label="Business Age *" value="" onChange={() => {}} placeholder="Select Age Range"
          options={["0-1 year","1-3 years","3-5 years","5+ years"].map(o => ({ value: o, label: o }))} />
        <Select label="Business Type *" value="" onChange={() => {}} placeholder="Select Type"
          options={["Accomodation","Security","Mobility"].map(o => ({ value: o, label: o }))} />
        <Select label="Expected Monthly Transaction Volume *" value="" onChange={() => {}} placeholder="Select Option"
          options={["Below ₦1M","₦1M-₦10M","₦10M-₦50M","Above ₦50M"].map(o => ({ value: o, label: o }))} />
        <div className="flex gap-3 pt-2">
          <button className="btn-outline flex-none px-8">Back</button>
          <button onClick={onNext} className="btn-primary flex-1">Next</button>
        </div>
      </div>
    </div>
  );
}

function StepAddressInfo({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="flex-1">
      <h2 className="text-xl font-bold text-[#0D1B2A] mb-1">Address Information</h2>
      <p className="text-xs text-[#6B7280] mb-6">Provide details about business contact and address</p>
      <div className="space-y-4 max-w-lg">
        <div>
          <label className="lf-label">Business Address *</label>
          <input defaultValue="30, Victoria Island Lekki" className="lf-input" />
          <p className="flex items-center gap-1.5 text-xs text-[#6B7280] mt-1">
            <span className="w-4 h-4 bg-[#3B82F6] rounded-full text-white text-[9px] flex items-center justify-center font-bold flex-shrink-0">i</span>
            Requires supporting evidence – to be uploaded in the next section
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select label="State *" value="" onChange={() => {}} placeholder="Select Item" options={["Lagos","Abuja","Rivers","Kano"].map(o => ({ value: o, label: o }))} />
          <Select label="City *" value="" onChange={() => {}} placeholder="Select Item" options={["Lekki","Ikeja","VI","Yaba"].map(o => ({ value: o, label: o }))} />
        </div>
        <div><label className="lf-label">Company Website</label><input defaultValue="www.addyhomes.net" className="lf-input" /></div>
        <div><label className="lf-label">Email Address *</label><input defaultValue="addyhomes@workpl.net" className="lf-input" /></div>
        <div>
          <label className="lf-label">Phone Number</label>
          <div className="flex gap-2">
            <span className="bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm flex items-center gap-1">🇳🇬 +234 <ChevronDown size={12} /></span>
            <input defaultValue="8023456789" className="lf-input flex-1" />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onBack} className="btn-outline flex-none px-8">Back</button>
          <button onClick={onNext} className="btn-primary flex-1">Next</button>
        </div>
      </div>
    </div>
  );
}

function StepDocuments({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const docs = [
    { label: "Certificate of Incorporation(PDF/JPEG) *", hint: "" },
    { label: "Proof of Business Address (Utility Bill or Tenancy Agreement) *", hint: "Must be issued within the last 3 months)" },
    { label: "MEMART", hint: "Memorandum & Articles of Association (MEMART) or Company Status Report (PDF Only)" },
  ];
  return (
    <div className="flex-1">
      <h2 className="text-xl font-bold text-[#0D1B2A] mb-1">Business Documents</h2>
      <p className="text-xs text-[#6B7280] mb-6">Attach required business documents</p>
      <div className="space-y-5 max-w-lg">
        {docs.map((doc, i) => (
          <div key={i}>
            <label className="lf-label">{doc.label}</label>
            <div className="flex gap-2">
              <input placeholder="Select Item" className="lf-input flex-1" readOnly />
              <button className="bg-[#0D1B2A] text-white font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-[#1a2d40]">Browse</button>
            </div>
            {doc.hint && (
              <p className="flex items-center gap-1.5 text-xs text-[#6B7280] mt-1">
                <span className="w-4 h-4 bg-[#3B82F6] rounded-full text-white text-[9px] flex items-center justify-center font-bold flex-shrink-0">i</span>
                {doc.hint}
              </p>
            )}
          </div>
        ))}
        <div className="flex gap-3 pt-2">
          <button onClick={onBack} className="btn-outline flex-none px-8">Back</button>
          <button onClick={onNext} className="btn-primary flex-1">Next</button>
        </div>
      </div>
    </div>
  );
}

function StepDirectors({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  return (
    <div className="flex-1">
      <h2 className="text-xl font-bold text-[#0D1B2A] mb-1">Directors & Beneficial Owners</h2>
      <p className="text-xs text-[#6B7280] mb-6">Provide information about the company's directors & stakeholders, minimum of two (2) entries.</p>
      <div className="space-y-4 max-w-lg">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="lf-label">First Name *</label><input defaultValue="Tolulope" className="lf-input" /></div>
          <div><label className="lf-label">Last Name *</label><input defaultValue="Afolayan" className="lf-input" /></div>
          <div><label className="lf-label">BVN *</label><input defaultValue="123456890" className="lf-input" /></div>
          <div><label className="lf-label">NIN *</label><input defaultValue="123456890" className="lf-input" /></div>
        </div>
        <div>
          <label className="lf-label">NIN Document</label>
          <div className="flex gap-2"><input placeholder="Select Item" className="lf-input flex-1" readOnly />
            <button className="bg-[#0D1B2A] text-white font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-[#1a2d40]">Browse</button></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="lf-label">Phone Number</label>
            <div className="flex gap-2">
              <span className="bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm flex items-center gap-1">🇳🇬 +234 <ChevronDown size={12} /></span>
              <input defaultValue="8023456789" className="lf-input flex-1" />
            </div>
          </div>
          <div><label className="lf-label">Date of Birth</label>
            <div className="relative"><input type="date" defaultValue="2020-12-12" className="lf-input pr-9" />
              <CalendarDays size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" /></div></div>
          <div><label className="lf-label">Percentage Ownership(%)</label><input defaultValue="2" className="lf-input" />
            <p className="flex items-center gap-1 text-xs text-[#6B7280] mt-1"><span className="w-4 h-4 bg-[#3B82F6] rounded-full text-white text-[9px] flex items-center justify-center font-bold">i</span>Leave if not applicable</p></div>
        </div>
        <Select label="Source of Funds / Business Revenue *" value="" onChange={() => {}} placeholder="Select Option"
          options={["Salary","Business","Investment","Others"].map(o => ({ value: o, label: o }))} />
        <Select label="Politically Exposed Person(PEP) *" value="" onChange={() => {}} placeholder="Select Item"
          options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} />
        <p className="flex items-start gap-1.5 text-xs text-[#6B7280]">
          <span className="w-4 h-4 bg-[#3B82F6] rounded-full text-white text-[9px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">i</span>
          Is the Beneficial Owner, Director, immediate family member, or close associate a Politically Exposed Person (PEP)? Yes / No. If Yes, provide details.
        </p>
        <div className="flex gap-3 pt-2">
          <button onClick={onBack} className="btn-outline flex-none px-8">Back</button>
          <button onClick={onSubmit} className="btn-primary flex-1">Submit</button>
        </div>
      </div>
    </div>
  );
}

// ── Merchant Detail ───────────────────────────────────────────────────────────
function MerchantDetail({ merchant, onBack }: { merchant: Merchant; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("Business Information");
  const tabs = ["Business Information", "Bookings", "Transactions", "Products"];
  const docs = [
    { label: "Certificate of Incorporation", file: "Doc 23412.JPEG", size: "Certificate of Incorporation · 2.5KB" },
    { label: "Proof of Business Address (Utility Bill or Tenancy Agreement)", file: "Doc 23412.JPEG", size: "Proof of Address · 2.5KB" },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-5">
        <button onClick={onBack} className="hover:text-[#0D1B2A]">Merchants</button>
        <ChevronRight size={12} />
        <span className="text-[#0D1B2A] font-medium">Merchant Details</span>
      </div>

      {/* Header card */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 mb-5">
        <div className="grid grid-cols-3 gap-8">
          <div><p className="text-xs text-[#6B7280] mb-1">Business Name</p><p className="text-base font-bold text-[#0D1B2A]">{merchant.name}</p></div>
          <div><p className="text-xs text-[#6B7280] mb-1">STATUS</p><Badge type="awaiting" label="Awaiting" /></div>
          <div><p className="text-xs text-[#6B7280] mb-1">Category</p><p className="text-sm font-medium text-[#0D1B2A]">{merchant.category}</p></div>
        </div>
      </div>

      {/* Tabs + content */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
        <div className="flex border-b border-[#E5E7EB] px-5">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={cn("py-3.5 px-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                activeTab === t ? "border-[#0D1B2A] text-[#0D1B2A]" : "border-transparent text-[#9CA3AF] hover:text-[#6B7280]")}>
              {t}
            </button>
          ))}
        </div>
        {activeTab === "Business Information" && (
          <div className="p-6 grid grid-cols-2 gap-10">
            <div>
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-4">BUSINESS INFORMATION</p>
              <div className="space-y-3">
                {[["Business Name", merchant.name],["RC Number", merchant.rcNumber],["Tax ID", merchant.taxId],
                  ["Business Age", merchant.businessAge],["Business Type", merchant.businessType]].map(([l,v]) => (
                  <div key={l} className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">{l}</span>
                    <span className="font-medium text-[#0D1B2A]">{v}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mt-6 mb-4">ADDRESS INFORMATION</p>
              <div className="space-y-3">
                {[["Business Address", merchant.businessAddress],["Phone Number", merchant.phoneNumber]].map(([l,v]) => (
                  <div key={l} className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">{l}</span>
                    <span className="font-medium text-[#0D1B2A]">{v}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mt-6 mb-4">DIRECTOR DETAILS</p>
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#0D1B2A]">Director 1</p>
                {[["Name", merchant.directorName],["BVN", merchant.directorBvn],["NIN", merchant.directorNin]].map(([l,v]) => (
                  <div key={l} className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">{l}</span>
                    <span className="font-medium text-[#0D1B2A]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-4">DOCUMENTS</p>
              {docs.map((doc, i) => (
                <div key={i} className="mb-4">
                  <p className="text-xs text-[#6B7280] mb-2">{doc.label}</p>
                  <div className="flex items-center justify-between bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#EEF3F8] rounded-lg flex items-center justify-center">
                        <span className="text-[#0D1B2A] text-xs">📄</span>
                      </div>
                      <div><p className="text-xs font-semibold text-[#0D1B2A]">{doc.file}</p><p className="text-[10px] text-[#6B7280]">{doc.size}</p></div>
                    </div>
                    <button className="flex items-center gap-1 bg-[#0D1B2A] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#1a2d40]">
                      📋 View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab !== "Business Information" && (
          <div className="p-8 text-center text-[#9CA3AF] text-sm">{activeTab} data will appear here</div>
        )}
      </div>
    </div>
  );
}

// ── Invite Merchant dropdown ──────────────────────────────────────────────────
function InviteModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  return (
    <div className="absolute right-0 top-12 z-20 bg-white border border-[#E5E7EB] rounded-2xl shadow-modal w-80 p-5">
      <h3 className="text-base font-bold text-[#0D1B2A] mb-1">Invite Merchant</h3>
      <p className="text-xs text-[#6B7280] mb-4">Please fill in the fields below to invite a new merchant</p>
      <div className="space-y-3">
        <div><label className="lf-label">Name</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Tolulope Afolayan |" className="lf-input" /></div>
        <div><label className="lf-label">Email Address</label><input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="tolulope@gmail.com" className="lf-input" /></div>
        <div>
          <label className="lf-label">Phone Number</label>
          <div className="flex gap-2">
            <span className="bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm flex items-center gap-1">🇳🇬 +234 <ChevronDown size={12} /></span>
            <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="8023456789" className="lf-input flex-1" />
          </div>
        </div>
        <button onClick={onSuccess} className="btn-primary w-full">Send Invitation</button>
      </div>
    </div>
  );
}

// ── Main Merchants Page ───────────────────────────────────────────────────────
type View = "list" | "create" | "detail";

export default function MerchantsPage() {
  const [view, setView] = useState<View>("list");
  const [selected, setSelected] = useState<Merchant | null>(null);
  const [createStep, setCreateStep] = useState(0);
  const [tab, setTab] = useState<Tab>("All Merchants");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [showInviteType, setShowInviteType] = useState(false);
  const [toast, setToast] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const filtered = MERCHANTS.filter(m => {
    if (tab === "Active Merchants") return m.status === "active";
    if (tab === "Pending Merchants") return m.status === "pending";
    if (tab === "Rejected Merchants") return m.kybStatus === "rejected";
    return true;
  }).filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  const { items, total, totalPages } = paginate(filtered, page);

  if (view === "detail" && selected) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Merchants</h1>
        <MerchantDetail merchant={selected} onBack={() => { setView("list"); setSelected(null); }} />
      </div>
    );
  }

  if (view === "create") {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A] mb-4">Merchants</h1>
        <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-6">
          <button onClick={() => { setView("list"); setCreateStep(0); }} className="hover:text-[#0D1B2A]">Merchant</button>
          <ChevronRight size={12} />
          <span className="text-[#0D1B2A] font-medium">Create New Merchant</span>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 flex gap-6 min-h-[500px]">
          <CreateMerchantStepper currentStep={createStep} />
          <div className="flex-1">
            {createStep === 0 && <StepBusinessDetails onNext={() => setCreateStep(1)} />}
            {createStep === 1 && <StepAddressInfo onBack={() => setCreateStep(0)} onNext={() => setCreateStep(2)} />}
            {createStep === 2 && <StepDocuments onBack={() => setCreateStep(1)} onNext={() => setCreateStep(3)} />}
            {createStep === 3 && <StepDirectors onBack={() => setCreateStep(2)} onSubmit={() => setShowConfirmModal(true)} />}
          </div>
        </div>
        {showConfirmModal && (
          <InfoModal title="Awaiting Confirmation"
            message="An email has been sent to merchant to confirm account creation."
            btnLabel="View Merchant Dashboard"
            onClose={() => { setShowConfirmModal(false); setView("list"); setCreateStep(0); setToast("You have successfully created a new merchant account."); }} />
        )}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Merchants</h1>
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

      {/* Table card */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[#E5E7EB] px-5">
          {TABS.map(t => (
            <button key={t} onClick={() => { setTab(t); setPage(1); }}
              className={cn("py-3.5 px-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
                t === tab ? "border-[#0D1B2A] text-[#0D1B2A]" : "border-transparent text-[#9CA3AF] hover:text-[#6B7280]")}>
              {t}
              {t === "Pending Merchants" && <span className="ml-1 w-5 h-5 bg-[#E8392A] text-white text-[10px] font-bold rounded-full inline-flex items-center justify-center">3</span>}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-[#F3F4F6]">
          <div className="flex-1"><SearchInput value={search} onChange={setSearch} placeholder="Search" /></div>
          <button className="flex items-center gap-1.5 border border-[#E5E7EB] text-[#0D1B2A] font-medium px-4 py-2.5 rounded-xl text-sm hover:border-[#0D1B2A]">
            <Filter size={14} />Filter<ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-1.5 border border-[#E5E7EB] text-[#0D1B2A] font-medium px-4 py-2.5 rounded-xl text-sm hover:border-[#0D1B2A]">
            <Download size={14} />Export
          </button>
          <div className="relative">
            <button onClick={() => setShowInviteType(!showInviteType)}
              className="flex items-center gap-1.5 bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
              <Plus size={14} />Create Merchant<ChevronDown size={14} />
            </button>
            {showInviteType && (
              <div className="absolute right-0 top-11 bg-white border border-[#E5E7EB] rounded-xl shadow-modal z-10 w-44 py-1">
                {["Create By Invitation","Create Manually"].map(opt => (
                  <button key={opt} onClick={() => { setShowInviteType(false); if (opt === "Create Manually") setView("create"); else setShowInvite(true); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-[#0D1B2A] hover:bg-[#F9FAFB]">{opt}</button>
                ))}
              </div>
            )}
            {showInvite && (
              <InviteModal onClose={() => setShowInvite(false)}
                onSuccess={() => { setShowInvite(false); setToast("You have successfully sent an invitation to add a new user."); }} />
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 flex flex-col items-center">
            <div className="w-20 h-20 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <p className="text-sm font-semibold text-[#0D1B2A]">No Merchant Found</p>
            <p className="text-xs text-[#6B7280] mt-1">No merchant found. Your recent activity will show up here.</p>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead><tr>
                {["MERCHANT NAME","MERCHANT ID","CATEGORY","KYB STATUS","REGISTRATION DATE"].map(h => <th key={h} className="table-th">{h}</th>)}
              </tr></thead>
              <tbody>
                {items.map(m => (
                  <tr key={m.id} onClick={() => { setSelected(m); setView("detail"); }}
                    className="hover:bg-[#F9FAFB] transition-colors cursor-pointer">
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
          </>
        )}
      </div>
    </div>
  );
}
