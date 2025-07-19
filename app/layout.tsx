import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chapa Role-Based Dashboard",
  description:
    "A single-page dashboard app with role-based UIs for User, Admin, and Super Admin using Next.js and mock APIs.",
  authors: [
    { name: "Kirubel Bewket", url: "https://github.com/KirubelBewket" },
  ],
  keywords: [
    "Next.js",
    "React",
    "Dashboard",
    "Role-Based Access",
    "Admin Panel",
    "Mock API",
    "SPAs",
    "Chapa",
  ],
  creator: "Kirubel Bewket",
  applicationName: "Chapa Dashboard",
  category: "Web Application",
  metadataBase: new URL(
    "https://chapa-frontend-interview-assignment-two.vercel.app/"
  ),
  openGraph: {
    title: "Chapa Dashboard",
    description:
      "Explore dashboards based on user roles (User, Admin, Super Admin).",
    url: "https://chapa-frontend-interview-assignment-two.vercel.app/",
    siteName: "Chapa Dashboard",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-center" richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
