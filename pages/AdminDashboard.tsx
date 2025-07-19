"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppStore } from "@/services/state";
import { useState } from "react";
import { AddAdmin } from "@/types/types";
import { UsersTable } from "@/components/UserTable";
import { AdminsCard } from "@/components/AdminsCard";
import { SuperAdminSectionCards } from "@/components/AdminSectionCard";

export default function AdminDashboard() {
  const { users, toggleUserStatus, currentUser, addAdmin } = useAppStore();
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
  };

  return (
    <div>
      <SuperAdminSectionCards />
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}{" "}
          Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users Table */}
          <UsersTable
            users={users}
            curretUser={currentUser}
            toggleUserStatus={toggleUserStatus}
          />

          {/* Payment Summary */}
          <Card className="px-3">
            <CardHeader>
              <CardTitle className="text-xl">User Payments Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Total Sent</TableHead>
                    <TableHead>Total Received</TableHead>
                    <TableHead>Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => {
                    const sent = user.transactions
                      .filter((t) => t.type === "send")
                      .reduce((sum, t) => sum + t.amount, 0);
                    const received = user.transactions
                      .filter((t) => t.type === "receive")
                      .reduce((sum, t) => sum + t.amount, 0);

                    return (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{sent.toFixed(2)}</TableCell>
                        <TableCell>{received.toFixed(2)}</TableCell>
                        <TableCell>{user.balance.toFixed(2)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Admins Table */}
          {currentUser.role === "super-admin" && (
            <AdminsCard
              users={users}
              newAdmin={newAdmin}
              setNewAdmin={setNewAdmin}
              handleAddAdmin={handleAddAdmin}
              toggleUserStatus={toggleUserStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}
