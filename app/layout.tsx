import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import SessionWrapper from "./providers/session-provider"

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
      <body className={glacialIndifference.className}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}
