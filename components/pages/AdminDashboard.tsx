"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppStore } from "@/services/state";

export default function AdminDashboard() {
  const { users, toggleUserStatus, currentUser } = useAppStore();

  if (!currentUser) return;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}{" "}
        Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Users</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
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
                {users
                  .filter((user) => user.role === "user")
                  .map((user) => (
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
                        {/* <Button
                          onClick={() => toggleUserStatus(user.id)}
                          variant={user.isActive ? "destructive" : "default"}
                          size="sm"
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
                        </Button> */}
                        <Button
                          onClick={() => toggleUserStatus(user.id)}
                          // variant={user.isActive ? "destructive" : "default"}
                          variant="outline"
                          className={`${
                            user.isActive
                              ? "text-red-600 hover:bg-red-100 hover:border-red-500 hover:border-[1px]"
                              : "text-green-500 hover:bg-green-100 hover:border-green-500 hover:border-[1px]"
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
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
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
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Admins</CardTitle>
                <Button
                  variant={"outline"}
                  className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                >
                  + Add Admin
                </Button>
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
                  {users
                    .filter((user) => user.role === "admin")
                    .map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        {/* <TableCell className="capitalize">{user.role}</TableCell> */}
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
                            // variant={user.isActive ? "destructive" : "default"}
                            variant="outline"
                            className={`${
                              user.isActive
                                ? "text-red-600 hover:bg-red-100 hover:border-red-500 hover:border-[1px]"
                                : "text-green-500 hover:bg-green-100 hover:border-green-500 hover:border-[1px]"
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
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
