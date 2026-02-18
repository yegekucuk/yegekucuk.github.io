import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "yegekucuk's Desktop",
  description:
    "Software Engineer portfolio — experience in web development, AI projects, and open-source tools. Built with a Windows 95 retro desktop theme.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
