import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";



export const metadata: Metadata = {
  title: "CaseCobra",
  description: "your image on a phone case",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
          <main className="flex-1 flex flex-col h-full">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
