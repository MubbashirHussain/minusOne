export const site = {
  name: "Mubbashir Hussain",
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://minus-one-hazel.vercel.app").origin,
  description: "Creative development, interface design, and thoughtful web experiences by Mubbashir Hussain.",
};
export const absoluteUrl = (path: string) => new URL(path, `${site.url}/`).toString();
export const socialImage = { url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "Mubbashir Hussain — Design, Code & Motion" };
