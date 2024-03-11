import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MediClear",
  openGraph: {
    title: "MediClear",
    description:
      "MediClear is an AI-driven platform enhancing healthcare billing by automating claim submissions, verifying insurance eligibility, and simplifying benefits understanding.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MediClear",
    description:
      "MediClear is an AI-driven platform enhancing healthcare billing by automating claim submissions, verifying insurance eligibility, and simplifying benefits understanding.",
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
