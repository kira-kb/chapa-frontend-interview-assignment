"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddAdmin } from "@/types/types";

export function AddAdminDialog({
  newAdmin,
  setNewAdmin,
  handleSubmit,
}: {
  newAdmin: AddAdmin;
  setNewAdmin: (user: AddAdmin) => void;
  handleSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
        >
          + Add Admin
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new admin user.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={newAdmin.name}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, name: e.target.value })
              }
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={newAdmin.email}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, email: e.target.value })
              }
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Registered Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="Addis Ababa"
              value={newAdmin.registeredLocation}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, registeredLocation: e.target.value })
              }
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={newAdmin.password}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, password: e.target.value })
              }
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit">Create Admin</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
