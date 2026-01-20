import type { Metadata } from "next";
import "./globals.css";
import { MediaProvider } from "@/context/MediaContext";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MBCPlay",
  description: "Filmes e Séries no MBCPlay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} bg-mainBackground antialiased`}
      >
        <MediaProvider>
          {children}
        </MediaProvider>
      </body>
    </html>
  );
}
