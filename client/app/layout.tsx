import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Footer, Navbar} from "@/components";

export const metadata: Metadata = {
    title: "Rick And Morty",
    description: "Full Stack Rick and Morty Challenge",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className="relative"
        >
        <Navbar/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
