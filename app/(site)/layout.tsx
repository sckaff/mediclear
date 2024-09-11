"use client";

import React, { Suspense } from 'react';
// import GoogleAnalytics from "@/components/google-analytics";
import Script from 'next/script';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";

import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

import ToasterContext from "../context/ToastContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Suspense fallback={null}>
      <Script strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-09HFHSNSD0`} />

      <Script id='google-analytics' strategy="afterInteractive"
          dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', 'G-09HFHSNSD0', {
                    page_path: window.location.pathname,
                });
                `,
          }}
      />
      </Suspense>
      <body className={`dark:bg-black ${inter.className}`}>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="dark"
        >
          <Lines />
          <Header />
          <ToasterContext />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
