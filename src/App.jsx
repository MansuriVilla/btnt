import React, { useEffect } from "react";
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
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  useEffect(() => {

    // Initialize SplittingText
    SplittingText();

    // Initialize ScrollSmoother
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
    });

    // Cleanup ScrollSmoother on component unmount
    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <Router>
      <div id="smooth-wrapper">
        <div id="smooth-content" className="site_main">
          <Header />
          <main id="site_main" className="site_flex site_flex--column section_gap">
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