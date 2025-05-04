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
    const offcanvasMenu = () => {
      const menu = menuRef.current;
      const toggle = toggleRef.current;
      const header = headerRef.current;
      const body = document.body;
      const headerLinks = header.querySelector(".header_navigations_links");
      const navLinks = headerLinks.querySelector(".site_header-links");
      const cta = headerLinks.querySelector(".site_header-right");
      const closeBtn = menu.querySelector(".menu-close");

      const moveMenu = () => {
        const isMobile = window.innerWidth <= 820;

        if (isMobile) {
          if (navLinks && !menu.contains(navLinks)) {
            menu.appendChild(navLinks);
          }
          if (cta && !menu.contains(cta)) {
            menu.appendChild(cta);
          }
        } else {
          if (navLinks && !headerLinks.contains(navLinks)) {
            headerLinks.appendChild(navLinks);
          }
          if (cta && !headerLinks.contains(cta)) {
            headerLinks.appendChild(cta);
          }
        }
      };

      window.addEventListener("resize", moveMenu);
      moveMenu();

      const handleToggle = () => {
        menu.classList.toggle("active");
        header.classList.toggle("menu-active");
        body.classList.toggle("no-scroll");
      };

      const handleClose = () => {
        menu.classList.remove("active");
        header.classList.remove("menu-active");
        body.classList.remove("no-scroll");
      };

      toggle.addEventListener("click", handleToggle);
      closeBtn.addEventListener("click", handleClose);

      document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
          handleClose();
        }
      });

      menu.querySelectorAll(".site_header-link a").forEach((link) => {
        link.addEventListener("click", handleClose);
      });

      return () => {
        window.removeEventListener("resize", moveMenu);
        toggle.removeEventListener("click", handleToggle);
        closeBtn.removeEventListener("click", handleClose);
      };
    };

    const stickyScroll = () => {
      const header = headerRef.current;

      // Use ScrollTrigger to manage scroll direction and header visibility
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const direction = self.direction; // 1 for down, -1 for up
          const scrollPos = self.scroll(); // Current scroll position
          const viewportHeight = window.innerHeight;
          const scrollThreshold = viewportHeight * 0.5;

          if (direction === 1 && scrollPos > scrollThreshold) {
            // Scrolling down past threshold: hide header
            header.classList.add("header--hidden");
          } else {
            // Scrolling up or above threshold: show header
            header.classList.remove("header--hidden");
          }
        },
      });
    };

    offcanvasMenu();
    stickyScroll();
    const showAnim = gsap
  .from(".site-header", {
    yPercent: -100,
    paused: true,
    duration: 0.2
  })
  .progress(1);

ScrollTrigger.create({
  start: "top top",
  end: 99999,
  onUpdate: (self) => {
    self.direction === -1 ? showAnim.play() : showAnim.reverse();
  }
});

    // Cleanup ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
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
                <Link to="/" className="nav_link">Home</Link>
              </li>
              <li className="site_header-link">
                <Link to="/visa" className="nav_link">Visa</Link>
              </li>
              <li className="site_header-link">
                <Link to="/hotel" className="nav_link">Hotel</Link>
              </li>
              <li className="site_header-link">
                <Link to="/cruise" className="nav_link">Cruise</Link>
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
        <button className="menu-close" aria-label="Close navigation menu">×</button>
      </div>
    </header>
  );
}

export default Header;