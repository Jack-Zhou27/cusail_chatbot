import "./globals.css";
import { Space_Grotesk } from 'next/font/google';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
  variable: '--font-space-grotesk'
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}