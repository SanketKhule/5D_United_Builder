import type { Metadata } from "next";
import AboutSection from "@/components/about-section-demo";
import CareersSection from "@/components/careers-section-demo";
import ContactSection from "@/components/contact-section-demo";
import FaqSection from "@/components/faq-section-demo";
import Footer from "@/components/footer-demo";
import HeroSectionOne from "@/components/hero-section-demo-1";
import JsonLd from "@/components/json-ld";
import NavbarDemo from "@/components/navbar-menu-demo";
import ProjectSection from "@/components/project-section-demo";
import { FAQs } from "@/lib/site-content";
import {
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function Home() {
  const siteUrl = getSiteUrl();
  const organizationId = new URL("/#organization", siteUrl).toString();
  const websiteId = new URL("/#website", siteUrl).toString();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: SITE_NAME,
    url: siteUrl.toString(),
    description: SITE_DESCRIPTION,
    publisher: {
      "@id": organizationId,
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: SITE_NAME,
    url: siteUrl.toString(),
    logo: new URL("/logo.png", siteUrl).toString(),
    image: new URL("/heropage.png", siteUrl).toString(),
    description: SITE_DESCRIPTION,
    foundingDate: "2000",
    email: "5Dunitedbuilders22@gmail.com",
    telephone: "+917708474706",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lakshmi complex, 70, Tisayanvilai main road",
      addressLocality: "Iraipuvari",
      postalCode: "627108",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+917708474706",
      email: "5Dunitedbuilders22@gmail.com",
      availableLanguage: ["English"],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema} />
      <NavbarDemo />
      <main className="pt-20 sm:pt-24">
        <HeroSectionOne />
        <ProjectSection />
        <AboutSection />
        <CareersSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
