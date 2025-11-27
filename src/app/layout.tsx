import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "../components/common/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Restaurant - Delicious Food Delivered",
  description: "Order delicious food from our restaurant. Fresh ingredients, amazing taste, delivered to your doorstep.",
  keywords: "restaurant, food delivery, online order, delicious food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <ErrorBoundary>
          <main className="min-h-screen">{children}</main>
        </ErrorBoundary>
      </body>
    </html>
  );
}