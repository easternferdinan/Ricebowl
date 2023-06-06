import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import MainProvider from "@/utils/context/MainProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ricebowl",
  description: "Ricebowl is an online chinese food store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-5/6">
      <body className={inter.className + " h-full"}>
        <Navbar />
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
