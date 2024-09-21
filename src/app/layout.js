import localFont from "next/font/local";
import "./globals.css";
import { DynamicAuth } from "./components/DynamicAuth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Mirage",
  description: "Decentralized Transactional Email",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DynamicAuth>
          {children}
        </DynamicAuth>
      </body>
    </html>
  );
}
