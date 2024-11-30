"use client";

import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";

import "./globals.css";  // Global CSS file
import StoreProvider from "./redux";
import { Toaster } from 'react-hot-toast';

// Font configuration (optional)
const inter = Inter({ subsets: ["latin"] });
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap all components with StoreProvider and NextUIProvider */}
        <StoreProvider>
          <NextUIProvider>
            {children}
            <Toaster
            />
          </NextUIProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
