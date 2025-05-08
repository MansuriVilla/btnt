import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

// Global configuration for SplittingText
const SplittingTextConfig = {
  selector: "h1, h2, p", // Elements to animate
  type: "words,lines", // Split type
  linesClass: "line", // Class for split lines
  autoSplit: true, // Auto-split text
  mask: "lines", // Mask type
  duration: 1, // Animation duration
  yPercent: 100, // Vertical offset
  opacity: 0, // Starting opacity
  stagger: 0.2, // Stagger delay
  ease: "expo.out", // Easing function
  threshold: 0.2, // IntersectionObserver threshold
  start: "top 80%", // ScrollTrigger start position
  once: true, // Run animation only once
};

export function SplittingText() {
  document.fonts.ready.then(() => {
    const elements = document.querySelectorAll(SplittingTextConfig.selector);

    gsap.set(elements, { opacity: 1 });

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: SplittingTextConfig.threshold,
      }
    );

    function animateElement(element) {
      const split = SplitText.create(element, {
        type: SplittingTextConfig.type,
        linesClass: SplittingTextConfig.linesClass,
        autoSplit: SplittingTextConfig.autoSplit,
        mask: SplittingTextConfig.mask,
      });

      const animation = gsap.from(split.lines, {
        duration: SplittingTextConfig.duration,
        yPercent: SplittingTextConfig.yPercent,
        opacity: SplittingTextConfig.opacity,
        stagger: SplittingTextConfig.stagger,
        ease: SplittingTextConfig.ease,
      });

      ScrollTrigger.create({
        trigger: element,
        start: SplittingTextConfig.start,
        onEnter: () => {
          animation.play();
        },
        once: SplittingTextConfig.once,
      });
    }

    elements.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup observer
    return () => {
      observer.disconnect();
    };
  });
}