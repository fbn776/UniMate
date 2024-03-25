import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./ui/fonts";

export const metadata: Metadata = {
  title: "UniMate",
  description: "A virtual assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
