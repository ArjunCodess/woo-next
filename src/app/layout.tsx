import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import CartProvider from "@/providers/cart-context";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { DEFAULT_METADATA } from "@/lib/constants";

const geistMono = Geist_Mono({
  weight: "400",
  subsets: ["latin"],
});

const safeMetadata: Metadata = {
  ...DEFAULT_METADATA,
  openGraph: DEFAULT_METADATA.openGraph ? {
    ...DEFAULT_METADATA.openGraph,
    images: DEFAULT_METADATA.openGraph.images?.map(img => ({
      url: img.url || '',
      width: img.width || 1200,
      height: img.height || 630,
      alt: img.alt || 'WooNext',
    })) || [],
  } : undefined,
};

export const metadata = safeMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.className} antialiased`}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}