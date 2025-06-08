import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import processData from "../data/processData.json";

function OurProcess() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) {
      console.error("Section or container is not defined");
      return;
    }

    // Compute and set section height dynamically
    const updateHeight = () => {
      if (!container || !section) return 0;
      const totalWidth = container.scrollWidth;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scrollDist = totalWidth - vw;
      section.style.height = `${scrollDist + vh}px`;
      return scrollDist;
    };

    let scrollDist = updateHeight();

    // Handle window resize
    const onResize = () => {
      scrollDist = updateHeight();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    // Set up GSAP animations within a context
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const panels = container.querySelectorAll(".panel");
      const snapPoints = Array.from(panels).map(
        (_, i) => i / (panels.length - 1)
      );

      gsap.to(container, {
        x: () => `-=${scrollDist}`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDist}`,
          scrub: true,
          pin: true,
          snap: {
            snapTo: (raw) => gsap.utils.snap(snapPoints, raw),
            inertia: false,
            duration: 0.3,
          },
        },
      });
    }, sectionRef);

    // Cleanup function to revert GSAP changes and restore DOM
    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
      // Ensure DOM is restored if pin-spacer persists
      if (
        section.parentNode &&
        section.parentNode.classList.contains("pin-spacer")
      ) {
        const originalParent = section.parentNode.parentNode;
        originalParent.insertBefore(section, section.parentNode);
        section.parentNode.remove();
      }
    };
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  return (
    <section id="talk" ref={sectionRef}>
      <div className="talk-main">
        <div className="container" ref={containerRef}>
          {processData.map((panel, i) => (
            <div
              key={i}
              className={`panel ${
                panel.bgImage ? "content-panel" : "heading-panel"
              } site_flex site_flex--column section_gap`}
              style={{
                background: panel.bgImage
                  ? `url("${panel.bgImage}") center/cover no-repeat`
                  : "none",
              }}
            >
              <div className="panel-text">
                {panel.bgImage && <span>{`0${i}`}</span>}
                <h2>{panel.title}</h2>
                <p>{panel.description}</p>
                {panel.cta && (
                  <a href={panel.cta} className="site_gradient-clr">
                    Explore More
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurProcess;
