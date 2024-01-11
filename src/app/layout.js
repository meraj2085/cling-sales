import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cling Sales",
  description: "Cling Sales",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  );
}
