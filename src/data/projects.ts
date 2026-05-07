export type ProjectTag = "Coding" | "HCI" | "Design";

export interface CaseStudyImage {
  src: string;
  alt: string;
  /** Short caption shown under the image — used because the source images don't have built-in annotations. */
  caption?: string;
  /**
   * Per-image hint for the gallery layout.
   * - "wide": spans both columns of a 2-col grid
   * - "tall": 3:4 inside a single column
   * - "screen": 9:16 phone mockup — used inside step.imageGrid="screens"
   * - "card":   4:5 product/UI shot — used inside step.imageGrid="screens"
   *             when the trio is photographs, not phone screens
   */
  layout?: "wide" | "default" | "tall" | "screen" | "card";
}

export interface CaseStudyProcess {
  /** Short eyebrow label — e.g. "01 · The audit". */
  label: string;
  /** Sentence-case section title. */
  title: string;
  /** Body paragraph(s). Plain text; soft line breaks become paragraphs. */
  body: string;
  /** Optional images placed alongside this process step. */
  images?: CaseStudyImage[];
  /**
   * Layout strategy for this step's image grid.
   * - undefined / "default": 2-column grid, 16:10 frames
   * - "screens": 3-column grid sized for portrait phone mockups
   */
  imageGrid?: "default" | "screens";
}

export interface CaseStudy {
  /** Single-line pitch shown right under the project title in the case study hero. */
  tldr: string;
  role: string;
  timeline: string;
  stack: string[];
  links?: { label: string; href: string }[];
  process: CaseStudyProcess[];
  outcome?: string;
  reflection?: string;
  /** Final image gallery shown after the process sections. */
  gallery?: CaseStudyImage[];
}

export interface Project {
  slug: string;
  title: string;
  /** All disciplines this project sits across. First item = primary tag. */
  tags: ProjectTag[];
  year: string;
  blurb: string;
  /** Optional path under /public; falls back to a styled placeholder when absent. */
  thumbnail?: string;
  /** Visual gradient hint for the placeholder card when no thumbnail is provided. */
  hint?: "violet" | "blue" | "pink" | "teal" | "neutral";
  /** Surfaces on the homepage. /work shows everything regardless. */
  featured?: boolean;
  /** Long-form case study. Projects without a caseStudy link to a basic page. */
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  // ─────────────────────────── FEATURED ───────────────────────────
  {
    slug: "touchdesigner-kinect-installation",
    title: "Embodied — Kinect v2 × TouchDesigner",
    tags: ["Coding", "HCI"],
    year: "2025",
    blurb:
      "A multi-modal interactive installation that translates full-body motion into four generative visualisation modes — body as both controller and canvas, no interface in between.",
    thumbnail: "/projects/touchdesigner-kinect-installation/cover.png",
    hint: "teal",
    featured: true,
    caseStudy: {
      tldr: "An interface-less installation where your body is the controller and the canvas — Kinect skeletal tracking piped into four TouchDesigner pipelines.",
      role: "Final project, CSIT334 — Human-Computer Interaction",
      timeline: "3 months",
      stack: ["TouchDesigner", "Microsoft Kinect v2", "GLSL"],
      links: [
        {
          label: "Project drive",
          href: "https://drive.google.com/drive/folders/1CZ-5sX5PdIuIWQZH35JXDtCcOzgduiT2?usp=share_link",
        },
      ],
      process: [
        {
          label: "01 · Premise",
          title: "Body as the only interface.",
          body: "The brief was open: explore embodied interaction in a course rooted in HCI fundamentals. I went from there to a question — what happens when there's no screen to touch, no buttons, no menus? Just a person, a room, and a sensor. The Kinect v2 captures full skeletal data at 30 frames per second; TouchDesigner gives you a node graph to do anything with it. The hard part wasn't the tech — it was deciding what mappings between movement and image were worth making.",
        },
        {
          label: "02 · Four pipelines",
          title: "Four ways to be seen.",
          body: "I built four distinct visualisation modes, each interrogating a different relationship between body and image. Time Slice samples your silhouette across moments and stacks them as overlapping ghosts, making your past visible. Cloudy Trail maps motion velocity into a fluid simulation, so faster gestures bloom into denser smoke. Two more modes — Generative Texture and Temporal Propagation — explore mapping joint positions into procedural patterns. The point of having four was to argue that there's no single 'right' way to translate motion into image.",
          images: [
            {
              src: "/projects/touchdesigner-kinect-installation/time-slice.png",
              alt: "Time Slice mode — overlapping silhouettes of the body across recent moments",
              caption:
                "Time Slice — every frame leaves a faint ghost. Walking through the space draws a temporal corridor behind you.",
              layout: "wide",
            },
            {
              src: "/projects/touchdesigner-kinect-installation/cloudy-trail.png",
              alt: "Cloudy Trail mode — fluid simulation following body motion",
              caption:
                "Cloudy Trail — joint velocity drives a fluid solver. Slow movement is sparse; sudden gestures bloom.",
              layout: "wide",
            },
          ],
        },
        {
          label: "03 · Process",
          title: "Trial, error, and a lot of cabling.",
          body: "I'd never used TouchDesigner before this course, so the work was front-loaded with learning. I prototyped each mode in isolation — got skeletal data flowing in, then built the visual layer on top — before composing them into a single switchable installation. A lot of the time was spent tuning thresholds: what counts as 'fast' motion, how long ghosts should persist, when noise becomes pleasant texture vs. visual chaos. The HCI literature on direct manipulation and embodied cognition shaped which compromises I made.",
        },
      ],
      outcome:
        "A working installation with four switchable modes, demonstrated live with a Kinect v2 and a projector. Documented as a course report with a system architecture, mode-by-mode algorithmic breakdown, and UX analysis.",
      reflection:
        "I'd push further on the social dimension next time — what happens with two bodies in the space, not one? The current pipelines collapse multiple skeletons into a single silhouette; making them dialogue with each other would be a much richer brief.",
    },
  },
  {
    slug: "echoes-of-the-cosmos",
    title: "Echoes of the Cosmos",
    tags: ["Coding", "HCI"],
    year: "2025",
    blurb:
      "A solo-exploration solar system game built in Unity. Supports keyboard, mouse, and VR — designed for slow, immersive interaction whether you're at a desk or drifting through space on a Quest 3.",
    thumbnail: "/projects/echoes-of-the-cosmos/cover.png",
    hint: "blue",
    featured: true,
    caseStudy: {
      tldr: "A VR-first space exploration game built in Unity. You pilot a small craft through the solar system from a first-person cockpit — no fail state, no quest log, just drifting and reading.",
      role: "Final project, CSIT304 — Computer Graphics",
      timeline: "4 months",
      stack: [
        "Unity",
        "AR Foundation",
        "XR Interaction Toolkit",
        "Meta XR SDK",
        "C#",
      ],
      links: [
        {
          label: "GitHub repository",
          href: "https://github.com/aryanpatneygit/AstronomyVR",
        },
      ],
      process: [
        {
          label: "01 · Premise",
          title: "Slow, not stressful.",
          body: "Most VR games optimise for adrenaline — fast movement, fail states, crisp combat loops. I wanted the opposite. The brief I set was 'a planetarium you can drive'. The interaction loop is just: see a planet, fly toward it, an info card fades in when you're close enough, you read for a minute, you leave. Educational without being didactic, immersive without being demanding.",
        },
        {
          label: "02 · Three input modes",
          title: "Built for a desk and for VR — same scene, three control schemes.",
          body: "Unity's XR Interaction Toolkit gave me a clean abstraction for keyboard / mouse, gamepad, and Quest controllers — the same scene runs on all three. I tested most of the development loop on a desk because iteration speed in VR is brutal, then validated each milestone on a Meta Quest 3. The cockpit is a fixed cabin around the camera so motion sickness stays minimal: you never lose your reference frame.",
          images: [
            {
              src: "/projects/echoes-of-the-cosmos/cockpit.png",
              alt: "First-person cockpit view from inside the spaceship",
              caption:
                "The cockpit — fixed cabin geometry around the camera keeps the user grounded in VR even during fast traversal.",
              layout: "wide",
            },
          ],
        },
        {
          label: "03 · Information design",
          title: "Info cards as the only UI.",
          body: "There's no HUD. No quest log, no minimap. Approach a planet and a card materialises in 3D space at a comfortable focal distance — name, mass, orbital period, a sentence of context. Leave and it fades. The card is the entire interface; everything else is the world. Designing those cards was harder than the engineering — too much text and you're reading documentation, too little and you've made a screensaver.",
          images: [
            {
              src: "/projects/echoes-of-the-cosmos/planet-info.png",
              alt: "An info card hovering near a planet",
              caption:
                "Information surfaces on approach — diegetic, never anchored to the head.",
            },
            {
              src: "/projects/echoes-of-the-cosmos/quest3-photo.png",
              alt: "Photo of the Meta Quest 3 headset used to test the build",
              caption: "Validated on Meta Quest 3 — Quest-native build via Meta XR SDK.",
            },
          ],
        },
      ],
      outcome:
        "A fully functional educational VR game with the full solar system traversable, info surfaces on approach, and three input parities. Tested on Meta Quest 3 hardware.",
      reflection:
        "Next pass would lean into audio — directional sound, planetary 'songs', a soundscape that changes with proximity. The visual design was cooked enough; the audio layer is the next obvious depth.",
    },
  },
  {
    slug: "sneakers-ar",
    title: "Sneakers AR",
    tags: ["Coding", "Design"],
    year: "2024",
    blurb:
      "A markerless AR sneaker try-on built in Unity. Mobile-first, minimal UI, real-time product placement — turning product discovery into a tactile experience.",
    thumbnail: "/projects/sneakers-ar/cover.png",
    hint: "violet",
    featured: true,
    caseStudy: {
      tldr: "A mobile AR sneaker app — browse a catalogue, place a sneaker on the floor in front of you in real time, walk around it. Built in Unity with markerless tracking.",
      role: "Final project, DESG316 — Immersive Design",
      timeline: "1 month",
      stack: [
        "Unity",
        "AR Foundation",
        "XR Interaction Toolkit",
        "ARKit",
        "C#",
      ],
      links: [
        {
          label: "Build demo",
          href: "https://drive.google.com/file/d/1Af8hwMRFAzifC_nuYZtXnS4M9cbLpLuS/view?usp=sharing",
        },
      ],
      process: [
        {
          label: "01 · Onboarding",
          title: "A short, calm welcome.",
          body: "Every AR app I'd used opened with a permissions wall. I wanted the onboarding to feel like a product, not a system check — a short stack of screens introducing what AR is for and what the app would let you do, with the camera permission framed in the user's language rather than the OS's.",
          images: [
            {
              src: "/projects/sneakers-ar/onboarding.png",
              alt: "Three onboarding screens introducing the app's AR functionality",
              caption:
                "Onboarding — a calm three-screen intro before the camera permission prompt.",
              layout: "wide",
            },
          ],
        },
        {
          label: "02 · Browsing",
          title: "Catalogue first, AR second.",
          body: "AR is the moment, but you have to browse before you place. The app catalog is intentionally restrained — minimal UI, large product imagery, plenty of negative space. You should feel like you're browsing a magazine, not a tracking demo. Tap a sneaker, hit 'Try in AR', and you're into the AR view.",
          images: [
            {
              src: "/projects/sneakers-ar/app-browse.png",
              alt: "App catalog view with featured sneakers",
              caption: "The catalogue — minimal chrome, product first.",
              layout: "wide",
            },
          ],
        },
        {
          label: "03 · The AR scene",
          title: "Markerless placement on the floor in front of you.",
          body: "AR Foundation's plane detection finds the floor; the sneaker drops onto a hit-tested point in front of the camera. From there it's standard AR interactions — pinch to scale (within reason), drag to reposition, walk around it. Building it under a one-month timeline meant skipping inverse-kinematic 'try them on your foot' magic and committing to a cleaner 'place and inspect' loop, which actually held up better on a wider range of devices.",
          images: [
            {
              src: "/projects/sneakers-ar/ar-demo.png",
              alt: "Demo screenshot of a sneaker placed in AR via the app",
              caption: "AR demo — sneaker placed via plane detection, free to walk around.",
              layout: "wide",
            },
          ],
        },
      ],
      outcome:
        "A working iOS AR app with catalogue browsing, full AR placement, and markerless tracking on real-world surfaces.",
    },
  },
  {
    slug: "ibo-cxo-dashboard",
    title: "IBO — CXO Health Dashboard",
    tags: ["Design"],
    year: "2025",
    blurb:
      "Internship work at IBO. A mobile-first executive dashboard turning live KPIs across store performance, customer feedback, and logistics into clean, responsive visuals — under tight timelines.",
    thumbnail: "/projects/ibo-cxo-dashboard/cover.png",
    hint: "neutral",
    featured: true,
    caseStudy: {
      tldr: "Mobile-first executive dashboard for IBO's CXOs. Live KPIs across stores, feedback, and logistics — designed in Figma against tight stakeholder cycles.",
      role: "Internship — UI/UX Designer at IBO",
      timeline: "2 months",
      stack: ["Figma", "Stakeholder workshops", "Design tokens"],
      links: [
        {
          label: "Figma file",
          href: "https://www.figma.com/design/SbkJ04xGXO3b3JIMJCqc0Y/IBO-Executive-Dashboard-MVP?node-id=0-1&t=9OPPf6ONB1jOSWkE-1",
        },
      ],
      process: [
        {
          label: "01 · The brief",
          title: "Time-to-insight as the only metric.",
          body: "Executives don't browse dashboards — they glance, decide, move on. The internal tools at IBO leaned on web layouts on a phone, which meant a lot of pinching and squinting. The brief that emerged from the first stakeholder workshops was simple: every screen has to give a CXO their answer in under five seconds, on their phone, between meetings.",
        },
        {
          label: "02 · Three lines, three screens",
          title: "Home, Orders, Sales — one tap each.",
          body: "I went mobile-first, hard. Three primary screens, one for each line of business. Home is the at-a-glance overview — the hero KPI in big type, supporting modules below. Orders and Sales each get their own dedicated page so a CXO never has to hold multiple lenses in their head at once. Tab between them; everything else is hidden in modals.",
          imageGrid: "screens",
          images: [
            {
              src: "/projects/ibo-cxo-dashboard/home.png",
              alt: "IBO dashboard home screen",
              caption: "Home — the at-a-glance overview, hero KPI on top.",
              layout: "screen",
            },
            {
              src: "/projects/ibo-cxo-dashboard/orders.png",
              alt: "IBO orders page",
              caption: "Orders — its own dedicated lens, no competing modules.",
              layout: "screen",
            },
            {
              src: "/projects/ibo-cxo-dashboard/sales.png",
              alt: "IBO sales page",
              caption: "Sales — same pattern, separate page, KPIs first.",
              layout: "screen",
            },
          ],
        },
        {
          label: "03 · Drill-down patterns",
          title: "Filters and split-by, hidden until asked.",
          body: "The control surfaces live in modals so the dashboard canvas never feels like a settings panel. The Sales page's additional-filters modal lets a CXO narrow by lead, source, or customer type — three axes that come up repeatedly in stakeholder conversations. The Orders page's split-by modal is the comparison tool: switch between lead source, offline vs. online sales, department, or customer type to re-slice the same dataset along whichever axis answers the current question. Tap once, get a different view; never lose the page you were on.",
          images: [
            {
              src: "/projects/ibo-cxo-dashboard/orders-split.png",
              alt: "Orders page with the split-by modal open",
              caption:
                "Orders + Split By modal — re-slice by lead source, channel, department, or customer type.",
              layout: "screen",
            },
            {
              src: "/projects/ibo-cxo-dashboard/sales-filters.png",
              alt: "Sales page with the additional filters modal open",
              caption:
                "Sales + Additional Filters — narrow by lead, source, customer type without leaving the page.",
              layout: "screen",
            },
          ],
          imageGrid: "screens",
        },
        {
          label: "04 · Iteration",
          title: "Weekly stakeholder reviews, ruthless cuts.",
          body: "The design moved on a one-week cadence with stakeholders from both engineering and the C-suite. Each round, half the screens got cut or merged. The version that shipped as the MVP was substantially smaller than the one that started — which is usually the sign that the work is going right.",
        },
      ],
      outcome:
        "An MVP design accepted by leadership and handed to the engineering team to build out. Establishes the visual language for IBO's other internal dashboards going forward.",
    },
  },

  // ─────────────────────────── /WORK ONLY ───────────────────────────
  {
    slug: "pepperfry-ar-heuristics",
    title: "Pepperfry — Heuristic Re-evaluation & AR Integration",
    tags: ["HCI", "Design", "Coding"],
    year: "2026",
    blurb:
      "Dissertation on Pepperfry's mobile app: 30 documented heuristic violations, an 85-screen Figma redesign that fixes every one, and a working ARKit prototype that lets users preview furniture in their actual room before they buy.",
    thumbnail: "/projects/pepperfry-ar-heuristics/cover.png",
    hint: "violet",
    caseStudy: {
      tldr: "Graduation dissertation: a heuristic-driven redesign of Pepperfry's mobile app from audit to AR prototype. 30 violations. 180+ screens. One working ARKit build.",
      role: "Graduation project, FLAME University",
      timeline: "4 months",
      stack: [
        "Figma",
        "Unity",
        "AR Foundation",
        "XR Foundation",
        "ARKit",
        "Xcode",
        "iOS 26",
      ],
      links: [
        {
          label: "Figma — full redesign",
          href: "https://www.figma.com/design/eAA8DKym0sEErPMSG8dguW/Graduation-Project---PepperFry-Redesign?node-id=1334-22214&t=JwfF6esJZNaKbjdy-1",
        },
        {
          label: "GitHub — Unity AR build",
          href: "https://github.com/aryanpatneygit/pepperfry-ar-unity",
        },
      ],
      process: [
        {
          label: "01 · The audit",
          title: "30 violations against Nielsen's ten.",
          body: "I evaluated the live Pepperfry mobile app against Nielsen's ten usability heuristics (1994). Every screen, every flow, severity-rated. The audit produced thirty documented violations spanning all ten heuristics — the most consequential a confirmshaming dark pattern on the home screen ('No, I don't want to save money'), ten severity-3 failures across navigation and visual hierarchy, fifteen severity-2 bugs, and four severity-1 cosmetic issues. The point wasn't to be exhaustive — it was to make every problem traceable back to a specific principle, so the redesign that followed had teeth.",
          images: [
            {
              src: "/projects/pepperfry-ar-heuristics/audit_grid.png",
              alt: "Grid showing screenshots of multiple heuristic violations across the Pepperfry app",
              caption:
                "Audit montage — each tile is a documented violation, severity-rated.",
              layout: "wide",
            },
          ],
        },
        {
          label: "02 · The redesign",
          title: "180+ screens. Every change traced to a violation.",
          body: "Phase two was a full Figma redesign in Pepperfry's brand identity. Over 180 high-fidelity screens covering every flow — onboarding, browse, product detail, checkout, account, support — in light and dark variants. The discipline I held myself to: every design change had to point back to a specific violation in the audit. The dark pattern got removed entirely. The navigation was restructured around how people actually shop for furniture (room → category → product), not how Pepperfry's catalog is organised internally. The AR catalog was added as a primary nav item, because the third phase of the project would have to live somewhere.",
          imageGrid: "screens",
          images: [
            {
              src: "/projects/pepperfry-ar-heuristics/redesign-home.png",
              alt: "Redesigned Pepperfry home screen",
              caption:
                "Home — confirmshaming gone, the new AR catalog promoted into primary nav.",
              layout: "screen",
            },
            {
              src: "/projects/pepperfry-ar-heuristics/redesign-product.png",
              alt: "Redesigned product detail screen",
              caption: "Product detail — sizing, materials, room-fit clearer; AR preview entry inline.",
              layout: "screen",
            },
            {
              src: "/projects/pepperfry-ar-heuristics/redesign-checkout.png",
              alt: "Redesigned checkout flow",
              caption: "Checkout — single-page summary, every error message rewritten plainly.",
              layout: "screen",
            },
          ],
        },
        {
          label: "03 · The AR build",
          title: "From design spec to working iOS prototype.",
          body: "Phase three was the engineering — turning the AR catalog spec into something you could actually run on a phone. Built in Unity with AR Foundation and ARKit, targeting iOS 26 via Xcode. The prototype lets you walk into a room, scan the floor, and place a piece of furniture from the catalog in real-time. The full build pipeline was documented end-to-end — Unity project setup, AR Foundation configuration, the Xcode build chain, iOS deployment — so anyone could reproduce it.",
          images: [
            {
              src: "/projects/pepperfry-ar-heuristics/ar-catalog.png",
              alt: "Redesigned AR Catalog UI in the primary navigation",
              caption: "AR Catalog UI — designed alongside the rest of the app's nav, not bolted on.",
              layout: "wide",
            },
            {
              src: "/projects/pepperfry-ar-heuristics/ar-prototype.png",
              alt: "Unity simulation of the AR prototype placing furniture in a scanned room",
              caption:
                "Working prototype — Unity simulation of the ARKit furniture-placement build.",
              layout: "wide",
            },
          ],
        },
      ],
      outcome:
        "All 30 audit findings resolved. Every dark pattern eliminated. Navigation restructured around shopping intent rather than catalog structure. A working AR prototype handed off as a Unity project + signed iOS build.",
      reflection:
        "The dissertation framing forced a kind of rigour you don't usually get from product work — every claim had to be defensible. I'd carry that audit-first habit into anything I work on next.",
    },
  },
  {
    slug: "brandforge",
    title: "BrandForge — Generative Brand Identity Engine",
    tags: ["Coding", "Design"],
    year: "2026",
    blurb:
      "A full-stack app that synthesises a production-ready brand identity kit from a one-line brief. Three chained LLM agents — Strategist, Visual Director, Copywriter — emit strict JSON, composed into palette, type pairing, logo, voice guidelines, and a mood board.",
    thumbnail: "/projects/brandforge/cover.png",
    hint: "violet",
    caseStudy: {
      tldr: "A multi-agent generative system that turns a single natural-language brief into a complete, production-ready brand kit — strategy, palette, type, logo, voice, mood board.",
      role: "Final project, BUAN361 — Applied Generative AI",
      timeline: "1 month",
      stack: [
        "Next.js",
        "TypeScript",
        "Supabase (with row-level security)",
        "LLM chain-of-prompts",
        "Vercel",
      ],
      links: [
        {
          label: "Live deployment",
          href: "https://brand-forge-nine.vercel.app/dashboard",
        },
      ],
      process: [
        {
          label: "01 · The brief",
          title: "One prompt in, a brand kit out.",
          body: "The user enters five fields — brand name, industry, target audience, mood keywords, and an optional description. That's it. From there, the system has to produce something that would normally cost a small studio a month: strategy, archetype, six-slot colour palette, typography pairing, logo directions, voice guidelines, copy scenarios, a favicon, a QR code, a mood board, social mockups, a brand story, and an FAQ. The interface promises this can happen in under a minute. The architecture has to deliver on that promise.",
          images: [
            {
              src: "/projects/brandforge/home.png",
              alt: "BrandForge prompt input screen",
              caption:
                "The home — five fields and a single CTA. Everything downstream flows from this.",
              layout: "wide",
            },
          ],
        },
        {
          label: "02 · Three agents, one chain",
          title: "Strategist → Visual Director → Copywriter.",
          body: "I deliberately chose multi-agent chain-of-prompts over RAG. The task is creative synthesis from a brief, not factual retrieval against a corpus — RAG would have been the wrong tool. Each agent does one thing well: the Strategist decides on archetype, positioning, and brand pillars; the Visual Director picks palette, type, logo direction; the Copywriter writes voice guidelines, story, FAQ. Each agent's output is strictly-typed JSON, validated on the way through, so a downstream agent can rely on what the upstream one produced.",
          images: [
            {
              src: "/projects/brandforge/agents.png",
              alt: "BrandForge agent pipeline composing the brand kit",
              caption:
                "Agents at work — JSON flows down the chain; each step is independently visible.",
              layout: "wide",
            },
          ],
        },
        {
          label: "03 · Resilience",
          title: "Fallbacks, dedup, and security.",
          body: "Generative systems break in interesting ways — image APIs throttle, model outputs drift off-schema, identical prompts shouldn't pay the model bill twice. BrandForge has multi-layer image fallbacks (so a failed mood-board image swaps to a deterministic alternative, not a broken state), a deterministic client-side SVG logo generator (so even if every image API fails, you still get a logo), response-cache deduplication (same brief, same kit, no second bill), and a prompt-injection filter at the input layer. Auth and storage are on Supabase with row-level security, so users only see their own kits.",
        },
      ],
      outcome:
        "Deployed to Vercel and working end-to-end. A user can land on the home page, type a brief, and watch a complete brand kit assemble in under a minute.",
      reflection:
        "More iterations of the visual-output layer are coming — better logo quality, richer mood boards, exportable design tokens. The agent architecture is the part I'd keep; the rendering layer is where the next month of work goes.",
    },
  },
  {
    slug: "thrifty",
    title: "Thrifty — A Home for India's Thrift Market",
    tags: ["Design"],
    year: "2025",
    blurb:
      "A concept platform for India's thrift fashion ecosystem. Removes the friction of Instagram DMs and inconsistent payments — browsing, buying, and shipping in one place.",
    thumbnail: "/projects/thrifty/cover.png",
    hint: "teal",
    caseStudy: {
      tldr: "A concept marketplace that drags India's Instagram-led thrift economy onto a real platform — browse, buy, pay, ship in one place, for both buyers and sellers.",
      role: "Passion project",
      timeline: "6 months",
      stack: ["Figma", "User research", "Service design"],
      links: [
        {
          label: "Figma file",
          href: "https://www.figma.com/design/ZBoMAK6FsvwQ8Ey0nA728E/Thrifty-Website-UI?node-id=0-1&t=mNt5yDGpobAaxrVd-1",
        },
      ],
      process: [
        {
          label: "01 · Why",
          title: "The Instagram thrift economy is huge — and broken.",
          body: "India's secondhand fashion market lives almost entirely on Instagram: sellers post drops as Stories, buyers DM 'mine' or 'price?', payment happens over UPI, shipping is negotiated case by case. It's vibrant and totally illegible. Drops sell out in minutes; disputes go nowhere; trust is built one DM at a time. Thrifty's question: can you keep the energy of that economy and give it the rails of a real marketplace?",
          images: [
            {
              src: "/projects/thrifty/home.png",
              alt: "Thrifty home page",
              caption: "Home — the energy of an Instagram drop, the structure of a marketplace.",
              layout: "wide",
            },
          ],
        },
        {
          label: "02 · Two products in one",
          title: "Buyer flow and seller flow, designed in parallel.",
          body: "Thrifty is really two products. The buyer side is browse, save, buy, track. The seller side is inventory, drops, fulfilment. I designed both flows end-to-end, in lockstep, because choices on one side constrain the other — the seller's drop-scheduling tool is what enables the buyer's structured browse view. A platform like this only works if both sides feel like the system was designed for them, not retrofitted.",
          images: [
            {
              src: "/projects/thrifty/buyer-flow.png",
              alt: "Thrifty buyer flow screens",
              caption: "Buyer flow — browse → save → buy → track.",
              layout: "wide",
            },
            {
              src: "/projects/thrifty/seller-flow.png",
              alt: "Thrifty seller flow screens",
              caption: "Seller flow — inventory → drop scheduling → fulfilment.",
              layout: "wide",
            },
          ],
        },
        {
          label: "03 · Research",
          title: "Six months with sellers and buyers.",
          body: "The product wouldn't be real without the people. I spent the first stretch of the project interviewing sellers running Instagram thrift accounts and buyers who shop on them — what works, what doesn't, what they'd pay to fix. Every flow in the final design points back to a specific complaint heard in those conversations.",
        },
      ],
      outcome:
        "A complete prototype — both buyer and seller flows, end-to-end, in Figma — plus the underlying research that justifies every choice.",
    },
  },
  {
    slug: "zomato-cart-abandonment",
    title: "Zomato — A Data-Driven Look at Cart Abandonment",
    tags: ["Design", "Coding"],
    year: "2026",
    blurb:
      "Mixed-methods study on Zomato cart conversion — qualitative insights, pilot surveys, interviews, A/B testing, statistical validation — converging on a redesign brief grounded in evidence.",
    hint: "pink",
    caseStudy: {
      tldr: "Data-driven design study on Zomato cart abandonment — full pipeline from problem statement to A/B test to statistical validation.",
      role: "Final project, DESG318 — Data Driven Design",
      timeline: "1 month",
      stack: ["Survey design", "Interviews", "A/B testing", "Statistical validation", "Claude Code", "Antigravity"],
      process: [
        {
          label: "01 · Method",
          title: "Every claim, defensible.",
          body: "The course was about doing design with the same rigour you'd expect from a research paper. Every recommendation has to point back to data; every piece of data has to be statistically defensible. I picked Zomato cart abandonment because it's a high-stakes problem that's been studied to death without ever being closed — which usually means the methods, not the question, are the issue.",
        },
        {
          label: "02 · Funnel",
          title: "Qualitative insights → pilot survey → full survey → interviews → A/B test → validation.",
          body: "I worked the pipeline in order. Qualitative insights surfaced the candidate hypotheses about why people abandon. A pilot survey checked whether the questions even made sense; the full survey produced the dataset. Interviews dug into the why behind the most common drop-off patterns. From those, two competing redesigns went into an A/B test, prototyped via Claude Code and Antigravity. Statistical validation determined which redesign actually moved the needle.",
        },
        {
          label: "03 · Output",
          title: "A redesign brief grounded in evidence.",
          body: "The deliverable wasn't a polished mockup — it was a documented chain from problem to evidence to recommendation. The point of the course was to demonstrate the method, not the visual design, and the output is structured to make that chain auditable end-to-end.",
        },
      ],
      outcome:
        "A complete data-driven design study — problem statement through statistical validation — with every step documented and reproducible.",
    },
  },
  {
    slug: "unity-room-design",
    title: "Unity Room — A Spatial Study in ProBuilder",
    tags: ["Coding", "Design"],
    year: "2024",
    blurb:
      "A modular 3D room built entirely in Unity ProBuilder. Studies scale, form balance, lighting, and player-view composition — environment design as interface, intended as a base for VR experiences.",
    thumbnail: "/projects/unity-room-design/cover.png",
    hint: "neutral",
    caseStudy: {
      tldr: "A minimal 3D room built entirely in Unity ProBuilder. A spatial study — scale, lighting, composition, player-view flow — intended as the foundation for future VR scenes.",
      role: "Design project",
      timeline: "1 week",
      stack: ["Unity", "ProBuilder", "Real-time lighting"],
      links: [
        {
          label: "Build demo",
          href: "https://drive.google.com/file/d/1Af8hwMRFAzifC_nuYZtXnS4M9cbLpLuS/view?usp=sharing",
        },
      ],
      process: [
        {
          label: "01 · Brief",
          title: "Build a calm, navigable room — entirely from primitives.",
          body: "I gave myself a one-week constraint: build a 3D space worth being inside, using only Unity's primitive tools and ProBuilder. No imported assets. The point was to study composition and proportion at the level of geometry, not at the level of decoration.",
          images: [
            {
              src: "/projects/unity-room-design/scene.png",
              alt: "Editor view of the Unity room scene",
              caption: "Scene view — grid-snapped primitives via ProBuilder.",
              layout: "wide",
            },
          ],
        },
        {
          label: "02 · Composition",
          title: "Walls, platforms, cutouts — flow before furniture.",
          body: "Layout came first. I sketched the negative space — where would someone walk, where would they stop, where would their eye land — then placed walls and platforms to make those moments happen. Every surface was modelled with first-person scale in mind, so movement through the room would feel proportionate, not theatrical. Cutouts and platforms create the rhythm; the room reads like a corridor designed to slow you down.",
        },
        {
          label: "03 · Light",
          title: "Baked lighting plus real-time spots — light defines depth.",
          body: "Materials were intentionally flat — almost no PBR detail, just clean colour. The room's depth comes from light, not from textures. Baked global illumination provides the soft gradients; a small number of real-time spots cast hard shadows on what matters. I also tested colour-temperature shifts to fake different times of day, since the same geometry reads completely differently under warm vs. cool light.",
          images: [
            {
              src: "/projects/unity-room-design/wide-view.png",
              alt: "Wide first-person view of the finished Unity room",
              caption:
                "Final wide view — light defining depth, geometry kept minimal.",
              layout: "wide",
            },
          ],
        },
      ],
      outcome:
        "A small, navigable scene — useful as a starting environment for future VR or game projects, and as a personal reference for what a real-time space can do with very little geometry.",
    },
  },
  {
    slug: "stym",
    title: "Stym — Sensory Stim Wearable",
    tags: ["Design"],
    year: "2024",
    blurb:
      "A 3D-printed sensory accessory for autistic children who stim. Modular, socially neutral, designed for fidgeting, biting, and tactile rubbing — regulation without stigma.",
    thumbnail: "/projects/stym/cover.png",
    hint: "pink",
    caseStudy: {
      tldr: "A 3D-printed sensory wearable system — bracelet, pendant, ring — designed for autistic children who stim. Discreet, modular, made to disappear into daily life.",
      role: "Final project, DESG308 — Interaction Design",
      timeline: "4 months",
      stack: ["Blender", "Unity", "3D printing", "Material research"],
      process: [
        {
          label: "01 · Premise",
          title: "Stimming is regulation, not a problem.",
          body: "Stimming — repetitive self-stimulation, often through fidgeting, rocking, or oral movement — is how many autistic people self-regulate. The problem isn't the behaviour; it's that the tools that exist for it tend to look conspicuous, infantilising, or therapeutic. Stym started from a different premise: design objects that pass for jewellery, that a kid would actually want to wear, that happen to be excellent stim toys.",
          images: [
            {
              src: "/projects/stym/all.png",
              alt: "All Stym wearable pieces — bracelet, pendant, and ring",
              caption: "The full set — bracelet, pendant, ring. Designed to coexist as a system.",
              layout: "wide",
            },
          ],
        },
        {
          label: "02 · Three pieces, three behaviours",
          title: "Bracelet, pendant, ring — each tuned for a different stim.",
          body: "I split the system across three forms because no single object can support every stim. The bracelet is built for tactile rubbing — its surface alternates between smooth and ridged so the same motion produces different sensations. The pendant is sized and finished for safe oral stimming — biting, chewing — using flexible, food-safe TPU. The ring is the discreet fidget option for when a child is in a setting where wearing a pendant might draw attention. The pieces talk to each other visually; you'd recognise them as a set without them feeling like a uniform.",
          images: [
            {
              src: "/projects/stym/bracelet.png",
              alt: "Stym bracelet — tactile-rubbing piece",
              caption: "Bracelet — alternating textures for tactile stimming.",
              layout: "wide",
            },
            {
              src: "/projects/stym/pendant.png",
              alt: "Stym pendant — oral-stim piece",
              caption: "Pendant — flexible, food-safe TPU for safe oral interaction.",
              layout: "wide",
            },
            {
              src: "/projects/stym/ring.png",
              alt: "Stym ring — discreet fidget piece",
              caption: "Ring — the discreet option when a pendant is too much.",
              layout: "wide",
            },
          ],
        },
        {
          label: "03 · Process",
          title: "Iterate, print, hand it to a kid, listen.",
          body: "The form work was iterative. Every prototype got 3D-modelled in Blender, printed in flexible filament, and tested for grip, mouth-feel, durability, and — crucially — whether a child wanted to put it on. I worked with parents and therapists for feedback on portability, safety, and attachment style. Many early forms got rejected because they were trying too hard to look like 'design objects'; the final pieces succeeded because they got out of their own way.",
        },
      ],
      outcome:
        "First-print prototypes of all three pieces, validated with users and therapists. Modular system designed to be wearable as a set or piece-by-piece.",
      reflection:
        "Production-grade material exploration is the next step — silicone for the pendant, a metal core for the bracelet — to take this past 3D-printed prototypes into something a parent could actually buy.",
    },
  },
  {
    slug: "moodle-insight-dashboard",
    title: "FLAME Moodle Insight Dashboard",
    tags: ["Coding", "Design"],
    year: "2025",
    blurb:
      "A React + TypeScript analytics tool for FLAME University's Center for Digital Learning. Local-first CSV parsing, weighted scoring, and a traffic-light flagging system that turns Moodle data into actionable insight.",
    thumbnail: "/projects/moodle-insight-dashboard/home.png",
    hint: "blue",
    caseStudy: {
      tldr: "A web analytics tool for FLAME University's CDL. Replaces manual Excel tracking with a local-first dashboard that flags at-risk students automatically.",
      role: "Final project, CSIT306 — Software Architecture & Engineering",
      timeline: "3 months",
      stack: ["React", "TypeScript", "Tailwind CSS", "CSV parsing", "Client-side architecture"],
      links: [
        {
          label: "GitHub repository",
          href: "https://github.com/aryanpatneygit/flame-moodle-insight-43732",
        },
      ],
      process: [
        {
          label: "01 · The client",
          title: "FLAME's CDL — manual Excel, every cohort, every term.",
          body: "FLAME's Center for Digital Learning was tracking pre-orientation engagement by hand: exporting Moodle CSVs, opening them in Excel, calculating engagement scores manually, flagging students for intervention based on instinct. It worked, but it didn't scale, and 'time-to-insight' was measured in hours. The brief was to replace that loop with a tool that gave them the same answers in seconds.",
          images: [
            {
              src: "/projects/moodle-insight-dashboard/home.png",
              alt: "FLAME Moodle Insight Dashboard home view",
              caption: "Home — the same data they used to manage in Excel, now a single glance.",
              layout: "wide",
            },
          ],
        },
        {
          label: "02 · Local-first architecture",
          title: "No backend, no API access — by design.",
          body: "I went local-first as a deliberate MVP strategy. Moodle's API access wasn't immediately available, and even if it had been, every conversation about student data started with FERPA-style privacy concerns. Building it as a client-side app — admins drop a CSV in, parsing happens in-browser, nothing leaves the device — meant we could ship without waiting on IT or risking a privacy review. The CSV parser is a real piece of work: handles arbitrary Moodle export shapes, normalises into a single internal model, and tracks per-row issues for transparency.",
          images: [
            {
              src: "/projects/moodle-insight-dashboard/filters.png",
              alt: "Filtering interface in the dashboard",
              caption: "Filters — multi-cohort, multi-course, all client-side.",
              layout: "wide",
            },
            {
              src: "/projects/moodle-insight-dashboard/weightage.png",
              alt: "Weighted scoring algorithm view",
              caption: "Weightages — admins can re-tune the scoring algorithm without a code change.",
              layout: "wide",
            },
          ],
        },
        {
          label: "03 · Iteration with a real client",
          title: "Four consultation rounds, weekly stand-ups.",
          body: "Four sit-down sessions with the CDL team — each one ruthlessly cut features that didn't earn their place, and refined the ones that did. The weighted scoring algorithm and the traffic-light flagging system both came directly out of those conversations: 'we just want to see who's red'. Building tools for actual users in the room is the only way to make sure 'time to insight' goes down instead of up.",
        },
      ],
      outcome:
        "A deployed application running for the CDL's pre-orientation tracking. Replaces an Excel workflow that took hours with a dashboard that delivers the same insight in seconds. Multi-course architecture supports running cohorts in parallel.",
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
