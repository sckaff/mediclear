import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MediCare Health Services",
  openGraph: {
    title: "MediCare Health Services",
    description:
      "To-Do: Add a description",
  },
  twitter: {
    card: "summary_large_image",
    title: "MediCare Health Services",
    description:
      "To-Do: Add a description",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scroll-smooth antialiased [font-feature-settings:'ss01']">
        {children}
      </body>
    </html>
  );
}
