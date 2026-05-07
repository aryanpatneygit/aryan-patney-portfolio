import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Contact />
    </>
  );
}
