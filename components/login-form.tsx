"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/services/state";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "./ui/loadingButon";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const demoAccounts = [
  {
    name: "Amanueal Bewket",
    email: "Sadmin@chapa.com",
    password: "12345678",
    role: "Super-Admin",
  },
  {
    name: "Ephrata Bewket",
    email: "admin@chapa.com",
    password: "12345678",
    role: "Admin",
  },
  {
    name: "Kirubel Bewket",
    email: "user@chapa.com",
    password: "12345678",
    role: "User",
  },
];

export function LoginForm({ ...props }: React.ComponentProps<"div">) {
  const { login } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      router.push("/dashboard");
    }, 2000);
  };

  const handleQuickLogin = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center gap-8" {...props}>
      <div className="inline">
        {/* Normal Login Card */}
        <Card className="min-w-[400px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter email and password</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    required
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {/* <div className="mt-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </div> */}
              <div className="mt-4">
                <LoadingButton
                  type="submit"
                  loading={loading}
                  onClick={handleSubmit}
                  disabled={!email || !password}
                  className="w-full"
                >
                  Login
                </LoadingButton>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div>
        {/* Quick Login Card */}
        <Card className="min-w-[400px]">
          <CardHeader>
            <CardTitle>Demo Accounts</CardTitle>
            <CardDescription>
              Click to quick login, All passwords are{" "}
              <span className="font-semibold text-gray-800">12345678</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAccounts.map((acc) => (
              <div key={acc.email}>
                <div className="text-sm font-semibold">{acc.name}</div>
                <div className="text-xs text-muted-foreground">
                  Email: {acc.email}
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  Role: {acc.role}
                </div>
                <Button
                  size="sm"
                  onClick={() => handleQuickLogin(acc.email, acc.password)}
                  className="w-full"
                >
                  Quick Login
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
