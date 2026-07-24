import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

const footerLinks = [
  {
    label: "Services",
    links: [
      { label: "Residential Construction", href: "#" },
      { label: "Commercial Construction", href: "#" },
      { label: "Renovation & Remodeling", href: "#" },
      { label: "Architectural Planning", href: "#" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Our Projects", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    label: "Support",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Sitemap", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="relative block h-14 w-24 overflow-hidden rounded-lg">
              <Image
                src={logo}
                alt="5D United Builders"
                fill
                className="object-cover"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              5D United Builders is a premier construction firm dedicated to delivering exceptional residential and commercial projects with quality craftsmanship and unwavering integrity.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.label}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                {group.label}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 transition-colors hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <p className="text-center text-sm text-neutral-400 dark:text-neutral-500">
            &copy; {new Date().getFullYear()} 5D United Builders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
