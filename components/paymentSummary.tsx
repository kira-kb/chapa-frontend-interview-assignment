"use client";

import { useState, useEffect } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  ArrowUp,
  ArrowDown,
  Users,
} from "lucide-react";

import { User } from "@/types/types";

interface Props {
  users: User[];
}

type UserSummary = {
  id: string;
  name: string;
  avatar: string;
  totalSent: number;
  totalReceived: number;
  balance: number;
};

type SortConfig = {
  key: keyof UserSummary;
  direction: "ascending" | "descending";
};

export function UserPaymentsSummary({ users }: Props) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "balance",
    direction: "descending",
  });

  const [processedUsers, setProcessedUsers] = useState<UserSummary[]>([]);

  useEffect(() => {
    const summaryData = users
      .filter((user) => user.role === "user")
      .map((user) => {
        const totalSent = user.transactions
          .filter((t) => t.type === "send")
          .reduce((sum, t) => sum + t.amount, 0);
        const totalReceived = user.transactions
          .filter((t) => t.type === "receive")
          .reduce((sum, t) => sum + t.amount, 0);

        return {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          totalSent,
          totalReceived,
          balance: user.balance,
        };
      });

    summaryData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setProcessedUsers(summaryData);
  }, [users, sortConfig]);

  const requestSort = (key: keyof UserSummary) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof UserSummary) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Payments Summary</CardTitle>
        <CardDescription>
          An overview of total transactions and balances for all users. Click
          headers to sort.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => requestSort("totalSent")}
                    className="w-full justify-end px-0"
                  >
                    <ArrowUpCircle className="mr-2 h-4 w-4 text-orange-500" />
                    Total Sent
                    {getSortIndicator("totalSent")}
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => requestSort("totalReceived")}
                    className="w-full justify-end px-0"
                  >
                    <ArrowDownCircle className="mr-2 h-4 w-4 text-green-500" />
                    Total Received
                    {getSortIndicator("totalReceived")}
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => requestSort("balance")}
                    className="w-full justify-end px-0"
                  >
                    <Wallet className="mr-2 h-4 w-4 text-primary" />
                    Balance
                    {getSortIndicator("balance")}
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedUsers.length > 0 ? (
                processedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-orange-600">
                      ${user.totalSent.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono text-green-600">
                      ${user.totalReceived.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      ${user.balance.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48">
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                      <Users className="h-12 w-12 text-muted-foreground" />
                      <h3 className="text-xl font-semibold">No User Data</h3>
                      <p className="text-muted-foreground">
                        There is no user information to display at this time.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
