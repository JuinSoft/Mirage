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

const silkscreenRegular = localFont({
  src: "./fonts/Silkscreen-Regular.ttf",
  variable: "--font-silkscreen-regular",
  weight: "normal",
});

const silkscreenBold = localFont({
  src: "/fonts/Silkscreen-Bold.ttf",
  variable: "--font-silkscreen-bold",
  weight: "bold",
});

export const metadata = {
  title: "Mirage",
  description: "Decentralized Transactional Email",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${silkscreenRegular.variable} ${silkscreenBold.variable} antialiased`}
      >
        <DynamicAuth>
          {children}
        </DynamicAuth>
      </body>
    </html>
  );
}
