import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-fg/[0.06] mt-24">
      <div className="container flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
        <div className="flex items-center gap-3 label text-fg-muted">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-accent pulse-dot" />
          </span>
          Available for select projects, {year}
        </div>
        <div className="flex items-center gap-6 label text-fg-muted">
          <Link
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-fg"
          >
            {site.email}
          </Link>
          <Link
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fg"
          >
            LinkedIn ↗
          </Link>
        </div>
      </div>
      <div className="container pb-8">
        <p className="label-sm text-fg-subtle">
          © {year} {site.name}. Designed & engineered in this very browser.
        </p>
      </div>
    </footer>
  );
}
