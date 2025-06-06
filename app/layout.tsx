import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ammm Todo | Simple & Intuitive Task Manager",
  description:
    "Ammm Todo helps you stay organized with a clean and easy-to-use interface for managing your daily tasks efficiently.",
  keywords: [
    "todo app",
    "task manager",
    "productivity",
    "daily planner",
    "Ammm Todo",
    "Alim Naufal",
  ],
  authors: [{ name: "Alim Naufal" }],
  openGraph: {
    title: "Ammm Todo – Simple & Intuitive Task Manager",
    description:
      "Stay on top of your tasks with Ammm Todo. Organize, plan, and get things done effortlessly.",
    siteName: "Ammm Todo",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              marginTop: 60,
            },
          }}
        />
        <div className="flex flex-row md:flex-row-reverse w-full h-full">
          <main className="flex flex-col w-full h-full min-h-screen bg-gray-100">
            {children}
          </main>
          <Navbar />
        </div>
      </body>
    </html>
  );
}
