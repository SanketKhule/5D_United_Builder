"use client";

import { motion } from "motion/react";
import { useState } from "react";

const contactInfo = [
  {
    label: "Phone",
    value: "+917708474706",
    href: "tel:+917708474706",
  },
  {
    label: "Email",
    value: "5Dunitedbuilders22@gmail.com",
    href: "mailto:5Dunitedbuilders22@gmail.com",
  },
  {
    label: "Address",
    value: "Lakshmi complex, 70, Tisayanvilai main road, Iraipuvari-627108",
    href: "#",
  },
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  mobile: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  mobile?: string;
  message?: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  subject: "",
  mobile: "",
  message: "",
};

const inputClass =
  "w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:border-neutral-500 dark:focus:ring-neutral-700";

const inputErrorClass =
  "w-full rounded-xl border border-red-400 bg-red-50 px-4 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-red-600 dark:bg-red-950/20 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:border-red-500 dark:focus:ring-red-800";

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.subject.trim().length < 2) {
      newErrors.subject = "Subject must be at least 2 characters.";
    }

    const mobileRegex = /^\+?[\d\s\-().]{7,20}$/;
    if (!mobileRegex.test(formData.mobile.trim())) {
      newErrors.mobile = "Please enter a valid mobile number.";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatusMessage("");

    if (!validate()) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setStatusMessage(data.message || "Unable to send your message. Please try again.");
        if (data.errors) setErrors(data.errors);
        return;
      }

      setStatus("success");
      setStatusMessage(data.message || "Your message has been sent successfully.");
      setFormData(initialFormData);
      setErrors({});
    } catch {
      setStatus("error");
      setStatusMessage("Unable to send your message. Please try again.");
    }
  }

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
          Get in Touch
        </span>
        <h2 className="mb-6 text-3xl font-bold text-slate-700 md:text-5xl dark:text-slate-300">
          Let&apos;s Build Together
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          Ready to start your project? Reach out to us for a free consultation. Our team is here to bring your vision to life.
        </p>
      </motion.div>

      <div className="mx-auto mt-16 grid gap-8 md:grid-cols-2 lg:max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {contactInfo.map((info) => (
            <a
              key={info.label}
              href={info.href}
              className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                <svg
                  className="h-5 w-5 text-neutral-600 dark:text-neutral-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {info.label === "Phone" ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  ) : info.label === "Email" ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  )}
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {info.label}
                </div>
                <div className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
                  {info.value}
                </div>
              </div>
            </a>
          ))}
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          noValidate
        >
          {status === "success" && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400">
              {statusMessage}
            </div>
          )}
          {status === "error" && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/20 dark:text-red-400">
              {statusMessage}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? inputErrorClass : inputClass}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? inputErrorClass : inputClass}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="subject"
              className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              type="text"
              placeholder="How can we help?"
              autoComplete="off"
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? inputErrorClass : inputClass}
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="mobile"
              className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              id="mobile"
              type="tel"
              placeholder="Your mobile number"
              autoComplete="tel"
              value={formData.mobile}
              onChange={handleChange}
              className={errors.mobile ? inputErrorClass : inputClass}
            />
            {errors.mobile && (
              <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Tell us about your project..."
              autoComplete="off"
              value={formData.message}
              onChange={handleChange}
              className={`${errors.message ? inputErrorClass : inputClass} resize-none`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-xl bg-black px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
