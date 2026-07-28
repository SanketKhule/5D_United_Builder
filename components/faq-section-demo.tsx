"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FAQs } from "@/lib/site-content";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative mx-auto max-w-7xl scroll-mt-28 px-4 py-20 md:py-32"
    >
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
        <h2
          id="faq-heading"
          className="mb-6 text-3xl font-bold text-slate-700 md:text-5xl dark:text-slate-300"
        >
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
        {FAQs.map((faq, index) => {
          const answerId = `faq-answer-${index}`;
          const buttonId = `faq-button-${index}`;

          return (
            <div key={index} className="py-4">
              <button
                id={buttonId}
                type="button"
                aria-controls={answerId}
                aria-expanded={openIndex === index}
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <span className="text-base font-medium text-neutral-800 dark:text-neutral-200">
                  {faq.question}
                </span>
                <svg
                  aria-hidden="true"
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
                    id={answerId}
                    role="region"
                    aria-labelledby={buttonId}
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
          );
        })}
      </motion.div>
    </section>
  );
}
