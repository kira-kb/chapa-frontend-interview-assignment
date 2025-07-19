"use client";

import { IconMail, IconMapPin, IconUser } from "@tabler/icons-react";

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
import { DollarSign, UserCog2 } from "lucide-react";
import { Input } from "./ui/input";
import { LoadingButton } from "./ui/loadingButon";
import { Label } from "./ui/label";
// import { toast } from "sonner";
import { useState } from "react";
import { useAppStore } from "@/services/state";
import { toast } from "sonner";

export function UserSectionCards() {
  const { currentUser, initiateTransaction } = useAppStore();

  const [form, setForm] = useState({ to: "", amount: 0, reason: "" });
  const [loading, setLoading] = useState(false);

  if (!currentUser) return;

  const balance = currentUser.balance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser.isActive)
      return toast.warning(
        "You are not allowed to perform this action,\n Contact Admins"
      );

    if (currentUser.balance < form.amount)
      return toast.error("Insufficient balance");

    setLoading(true);
    initiateTransaction({ ...form, from: currentUser.name, type: "send" });
    setForm({ to: "", amount: 0, reason: "" });
    setLoading(false);
  };

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>User Overview</CardDescription>
          <CardTitle className="text-xl font-semibold">
            {currentUser.name}
          </CardTitle>
          <CardAction>
            <Badge
              variant="secondary"
              className={`flex items-center gap-1 mb-1 text-black`}
            >
              <UserCog2 className="w-4 h-4" />
              {currentUser.role}
            </Badge>
            {currentUser.isActive ? (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 text-black bg-green-400"
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

      <Card className="bg-gradient-to-r from-emerald-100 via-emerald-200 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800 shadow-md rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium text-emerald-900 dark:text-emerald-100">
            Wallet Balance
          </CardTitle>
          <DollarSign className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-200">
            ${balance.toFixed()}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Available Balance
          </p>
        </CardContent>
      </Card>

      <Card className="w-full max-w-4xl mx-auto shadow-md border @container/card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">
            💸 Send Money
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            // onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-nowrap">
                Recipient ID
              </Label>
              <Input
                id="recipient"
                placeholder="e.g. user123"
                required
                value={form.to}
                onChange={(e) => setForm({ ...form, to: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g. 100"
                required
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: +e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Input
                id="reason"
                placeholder="e.g. Rent, Gift"
                required
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
              />
            </div>

            <div className="col-span-full mt-4">
              <LoadingButton
                loading={loading}
                onClick={handleSubmit}
                className="w-full md:w-auto"
              >
                Send Money
              </LoadingButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
