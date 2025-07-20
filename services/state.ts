import { toast } from "sonner";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import users from "./users.json";
import { AddAdmin, Transaction, User } from "@/types/types";

interface AppState {
  users: User[];
  setUsers: (users: User[]) => void;
  currentUser: User | null;

  login: (email: string, password: string) => void;
  logout: () => void;
  initiateTransaction: (tx: Omit<Transaction, "id" | "date">) => void;

  activateUser: (id: string) => void;
  deactivateUser: (id: string) => void;

  addAdmin: (user: AddAdmin) => void;
  removeAdmin: (id: string) => void;
  toggleUserStatus: (id: string) => void;

  systemStats: {
    totalPayments: number;
  };
}

const delay = (cb: () => void) => {
  const ms = Math.floor(Math.random() * 2000) + 3000; // 3s to 5s
  toast.loading("Processing...");
  setTimeout(() => {
    cb();
    toast.dismiss();
    toast.success("Done!");
  }, ms);
};

export const useAppStore = create<AppState>()(
  devtools((set, get) => ({
    users,
    currentUser: null,

    login: (email, password) => {
      const signInUser =
        get().users.find((u) => u.email === email && u.password === password) ||
        null;

      if (!signInUser) return toast.error("Invalid Email or Password");

      set(() => ({
        currentUser: signInUser,
      }));

      toast.success(`Welcome Back ${signInUser.name}`);
    },

    logout: () => set({ currentUser: null }),

    initiateTransaction: (tx) => {
      const reciverUser = get().users.filter((u) => u.id === tx.to);

      if (
        !reciverUser ||
        reciverUser[0].role === "super-admin" ||
        reciverUser[0].role === "admin"
      ) {
        toast.error("Invalid User ID");
        return {};
      }
      delay(() =>
        set((state) => {
          const user = state.currentUser;
          if (!user) return {};

          const reciverUser = state.users.filter((u) => u.id === tx.to);

          if (
            !reciverUser ||
            reciverUser[0].role === "super-admin" ||
            reciverUser[0].role === "admin"
          ) {
            toast.error("Invalid User ID");
            return {};
          }

          // if (reciverUser[0].role === 'super-admin' || reciverUser[0].role === 'admin') {
          //   toast.error("Invalid User ID");
          //   return {};
          // }

          const date = new Date();

          const newTx: Transaction = {
            id: Math.random().toString(36).substring(2),
            date: `${date.toISOString()}`,
            ...tx,
            from: "Me",
            to: reciverUser[0].name,
          };

          const updatedUsers = state.users.map((u) => {
            if (u.id === user.id) {
              return {
                ...u,
                balance: u.balance - tx.amount,
                transactions: [...u.transactions, newTx],
              };
            }
            return u;
          });

          toast.success(`$${tx.amount} sent to ${tx.to}`);

          return {
            users: updatedUsers,
            currentUser: {
              ...user,
              balance: user.balance - tx.amount,
              transactions: [...user.transactions, newTx],
            },
          };
        })
      );
    },

    addAdmin: (newAdmin: AddAdmin) =>
      delay(() =>
        set((state) => ({
          users: [
            ...state.users,
            {
              id: state.users.length + 1 + "",
              name: newAdmin.name,
              email: newAdmin.email,
              password: newAdmin.password,
              registeredLocation: newAdmin.registeredLocation,
              role: "admin",
              avatar: `https://i.pravatar.cc/40?u=${state.users.length + 1}}`,
              isActive: true,
              balance: 0,
              createdAt: new Date().toISOString(),
              transactions: [],
            },
          ],
        }))
      ),

    removeAdmin: (id) =>
      delay(() =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        }))
      ),

    systemStats: {
      get totalPayments() {
        return get()
          .users.flatMap((u) => u.transactions)
          .reduce((sum, tx) => sum + tx.amount, 0);
      },
    },

    toggleUserStatus: (id) =>
      delay(() =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, isActive: !user.isActive } : user
          ),
        }))
      ),
  }))
);
