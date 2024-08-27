import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediclear AI Demo",
  description: "This is Demo page for Mediclear AI",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}