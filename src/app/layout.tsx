import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { RadialGlow } from "@/components/radial-glow";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollProvider } from "@/components/scroll-provider";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aryan Patney | Design Engineer",
  description:
    "Aryan Patney is a Design Engineer working at the intersection of code and craft, building considered, technical, human-centred products.",
  metadataBase: new URL("https://aryanpatney.com"),
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Aryan Patney | Design Engineer",
    description:
      "Selected work in design, code, and research from Aryan Patney.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${bricolage.variable} bg-bg text-fg antialiased`}>
        <RadialGlow />
        <ScrollProvider>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}
