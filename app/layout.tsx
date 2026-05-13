import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from "./perfume/components/Footer";
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

export const metadata: Metadata = {
  title: "AURA Fragrance - Luxury Perfumes",
  description: "Discover our collection of rare, handcrafted fragrances",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
        <Footer/>
      </body>
    </html>
  );
}