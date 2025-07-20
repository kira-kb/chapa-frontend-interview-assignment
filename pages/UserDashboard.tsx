"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/services/state";
import { UserSectionCards } from "../components/userSectionCard";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import TableSkeleton from "@/components/tableSkeleton";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const { currentUser } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  if (!currentUser) return;

  const userTransactions = currentUser?.transactions || [];

  // if (loading) return <TableSkeleton />;

  return (
    <div>
      <UserSectionCards />

      {loading ? (
        <div className="grid gap-6 p-4">
          <TableSkeleton />
        </div>
      ) : (
        <div className="grid gap-6 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Type</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    userTransactions.map((t) => {
                      const isSend = t.type === "send";
                      const formattedDate = new Date(t.date).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      );
                      const formattedAmount = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(t.amount);

                      return (
                        <TableRow key={t.id}>
                          <TableCell>
                            <div
                              className={`flex items-center font-medium ${
                                isSend ? "text-red-600" : "text-green-600"
                              }`}
                            >
                              {isSend ? (
                                <ArrowUpRight className="mr-2 h-4 w-4" />
                              ) : (
                                <ArrowDownLeft className="mr-2 h-4 w-4" />
                              )}
                              {isSend ? "Sent" : "Received"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {isSend ? t.to : t.from}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {isSend ? "To" : "From"}
                            </div>
                          </TableCell>
                          <TableCell>{formattedDate}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{t.reason}</Badge>
                          </TableCell>
                          <TableCell
                            className={`text-right font-semibold ${
                              isSend ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            {isSend ? "-" : "+"} {formattedAmount}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
