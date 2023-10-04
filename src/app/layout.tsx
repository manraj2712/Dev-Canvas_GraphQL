import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SessionProviderComponent from "@/components/sessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dribbble Clone",
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
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProviderComponent>
      </body>
    </html>
  );
}
