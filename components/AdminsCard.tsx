"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddAdmin, User } from "@/types/types";
import { AddAdminDialog } from "./AdminDialog";

interface AdminsCardProps {
  users: User[];
  newAdmin: AddAdmin;
  setNewAdmin: React.Dispatch<React.SetStateAction<AddAdmin>>;
  handleAddAdmin: (e: React.FormEvent) => void;
  toggleUserStatus: (id: string) => void;
}

export function AdminsCard({
  users,
  newAdmin,
  setNewAdmin,
  handleAddAdmin,
  toggleUserStatus,
}: AdminsCardProps) {
  const [search, setSearch] = useState("");

  const filteredAdmins = users
    .filter((user) => user.role === "admin")
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Card className="shadow-md rounded-2xl border">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-2xl font-semibold">Admins</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:w-[200px]"
            />
            <AddAdminDialog
              handleSubmit={handleAddAdmin}
              newAdmin={newAdmin}
              setNewAdmin={setNewAdmin}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        user.isActive ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => toggleUserStatus(user.id)}
                      variant="outline"
                      size="sm"
                      className={`${
                        user.isActive
                          ? "text-red-600 hover:bg-red-100 hover:border-red-500"
                          : "text-green-600 hover:bg-green-100 hover:border-green-500"
                      } border`}
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-6"
                >
                  No admins found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
