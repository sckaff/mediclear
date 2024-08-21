import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Demo - Mediclear",
  description: "This is Demo page for Mediclear AI",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <head>
      {/* GOOGLE TAG */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-09HFHSNSD0"></script>
      <script>
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-09HFHSNSD0');`};
      </script>
    </head>
    <div>
      {children}
    </div>
    </>

  );
}