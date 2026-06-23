export type KYBStatus = "approved" | "pending" | "rejected";
export type MerchantStatus = "active" | "pending" | "deactivated" | "awaiting";
export type UserStatus = "active" | "disabled";
export type TxStatus = "successful" | "failed";
export type AuditStatus = "successful" | "failed";
export type AdminRole = "Super Admin" | "Admin";

export interface Merchant {
  id: string;
  merchantId: string;
  name: string;
  category: "Accomodation" | "Security" | "Mobility";
  kybStatus: KYBStatus;
  status: MerchantStatus;
  registrationDate: string;
  // Detail
  rcNumber?: string;
  taxId?: string;
  businessAge?: string;
  businessType?: string;
  businessAddress?: string;
  phoneNumber?: string;
  directorName?: string;
  directorBvn?: string;
  directorNin?: string;
}

export interface WalletEntry {
  id: string;
  merchantName: string;
  walletBalance: number;
  totalInflow: number;
  totalWithdrawal: number;
  lastUpdate: string;
}

export interface WalletTransaction {
  id: string;
  transactionId: string;
  amount: number;
  type: "Credit" | "Withdrawal";
  status: TxStatus;
  date: string;
}

export interface AuditEntry {
  id: string;
  adminName: string;
  typeOfAction: string;
  status: AuditStatus;
  date: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: UserStatus;
  lastActive: string;
}

export interface MerchantLocation {
  city: string;
  count: number;
  max: number;
}
