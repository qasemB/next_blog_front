import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./(home)/_partials/Navbar";
import Footer from "./(home)/_partials/Footer";
import { getCategoriesService } from "@/services/category";

export const metadata: Metadata = {
  title: "وبلاگ من",
  description: "وبلاگ من، مرجع مقالات تخصصی در زمینه‌های تکنولوژی، کسب و کار، سلامت، گردشگری و موضوعات متنوع دیگر",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // دریافت دسته‌بندی‌ها فقط یک بار برای فوتر
  const categories = await getCategoriesService();

  return (
    <html lang="fa" dir="rtl">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer categories={categories} />
      </body>
    </html>
  );
}
