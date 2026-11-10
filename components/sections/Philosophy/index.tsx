import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

import SidebarNav, { NavItem } from "./SideBar";
import ContentSection, { SectionData } from "./ContentSection";
import { ArrowDown, Code, Hand, PencilRuler } from "lucide-react";
import SectionHeading from "@/components/ui/sectionHeading";
import { SideTab } from "@/components/ui/side-tab";

// Data Definition
const sections: SectionData[] = [
  {
    id: "design",
    title: "Human-Centered Design",
    iconName: <PencilRuler />,
    content: [
      "Every line of code and every pixel is crafted with the end-user in mind. I believe that true innovation stems from a deep understanding of human needs, resulting in intuitive and delightful digital experiences that are both beautiful and functional.",
      "My process starts with empathy, diving deep into user research and personas to build a solid foundation. This user-first approach ensures that the final product not only looks great but also solves real-world problems and feels effortless to use.",
    ],
  },
  {
    id: "code",
    title: "Clean & Scalable Code",
    iconName: <Code />,
    content: [
      "I write code that is not just functional but also elegant, maintainable, and built for the future. By adhering to best practices, modern standards, and a component-based architecture, I create robust systems that can grow and adapt without accumulating technical debt.",
      "Performance is a key feature. I meticulously optimize for speed and efficiency, ensuring a fast, responsive experience for every user, regardless of their device or connection speed. A well-structured codebase is the backbone of any successful digital product.",
    ],
  },
  {
    id: "inclusive",
    title: "Inclusive by Default",
    iconName: <Hand />,
    content: [
      "The web should be for everyone. I am committed to building accessible and inclusive experiences from the ground up, ensuring that people of all abilities can navigate, understand, and interact with the digital world I help create.",
      "This means more than just meeting WCAG guidelines; it's about a fundamental mindset of designing with empathy for diverse users. From semantic HTML and ARIA roles to thoughtful color contrast and keyboard navigation, inclusivity is a non-negotiable part of my development process.",
    ],
  },
];

const navItems: NavItem[] = sections.map((s) => ({
  id: s.id,
  label: s.title,
  href: `#${s.id}`,
  iconName: s.iconName,
}));

const PhilosophySection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.target.id);
      });
    }, { rootMargin: "-20% 0px -45% 0px", threshold: 0 });
    containerRef.current?.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      id="philosophy"
      ref={containerRef}
      className="relative flex flex-col w-full group/design-root py-20 lg:py-28 bg-background z-30"
    >
      <SideTab
        key={`philosophy-tab-${theme}`}
        top="-60px"
        left="25%"
        className={`-left-[50%] -translate-x-1/2 hidden md:flex z-20 items-center justify-center pointer-events-auto`}
        color={"bg-secondary"}
        bgClassName="bg-background"
        eachCorner={{
          br: { enabled: true, backgroundColor: "bg-background" },
          tr: { enabled: false },
          bl: { enabled: true, backgroundColor: "bg-background" },
          tl: { enabled: false },
        }}
        radius={"30px"}
        side="bottom"
        height={"60px"}
        width={"20%"}
        cornerSize={30}
      >
        <span className="text-text-secondary animate-bounce flex gap-3 justify-center items-center">
          Scroll <ArrowDown size={20} />
        </span>
      </SideTab>

      <div className="flex flex-col px-0 lg:px-8">
        <div className="mx-auto max-w-7xl w-full h-full flex flex-col">
          {/* Page Title */}
          <SectionHeading
            title="My Philosophy"
            subtitle="Core Principles"
            description="Exploring the core principles that guide my work."
            className="mb-8 lg:mb-16"
          />
          {/* Mobile Nav Links */}
          <div className="md:hidden mb-6 shrink-0">
            <div className="flex flex-nowrap overflow-x-auto gap-3 pb-4 scrollbar-hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => handleNavClick(e, item.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs       font-semibold transition-all border ${
                    activeId === item.id
                      ? "bg-primary text-black border-primary"
                      : "bg-transparent border-text/20 text-text-secondary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 lg:gap-20 items-start">
            {/* Sidebar Sticky Nav */}
            <aside className="hidden md:block md:w-1/3 sticky top-28">
              <SidebarNav
                items={navItems}
                activeId={activeId}
                onLinkClick={handleNavClick}
              />
            </aside>

            {/* Main Content Area - Animated Viewport */}
            <div className="w-full md:w-2/3 min-w-0 relative">
              <div
                className="relative flex flex-col"
              >
                <div className="relative min-h-full pl-0 md:pl-3">
                  <div className="flex flex-col md:pl-16 pt-3">
                    <div
                      aria-hidden="true"
                      className="absolute line mt-9 left-0 md:left-6 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10 hidden md:block z-0"
                    />
                    {sections.map((section) => (
                      <ContentSection
                        key={section.id}
                        data={section}
                        isActive={activeId === section.id}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhilosophySection;
