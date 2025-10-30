import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { getCategories } from "@/services/api";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GKI Store",
  description: "eCommerce platform for GKI Group",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="he" dir="rtl">
      <body className={inter.className}>
        <Header categories={categories} />

        <main className="container">{children}</main>
      </body>
    </html>
  );
}
