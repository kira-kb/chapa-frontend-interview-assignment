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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Ban, CheckCircle2, ShieldOff } from "lucide-react";

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

  if (users.filter((u) => u.role === "admin").length < 1)
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <ShieldOff className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-xl font-semibold">No Admins Found</h3>
        <p className="text-muted-foreground">
          Add Admins to the system to get started.
        </p>
      </div>
    );

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
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? "default" : "destructive"}>
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => toggleUserStatus(user.id)}
                      variant="outline"
                      size="sm"
                    >
                      {user.isActive ? (
                        <Ban className="mr-2 h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      )}
                      {user.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-48">
                  <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <ShieldOff className="h-12 w-12 text-muted-foreground" />
                    <h3 className="text-xl font-semibold">No Admins Found</h3>
                    <p className="text-muted-foreground">
                      Try clearing your search or add a new administrator.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
