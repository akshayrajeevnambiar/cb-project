import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

// Loading the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Metadata for the application
export const metadata: Metadata = {
  title: "ContentBlocks", // Title of the application
  description: "ContentBlocks", // Description of the application
};

// RootLayout component wraps the entire application with ClerkProvider and applies global styles
export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Children elements of the RootLayout component
}) {
  return (
    <ClerkProvider>
      {/* ClerkProvider to provide authentication context */}

      <html lang="en">
        <body className={inter.className}>
          <main className="flex flex-col items-center justify-center min-h-screen">
            {/* Main content container */}
            {children} {/* Render children components */}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
