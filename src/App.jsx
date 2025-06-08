import React, { use, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import VisaDetails from "./pages/VisaDetails.jsx";
import { SplittingText } from "./utils/SplittingText.jsx";
import Contact from "./pages/Contact.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { HoverTextAnimation } from "./utils/HoverTextAnimation.jsx";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize a new Lenis instance for smooth scrolling
    const lenis = new Lenis();

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Cleanup function to remove the ticker and Lenis instance
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);
  return (
    <Router>
      <HoverTextAnimation />
      <SplittingText />
      <div>
        <div className="site_main">
          <Header />
          <main
            id="site_main"
            className="site_flex site_flex--column section_gap"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/visa/:slug" element={<VisaDetails />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
