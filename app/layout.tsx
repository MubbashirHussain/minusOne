import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ClientWrapper from "@/components/layout/ClientWrapper";
import { CursorProvider } from "@/components/providers/cursor-provider";
// import RouteTransitions from "@/components/animations/RouteTransitions";
import { Header } from "@/components/layout/header";
import { site, socialImage } from "@/lib/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Mubbashir Hussain | Creative Developer", template: "%s | Mubbashir Hussain" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { title: "Mubbashir Hussain | Creative Developer", description: site.description, url: "/", siteName: "Mubbashir Hussain", locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", images: [socialImage.url] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} antialiased selection:bg-primary selection:text-black transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <CursorProvider>
            <a href="#main-content" className="skip-link">Skip to content</a>
            <div className="fixed top-4 right-4 z-50">
              <ThemeToggle />
            </div>
            <SmoothScroll>
              {/* <RouteTransitions> */}
              <Header />
              <ClientWrapper>{children}</ClientWrapper>
              {/* </RouteTransitions> */}
            </SmoothScroll>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
