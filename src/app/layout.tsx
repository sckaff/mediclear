import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MediClear",
  openGraph: {
    title: "MediClear",
    description:
      "MediClear is an AI-powered platform that simplifies healthcare billing and insurance processes.",
    images: [
      {
        url: "https://www.mediclear.ai/opengraph-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MediClear",
    description:
      "MediClear is an AI-powered platform that simplifies healthcare billing and insurance processes.",
    images: ["https://www.mediclear.ai/opengraph-image.png"],
  },
  metadataBase: new URL("https://www.mediclear.ai/"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#FFF" />
      </head>
      <body className="scroll-smooth antialiased [font-feature-settings:'ss01']">
        {children}
      </body>
    </html>
  );
}

