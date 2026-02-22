import type { Metadata } from "next";
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
        <div className="flex h-screen overflow-hidden">
          <Suspense>
            <Sidebar tree={tree} />
          </Suspense>

          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <Suspense>
              <Header />
            </Suspense>
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
