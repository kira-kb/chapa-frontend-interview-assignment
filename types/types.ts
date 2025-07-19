export type Role = "user" | "admin" | "super-admin";

export interface Transaction {
  id: string;
  amount: number;
  type: "send" | "receive";
  to: string;
  from: string;
  reason: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar: string;
  isActive: boolean;
  balance: number;
  registeredLocation: string;
  createdAt: string;
  transactions: Transaction[];
}

export interface AddAdmin {
  name: string;
  email: string;
  password: string;
  registeredLocation: string;
}
