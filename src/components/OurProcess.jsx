// src/components/OurProcess.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function OurProcess() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const container = containerRef.current;

    // 1) Compute and set section height so scrub covers all panels
    const updateHeight = () => {
      const totalWidth = container.scrollWidth;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scrollDist = totalWidth - vw;
      section.style.height = `${scrollDist + vh}px`;
      return scrollDist;
    };

    let scrollDist = updateHeight();

    // 2) Recompute on resize
    const onResize = () => {
      scrollDist = updateHeight();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    // 3) Build explicit snap points [0, 1/(n−1), …, 1]
    const panels = container.querySelectorAll(".panel");
    const snapPoints = Array.from(panels).map((_, i) => i / (panels.length - 1));

    // 4) Create the horizontal scroll animation with snapping
    const tween = gsap.to(container, {
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
        // markers: true, // uncomment to debug
      },
    });

    // 5) Cleanup on unmount
    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const panelsData = [
    {
      isHeading: true,
      title: "Our Application Process",
      text: "We’ve designed our process to be simple and transparent, ensuring a seamless experience with clear guidance.",
    },
    {
      num: "01",
      heading: "Apply",
      text: "Answer some initial information, make your payment, and provide some final information.",
    },
    {
      num: "02",
      heading: "Review",
      text: "Our team reviews your application to ensure all details are correct.",
    },
    {
      num: "03",
      heading: "Process",
      text: "We submit your application to the relevant authorities for processing.",
    },
    {
      num: "04",
      heading: "Receive",
      text: "Get your approved visa delivered to you, ready for travel.",
    },
  ];

  return (
    <section id="talk" ref={sectionRef}>
      <div className="talk-main">
        <div className="container" ref={containerRef}>
          {panelsData.map((p, i) =>
            p.isHeading ? (
              <div key={i} className="panel heading-panel site_flex site_flex--column section_gap ">
                <h2>{p.title}</h2>
                <p>{p.text}</p>
              </div>
            ) : (
              <div
                key={i}
                className="panel content-panel"
                style={{
                  background: `url("/assets/apply-01.jpeg") center/cover no-repeat`,
                }}
              >
                <div className="panel-text">
                  <span>{p.num}</span>
                  <h3>{p.heading}</h3>
                  <p>{p.text}</p>
                  <a href="#" className="site_gradient-clr">
                    Explore More
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default OurProcess;
