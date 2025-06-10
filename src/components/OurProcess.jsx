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

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const panels = container.querySelectorAll(".panel");
      const snapPoints = Array.from(panels).map(
        (_, i) => i / (panels.length - 1)
      );

      // Calculate scroll distance for horizontal scrolling
      const scrollDist = container.scrollWidth - window.innerWidth;
      console.log("Scroll Distance:", scrollDist); // Debug

      gsap.to(container, {
        x: () => `-=${scrollDist}`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDist}`, // End after full horizontal scroll
          scrub: true,
          pin: true,
          pinSpacing: true, // Ensure pin-spacer reserves space
          snap: {
            snapTo: (raw) => gsap.utils.snap(snapPoints, raw),
            inertia: false,
            duration: 0.3,
          },
        },
      });

      // Handle image loading to refresh ScrollTrigger
      const images = container.querySelectorAll("img");
      let loadedImages = 0;
      const onImageLoad = () => {
        loadedImages++;
        if (loadedImages === images.length) {
          ScrollTrigger.refresh();
          console.log("Images loaded, ScrollTrigger refreshed");
        }
      };
      images.forEach((img) => {
        if (img.complete) {
          onImageLoad();
        } else {
          img.addEventListener("load", onImageLoad);
        }
      });

      // Refresh ScrollTrigger on resize
      const onResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      return () => {
        images.forEach((img) => img.removeEventListener("load", onImageLoad));
        window.removeEventListener("resize", onResize);
      };
    }, sectionRef);

    return () => {
      ctx.revert();
      if (
        section.parentNode &&
        section.parentNode.classList.contains("pin-spacer")
      ) {
        const originalParent = section.parentNode.parentNode;
        originalParent.insertBefore(section, section.parentNode);
        section.parentNode.remove();
      }
    };
  }, []);

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
