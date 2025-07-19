# 💳 Role-Based Wallet Dashboard (User / Admin / Super Admin)

Welcome to the **Role-Based Wallet Dashboard** — a single-page mock app built with 💡 **Next.js** that lets you log in as different roles and see completely different dashboards based on your access level.

## 🌍 Live Preview

🔗 Hosted at: [https://chapa-frontend-interview-assignment-two.vercel.app/](https://chapa-frontend-interview-assignment-two.vercel.app/)

## 🔐 How to Log In

This project **simulates login** — just select your role and you'll get a full dashboard tailored to that role.

# 👤 Demo Accounts

| Name     | Email            | Password | Role        | Location    |
| -------- | ---------------- | -------- | ----------- | ----------- |
| Amanueal | Sadmin@chapa.com | 12345678 | Super-Admin | Addis Ababa |
| Ephrata  | admin@chapa.com  | 12345678 | Admin       | Gondar      |
| Kirubel  | user@chapa.com   | 12345678 | User        | Bahir Dar   |

_(You can find more mock data in `app/services/users.ts`)_

- 👤 **User**

  - View your mock wallet balance
  - See a list of mock recent transactions
  - Use a simple form to “initiate” a new transaction

- 🛠️ **Admin**

  - View a list of mocked users
  - Toggle their active/inactive status
  - See total payment summaries (table)

- 🧙‍♂️ **Super Admin**
  - Everything Admin can do, plus:
    - Add or remove Admins (mocked)
    - See system-wide stats (total payments, active users, etc.)

## 🧱 Main Features

- 🔄 Role-based UI rendering
- 📦 Mock API calls (with `setTimeout` to simulate async)
- 💾 Global state via Zustand
- 🎨 Responsive UI built with [shadcn/ui](https://ui.shadcn.com/)
- 📁 Clean file structure:
  - `components/` – reusable UI pieces
  - `pages/` – route-based components (Next.js)
  - `services/` – mock services and utilities
  - `types/` – type definitions

## 🛠️ Tech Stack

- Next.js 15+
- TypeScript
- TailwindCSS
- Shadcn UI
- Zustand or Context API for state

## 🧪 How to Run Locally

```bash
git clone https://github.com/kira-kb/chapa-frontend-interview-assignment.git
cd chapa-frontend-interview-assignment
npm install
npm run dev

```

Then go to: [http://localhost:3000](http://localhost:3000)

## 🔎 Notes

This project is for learning/demo purposes — there's no backend, no actual payments, and no real security. Just mock data, clean design, and simulated dashboards.

Built with ❤️ by [KIRA](https://github.com/kira-kb) from 🇪🇹 Addis Ababa
