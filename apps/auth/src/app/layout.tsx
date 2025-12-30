import "@portfolio/ui/globals.css";

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Roboto } from "next/font/google";

import { APP_DESCRIPTION, APP_NAME } from "@/constants";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s - ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  icons: [
    {
      rel: "icon",
      url: "https://cdn.auth0.com/website/website/favicons/auth0-favicon.svg",
    },
  ],
};

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        <Analytics />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
