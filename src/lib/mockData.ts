import type {
  Merchant, WalletEntry, WalletTransaction,
  AuditEntry, AdminUser, MerchantLocation,
} from "@/types";

export const formatPrice = (n: number) => `₦ ${n.toLocaleString("en-NG")}`;

const CATS: Merchant["category"][] = ["Accomodation", "Security", "Mobility"];
const KYB_STATUSES: Merchant["kybStatus"][] = ["approved", "approved", "approved", "pending", "rejected"];

export const MERCHANTS: Merchant[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  merchantId: "MD-1234",
  name: ["Adekay Houses", "Luna Securities", "Minkail Autos", "Auto Giell", "Darry Lets"][i % 5],
  category: CATS[i % 3],
  kybStatus: KYB_STATUSES[i % 5],
  status: i === 3 ? "pending" : i === 6 ? "deactivated" : "active",
  registrationDate: "09 April 2026, 10:45 AM",
  rcNumber: "123456890",
  taxId: "TIN-123456890",
  businessAge: "3 years",
  businessType: CATS[i % 3],
  businessAddress: "30, Victoria Island Lekki",
  phoneNumber: "08109232345",
  directorName: "Tolulope Afolayan",
  directorBvn: "123456890",
  directorNin: "123456890",
}));

export const WALLET_ENTRIES: WalletEntry[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  merchantName: "Adey Houses",
  walletBalance: 250000000,
  totalInflow: 534000000,
  totalWithdrawal: 50000000,
  lastUpdate: "Jan 18, 2026 · 14:32",
}));

export const WALLET_TRANSACTIONS: WalletTransaction[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  transactionId: "T2308Y78123456",
  amount: i % 3 === 0 ? 250000000 : i % 3 === 1 ? 95000000 : 206000000,
  type: i === 2 ? "Withdrawal" : "Credit",
  status: i === 1 ? "failed" : "successful",
  date: "Jan 18, 2026 · 14:32",
}));

export const AUDIT_ENTRIES: AuditEntry[] = Array.from({ length: 14 }, (_, i) => ({
  id: String(i + 1),
  adminName: i % 2 === 0 ? "Tolulope Afolayan" : i % 3 === 0 ? "Admin 2" : "Admin 1",
  typeOfAction: i % 2 === 0 ? "Approved KYB" : "Rejected KYB",
  status: "successful",
  date: "Jan 18, 2026 · 14:32",
}));

export const ADMIN_USERS: AdminUser[] = [
  { id: "1", name: "Tolulope Afolayan", email: "tolulope032@gmail.com", role: "Super Admin", status: "active", lastActive: "09 April 2026, 10:45 AM" },
  { id: "2", name: "Andrew Philip", email: "tolulope032@gmail.com", role: "Admin", status: "active", lastActive: "09 April 2026, 10:45 AM" },
  { id: "3", name: "Jonathan Peace", email: "tolulope032@gmail.com", role: "Admin", status: "active", lastActive: "09 April 2026, 10:45 AM" },
  { id: "4", name: "Gregory Allan", email: "tolulope123@gmail.com", role: "Admin", status: "disabled", lastActive: "09 April 2026, 10:45 AM" },
];

export const MERCHANT_LOCATIONS: MerchantLocation[] = [
  { city: "Lagos", count: 231, max: 231 },
  { city: "Kaduna", count: 156, max: 231 },
  { city: "Jos", count: 109, max: 231 },
  { city: "Awka", count: 156, max: 231 },
  { city: "Benin", count: 156, max: 231 },
  { city: "Rivers", count: 80, max: 231 },
  // { city: "Ekiti", count: 156, max: 231 },
  // { city: "Abia", count: 40, max: 231 },
];

export const CHART_DATA = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  active: 400 + Math.sin(i * 0.8) * 200 + i * 40,
  pending: 50 + Math.cos(i * 0.6) * 30 + i * 5,
  rejected: 20 + Math.sin(i * 1.2) * 15,
}));

export const MOCK_RECEIPT = {
  amount: 250000000,
  type: "Withdrawal",
  recipientBank: "Paycom/OPAY",
  accountNumber: "8123235569",
  description: "Tolulope Afolayan to Flutterwave/LunaFORTIS",
  date: "09 April 2026, 10:45 AM",
  status: "successful" as const,
  transactionRef: "pocket_disburse_1155470048562623",
  sessionId: "090405260430150036372237066022",
};
