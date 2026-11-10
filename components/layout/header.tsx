"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SideTab } from "@/components/ui/side-tab";

export interface NavLink { label: string; href: string; target?: string; rel?: string; }
interface HeaderProps {
  links?: NavLink[]; className?: string; style?: React.CSSProperties;
  bgClassName?: string; textClassName?: string; width?: string; height?: string;
}
const defaultLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Philosophy", href: "/#philosophy" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(function Header({
  links = defaultLinks, className = "", style, bgClassName = "bg-secondary", textClassName = "text-white", width, height,
}, ref) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const renderLink = (link: NavLink) => {
    const href = pathname === "/" && link.href.startsWith("/#") ? link.href.slice(1) : link.href;
    const active = link.href === "/blog" ? pathname.startsWith("/blog") : link.href === "/" && pathname === "/";
    return <Link href={href} target={link.target} rel={link.rel} aria-current={active ? "page" : undefined}
      onClick={() => setOpen(false)} className={`flex min-h-11 items-center rounded-lg px-2 text-sm transition-colors hover:text-primary ${active ? "text-primary" : ""}`}>{link.label}</Link>;
  };
  return (
    <SideTab ref={ref} top="0" left="50%" width={width} height={height}
      className={`portfolio-header fixed top-0 z-50 -translate-x-1/2 flex items-center justify-center h-16 ${textClassName} ${className}`}
      style={style} bgClassName={bgClassName} side="top" radius="32px" cornerSize={16}
      eachCorner={{ br: { enabled: false }, bl: { enabled: false }, tr: { enabled: true, backgroundColor: bgClassName }, tl: { enabled: true, backgroundColor: bgClassName } }}>
      <nav aria-label="Main navigation" className="w-full px-4">
        <ul className="hidden sm:flex items-center justify-between gap-1">{links.map(link => <li key={link.label}>{renderLink(link)}</li>)}</ul>
        <div className="flex sm:hidden items-center justify-between gap-3">
          <Link href="/" className="font-semibold tracking-tight" onClick={() => setOpen(false)}>Mubbashir.</Link>
          <button type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(value => !value)} className="flex h-11 w-11 items-center justify-center">{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {open && <ul id="mobile-navigation" className="absolute left-0 right-0 top-full rounded-b-3xl border-t border-white/10 bg-secondary p-4 shadow-xl sm:hidden"
          onKeyDown={event => { if (event.key === "Escape") { setOpen(false); document.querySelector<HTMLButtonElement>("[aria-controls='mobile-navigation']")?.focus(); } }}>
          {links.map(link => <li key={link.label}>{renderLink(link)}</li>)}
        </ul>}
      </nav>
    </SideTab>
  );
});
