import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X, AlertTriangle, Info, Check } from "lucide-react";

// ── Logo ──────────────────────────────────────────────────────────────────────
export function Logo({ showAdmin = false }: { showAdmin?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 bg-[#0D1B2A] rounded-sm flex-shrink-0" />
      <span className="font-bold text-[#0D1B2A] text-base whitespace-pre">Lunar Fortis</span>
      {showAdmin && (
        <span className="text-xs font-medium border border-[#0D1B2A] text-[#0D1B2A] px-2 py-0.5 rounded-full">Admin</span>
      )}
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
type BadgeType = "approved" | "pending" | "rejected" | "active" | "disabled" | "awaiting" | "successful" | "failed";
const BADGE_MAP: Record<BadgeType, { cls: string; dot: string; label: string }> = {
  approved:   { cls: "badge-approved", dot: "bg-[#10B981]", label: "Approved" },
  pending:    { cls: "badge-pending",  dot: "bg-[#F59E0B]", label: "Pending" },
  rejected:   { cls: "badge-rejected", dot: "bg-[#EF4444]", label: "Rejected" },
  active:     { cls: "badge-active",   dot: "bg-[#10B981]", label: "Active" },
  disabled:   { cls: "badge-disabled", dot: "bg-[#EF4444]", label: "Disabled" },
  awaiting:   { cls: "badge-awaiting", dot: "bg-[#3B82F6]", label: "Awaiting" },
  successful: { cls: "badge-success",  dot: "bg-[#10B981]", label: "Successful" },
  failed:     { cls: "badge-failed",   dot: "bg-[#EF4444]", label: "Failed" },
};

export function Badge({ type, label }: { type: BadgeType; label?: string }) {
  const cfg = BADGE_MAP[type];
  return (
    <span className={cfg.cls}>
      <span className={cn("w-1.5 h-1.5 rounded-full inline-block", cfg.dot)} />
      {label ?? cfg.label}
    </span>
  );
}

// ── OTP Input ─────────────────────────────────────────────────────────────────
export function OTPInput({ length = 6, value, onChange }: {
  length?: number; value: string[]; onChange: (v: string[]) => void;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const handle = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return;
    const next = [...value]; next[i] = v.slice(-1); onChange(next);
    if (v && i < length - 1) refs.current[i + 1]?.focus();
  };
  const onKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus();
  };
  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, i) => (
        <input key={i} ref={el => { refs.current[i] = el; }} type="text"
          inputMode="numeric" maxLength={1} value={value[i] || ""}
          onChange={e => handle(i, e.target.value)} onKeyDown={e => onKey(i, e)}
          className="otp-box" />
      ))}
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────
export function Pagination({ page, totalPages, total, perPage = 10, onChange }: {
  page: number; totalPages: number; total: number; perPage?: number; onChange: (p: number) => void;
}) {
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);
  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, 4);
      if (page > 5) pages.push("...");
      pages.push("...", totalPages);
    }
    return pages;
  };
  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <span className="text-xs text-[#6B7280]">{start} - {end} of {total}</span>
      <div className="flex items-center gap-1">
        <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#E5E7EB] disabled:opacity-40 hover:bg-gray-50">
          <ChevronLeft size={14} />
        </button>
        {visiblePages().map((p, i) =>
          p === "..." ? (
            <span key={`d-${i}`} className="w-7 h-7 flex items-center justify-center text-xs text-[#6B7280]">...</span>
          ) : (
            <button key={p} onClick={() => onChange(p as number)}
              className={cn("w-7 h-7 text-xs font-medium rounded-lg transition-colors",
                p === page ? "bg-[#0D1B2A] text-white" : "border border-[#E5E7EB] hover:bg-gray-50 text-[#0D1B2A]")}>
              {p}
            </button>
          )
        )}
        <button onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#E5E7EB] disabled:opacity-40 hover:bg-gray-50">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Modal backdrop ────────────────────────────────────────────────────────────
export function Modal({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-sm shadow-modal">
        {children}
      </div>
    </div>
  );
}

export function InfoModal({ title, message, onClose, btnLabel = "Close" }: {
  title: string; message: string; onClose: () => void; btnLabel?: string;
}) {
  return (
    <Modal>
      <div className="p-6">
        <div className="w-16 h-16 rounded-full bg-[#EEF3F8] flex items-center justify-center mx-auto mb-4">
          <Info size={28} className="text-[#0D1B2A]" />
        </div>
        <h3 className="text-base font-bold text-[#0D1B2A] text-center mb-2">{title}</h3>
        <p className="text-xs text-[#6B7280] text-center mb-5">{message}</p>
        <button onClick={onClose} className="btn-primary w-full">{btnLabel}</button>
      </div>
    </Modal>
  );
}

export function ConfirmModal({ icon="info", title, message, onCancel, onConfirm,
  cancelLabel="Cancel", confirmLabel="Confirm" }: {
  icon?: "info"|"warning"; title: string; message: string;
  onCancel: () => void; onConfirm: () => void; cancelLabel?: string; confirmLabel?: string;
}) {
  return (
    <Modal>
      <div className="p-6">
        <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
          icon === "warning" ? "bg-[#FEE2E2]" : "bg-[#EEF3F8]")}>
          {icon === "warning" ? <AlertTriangle size={28} className="text-[#EF4444]" /> : <Info size={28} className="text-[#0D1B2A]" />}
        </div>
        <h3 className="text-base font-bold text-[#0D1B2A] text-center mb-2">{title}</h3>
        <p className="text-xs text-[#6B7280] text-center mb-5">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 border border-[#E5E7EB] text-[#0D1B2A] font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50">{cancelLabel}</button>
          <button onClick={onConfirm} className="flex-1 bg-[#0D1B2A] text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-[#1a2d40]">{confirmLabel}</button>
        </div>
      </div>
    </Modal>
  );
}

// ── Select ────────────────────────────────────────────────────────────────────
export function Select({ label, value, onChange, options, placeholder = "Select" }: {
  label?: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder?: string;
}) {
  return (
    <div>
      {label && <label className="lf-label">{label}</label>}
      <div className="relative">
        <select value={value} onChange={e => onChange(e.target.value)} className="lf-input appearance-none pr-8 cursor-pointer">
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

// ── Toast notification ────────────────────────────────────────────────────────
export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 shadow-modal max-w-xs">
      <div className="w-5 h-5 bg-[#D1FAE5] rounded-full flex items-center justify-center flex-shrink-0">
        <Check size={12} className="text-[#10B981]" strokeWidth={2.5} />
      </div>
      <p className="text-sm text-[#0D1B2A] flex-1">{message}</p>
      <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#0D1B2A]"><X size={14} /></button>
    </div>
  );
}

// ── Search ────────────────────────────────────────────────────────────────────
export function SearchInput({ value, onChange, placeholder = "Search" }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35"/>
      </svg>
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} className="lf-input pl-9" />
    </div>
  );
}
