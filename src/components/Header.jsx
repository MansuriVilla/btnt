import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Header() {
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    function stickyScroll() {
      let lastScrollTop = 50;
      let header = document.querySelector(".site_header");
      let isHeaderFixed = false;

      window.addEventListener("scroll", () => {
        let currentScroll =
          window.pageYOffset || document.documentElement.scrollTop;
        let viewportHeight = window.innerHeight;
        let scrollThreshold = viewportHeight * 0.5;

        if (currentScroll > lastScrollTop) {
          if (
            currentScroll > scrollThreshold &&
            !header.classList.contains("header--hidden")
          ) {
            header.classList.add("header--hidden");
          }
        } else {
          if (header.classList.contains("header--hidden")) {
            header.classList.remove("header--hidden");
          }
        }

        if (currentScroll > header.offsetHeight && !isHeaderFixed) {
          header.classList.add("header--fixed");
          isHeaderFixed = true;
        } else if (currentScroll <= header.offsetHeight && isHeaderFixed) {
          header.classList.remove("header--fixed");
          isHeaderFixed = false;
        }

        if (currentScroll < 50) {
          header.classList.remove("header--hidden");
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      });
    }
    stickyScroll();
  }, []);

  return (
    <header className="site_header" ref={headerRef}>
      <div className="header_inner--content site_content-container">
        <nav className="header_navigations_links site_flex site_header-content nav_right">
          <div className="site_header-left">
            <div className="header_logo">
              <Link to="/">
                <img src="/assets/Fav-icon.webp" alt="Company Logo" />
              </Link>
            </div>
          </div>
          <div className="site_header-center">
            <ul className="site_header-links site_flex">
              <li className="site_header-link">
                <Link to="/" className="nav_link">
                  Home
                </Link>
              </li>
              <li className="site_header-link">
                <Link to="/visa" className="nav_link">
                  Visa
                </Link>
              </li>
              <li className="site_header-link">
                <Link to="/hotel" className="nav_link">
                  Hotel
                </Link>
              </li>
              <li className="site_header-link">
                <Link to="/cruise" className="nav_link">
                  Cruise
                </Link>
              </li>
            </ul>
          </div>
          <div className="site_header-right">
            <Link to="/contact" className="site_gradient-btn site_flex">
              CONTACT US
              <span>
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.49442 1.98189H9.01116L0 10.993L1.23791 12.231L10.2491 3.21979V10.7365H12V0.230957H1.49442V1.98189Z"
                    fill="white"
                  />
                </svg>
              </span>
            </Link>
          </div>
          <button
            className="menu-toggle"
            ref={toggleRef}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
      <div className="off-canvas-menu" ref={menuRef}>
        <button className="menu-close" aria-label="Close navigation menu">
          ×
        </button>
      </div>
    </header>
  );
}

export default Header;
