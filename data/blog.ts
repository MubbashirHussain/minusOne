export interface BlogSection { heading: string; paragraphs: string[]; }
export interface BlogPost {
  slug: string; title: string; description: string; category: string;
  published: string; number: string; sections: BlogSection[];
}

// Original starter articles. Edit the copy here before publishing under your name.
export const posts: BlogPost[] = [
  {
    slug: "designing-motion-with-purpose", number: "01", category: "Interaction design",
    title: "Motion should help you find your way.",
    description: "A practical approach to page transitions that give interfaces rhythm without slowing people down.",
    published: "2026-11-08",
    sections: [
      { heading: "Start with the destination", paragraphs: [
        "An animation becomes useful when it explains a change. A card can expand into its detail view, a navigation indicator can point to the current page, and a small reveal can draw attention to the next action. Before choosing an easing curve, decide what the visitor needs to understand.",
        "For a portfolio, the work should remain the focus. A transition can connect the project gallery to a case study, but it should not compete with the screenshots or make someone wait through a long introduction every time they follow a link.",
      ] },
      { heading: "Keep a consistent visual language", paragraphs: [
        "Choose a small set of motion patterns. Use the same direction for page changes, similar timing for related elements, and a predictable place for navigation. Consistency makes the interface easier to learn and gives the entire site a recognizable rhythm.",
        "A full-screen panel can be a strong visual signature. Its role is to bridge two layouts while the next view becomes ready. The panel should leave promptly, and the destination should be clear as soon as the new page appears.",
      ] },
      { heading: "Design for people who prefer less motion", paragraphs: [
        "A reduced-motion preference deserves a deliberate alternative. Remove large sweeps and movement across the screen, keep content visible, and let navigation complete immediately. Essential information should never depend on watching an animation.",
        "Keyboard focus matters too. Visitors should be able to open navigation, follow a link, and continue reading without losing their place. An attractive transition does not replace a clear heading, readable content, or usable controls.",
      ] },
      { heading: "Test the ordinary moments", paragraphs: [
        "Check direct links as well as clicks from the homepage. Try browser Back and Forward, repeated navigation, a small phone, and a slower connection. These ordinary paths reveal problems that a carefully rehearsed desktop demo can hide.",
        "The goal is a site that feels connected and responsive. When motion supports that goal, the experience becomes memorable without asking the visitor to think about the animation itself.",
      ] },
    ],
  },
  {
    slug: "a-responsive-portfolio-starts-with-content", number: "02", category: "Web development",
    title: "A responsive portfolio starts with content.",
    description: "How to move from a sculpted desktop composition to a clear, usable layout on smaller screens.",
    published: "2026-11-08",
    sections: [
      { heading: "Decide what comes first", paragraphs: [
        "A wide desktop canvas makes it tempting to arrange every element as part of one composition. Portraits, badges, floating icons, and project cards can all have a place. On a smaller screen, the question changes: what does the visitor need to read first?",
        "Start with a clear introduction, a short explanation of your work, and an obvious way to explore projects or get in touch. Decorative elements can move lower in the page or become simpler while the main story stays intact.",
      ] },
      { heading: "Let the page grow", paragraphs: [
        "A section that works inside a fixed desktop height may need more space on a phone. Text wraps onto more lines, buttons need comfortable spacing, and images become stacked. Let those sections follow the normal document flow instead of forcing everything into one screen.",
        "Use content width and readable line length to guide the layout. A two-column composition can become one column when the text or images begin to feel crowded. The breakpoint should serve the content rather than an arbitrary device name.",
      ] },
      { heading: "Make interaction work without hover", paragraphs: [
        "A tooltip shown only on hover can hide important information from touch users. Project details and experience descriptions need an explicit way to open them, such as a link, button, or expandable section.",
        "Navigation deserves the same attention. When a row of links becomes too crowded, a clearly labelled menu is more useful than continually shrinking the text. Keep the current destination understandable and make the menu straightforward to close.",
      ] },
      { heading: "Check the whole journey", paragraphs: [
        "Do not stop after checking the hero. Read the longest description, open a project, reach the contact section, and test a page with a long title. Rotate the device and increase the text size to see whether the layout still has enough room.",
        "A responsive portfolio succeeds when the same information remains easy to discover at every size. The desktop version can keep its expressive composition while the mobile version gives the content a comfortable, focused reading experience.",
      ] },
    ],
  },
];
export const getPost = (slug: string) => posts.find(post => post.slug === slug);
export const readingTime = (post: BlogPost) => `${Math.max(1, Math.ceil(post.sections.flatMap(section => section.paragraphs).join(" ").split(/\s+/).length / 200))} min read`;
export const formatDate = (date: string) => new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
