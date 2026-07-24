"use client";

import { motion } from "motion/react";

const projects = [
  {
    title: "Luxury Villa Complex",
    category: "Residential",
    description:
      "A premium gated community featuring 12 villas with modern architecture, sustainable materials, and smart home integration.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
    tags: ["Modern", "Sustainable", "Smart Home"],
  },
  {
    title: "Downtown Office Tower",
    category: "Commercial",
    description:
      "A 15-story commercial hub with energy-efficient systems, collaborative workspaces, and panoramic city views.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    tags: ["Commercial", "High-Rise", "LEED Certified"],
  },
  {
    title: "Heritage Home Restoration",
    category: "Renovation",
    description:
      "Careful restoration of a century-old heritage home, preserving original character while upgrading modern amenities.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
    tags: ["Heritage", "Restoration", "Preservation"],
  },
  {
    title: "Riverside Apartment Complex",
    category: "Residential",
    description:
      "A 200-unit waterfront apartment complex with landscaped gardens, swimming pool, and community recreation areas.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    tags: ["Residential", "Waterfront", "Community"],
  },
  {
    title: "Tech Park Campus",
    category: "Commercial",
    description:
      "A sprawling tech campus with state-of-the-art facilities, green spaces, and innovative architectural design.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    tags: ["Commercial", "Campus", "Innovation"],
  },
  {
    title: "Urban Mixed-Use Development",
    category: "Commercial",
    description:
      "A dynamic mixed-use space combining retail, office, and residential units in the heart of the city.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
    tags: ["Mixed-Use", "Urban", "Retail"],
  },
];

export default function ProjectSection() {
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
          Our Projects
        </span>
        <h2 className="mb-6 text-3xl font-bold text-slate-700 md:text-5xl dark:text-slate-300">
          Featured Work
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          Explore our portfolio of completed projects showcasing our expertise in residential, commercial, and renovation construction.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-700 backdrop-blur-sm dark:bg-neutral-900/90 dark:text-neutral-200">
                {project.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="mb-2 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                {project.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
