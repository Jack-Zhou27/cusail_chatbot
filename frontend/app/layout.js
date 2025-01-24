import "./globals.css";
import React from 'react';
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import {Space_Grotesk} from 'next/font/google';

export const space = Space_Grotesk({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
  variable: '--font-space-grotesk'
});

export default function RootLayout({children}) {
  return (
    <html lang="en" className={`${space.variable}`}>
      <body> 
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}