"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logo from "@/public/logo.png";

const navigation = [
  {
    label: "Services",
    links: [
      { label: "Residential Construction",href: "/services/residential-construction" },
      { label: "Commercial Construction", href: "/services/commercial-construction" },
      { label: "Renovation & Remodeling", href: "/services/renovation-remodeling" },
      { label: "Architectural Planning", href: "/services/architectural-planning" },
    ],
  },
  {
    label: "About Us",
    links: [
      // { label: "Hobby", href: "#hobby" },
      // { label: "Individual", href: "#individual" },
      // { label: "Team", href: "#team" },
      // { label: "Enterprise", href: "#enterprise" },
    ],
  },
];

export default function NavbarDemo() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeMenus = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMobileOpen(false);
        setActiveMenu(null);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setActiveMenu(null);
      }
    };

    document.addEventListener("pointerdown", closeMenus);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeMenus);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const closeAllMenus = () => {
    setMobileOpen(false);
    setActiveMenu(null);
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8"
    >
      <nav
        aria-label="Primary navigation"
        className="relative mx-auto max-w-7xl rounded-2xl border border-white/60 bg-white/80 shadow-[0_12px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:border-white/10 dark:bg-neutral-950/80"
      >
        <div className="flex h-[4.5rem] items-center justify-between gap-4 px-3 sm:px-5">
          <Link
            href="/"
            aria-label="5D United Builders home"
            className="relative -ml-1 block h-14 w-24 shrink-0 overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:h-16 sm:w-28"
            onClick={closeAllMenus}
          >
            <Image
              src={logo}
              alt="5D United Builders"
              fill
              priority
              sizes="(min-width: 640px) 112px, 96px"
              className=" opacity-100 object-cover"
            />
          </Link>

          <div className="hidden h-full items-center gap-1 md:flex">
            {navigation.map((item) => {
              const isOpen = activeMenu === item.label;

              return (
                <div
                  key={item.label}
                  className="relative flex h-full items-center"
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:text-neutral-200 dark:hover:bg-white/10 dark:hover:text-white"
                    onClick={() =>
                      setActiveMenu(isOpen ? null : item.label)
                    }
                    onFocus={() => setActiveMenu(item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="absolute right-0 top-[calc(100%-0.35rem)] min-w-64 pt-3">
                      <div className="rounded-2xl border border-neutral-200/80 bg-white/95 p-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/95">
                        {item.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="block rounded-xl px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-blue-700 dark:text-neutral-200 dark:hover:bg-white/10 dark:hover:text-white"
                            onClick={closeAllMenus}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <a
            href="tel:+917708474706"
            className="hidden shrink-0 items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-all hover:bg-neutral-800 md:inline-flex dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Call Us
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="grid size-11 shrink-0 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 md:hidden dark:border-white/15 dark:bg-neutral-900 dark:text-white"
            onClick={() => {
              setMobileOpen((open) => !open);
              setActiveMenu(null);
            }}
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-neutral-200/80 px-3 pb-3 pt-2 md:hidden dark:border-white/10"
          >
            {navigation.map((item) => {
              const isOpen = activeMenu === item.label;

              return (
                <div
                  key={item.label}
                  className="border-b border-neutral-200/70 last:border-b-0 dark:border-white/10"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-neutral-800 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-700 dark:text-neutral-100 dark:hover:bg-white/10"
                    onClick={() =>
                      setActiveMenu(isOpen ? null : item.label)
                    }
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="grid gap-1 px-2 pb-3">
                      {item.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="rounded-lg px-4 py-2.5 text-sm text-neutral-600 transition-colors hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-blue-700 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
                          onClick={closeAllMenus}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}
