import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Page - Solid SaaS Boilerplate",
  description: "This is Demo page for Solid Pro",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}