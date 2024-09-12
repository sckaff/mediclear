import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Testimonial from "@/components/Testimonial";

export const metadata: Metadata = {
  title: "Mediclear",
  description: "Medical Coder Agent",
  openGraph: {
    title: "Mediclear",
    description: "Streamlining medical coding through AI technology.",
    url: "https://www.mediclear.ai/", // Replace with your actual URL
    siteName: "Mediclear",
    images: [
      {
        url: "https://www.mediclear.ai/og-image.png", // Replace with your Open Graph image URL
        width: 800,
        height: 600,
        alt: "Mediclear Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // You can also add other metadata like Twitter cards here
};
export default function Home() {
  return (
    <main>
      <Hero />
      {/* <Brands /> */}
      <Feature />
      <About />
      {/* <FeaturesTab /> */}
      {/* <FunFact /> */}
      {/* <Integration /> */}
      <CTA />
      {/* <FAQ /> */}
      {/* <Testimonial /> */}
      {/* <Pricing /> */}
      <Contact />
      {/* <Blog /> */}
    </main>
  );
}
