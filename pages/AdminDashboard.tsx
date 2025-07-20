"use client";

import { useAppStore } from "@/services/state";
import { useEffect, useState } from "react";
import { AddAdmin } from "@/types/types";
import { UsersTable } from "@/components/UserTable";
import { AdminsCard } from "@/components/AdminsCard";
import { SuperAdminSectionCards } from "@/components/AdminSectionCard";
import { UserPaymentsSummary } from "@/components/paymentSummary";
import TableSkeleton from "@/components/tableSkeleton";

const formatRoleTitle = (role: string) => {
  return role
    .replace("-", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function AdminDashboard() {
  const { users, toggleUserStatus, currentUser, addAdmin } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const [newAdmin, setNewAdmin] = useState<AddAdmin>({
    name: "",
    email: "",
    password: "",
    registeredLocation: "",
  });

  if (!currentUser) return;

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    addAdmin(newAdmin);
    setNewAdmin({ name: "", email: "", password: "", registeredLocation: "" });
  };

  const isSuperAdmin = currentUser.role === "super-admin";

  return (
    <main>
      <SuperAdminSectionCards />
      <div className="p-4 md:p-6 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {formatRoleTitle(currentUser.role)} Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={isSuperAdmin ? "lg:col-span-1" : "lg:col-span-2"}>
            {loading ? (
              <div className="p-4">
                <TableSkeleton />
              </div>
            ) : (
              <UsersTable
                users={users}
                currentUser={currentUser}
                toggleUserStatus={toggleUserStatus}
              />
            )}
          </div>

          {isSuperAdmin && (
            <div className="lg:col-span-1">
              {loading ? (
                <div className="p-4">
                  <TableSkeleton />
                </div>
              ) : (
                <AdminsCard
                  users={users}
                  newAdmin={newAdmin}
                  setNewAdmin={setNewAdmin}
                  handleAddAdmin={handleAddAdmin}
                  toggleUserStatus={toggleUserStatus}
                />
              )}
            </div>
          )}

          <div className="col-span-1 lg:col-span-2">
            {loading ? (
              <div className="p-4">
                <TableSkeleton />
              </div>
            ) : (
              <UserPaymentsSummary users={users} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
