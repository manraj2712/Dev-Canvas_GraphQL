import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SessionProviderComponent from "@/components/sessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevCanvas",
  description: "Your Portfolio for the World",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderComponent>
          <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
          </div>
        </SessionProviderComponent>
      </body>
    </html>
  );
}
