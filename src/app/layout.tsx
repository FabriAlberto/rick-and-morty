import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { atdTheme } from "@/utils/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick and Morty app",
  description: "Rick and Morty app for conexa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex justify-center  ${geistSans.variable} ${geistMono.variable} antialiased p-4 bg-[#1E212D] `}
      >
        <AntdRegistry>
          <ConfigProvider theme={atdTheme}>
            <section className="max-w-[1800px]">{children}</section>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
