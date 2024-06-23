import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flick | 1.0.0",
  description: "Discover and vote for the next movie night hit!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Default Open Graph tags */}
        <meta property="og:image" content="\assets\preview.PNG" />
        <meta property="og:url" content="https://flick-s.vercel.app" />
        <meta property="og:type" content="website" />
      </Head>
      <body className={inter.className} style={{
        position:"relative",
        height:"max-screen"
      }}>
        <nav className="p-6 fixed top-0 left-0 h-auto w-full z-30">
          <NavBar />
        </nav>
        {children}
        <Analytics />
        <footer className="absolute bottom-0 left-0 w-full mt-[40px] h-[50px]">
          <Footer />
        </footer>
      </body>
    </html>
  );
}

