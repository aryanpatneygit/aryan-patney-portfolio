import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, type CaseStudyImage } from "@/data/projects";
import { cn } from "@/lib/utils";
import { CaseStudyVideo } from "@/components/case-study-video";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.title} | Aryan Patney`,
    description: project.blurb,
  };
}

export default function CaseStudyPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const cs = project.caseStudy;
  const idx = projects.findIndex((p) => p.slug === params.slug);
  const next = projects[(idx + 1) % projects.length];
  const prev = projects[(idx - 1 + projects.length) % projects.length];

  return (
    <article className="relative pb-24 pt-32 md:pt-40">
      <div className="container">
        <Link
          href="/work"
          className="group mb-12 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft
            size={14}
            strokeWidth={1.75}
            className="transition-transform duration-300 ease-out group-hover:-translate-x-0.5"
          />
          All work
        </Link>

        {/* Hero meta */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="label-sm rounded-pill border border-fg/[0.12] bg-fg/[0.03] px-2.5 py-1 text-fg/85"
                >
                  {tag}
                </span>
              ))}
              <span className="label-sm ml-1 text-fg-muted">
                {project.year}
              </span>
            </div>

            <h1
              data-reveal="up"
              className="mt-5 text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-fg text-balance"
            >
              {project.title}
            </h1>

            {cs ? (
              <p
                data-reveal="up"
                data-reveal-delay="0.05"
                className="mt-6 max-w-[58ch] text-lg text-fg/85 text-pretty md:text-xl"
              >
                {cs.tldr}
              </p>
            ) : (
              <p className="mt-6 max-w-[58ch] text-base text-fg-muted text-pretty md:text-lg">
                {project.blurb}
              </p>
            )}
          </div>

          {cs ? (
            <aside className="lg:col-span-4">
              <dl
                data-reveal="up"
                data-reveal-delay="0.1"
                className="glass space-y-4 rounded-xl p-5"
              >
                <MetaRow label="Role" value={cs.role} />
                <MetaRow label="Timeline" value={cs.timeline} />
                <MetaRow label="Stack" value={cs.stack.join(", ")} />
                {cs.links?.length ? (
                  <div>
                    <dt className="label-sm text-fg-muted">Links</dt>
                    <dd className="mt-2 flex flex-col gap-1.5">
                      {cs.links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 text-sm text-fg/90 transition-colors hover:text-accent"
                        >
                          {l.label}
                          <ArrowUpRight
                            size={13}
                            strokeWidth={1.75}
                            className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                          />
                        </Link>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </aside>
          ) : null}
        </div>

        {/* Hero, video takes priority over thumbnail when both exist.
            Autoplays muted (browsers require it); user can unmute via the
            small glass toggle in the lower-right of the player. */}
        {cs?.heroVideo ? (
          <div
            data-reveal="scale"
            data-reveal-delay="0.15"
            className="glass relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-xl"
          >
            <CaseStudyVideo
              src={cs.heroVideo}
              poster={project.thumbnail}
              alt={`Video preview for ${project.title}`}
            />
          </div>
        ) : project.thumbnail ? (
          <div
            data-reveal="scale"
            data-reveal-delay="0.15"
            className="glass relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-xl"
          >
            <Image
              src={project.thumbnail}
              alt={`Cover image for ${project.title}`}
              fill
              priority
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}

        {cs ? (
          <>
            {/* Process sections */}
            <div className="mt-20 space-y-20">
              {cs.process.map((step) => (
                <ProcessSection key={step.label} step={step} />
              ))}
            </div>

            {/* Outcome / Reflection */}
            {(cs.outcome || cs.reflection) ? (
              <div className="mt-24 grid gap-10 lg:grid-cols-2 lg:gap-16">
                {cs.outcome ? (
                  <div data-reveal="up">
                    <div className="label text-fg-muted">Outcome</div>
                    <p className="mt-4 text-lg text-fg/90 text-pretty md:text-xl">
                      {cs.outcome}
                    </p>
                  </div>
                ) : null}
                {cs.reflection ? (
                  <div data-reveal="up" data-reveal-delay="0.05">
                    <div className="label text-fg-muted">Reflection</div>
                    <p className="mt-4 text-lg text-fg/85 text-pretty md:text-xl">
                      {cs.reflection}
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}

            {/* Gallery */}
            {cs.gallery?.length ? (
              <div className="mt-24">
                <div className="label text-fg-muted">Gallery</div>
                <div
                  data-stagger="0.08"
                  className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2"
                >
                  {cs.gallery.map((img, i) => (
                    <GalleryImage key={i} image={img} />
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div className="mt-12 max-w-[58ch] text-base text-fg-muted">
            <p>Detailed case study coming soon.</p>
          </div>
        )}

        {/* Prev / Next */}
        <nav
          aria-label="Project navigation"
          className="mt-32 flex flex-col gap-4 border-t border-fg/[0.06] pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <Link
            href={`/work/${prev.slug}`}
            className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.75}
              className="transition-transform duration-300 ease-out group-hover:-translate-x-0.5"
            />
            <span className="flex flex-col">
              <span className="label-sm">Previous</span>
              <span className="mt-0.5 text-fg/90">{prev.title}</span>
            </span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg sm:text-right"
          >
            <span className="flex flex-col sm:text-right">
              <span className="label-sm">Next</span>
              <span className="mt-0.5 text-fg/90">{next.title}</span>
            </span>
            <ArrowUpRight
              size={14}
              strokeWidth={1.75}
              className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
            />
          </Link>
        </nav>
      </div>
    </article>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label-sm text-fg-muted">{label}</dt>
      <dd className="mt-1 text-sm text-fg/90 text-pretty">{value}</dd>
    </div>
  );
}

function ProcessSection({
  step,
}: {
  step: {
    label: string;
    title: string;
    body: string;
    images?: CaseStudyImage[];
    imageGrid?: "default" | "screens";
  };
}) {
  const isScreens = step.imageGrid === "screens";
  return (
    <section className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <div data-reveal="up" className="label text-fg-muted">
          {step.label}
        </div>
        <h3
          data-reveal="up"
          data-reveal-delay="0.05"
          className="mt-3 text-[clamp(1.4rem,2.4vw,2rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-fg text-balance"
        >
          {step.title}
        </h3>
      </div>
      <div className="lg:col-span-8">
        <p
          data-reveal="up"
          data-reveal-delay="0.1"
          className="text-base text-fg/85 text-pretty md:text-[17px] md:leading-relaxed"
        >
          {step.body}
        </p>
        {step.images?.length ? (
          <div
            data-stagger="0.08"
            className={cn(
              "mt-8 grid gap-5",
              isScreens
                ? step.images.length === 1
                  ? "mx-auto max-w-xs grid-cols-1"
                  : step.images.length === 2
                    ? "mx-auto max-w-2xl grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2"
            )}
          >
            {step.images.map((img, i) => (
              <GalleryImage key={i} image={img} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/**
 * Consistent image frame for every case study image. Layout-driven:
 * - "screen": portrait phone mockup, 9:16 aspect, tight padding so the
 *   mockup fills the frame inside a 3-column grid.
 * - "tall":   3:4 aspect inside a single column, used for one-off portraits.
 * - "wide":   spans the whole row at 16:10.
 * - default:  16:10 with object-contain padding for landscape demos.
 */
function GalleryImage({ image }: { image: CaseStudyImage }) {
  const layout = image.layout ?? "default";

  const aspect =
    layout === "screen"
      ? "aspect-[9/16]"
      : layout === "card"
        ? "aspect-[4/5]"
        : layout === "tall"
          ? "aspect-[3/4]"
          : "aspect-[16/10]";

  // Trios (screen / card) get less padding so the subject reads at full size.
  const imagePadding =
    layout === "screen" || layout === "card" ? "p-3 sm:p-4" : "p-6 sm:p-8";

  return (
    <figure
      data-stagger-item
      className={cn(
        "glass relative flex flex-col overflow-hidden rounded-xl",
        layout === "wide" && "md:col-span-2"
      )}
    >
      <div
        className={cn("relative w-full overflow-hidden", aspect)}
        style={{
          background:
            "radial-gradient(120% 120% at 50% 50%, rgb(255 255 255 / 0.02), rgb(0 0 0 / 0.25))",
        }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={
            layout === "screen" || layout === "card"
              ? "(min-width: 1024px) 320px, 50vw"
              : "(min-width: 1024px) 800px, 100vw"
          }
          className={cn("object-contain", imagePadding)}
        />
      </div>
      {image.caption ? (
        <figcaption className="border-t border-fg/[0.05] px-5 py-4 text-sm text-fg-muted text-pretty">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
