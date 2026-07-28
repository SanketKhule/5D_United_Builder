"use client";

import { motion } from "motion/react";

const stats = [
  { label: "Years Experience", value: "25+" },
  { label: "Projects Completed", value: "500+" },
  { label: "Happy Clients", value: "400+" },
  { label: "Awards Won", value: "15+" },
];

const values = [
  {
    title: "Quality Craftsmanship",
    description: "Every project we undertake meets the highest standards of quality, durability, and aesthetic excellence.",
  },
  {
    title: "Client-Centric Approach",
    description: "We listen, collaborate, and adapt to ensure your vision is realized exactly as you imagined.",
  },
  {
    title: "Innovation & Sustainability",
    description: "Modern techniques and sustainable materials drive our designs, reducing environmental impact without compromising quality.",
  },
  {
    title: "Safety First",
    description: "Rigorous safety protocols protect our teams and job sites, ensuring every project is delivered without incident.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
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
          About Us
        </span>
        <h2
          id="about-heading"
          className="mb-6 text-3xl font-bold text-slate-700 md:text-5xl dark:text-slate-300"
        >
          Building Trust Since 2000
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          5D United Builders is a premier construction firm dedicated to delivering exceptional residential and commercial projects. With over two decades of experience, we combine skilled craftsmanship, innovative design, and unwavering integrity to create spaces that stand the test of time.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="text-3xl font-bold text-neutral-900 md:text-4xl dark:text-white">
              {stat.value}
            </div>
            <div className="mt-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-20"
      >
        <h3 className="mb-10 text-center text-2xl font-semibold text-slate-700 md:text-3xl dark:text-slate-300">
          What Drives Us
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-neutral-700 dark:text-neutral-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="mb-2 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                {value.title}
              </h4>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
