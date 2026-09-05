import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Showcase from "@/components/sections/showcase";
import FAQ from "@/components/sections/faq";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import { AmbientFX } from "@/components/blocks/ambient-fx";
import { Preloader } from "@/components/blocks/preloader";
import { RevealObserver } from "@/components/blocks/reveal-observer";
import Header from "@/components/blocks/header";
import SideNav from "@/components/blocks/side-nav";

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Preloader />
      <AmbientFX />
      <Header />
      <SideNav />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Showcase />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
