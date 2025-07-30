"use client";

import { useEffect, useRef, useState } from "react";
import HistoryContent from "./HistoryContent";
import CertificationContent from "./CertificationContent";
import CompanyContent from "./CompanyContent";
import { useTranslations } from "@/providers/translation-provider";

export default function HistoryTimeline() {
  const { company } = useTranslations();
  
  const sections = [
    { id: "greeting", title: company.timeline.sections.greeting },
    { id: "history", title: company.timeline.sections.history },
    { id: "certification", title: company.timeline.sections.certification },
    { id: "company", title: company.timeline.sections.company },
  ];
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const section of sections) {
        const element = sectionRefs.current[section.id];
        if (!element) continue;
        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const ref = sectionRefs.current[id];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className="w-full">
      <div className="mlg:flex gap-8 min-h-screen">
        {/* Sticky Sidebar */}
        <aside className="w-[160px] hidden mlg:block">
          <div className="sticky top-[120px]">
            <nav className="space-y-4">
              {sections.map((section) => (
                <div key={section.id} className="relative">
                  {activeSection === section.id && (
                    <div
                      className="absolute -left-4 top-1/2 -translate-y-1/2 size-3 bg-web-main"
                      style={{
                        clipPath: "polygon(0% 0%, 100% 50.8%, 0% 100%)",
                      }}
                    />
                  )}
                  <button
                    onClick={() => handleScrollTo(section.id)}
                    className={`block w-full text-left text-xl px-2 py-1 rounded transition-colors font-bold ${
                      activeSection === section.id
                        ? "text-web-main"
                        : "text-line-gray hover:text-web-main"
                    }`}
                  >
                    {section.title}
                  </button>
                </div>
              ))}
            </nav>
          </div>
        </aside>
        {/* Content */}
        <div className="flex-1 pt-[120px] py-[60px] mlg:py-[120px]">
          <div
            ref={(el) => {
              sectionRefs.current["history"] = el;
            }}
            className="px-6 mlg:px-16"
          >
            <HistoryContent />
          </div>
          <div
            ref={(el) => {
              sectionRefs.current["certification"] = el;
            }}
            className="py-[60px] mlg:py-[120px] bg-web-light-bg px-6 mlg:px-16"
          >
            <CertificationContent />
          </div>
          <div
            ref={(el) => {
              sectionRefs.current["company"] = el;
            }}
            className="py-[60px] mlg:py-20 px-6 mlg:px-16"
          >
            <CompanyContent />
          </div>
        </div>
      </div>
    </div>
  );
}
