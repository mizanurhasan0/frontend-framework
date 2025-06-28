import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Universal Web App Template",
  description: "A comprehensive web application template for building scalable and modern applications",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Web App", "Template"],
  authors: [{ name: "Universal App Team" }],
  creator: "Universal App",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://universal-app.com",
    title: "Universal Web App Template",
    description: "A comprehensive web application template for building scalable and modern applications",
    siteName: "Universal App",
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal Web App Template",
    description: "A comprehensive web application template for building scalable and modern applications",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
