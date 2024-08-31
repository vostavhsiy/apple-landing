import Header from "@/components/Header";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const Highlights = dynamic(() => import("@/components/Highlights"), {
  ssr: false,
});
const Model = dynamic(() => import("@/components/Model"), { ssr: false });

export default function Home() {
  return (
    <main className="bg-black">
      <Header />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
