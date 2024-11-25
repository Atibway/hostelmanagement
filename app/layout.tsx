import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster"
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { ConfettiProvider } from "@/components/providers/confetti-providerr";
import { AppProvider } from "@/components/providers/app-context";

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


export const metadata: Metadata = {
  title: 'Hostel Management System',
  description: 'Book and manage hostels easily',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()

  return (
<SessionProvider session={session}>

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConfettiProvider/>
<ToastProvider/>
<Toaster/>
<AppProvider>
{children}

</AppProvider>
        <ShadcnToaster/>
          </ThemeProvider>
      </body>
    </html>
</SessionProvider>
  );
}
