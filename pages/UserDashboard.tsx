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
// import { toast } from "sonner";
import { useAppStore } from "@/services/state";
import { UserSectionCards } from "../components/userSectionCard";

export default function UserDashboard() {
  const { currentUser } = useAppStore();

  if (!currentUser) return;

  const userTransactions = currentUser.transactions;

  return (
    <div>
      <UserSectionCards />

      <div className="grid gap-6 lg:grid-cols-2 grid-cols-1 p-4">
        <Card className="col-span-1 xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  {/* <TableHead>From</TableHead> */}
                  <TableHead>To</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userTransactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.date}</TableCell>
                    <TableCell>{t.to}</TableCell>
                    <TableCell>${t.amount}</TableCell>
                    <TableCell>{t.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
