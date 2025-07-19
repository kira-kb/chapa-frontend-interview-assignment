"use client";

import { IconMail, IconMapPin, IconUser } from "@tabler/icons-react";
import { UserCog2, Users, UserX } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppStore } from "@/services/state";

export function SuperAdminSectionCards() {
  const { currentUser, users, systemStats } = useAppStore();
  if (!currentUser || currentUser.role === "user") return null;

  const totalRevenue = users.reduce((sum, u) => sum + u.balance, 0);

  const activeUsers = users.filter(
    (u) => u.isActive && u.role === "user"
  ).length;
  const inactiveUsers = users.filter(
    (u) => !u.isActive && u.role === "user"
  ).length;

  const adminCount = users.filter((u) => u.role === "admin").length;
  const activeAdmins = users.filter(
    (u) => u.isActive && u.role === "admin"
  ).length;
  const inActiveAdmins = users.filter(
    (u) => !u.isActive && u.role === "admin"
  ).length;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* User Overview Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>User Overview</CardDescription>
          <CardTitle className="text-xl font-semibold">
            {currentUser.name}
          </CardTitle>
          <CardAction>
            <Badge
              variant="secondary"
              className={`flex items-center text-black gap-1 mb-1 ${
                currentUser.role === "admin" ? "bg-blue-300" : "bg-amber-300"
              }`}
            >
              <UserCog2 className="w-4 h-4" />
              {currentUser.role}
            </Badge>
            {currentUser.isActive ? (
              <Badge
                variant="secondary"
                className="flex items-center text-black gap-1 bg-green-400"
              >
                <IconUser className="w-4 h-4" />
                Active
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-red-400"
              >
                <IconUser className="w-4 h-4" />
                Inactive
              </Badge>
            )}
          </CardAction>
        </CardHeader>

        <CardContent className="text-sm leading-relaxed space-y-1">
          <div className="flex items-center gap-2">
            <IconMail className="w-4 h-4 text-muted-foreground" />
            <span>{currentUser.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <IconMapPin className="w-4 h-4 text-muted-foreground" />
            <span>{currentUser.registeredLocation}, Ethiopia</span>
          </div>
        </CardContent>

        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="font-medium">
            Member since: {new Date(currentUser.createdAt).toDateString()}
          </div>
        </CardFooter>
      </Card>

      {/* Total Revenue */}
      {currentUser.role === "super-admin" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-muted-foreground">
              Financial Overview
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Based on all active user balances
            </CardDescription>
          </CardHeader>
          <CardContent className=" pt-2">
            <div className="flex flex-col mb-1.5">
              <span className="text-sm font-medium text-muted-foreground">
                Total Transactions
              </span>
              <span className="text-2xl font-bold tabular-nums text-blue-600">
                ${systemStats.totalPayments.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </span>
              <span className="text-2xl font-bold tabular-nums text-green-600">
                ${totalRevenue.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users */}
      {currentUser.role === "super-admin" && (
        <Card>
          <CardHeader>
            <CardDescription>User Statistics</CardDescription>
            <CardTitle className="text-2xl font-bold">
              Total Users: {users.filter((u) => u.role === "user").length}
            </CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4 text-center">
            {/* Active Users */}
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-green-50 dark:bg-green-900 dark:border-green-700">
              <Users className="h-6 w-6 text-green-600 dark:text-green-300 mb-1" />
              <span className="text-sm text-muted-foreground dark:text-green-200">
                Active Users
              </span>
              <span className="text-2xl font-bold text-green-700 dark:text-green-100">
                {activeUsers}
              </span>
            </div>

            {/* Inactive Users */}
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-red-50 dark:bg-red-900 dark:border-red-700">
              <UserX className="h-6 w-6 text-red-600 dark:text-red-300 mb-1" />
              <span className="text-sm text-muted-foreground dark:text-red-200">
                Inactive Users
              </span>
              <span className="text-2xl font-bold text-red-700 dark:text-red-100">
                {inactiveUsers}
              </span>
            </div>
          </CardContent>

          <CardFooter className="text-xs text-muted-foreground dark:text-gray-400">
            Includes both active (logged-in) and inactive (deactivated) user
            accounts
          </CardFooter>
        </Card>
      )}

      {/* Admins */}
      {currentUser.role === "super-admin" && (
        <Card>
          <CardHeader>
            <CardDescription>Admin Statistics</CardDescription>
            <CardTitle className="text-2xl font-bold">
              Total Admins: {adminCount}
            </CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4 text-center">
            {/* Active Admins */}
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-green-50 dark:bg-green-900 dark:border-green-700">
              <Users className="h-6 w-6 text-green-600 dark:text-green-300 mb-1" />
              <span className="text-sm text-muted-foreground dark:text-green-200">
                Active Admins
              </span>
              <span className="text-2xl font-bold text-green-700 dark:text-green-100">
                {activeAdmins}
              </span>
            </div>

            {/* Inactive Admins */}
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-red-50 dark:bg-red-900 dark:border-red-700">
              <UserX className="h-6 w-6 text-red-600 dark:text-red-300 mb-1" />
              <span className="text-sm text-muted-foreground dark:text-red-200">
                Inactive Admins
              </span>
              <span className="text-2xl font-bold text-red-700 dark:text-red-100">
                {inActiveAdmins}
              </span>
            </div>
          </CardContent>

          <CardFooter className="text-xs text-muted-foreground dark:text-gray-300">
            Includes both active (logged-in) and inactive (deactivated) Admin
            accounts
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
