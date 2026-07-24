import AboutSection from "@/components/about-section-demo";
import CareersSection from "@/components/careers-section-demo";
import ContactSection from "@/components/contact-section-demo";
import FaqSection from "@/components/faq-section-demo";
import Footer from "@/components/footer-demo";
import HeroSectionOne from "@/components/hero-section-demo-1";
import NavbarDemo from "@/components/navbar-menu-demo";
import ProjectSection from "@/components/project-section-demo";

export default function Home() {
  return (
    <>
      <NavbarDemo />
      <main className="pt-20 sm:pt-24">
        <HeroSectionOne />
      </main>
      <ProjectSection />
      <AboutSection />
      <CareersSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}
