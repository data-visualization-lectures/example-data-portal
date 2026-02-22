import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { allDatasets, buildTreeFromDatasets } from "@/lib/datasets";
import "./globals.css";

export const metadata: Metadata = {
  title: "Example Data Portal",
  description: "Sample datasets for data visualization libraries and tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tree = buildTreeFromDatasets(allDatasets);

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2BEWN8STG4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2BEWN8STG4');
          `}
        </Script>

        <div className="flex min-h-screen overflow-hidden md:h-screen">
          <Suspense>
            <Sidebar tree={tree} />
          </Suspense>

          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <Suspense>
              <Header />
            </Suspense>
            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
