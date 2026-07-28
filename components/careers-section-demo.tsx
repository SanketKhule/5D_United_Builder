"use client";

import { motion } from "motion/react";

const positions = [
  {
    title: "Senior Architect",
    type: "Full-time",
    location: "Tirunelveli",
    description:
      "Lead architectural design and planning for residential and commercial projects. Oversee drafting teams and ensure compliance with building codes.",
  },
  {
    title: "Project Manager",
    type: "Full-time",
    location: "Tirunelveli",
    description:
      "Manage end-to-end project delivery, coordinate with stakeholders, and ensure timelines, budgets, and quality standards are met.",
  },
  {
    title: "Site Engineer",
    type: "Full-time",
    location: "Multiple Sites",
    description:
      "Supervise on-site construction activities, monitor progress, and ensure adherence to safety protocols and design specifications.",
  },
  {
    title: "Civil Engineer",
    type: "Full-time",
    location: "Tirunelveli",
    description:
      "Design and analyze structural systems, perform site inspections, and collaborate with architects on project feasibility.",
  },
  {
    title: "Interior Designer",
    type: "Contract",
    location: "Tirunelveli",
    description:
      "Create functional and aesthetically pleasing interior spaces. Develop mood boards, material selections, and layout plans.",
  },
  {
    title: "Marketing Intern",
    type: "Internship",
    location: "Remote",
    description:
      "Assist with digital marketing campaigns, social media management, and content creation for the company's online presence.",
  },
];

const benefits = [
  {
    title: "Competitive Salary",
    description: "Industry-leading compensation with performance bonuses.",
  },
  {
    title: "Health Insurance",
    description: "Comprehensive medical coverage for you and your family.",
  },
  {
    title: "Professional Growth",
    description: "Continuous learning opportunities and career advancement paths.",
  },
  {
    title: "Work-Life Balance",
    description: "Flexible schedules and supportive work environment.",
  },
];

export default function CareersSection() {
  return (
    <section
      id="careers"
      aria-labelledby="careers-heading"
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
          Careers
        </span>
        <h2
          id="careers-heading"
          className="mb-6 text-3xl font-bold text-slate-700 md:text-5xl dark:text-slate-300"
        >
          Join Our Team
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          At 5D United Builders, we&apos;re always looking for talented individuals who share our passion for building excellence. Explore current openings below.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {positions.map((position) => (
          <div
            key={position.title}
            className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 dark:bg-neutral-800">
                {position.type}
              </span>
              <span>{position.location}</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
              {position.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {position.description}
            </p>
            <button className="text-sm font-medium text-neutral-700 underline-offset-2 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white">
              Apply Now &rarr;
            </button>
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
          Why Work With Us
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-3 mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
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
              <h4 className="mb-2 text-base font-semibold text-neutral-800 dark:text-neutral-200">
                {benefit.title}
              </h4>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
