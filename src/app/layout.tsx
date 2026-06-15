import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { LanguageProvider } from "@/lib/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mauli Laundry — Premium AI-Powered Laundry Service",
  description:
    "Experience premium laundry care powered by AI. Free doorstep pickup & delivery, professional cleaning, and 24/7 intelligent support.",
  keywords:
    "laundry service, dry cleaning, wash and fold, laundry pickup, Mauli Laundry, premium laundry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.className} min-h-full flex flex-col antialiased mesh-gradient`}>
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingChat />
        </LanguageProvider>
      </body>
    </html>
  );
}
