import Header from "@/components/layout/Header";
import "./globals.css";
import { Roboto } from "next/font/google";
import Footer from "@/components/layout/Footer";
import {AppProvider} from "@/components/AppContext";
import { Toaster } from "react-hot-toast";
import { IBM_Plex_Mono } from "next/font/google";
import { Headland_One } from "next/font/google";
import Chatbot from "@/components/layout/Chatbot";

const roboto = Roboto({ subsets: ["latin"],variable:'--font-roboto', weight: ["400", "500", "700"] });
const ibm = IBM_Plex_Mono({ subsets: ["latin"],variable:'--font-ibm', weight: ["400", "500", "700"] });
const hlo = Headland_One({ subsets: ["latin"],variable:'--font-hlo', weight: ["400"] });

export const metadata = {
  title: "Oven On Wheels",
  description: "Pizza Web App created with Next.js",
  icons: "/public/vin.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ibm.variable} ${roboto.variable} ${hlo.variable} font-sans`}>
        <main className="w-full mx-auto">
          <AppProvider>
            <Toaster/>
            <Header />
            <Chatbot/>
            {children}
            <Footer />
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
