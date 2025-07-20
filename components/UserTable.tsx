"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { User } from "@/types/types";
import { Users, Circle, Ban, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  users: User[];
  currentUser: User;
  toggleUserStatus: (id: string) => void;
}

export function UsersTable({ users, currentUser, toggleUserStatus }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => user.role === "user")
      .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
      .filter((u) => {
        if (status === "all") return true;
        if (status === "inactive") return !u.isActive;
        if (status === "active") return u.isActive;
        return true;
      });
  }, [users, search, status]);

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            View, search, and manage user accounts.
          </CardDescription>
        </CardHeader>

        {/* filtering and searching */}
        <div className="flex flex-col md:flex-row items-center gap-4 px-6 pb-4">
          <div className="relative flex-1 w-full md:grow">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center gap-2">
                  <Circle className="h-4 w-4 text-muted-foreground" /> All
                  Statuses
                </div>
              </SelectItem>
              <SelectItem value="active">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" /> Active
                </div>
              </SelectItem>
              <SelectItem value="inactive">
                <div className="flex items-center gap-2">
                  <Ban className="h-4 w-4 text-red-500" /> Inactive
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden sm:table-cell">Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
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
                      <TableCell className="capitalize hidden sm:table-cell">
                        {user.role}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.isActive ? "default" : "destructive"}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Button
                          onClick={() => {
                            if (!currentUser.isActive)
                              return toast.warning(
                                "You are not allowed to perform this action,\n Contact Super Admin"
                              );
                            toggleUserStatus(user.id);
                          }}
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
                    <TableCell colSpan={4} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="h-8 w-8 text-muted-foreground" />
                        <span className="font-medium">No users found.</span>
                        <span className="text-sm text-muted-foreground">
                          Try adjusting your search or filters.
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
