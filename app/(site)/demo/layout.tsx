import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Demo - Mediclear",
  description: "This is Demo page for Mediclear AI",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}