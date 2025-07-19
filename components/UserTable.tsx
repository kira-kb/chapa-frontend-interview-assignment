"use client";

import { useState } from "react";
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

import { User } from "@/types/types";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectValue } from "./ui/select";
import { SelectTrigger } from "@radix-ui/react-select";

interface Props {
  users: User[];
  curretUser: User;
  toggleUserStatus: (id: string) => void;
}

export function UsersTable({ users, curretUser, toggleUserStatus }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredUsers = users
    .filter((user) => user.role === "user")
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
    .filter((u) => {
      if (status === "All") return u;
      if (status === "Deactivated") return !u.isActive;
      if (status === "Active") return u.isActive;
    });

  return (
    <Card className="px-2">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-xl">Users</CardTitle>
        <Input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[200px] bg-muted/30 transition border-gray-300 border-[1px] rounded-sm px-2">
            <div className="text-muted-foreground">Status:</div>
            <SelectValue
              placeholder="All"
              className="ml-2 text-muted-foreground text-nowrap"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              className="text-muted-foreground text-nowrap"
              value="All"
            >
              All
            </SelectItem>
            <SelectItem
              className="text-muted-foreground text-nowrap"
              value="Active"
            >
              🟢Active
            </SelectItem>
            <SelectItem
              className="text-muted-foreground text-nowrap"
              value="Deactivated"
            >
              🔴Deactivated
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="p-0">
        {filteredUsers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
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
                      onClick={() => {
                        if (!curretUser.isActive)
                          return toast.warning(
                            "You are not allowed to perform this action,\n Contact Super Admin"
                          );
                        toggleUserStatus(user.id);
                      }}
                      variant="outline"
                      className={`${
                        user.isActive
                          ? "text-red-600 hover:bg-red-100 hover:border-red-500"
                          : "text-green-600 hover:bg-green-100 hover:border-green-500"
                      }`}
                      size="sm"
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-6 text-center text-muted-foreground">
            No users found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
