import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import SessionWrapper from "./providers/session-provider"
import Head from "next/head";

const glacialIndifference = localFont({
  src: [
    {
      path: "./fonts/GlacialIndifference-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GlacialIndifference-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-glacial",
  display: "swap",
  fallback: ["system-ui", "arial"],
})

export const metadata: Metadata = {
  title: "Amani Center CBO - Uniting Communities Through Media & ICT",
  description:
    "Building bridges between communities through innovative media solutions and information technology initiatives in Tana River County, Kenya.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={glacialIndifference.variable}>
      <Head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DMYH545021"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DMYH545021');
            `,
          }}
        />
      </Head>
      <body className={glacialIndifference.className}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}
