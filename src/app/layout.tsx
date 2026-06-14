import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FloatingChat from "@/components/FloatingChat";
import { LanguageProvider } from "@/lib/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mauli Laundry — Fast, Reliable & Affordable Laundry Service",
  description:
    "Professional laundry service with free doorstep pickup and delivery. Wash & Fold, Dry Cleaning, Express delivery. AI-powered customer support 24/7.",
  keywords:
    "laundry service, dry cleaning, wash and fold, laundry pickup, Mauli Laundry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.className} min-h-full flex flex-col antialiased`}>
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <FloatingChat />
        </LanguageProvider>
      </body>
    </html>
  );
}
