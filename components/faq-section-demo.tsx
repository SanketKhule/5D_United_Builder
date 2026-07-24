"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    question: "What types of projects does 5D United Builders undertake?",
    answer:
      "We handle a wide range of projects including residential homes, commercial buildings, industrial facilities, renovations, and interior design. From new construction to remodeling, our team has the expertise to deliver quality results across all sectors.",
  },
  {
    question: "How do I get a quote for my project?",
    answer:
      "You can request a free consultation by calling us at +917708474706 or filling out the contact form on our website. We'll schedule a site visit, discuss your requirements, and provide a detailed estimate within 3-5 business days.",
  },
  {
    question: "What is the typical timeline for a construction project?",
    answer:
      "Timelines vary based on project scope and complexity. A standard residential home typically takes 8-12 months, while commercial projects range from 6-18 months. We provide a detailed timeline during the planning phase and keep you updated throughout the process.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes, 5D United Builders is fully licensed, bonded, and insured. We carry comprehensive liability insurance and workers' compensation coverage to protect our clients and our team throughout every project.",
  },
  {
    question: "Do you handle permits and approvals?",
    answer:
      "Absolutely. We manage all necessary permits, approvals, and inspections required by local authorities. Our team ensures your project complies with all building codes and regulations, saving you time and hassle.",
  },
  {
    question: "What payment options do you offer?",
    answer:
      "We offer flexible payment plans tailored to your project's milestones. Typically, payments are structured as an initial deposit followed by progress payments at key stages of construction. Contact us for a detailed payment schedule.",
  },
  {
    question: "Do you offer post-construction support?",
    answer:
      "Yes, we provide comprehensive post-construction support including a warranty period for structural work, assistance with maintenance, and guidance on property care. Our relationship with clients extends well beyond project completion.",
  },
  {
    question: "Can I make changes to the design during construction?",
    answer:
      "We understand that needs can evolve. Minor changes can be accommodated during construction, though they may affect timelines and costs. Major changes are best discussed early to minimize disruption. We'll always advise you on the implications before proceeding.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 md:py-32">
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80" />
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="mb-4 inline-block rounded-full bg-neutral-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
          FAQ
        </span>
        <h2 className="mb-6 text-3xl font-bold text-slate-700 md:text-5xl dark:text-slate-300">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          Got questions? We&apos;ve got answers. Here are some of the most common inquiries from our clients.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mt-16 max-w-3xl divide-y divide-neutral-200 dark:divide-neutral-800"
      >
        {faqs.map((faq, index) => (
          <div key={index} className="py-4">
            <button
              onClick={() => toggleFaq(index)}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-base font-medium text-neutral-800 dark:text-neutral-200">
                {faq.question}
              </span>
              <svg
                className={`h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </section>
  );
}