"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setPastHero(y > 320);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-5 pt-5 sm:pt-6">
      {/* Centered glass nav pill */}
      <motion.nav
        aria-label="Primary"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-auto hidden items-center gap-1 rounded-pill px-2 py-1.5 transition-shadow duration-500 md:inline-flex",
          scrolled ? "glass shadow-soft-1" : "glass"
        )}
      >
        <BrandMark pastHero={pastHero} reduce={reduce ?? false} />
        <span className="mx-1 h-3 w-px bg-fg/15" aria-hidden />
        {links.map((link) => (
          <NavLink key={link.href} href={link.href} label={link.label} />
        ))}
      </motion.nav>

      {/* Mobile — single small glass button on the right */}
      <div className="pointer-events-auto ml-auto md:hidden">
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-fg-muted transition-colors hover:text-fg"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto absolute inset-x-5 top-16 rounded-xl bg-bg/95 p-4 backdrop-blur-xl border border-fg/[0.07] md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.04 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-3 text-2xl font-semibold text-fg/90 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <li className="border-t border-fg/[0.06] mt-2 pt-3">
                <Link
                  href={`mailto:${site.email}`}
                  onClick={() => setOpen(false)}
                  className="block px-3 text-xs uppercase tracking-[0.22em] text-fg-muted"
                >
                  {site.email}
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

/**
 * The brand mark in the navbar: bold "AP" at the top of the page,
 * expanding to "AP Aryan Patney" once the user scrolls past the hero
 * (so the full name lives in the chrome only when it's no longer
 * dominating the hero copy).
 */
function BrandMark({
  pastHero,
  reduce,
}: {
  pastHero: boolean;
  reduce: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Aryan Patney — home"
      className="group inline-flex items-center gap-2 rounded-pill px-3 py-1.5"
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inset-0 rounded-full bg-accent pulse-dot" />
      </span>
      <span className="text-[14px] font-extrabold leading-none tracking-tight text-fg/90 transition-colors group-hover:text-accent">
        AP
      </span>
      <AnimatePresence initial={false} mode="wait">
        {pastHero ? (
          <motion.span
            key="full"
            initial={reduce ? { opacity: 0 } : { opacity: 0, width: 0 }}
            animate={
              reduce ? { opacity: 1 } : { opacity: 1, width: "auto" }
            }
            exit={reduce ? { opacity: 0 } : { opacity: 0, width: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden whitespace-nowrap text-[13px] font-medium leading-none text-fg-muted"
          >
            <span className="ml-0.5">Aryan Patney</span>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </Link>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center rounded-pill px-3 py-1.5 text-[13px] font-medium text-fg-muted transition-colors hover:text-fg"
    >
      <span>{label}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 right-3 -bottom-px h-px origin-left scale-x-0 bg-accent/60 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </Link>
  );
}
