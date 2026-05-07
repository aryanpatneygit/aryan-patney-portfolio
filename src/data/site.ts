export const site = {
  name: "Aryan Patney",
  monogram: "AP",
  title: "Design Engineer",

  /* ──── Contact ──── */
  email: "aryanpatney9@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/aryan-p-590411206/",
  },

  /* ──── Files in /public ──── */
  cv: "/aryan-patney-cv.pdf",
  photo: "/photo.jpg",

  /* ──── Hero copy ──── */
  hero: {
    greeting: "Hi, I'm",
    name: "Aryan Patney.",
    line: "I build",
    emWord: "cool sh*t.",
    rest: "",
    disciplinePill: "Design × Code × HCI",
  },

  /* ──── About copy ──── */
  about: {
    body: [
      "Computer Science & Design (Hons.) graduate from FLAME University. I work across the seam between research, engineering, and visual design — disciplines most courses keep separate, and that I'm convinced are one thing.",
      "I care about the parts most portfolios skip: the audit behind a design choice, the build pipeline behind a demo, the iteration that came before the version worth showing.",
    ],
    chips: ["Design Engineering", "HCI", "UI / UX", "Unity · AR / VR", "Generative AI"],
  },
} as const;

export type SiteConfig = typeof site;
