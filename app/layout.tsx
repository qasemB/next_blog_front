import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "وبلاگ من",
  description: "وبلاگ من، مرجع مقالات تخصصی در زمینه‌های تکنولوژی، کسب و کار، سلامت، گردشگری و موضوعات متنوع دیگر",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body >{children}</body>
    </html>
  );
}
