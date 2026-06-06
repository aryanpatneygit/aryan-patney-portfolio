"use client";

import Link from "next/link";
import { ArrowDownToLine } from "lucide-react";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/section-heading";
import { ProfileCard } from "@/components/ui/profile-card";

export function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="relative scroll-mt-24 py-24 md:py-32"
    >
      <div className="container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading title="About." />

          <div className="mt-8 space-y-5">
            {site.about.body.map((para, i) => (
              <p
                key={i}
                data-reveal="left"
                data-reveal-delay={`${0.05 + i * 0.08}`}
                className="max-w-[58ch] text-base text-fg/85 text-pretty md:text-lg"
              >
                {para}
              </p>
            ))}
          </div>

          <div
            data-stagger="0.05"
            className="mt-8 flex flex-wrap gap-2"
            aria-label="Disciplines"
          >
            {site.about.chips.map((chip) => (
              <span
                key={chip}
                data-stagger-item
                className="glass rounded-pill px-3 py-1.5 label-sm text-fg-muted"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href={site.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-pill border border-fg/15 bg-fg/[0.03] px-5 py-2.5 text-sm font-medium text-fg backdrop-blur-md transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent/40 hover:bg-fg/[0.06] hover:shadow-accent-glow"
            >
              <ArrowDownToLine
                size={15}
                strokeWidth={1.75}
                className="transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5"
              />
              Download CV
            </Link>
          </div>
        </div>

        <div
          data-reveal="scale"
          className="flex justify-center lg:col-span-5 lg:items-center"
        >
          <ProfileCard
            name={site.name}
            title={site.title}
            handle="aryanpatney"
            status="Available"
            contactText="Get in touch"
            avatarUrl={site.photo}
            showUserInfo
            enableTilt
            enableMobileTilt={false}
            behindGlowEnabled
            behindGlowColor="rgba(181, 155, 255, 0.55)"
            innerGradient="linear-gradient(145deg, #60496e8c 0%, #71C4FF44 100%)"
            onContactClick={() => {
              window.location.href = `mailto:${site.email}`;
            }}
          />
        </div>
      </div>
    </section>
  );
}
