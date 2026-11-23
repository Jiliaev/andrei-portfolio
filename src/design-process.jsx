import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Proposal based on the ORIGINAL 1,805-line About.jsx.
// Original stylesheet is preserved verbatim; only additive rules follow it.
// Photos remain external in public/ as on Home.jsx.
const bottomNavItems = [
  { label: "About", path: "/about" },
  { label: "Selected Work", path: "/work" },
  { label: "Sculpture", path: "/sculpture" },
  { label: "Design & Process", path: "/design-process" },
  { label: "Jewellery Design", path: "/jewellery-design" },
  { label: "Awards", path: "/awards" },
  { label: "Creative Consulting", path: "/creative-consulting" },
  { label: "Contact", path: "/contact" },
];

const selectedWorkLinks = [
  { label: "Sculpture & Installations", path: "/sculpture-installations" },
  { label: "Spatial & Retail Design", path: "/spatial-retail-design" },
  { label: "Product & Object Design", path: "/objects-design" },
  { label: "Concept Studies", path: "/concept-studies" },
];
const jewelleryLinks = [
  { label: "Sketches & Design", path: "/sketches-design" },
  { label: "Jewellery Portfolio", path: "/jewellery-photo-portfolio" },
  { label: "Design Process", path: "/process" },
  { label: "Jewellery Photography", path: "/photography" },
];

export default function DesignProcess() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [mobileNavigating, setMobileNavigating] = useState(false);
  const [selectedMobileSubLink, setSelectedMobileSubLink] = useState(null);
  const mobileSelectionFadeTimer = useRef(null);
  const navigationTimer = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activePath = pathname.replace(/\/+$/, "") || "/";

  // DESIGN & CREATION ONLY. All site-level navigation and brand hooks remain intact.
  const heroRef = useRef(null);
  const heroArtRef = useRef(null);
  const [scrollLight, setScrollLight] = useState(0);
  const [manualLight, setManualLight] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  // Finish presentation on phones: 20% zoom -> lamp turns on -> options image fades in.
  const [activeFinish, setActiveFinish] = useState(null);
  const [finishPhase, setFinishPhase] = useState(null);
  const finishTimers = useRef([]);
  const finishBusy = useRef(false);
  const clearFinishTimers = () => {
    finishTimers.current.forEach(window.clearTimeout);
    finishTimers.current = [];
  };
  const presentFinish = (event, item) => {
    if (!window.matchMedia("(max-width: 720px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showImage(event, item.options, `${item.name} — front and side design options`, true);
      return;
    }
    if (finishBusy.current) return;
    finishBusy.current = true;
    clearFinishTimers();
    const bounds = event.currentTarget.getBoundingClientRect();
    const preview = {
      src: item.options,
      alt: `${item.name} — front and side design options`,
      width: bounds.width * 1.15,
      height: bounds.height * 1.15,
      largeOptions: true,
      materialPreview: true
    };
    setActiveFinish(item.name);
    setFinishPhase("zoom");
    // First phase: 0–230 ms, selected lamp enlarges by 20%.
    finishTimers.current.push(window.setTimeout(() => {
      setFinishPhase("light");
    }, 230));
    // Second phase: 230–500 ms, illuminated image fades in and briefly holds.
    finishTimers.current.push(window.setTimeout(() => {
      setFinishPhase("reveal");
      setLightbox(preview);
      setLightboxVisible(false);
    }, 500));
    finishTimers.current.push(window.setTimeout(() => {
      setActiveFinish(null);
      setFinishPhase(null);
      finishBusy.current = false;
    }, 1070));
  };
  useEffect(() => () => {
    finishTimers.current.forEach(window.clearTimeout);
  }, []);

  // Interior pair: identical frame, only opacity changes (auto cycle / hover hold).
  const [interiorLight, setInteriorLight] = useState(false);
  const [interiorHovered, setInteriorHovered] = useState(false);
  const interiorDisplayedLight = interiorHovered || interiorLight;

  const displayedLight = manualLight !== null ? manualLight : scrollLight;
  const lightIsOn = displayedLight > 0.5;
  // One deliberate state for every manual lighting control: hero, label and switch.
  const toggleHeroLight = () => {
    setManualLight(lightIsOn ? 0 : 1);
  };

  const showImage = (event, src, alt, largeOptions = false) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setLightbox({ src, alt, width: bounds.width * 1.15, height: bounds.height * 1.15, largeOptions });
    setLightboxVisible(false);
  };

  useEffect(() => {
    let frameId = 0;
    const update = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (!heroRef.current) return;
        const bounds = heroRef.current.getBoundingClientRect();
        const heroTop = bounds.top + window.scrollY;
        // Begin lighting immediately when scrolling down from the top of this page.
        // Keep the stages separate so the fade-out cannot cancel the fade-in.
        const start = Math.max(0, heroTop - window.innerHeight * 0.66);
        const progress = Math.max(0, (window.scrollY - start) / window.innerHeight);
        const clamp01 = value => Math.max(0, Math.min(1, value));
        // 0–15% viewport scroll: OFF -> ON.
        const fadeIn = clamp01(progress / 0.15);
        // 15–36%: fully ON. From 36–58%: ON -> OFF,
        // while a substantial part of the lamp remains on screen.
        const fadeOut = clamp01((progress - 0.36) / 0.22);
        setScrollLight(clamp01(Math.min(fadeIn, 1 - fadeOut)));
      });
    };
    // A deliberate click remains authoritative; scrolling only updates the automatic preview.
    const onScroll = () => { update(); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Mount first, then animate on the next frame; keep mounted during the close fade.
  useEffect(() => {
    if (!lightbox) return undefined;
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setLightboxVisible(true));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [lightbox]);

  const closeLightbox = () => setLightboxVisible(false);
  useEffect(() => {
    if (!lightbox) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox]);



  // Pause the auto cycle while hovered/focused. The lamp stays ON until leave/blur.
  useEffect(() => {
    if (interiorHovered) return;
    const intervalId = window.setInterval(() => {
      setInteriorLight(previous => !previous);
    }, window.matchMedia('(max-width: 720px)').matches ? 1200 : 2400);
    return () => window.clearInterval(intervalId);
  }, [interiorHovered]);

  // Match the logo and vertical rule to the actual height of the full name + two-line description.
  // ResizeObserver keeps both ends aligned if the font or window size changes.
  const brandLockupRef = useRef(null);
  const brandTextRef = useRef(null);

  useLayoutEffect(() => {
    const lockup = brandLockupRef.current;
    const textBlock = brandTextRef.current;
    if (!lockup || !textBlock) return;

    const syncBrandHeight = () => {
      const height = textBlock.getBoundingClientRect().height;
      if (height > 0) {
        lockup.style.setProperty('--brand-text-height', `${height}px`);
      }
    };

    syncBrandHeight();
    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(syncBrandHeight)
      : null;
    observer?.observe(textBlock);
    window.addEventListener('resize', syncBrandHeight);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', syncBrandHeight);
    };
  }, []);


  // While the mobile drawer is open, lock the page behind it (including iOS Safari).
  // The drawer itself remains scrollable for short iPhone screens.
  useEffect(() => {
    if (!menuOpen) return;

    const body = document.body;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.dataset.mobileMenuOpen = "true";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    const onEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setMobileDropdown(null);
      }
    };
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("keydown", onEscape);
      delete body.dataset.mobileMenuOpen;
      Object.entries(previous).forEach(([key, value]) => { body.style[key] = value; });
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);


  useEffect(() => () => {
    if (navigationTimer.current !== null) window.clearTimeout(navigationTimer.current);
    if (mobileSelectionFadeTimer.current !== null) window.clearTimeout(mobileSelectionFadeTimer.current);
  }, []);

  const closeAndNavigate = (path, isSubmenuSelection = false) => {
    if (navigationTimer.current !== null) return;
    const onPhone = menuOpen && window.matchMedia("(max-width: 720px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (onPhone && !reducedMotion) {
      if (isSubmenuSelection) {
        // Give one short, visible confirmation before the existing page exit.
        setSelectedMobileSubLink(path);
        mobileSelectionFadeTimer.current = window.setTimeout(() => {
          mobileSelectionFadeTimer.current = null;
          setMobileNavigating(true);
        }, 190);
        navigationTimer.current = window.setTimeout(() => {
          navigationTimer.current = null;
          setMenuOpen(false);
          setMobileDropdown(null);
          setDesktopDropdown(null);
          setSelectedMobileSubLink(null);
          setMobileNavigating(false);
          navigate(path);
        }, 390);
      } else {
        setMobileNavigating(true);
        navigationTimer.current = window.setTimeout(() => {
          navigationTimer.current = null;
          setMenuOpen(false);
          setMobileDropdown(null);
          setDesktopDropdown(null);
          navigate(path);
        }, 360);
      }
      return;
    }
    setMenuOpen(false);
    setMobileDropdown(null);
    setDesktopDropdown(null);
    setSelectedMobileSubLink(null);
    navigate(path);
  };


  const go = (path) => {
    setMenuOpen(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);
    navigate(path);
  };
  return (
    <main className={`aboutPage designCreationPage${mobileNavigating ? " isMobileNavigating" : ""}${selectedMobileSubLink ? " hasSubmenuSelection" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          min-height: 100%;
          background: #ffffff;
        }

        body {
          margin: 0;
          background: #ffffff;
        }

        .aboutPage {
          min-height: 100vh;
          background: #ffffff;
          color: #1d1b18;
          font-family: "Times New Roman", Georgia, serif;
          overflow-x: hidden;
        }

        /* =========================================================
           HEADER
        ========================================================= */

        .container {
          width: min(1680px, 88vw);
          margin: 0 auto;

          /* SAME POSITION AS OTHER APPROVED INTERNAL PAGES */
          padding: clamp(34px, 4vh, 48px) 0 0;
        }

        .header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 22px;

          margin-left: clamp(100px, 7vw, 180px);

          margin-bottom: clamp(102px, 11vh, 140px);

          position: relative;
        }

        .homeLink {
          display: flex;
          align-items: flex-start;
          gap: 22px;

          cursor: pointer;

          color: inherit;
          text-decoration: none;

          -webkit-tap-highlight-color: transparent;
        }

        .homeLink:hover {
          opacity: 0.96;
        }

        .logo {
          width: 90px;
          height: auto;

          display: block;

          object-fit: contain;

          opacity: 1;
        }

        .divider {
          width: 1px;
          height: 64px;

          background: rgba(70, 65, 58, 0.22);

          margin-top: 4px;
        }

        .name {
          margin: 0;

          font-size: clamp(24px, 2vw, 34px);

          font-weight: 300;

          letter-spacing: 0.22em;

          line-height: 1;

          color: #1d1b18;
        }

        .subtitle {
          margin-top: 12px;

          font-family: Arial, sans-serif;

          letter-spacing: 0.28em;

          color: #6f685f;
        }

        .subtitle p {
          margin: 4px 0;

          font-size: clamp(10px, 0.85vw, 13px);
        }

        .desktopNav {
          display: flex;

          gap: 34px;

          margin-right: clamp(40px, 5vw, 120px);

          font-family: Arial, sans-serif;

          font-size: clamp(8px, 0.8vw, 12px);

          letter-spacing: 0.18em;

          text-transform: uppercase;

          color: #6f685f;

          white-space: nowrap;
        }

        .desktopNav span {
          cursor: pointer;

          transition:
            color 0.45s ease,
            transform 0.45s ease;
        }

        .desktopNav span:hover {
          color: #1d1b18;

          transform: scale(1.04);
        }

        /* =========================================================
           PAGE INTRO
        ========================================================= */

        .pageWrap {
          width: min(1180px, 86vw);

          margin: 0 auto;

          padding: 0 0 42px;
        }

        .topIntro {
          text-align: center;

          margin-bottom: 82px;
        }

        .topicLabel {
          display: inline-block;

          margin: 0 0 22px;

          padding-left: 0.38em;

          font-family: Arial, sans-serif;

          font-size: 13px;

          line-height: 1.1;

          letter-spacing: 0.38em;

          text-transform: uppercase;

          font-weight: 400;

          color: #9C8664;

          text-align: center;
        }

        .mainTitle,
        .textBlock h2,
        .recognition h2,
        .expertise h2,
        .portfolioDownloads h2 {
          margin: 0 0 34px;

          font-family: "Cormorant Garamond", serif;

          font-size: clamp(30px, 2.45vw, 44px);

          line-height: 1.12;

          letter-spacing: 0.14em;

          text-transform: uppercase;

          font-weight: 400;

          color: #2A2723;
        }

        .mainRole {
          margin: 0;

          font-family: "Cormorant Garamond", serif;

          font-size: clamp(24px, 2vw, 34px);

          font-weight: 300;

          line-height: 1.25;

          color: #6C6258;
        }

        /* =========================================================
           BIOGRAPHY / APPROACH
        ========================================================= */

        .sectionGrid {
          display: grid;

          grid-template-columns: 360px 590px;

          gap: 90px;

          align-items: center;

          justify-content: center;

          margin-bottom: 72px;
        }

        .sectionGrid.biographyIntro {
          margin-bottom: 4px;
        }

        .sectionGrid.approach {
          margin-bottom: 165px;
        }

        .portraitImage,
        .cameraImage {
          width: 315px;
          height: auto;

          margin: 0 auto;

          display: block;

          transform: translateY(-30px);
        }

        .textBlock {
          max-width: 590px;
        }

        .textBlock p {
          margin: 0 0 20px;

          font-size: 16px;

          line-height: 1.82;

          font-weight: 300;

          color: #3F3933;
        }

        .fullBiography {
          width: min(1120px, 88vw);

          margin: 0 auto 158px;
        }

        .fullBiography p,
        .fullPhilosophy p {
          margin: 0 0 18px;

          font-size: 16px;

          line-height: 1.92;

          color: #3F3933;

          font-weight: 300;
        }

        /* =========================================================
           PHILOSOPHY
        ========================================================= */

        .sketchGrid {
          display: grid;

          grid-template-columns: 400px 640px;

          gap: 78px;

          align-items: center;

          justify-content: center;

          margin-bottom: 4px;
        }

        /* Keep the Philosophy text anchored to the grid's bottom edge.
           As in Biography: last paragraph margin 20px + section margin 4px
           = exactly 24px before the following paragraph on desktop. */
        @media (min-width: 721px) {
          .sketchGrid > .textBlock {
            align-self: end;
          }
        }

        .sketchImage {
          width: 576px;
          height: auto;

          display: block;

          margin: 0 auto;

          transform: translateY(-70px);
        }

        .fullPhilosophy {
          width: min(1120px, 88vw);

          margin: 0 auto 60px;
        }

        /* =========================================================
           DIVIDERS
        ========================================================= */

        .horizontalLine {
          width: min(1680px, 88vw);

          height: 1px;

          background: rgba(0, 0, 0, 0.08);

          margin: 0 auto;
        }

        /* =========================================================
           RECOGNITION
        ========================================================= */

        .recognition {
          width: min(820px, 84vw);

          margin: 0 auto;

          text-align: center;

          padding: 100px 0 108px;
        }

        /* Recognition: restrained gold accent; typography and page layout preserved. */
        .recognition h2 {
          color: #9C8664;
          margin-bottom: 24px;
        }

        .recognition h2::after {
          content: "";
          display: block;
          width: 56px;
          height: 1px;
          background: #B7A17D;
          margin: 20px auto 0;
        }

        /* Keep the second paragraph slightly quieter than the first. */
        .recognition p:last-of-type {
          color: #6C6258;
        }

        .recognition p {
          margin: 0 auto 20px;

          max-width: 760px;

          font-size: 16px;

          line-height: 1.78;

          font-weight: 300;

          color: #3F3933;
        }

        /* =========================================================
           EXPERTISE
        ========================================================= */

        .expertise {
          width: min(1160px, 86vw);

          margin: 0 auto;

          text-align: center;

          padding: 96px 0 124px;
        }

        .expertiseGrid {
          display: grid;

          grid-template-columns: repeat(4, 1fr);

          gap: 0;

          margin-top: 66px;
        }

        .expertiseCard {
          padding: 0 34px;

          border-right:
            1px solid rgba(70, 65, 58, 0.14);
        }

        .expertiseCard:last-child {
          border-right: none;
        }

        .expertiseCard h3 {
          margin: 0 0 20px;

          font-family: Arial, sans-serif;

          font-size: 10px;

          letter-spacing: 0.26em;

          text-transform: uppercase;

          font-weight: 400;

          color: #1d1b18;
        }

        .expertiseCard p {
          margin: 0;

          font-size: 14px;

          line-height: 1.7;

          color: #3F3933;
        }

        /* =========================================================
           PORTFOLIO DOWNLOADS
        ========================================================= */

        .portfolioDownloads {
          width: min(860px, 84vw);

          margin: 0 auto;

          text-align: center;

          padding: 72px 0 96px;
        }

        .portfolioDownloads p {
          margin: 0 auto 34px;

          max-width: 720px;

          font-size: 16px;

          line-height: 1.78;

          font-weight: 300;

          color: #6C6258;
        }

        .downloadButtons {
          display: flex;

          justify-content: center;
          align-items: center;

          gap: 22px;

          flex-wrap: wrap;
        }

        .downloadButton {
          display: inline-flex;

          align-items: center;
          justify-content: center;

          min-width: 245px;

          padding: 14px 22px;

          border:
            1px solid rgba(156, 134, 100, 0.42);

          font-family: Arial, sans-serif;

          font-size: 10px;

          letter-spacing: 0.24em;

          text-transform: uppercase;

          color: #3F3933;

          text-decoration: none;

          background: rgba(255, 255, 255, 0.68);

          transition:
            color 0.4s ease,
            border-color 0.4s ease,
            background-color 0.4s ease,
            transform 0.4s ease;
        }

        .downloadButton:hover {
          color: #9C8664;

          border-color:
            rgba(156, 134, 100, 0.78);

          transform: translateY(-2px);
        }

        .downloadButton:active,
        .downloadButton:focus {
          color: #9C8664;

          border-color: #9C8664;

          background-color:
            rgba(156, 134, 100, 0.08);

          outline: none;
        }

        /* =========================================================
           CTA
        ========================================================= */

        .cta {
          width: min(860px, 84vw);

          margin: 0 auto;

          text-align: center;

          padding: 86px 0 130px;
        }

        .cta h2 {
          margin: 0 0 26px;

          font-family: "Cormorant Garamond", serif;

          font-size: clamp(30px, 2.45vw, 44px);

          line-height: 1.12;

          letter-spacing: 0.14em;

          text-transform: uppercase;

          font-weight: 400;

          color: #2A2723;
        }

        .cta p {
          margin: 0 auto 20px;

          max-width: 760px;

          font-size: 16px;

          line-height: 1.78;

          font-weight: 300;

          color: #6C6258;
        }

        /* =========================================================
           FOOTER
        ========================================================= */

        .footerWrap {
          width: min(1680px, 88vw);

          margin: 0 auto;

          padding-bottom: clamp(14px, 2vh, 28px);
        }

        .footerLine {
          width: 100%;

          height: 1px;

          background: rgba(0, 0, 0, 0.08);

          margin-bottom: 20px;
        }

        .bottomNav {
          display: flex;

          justify-content: center;
          align-items: center;

          flex-wrap: wrap;

          gap: 0;

          padding-bottom: 5px;

          font-family: Arial, sans-serif;

          font-size: clamp(8px, 0.8vw, 12px);

          letter-spacing: 0.18em;

          text-transform: uppercase;

          color: #6f685f;
        }

        .bottomNavItem {
          display: flex;

          align-items: center;
        }

        .bottomNavLink {
          cursor: pointer;

          white-space: nowrap;

          transition:
            color 0.45s ease,
            transform 0.45s ease;
        }

        .bottomNavLink:hover {
          color: #1d1b18;

          transform: scale(1.08);
        }

        .navDivider {
          width: 1px;

          height: clamp(10px, 0.9vw, 14px);

          background:
            rgba(111, 104, 95, 0.25);

          margin-left:
            clamp(4px, 0.7vw, 12px);

          margin-right:
            clamp(4px, 0.7vw, 12px);
        }

        .copyright {
          margin-top: 12px;

          text-align: center;

          font-family: Arial, sans-serif;

          font-size: clamp(7px, 0.55vw, 9px);

          letter-spacing: 0.28em;

          text-transform: uppercase;

          color: #b9b2a8;
        }

        /* =========================================================
           MOBILE MENU
        ========================================================= */

        .hamburger {
          display: none;

          position: fixed;

          top: 18px;
          right: 18px;

          width: 48px;
          height: 34px;

          background: transparent;

          border: none;

          cursor: pointer;

          padding: 0;

          z-index: 1000;
        }

        .hamburger span {
          display: block;

          width: 48px;
          height: 1.5px;

          margin-bottom: 7px;

          background: #1d1b18;
        }

        .mobileOverlay {
          position: fixed;

          inset: 0;

          background:
            rgba(0, 0, 2, 0.18);

          backdrop-filter: blur(2px);

          opacity: 0;

          pointer-events: none;

          transition:
            opacity 0.45s ease;

          z-index: 20;
        }

        .mobileOverlay.open {
          opacity: 1;

          pointer-events: auto;
        }

        .mobilePanel {
          position: fixed;

          top: 0;
          right: 0;

          width: min(78vw, 390px);

          height: 100vh;

          background:
            rgba(0, 0, 2, 0.40);

          backdrop-filter:
            blur(10px);

          transform:
            translateX(100%);

          transition:
            transform 0.45s ease;

          z-index: 30;

          padding: 38px 34px;

          border-left:
            1px solid
            rgba(201, 179, 140, 0.18);
        }

        .mobilePanel.open {
          transform:
            translateX(0);
        }

        .closeMenu {
          background: transparent;

          border: none;

          color: #d4cec2;

          font-size: 42px;

          cursor: pointer;

          display: block;

          margin-left: auto;

          margin-bottom: 70px;

          position: relative;

          top: -12px;
        }

        .mobileMenuItem {
          display: block;

          margin-bottom: 36px;

          font-family:
            "Times New Roman",
            Georgia,
            serif;

          font-size:
            clamp(20px, 5.5vw, 30px);

          color: #d4cec2;

          letter-spacing: 0.04em;

          cursor: pointer;
        }

        .mobileMenuItem:hover {
          color: #c9b38c;
        }

        /* =========================================================
           COMPACT DESKTOP
        ========================================================= */

        @media (min-width: 721px) and (max-height: 900px) {

          .container {
            /* SAME NEW TOP POSITION */
            padding-top: 38px;
          }

          .header {
            margin-bottom: 104px;
          }

          .logo {
            width: 82px;
          }

          .divider {
            height: 58px;
          }

          .footerLine {
            margin-bottom: 16px;
          }

          .copyright {
            margin-top: 9px;
          }

          .footerWrap {
            padding-bottom: 12px;
          }
        }

        /* =========================================================
           VERY SHORT DESKTOP
        ========================================================= */

        @media (min-width: 721px) and (max-height: 760px) {

          .container {
            /* SAME NEW VERY-SHORT POSITION */
            padding-top: 28px;
          }

          .header {
            margin-bottom: 82px;
          }

          .logo {
            width: 74px;
          }
        }

        /* =========================================================
           MOBILE
        ========================================================= */

        @media (max-width: 720px) {

          .container {
            width: 92vw;

            /* MOBILE STAYS UNCHANGED */
            padding-top: 38px;
          }

          .header {
            flex-direction: column;

            align-items: center;

            gap: 0;

            margin-left: 0;

            margin-bottom: 68px;

            text-align: center;
          }

          .homeLink {
            flex-direction: column;

            align-items: center;

            gap: 0;
          }

          .logo {
            width: 76px;

            margin-bottom: 26px;
          }

          .divider,
          .desktopNav {
            display: none;
          }

          .name {
            font-size: 18px;

            letter-spacing: 0.18em;
          }

          .subtitle {
            margin-top: 8px;

            letter-spacing: 0.26em;
          }

          .subtitle p {
            font-size: 8px;

            margin: 3px 0;
          }

          .hamburger {
            display: block;
          }

          .pageWrap {
            width: 88vw;

            padding-top: 0;
          }

          .topIntro {
            margin-bottom: 74px;
          }

          .topicLabel {
            font-size: 12px;

            letter-spacing: 0.34em;

            padding-left: 0.34em;
          }

          .mainTitle,
          .textBlock h2,
          .recognition h2,
          .expertise h2,
          .portfolioDownloads h2,
          .cta h2 {
            font-size: 28px;

            letter-spacing: 0.11em;

            line-height: 1.12;
          }

          .mainRole {
            font-size: 23px;
          }

          .sectionGrid,
          .sectionGrid.approach {
            grid-template-columns: 1fr;

            gap: 44px;

            margin-bottom: 100px;

            text-align: center;
          }

          .sectionGrid.biographyIntro,
          .sketchGrid {
            grid-template-columns: 1fr;

            gap: 44px;

            margin-bottom: 4px;

            text-align: center;
          }

          .portraitImage,
          .cameraImage {
            width: 78%;

            transform: none;
          }

          .sketchImage {
            width: 104%;

            transform:
              translateX(-2%);
          }

          .textBlock {
            max-width: 100%;

            margin: 0 auto;
          }

          .textBlock p,
          .fullBiography p,
          .fullPhilosophy p,
          .recognition p,
          .cta p {
            font-size: 16px;

            line-height: 1.75;
          }

          .fullBiography {
            width: 88vw;

            margin:
              0 auto 85px;

            text-align: center;
          }

          .fullPhilosophy {
            width: 88vw;

            margin:
              0 auto 60px;

            text-align: center;
          }

          .recognition {
            padding:
              86px 0 96px;
          }

          .expertise {
            padding:
              86px 0 100px;
          }

          .expertiseGrid {
            grid-template-columns: 1fr;

            gap: 46px;
          }

          .expertiseCard {
            border-right: none !important;

            padding: 0;
          }

          .expertiseCard:not(:last-child)::after {
            content: "";

            display: block;

            width: 42px;
            height: 1px;

            background: #9C8664;

            opacity: 0.45;

            margin: 22px auto 0;
          }

          .portfolioDownloads {
            width: 88vw;

            padding:
              70px 0 120px;
          }

          .portfolioDownloads p {
            font-size: 16px;

            line-height: 1.75;

            margin-bottom: 30px;
          }

          .downloadButtons {
            flex-direction: column;

            gap: 16px;
          }

          .downloadButton {
            width: 82%;

            min-width: 0;

            padding: 14px 18px;

            font-size: 9px;

            letter-spacing: 0.2em;
          }

          .cta {
            padding:
              80px 0 120px;
          }

          .footerWrap {
            display: none;
          }
        }


        /* =========================================================
           ABOUT 2026 — ADDITIVE ENHANCEMENTS
           All original About CSS above remains unchanged.
           ========================================================= */
        .navItem { position: relative; }
        .desktopNav .navText { display: inline-block; outline-offset: 4px; }
        .navDropdownPanel {
          position: absolute;
          z-index: 50;
          top: 100%;
          left: 50%;
          transform: translate(-50%, -10px);
          padding-top: 11px;
          min-width: 0;
          width: max-content;
          max-width: min(85vw, 360px);
          display: block;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 350ms ease, transform 350ms cubic-bezier(.22, 1, .36, 1), visibility 350ms;
        }
        .navItem.navOpen .navDropdownPanel {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translate(-50%, 0);
        }
        @media (prefers-reduced-motion: reduce) {
          .navDropdownPanel { transition: none; }
        }
        
        .navDropdownInner {
          padding: 9px 0; border: 1px solid rgba(156,134,100,.18);
          background: rgba(255,255,255,.99);
          box-shadow: 0 12px 32px rgba(40,31,20,.09);
        }
        .navDropdownLink {
          display: block; width: 100%; padding: 10px 17px;
          border: 0; background: transparent; color: #6f685f;
          text-align: left; font: 400 11px/1.4 Arial,sans-serif;
          letter-spacing: .08em; white-space: nowrap; cursor: pointer;
        }
        .navDropdownLink:hover, .navDropdownLink:focus-visible {
          color: #1d1b18; background: #faf8f5;
        }
        .mobileSubmenu {
          margin: -18px 0 28px 18px; border-left: 1px solid rgba(201,179,140,.3);
          padding-left: 18px;
        }
        .mobileSubmenuLink {
          display: block; width: 100%; border: 0; padding: 8px 0;
          text-align: left; background: transparent;
          color: #e1dbcf; font: 14px/1.5 Arial,sans-serif;
          cursor: pointer;
        }
        .mobilePanel.open { overflow-y: auto; }
        .aboutImageCaption {
          display: block; margin: 10px auto 0;
          color: #978a77; font: 10px/1.5 Arial,sans-serif;
          text-transform: uppercase; letter-spacing: .13em;
          text-align: center;
        }
        .directions {
          width: min(1160px,86vw); margin: 0 auto;
          padding: 14px 0 118px;
          text-align: center;
        }
        .directions > p.introText {
          max-width: 740px; margin: 0 auto 52px;
          font: 300 16px/1.8 'Times New Roman', Georgia, serif;
          color: #6C6258;
        }
        .directions h2 {
          margin: 0 0 27px; font-family: 'Cormorant Garamond',serif;
          font-size: clamp(30px,2.45vw,44px); line-height: 1.12;
          letter-spacing: .14em; text-transform: uppercase;
          font-weight: 400; color: #2A2723;
        }
        .directionsGrid {
          display: grid; grid-template-columns: repeat(3,minmax(0,1fr));
          gap: 32px; text-align: left; align-items: start;
        }
        .directionCard { min-width: 0; }
        .directionCard img {
          display: block; width: 100%; aspect-ratio: 4/5;
          object-fit: contain; background: #fff;
        }
        .directionCard h3 {
          font: 400 29px/1.15 'Cormorant Garamond',serif;
          color: #2A2723; margin: 18px 0 9px;
        }
        .directionCard p {
          font: 300 15px/1.65 'Times New Roman',Georgia,serif;
          color: #4f4942; margin: 0 0 10px;
        }
        .directionStatus {
          font: 10px/1.5 Arial,sans-serif;
          letter-spacing: .17em; text-transform: uppercase;
          color: #9C8664;
        }
        .aboutContactLink {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 245px; padding: 14px 22px;
          border: 1px solid rgba(156,134,100,.42);
          background: #fff; color: #3f3933; font: 10px Arial,sans-serif;
          letter-spacing: .24em; text-transform: uppercase;
          cursor: pointer; transition: border-color .4s,color .4s;
        }
        .aboutContactLink:hover { color: #9C8664; border-color: #9C8664; }
        @media (max-width: 900px) and (min-width: 721px) {
          .directionsGrid { gap: 20px; }
          .directionCard h3 { font-size: 25px; }
        }
        @media (max-width:720px) {
          .directions { width: 88vw; padding: 0 0 92px; }
          .directionsGrid { grid-template-columns: 1fr; gap: 42px; }
          .directions h2 { font-size:28px; letter-spacing:.11em; }
          .directionCard img { aspect-ratio: 4/4; }
          .directions > p.introText { margin-bottom: 35px; }
        }

        /* =========================================================
           CRAFT & PRECISION — BETWEEN PHILOSOPHY AND SELECTED DIRECTIONS
           Scoped styles; original page dimensions and type left untouched.
        ========================================================= */
        .craftSection {
          width: min(1120px, 86vw);
          margin: 20px auto 115px;
          display: grid;
          /* Give the artwork a REAL 576px column, not a fractional one. */
          grid-template-columns: 576px minmax(0, 1fr);
          column-gap: 78px;
          align-items: center;
        }
        .craftArtwork {
          width: 576px;
          max-width: none;
          justify-self: center;
        }
        .craftArtwork img {
          display: block;
          /* Exactly matches the 576px width of Floral Lips (.sketchImage). */
          width: 576px;
          max-width: none;
          height: auto;
          object-fit: contain;
        }
        .craftText {
          min-width: 0;
        }
        .craftText h2 {
          margin: 0 0 34px;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(30px, 2.45vw, 44px);
          line-height: 1.12;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 400;
          color: #2A2723;
        }
        .craftText > p:not(.topicLabel) {
          margin: 0 0 20px;
          font-size: 16px;
          line-height: 1.82;
          font-weight: 300;
          color: #3F3933;
        }
        .craftText > p:last-child {
          margin-bottom: 0;
        }
        @media (min-width: 721px) and (max-width: 1220px) {
          .craftSection {
            grid-template-columns: 1fr;
            row-gap: 40px;
          }
          .craftText {
            width: min(590px, 100%);
            justify-self: center;
          }
        }
        @media (max-width: 720px) {
          .craftSection {
            width: 88vw;
            grid-template-columns: 1fr;
            gap: 44px;
            margin: 20px auto 100px;
          }
          .craftArtwork {
            width: 100%;
            max-width: none;
            transform: none;
          }
          .craftArtwork img {
            /* Floral Lips uses 104% and translateX(-2%) on mobile. */
            width: 104%;
            max-width: none;
            transform: translateX(-2%);
          }
          .craftText h2 {
            font-size: 28px;
            letter-spacing: 0.11em;
          }
          .craftText > p:not(.topicLabel) {
            line-height: 1.75;
          }
        }

        /* =========================================================
           2026 EDITORIAL REFINEMENT — CONCEPT / LION SECTION
           Original site styles, spacing, fonts and image sizes preserved.
        ========================================================= */
        .sketchGrid .conceptHeading {
          font-size: clamp(30px, 2.25vw, 40px);
          letter-spacing: .10em;
        }
        .lionSection {
          width: min(1120px, 86vw);
          margin: 5px auto 120px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 576px;
          gap: 78px;
          align-items: center;
        }
        .lionText { min-width: 0; }
        .lionText h2 {
          margin: 0 0 34px;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(30px, 2.45vw, 44px);
          line-height: 1.12;
          letter-spacing: .14em;
          text-transform: uppercase;
          font-weight: 400;
          color: #2A2723;
        }
        .lionText > p:not(.topicLabel) {
          margin: 0 0 20px;
          font-size: 16px;
          line-height: 1.82;
          font-weight: 300;
          color: #3F3933;
        }
        .lionText > p:last-child { margin-bottom: 0; }
        .lionArtwork {
          width: 576px;
          justify-self: center;
        }
        .lionArtwork img {
          display: block;
          width: 576px;
          height: auto;
          object-fit: contain;
        }
        @media (min-width: 721px) and (max-width: 1220px) {
          .lionSection {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .lionText {
            width: min(590px, 100%);
            justify-self: center;
          }
        }
        @media (max-width: 720px) {
          .sketchGrid .conceptHeading {
            font-size: 28px;
            letter-spacing: .09em;
          }
          .lionSection {
            width: 88vw;
            grid-template-columns: 1fr;
            gap: 44px;
            margin: 0 auto 100px;
          }
          .lionArtwork {
            width: 100%;
            order: -1;
          }
          .lionArtwork img {
            width: 104%;
            transform: translateX(-2%);
          }
          .lionText { text-align: center; }
          .lionText h2 {
            font-size: 28px;
            letter-spacing: .11em;
          }
          .lionText > p:not(.topicLabel) { line-height: 1.75; }
        }

        /* =========================================================
           CONSISTENT SECTION LABEL TYPOGRAPHY
           Applies to all small gold eyebrow labels on About.
           Keeps section titles, body copy and layout styles unchanged.
        ========================================================= */
        .aboutPage p.topicLabel {
          display: inline-block;
          margin: 0 0 22px;
          padding-left: 0.38em;
          font-family: Arial, sans-serif;
          font-size: 13px;
          font-weight: 400;
          font-style: normal;
          line-height: 1.1;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          text-align: center;
          color: #9C8664;
          max-width: 100%;
          white-space: normal;
        }
        @media (max-width: 720px) {
          .aboutPage p.topicLabel {
            font-size: 12px;
            letter-spacing: 0.34em;
            padding-left: 0.34em;
          }
        }

        /* =========================================================
           HOME / ABOUT — BALANCED JA LOGO / TEXT ALIGNMENT
           Match the visible height of the name plus two subtitle lines.
           The text line boxes have a few pixels of invisible padding:
           remove 8px from their measured total height, NOT 40% or more.
           Keep the divider deliberately short and centred.
           Mobile header layout stays unchanged.
        ========================================================= */
        @media (min-width: 721px) {
          .aboutPage .homeLink > .logo {
            width: auto;
            height: calc(var(--brand-text-height, 86px) - 8px);
            max-width: none;
            flex-shrink: 0;
            align-self: center;
            object-fit: contain;
            margin: 0;
          }

          .aboutPage .homeLink > .divider {
            height: calc(var(--brand-text-height, 86px) - 20px);
            align-self: center;
            margin-top: 0;
            flex-shrink: 0;
          }
        }
      
        /* FINAL TYPOGRAPHY — all reading/body copy, desktop + mobile */
        .aboutPage .textBlock p:not(.topicLabel),
        .aboutPage .fullBiography p,
        .aboutPage .fullPhilosophy p,
        .aboutPage .recognition p,
        .aboutPage .portfolioDownloads p:not(.topicLabel),
        .aboutPage .cta p,
        .aboutPage .expertiseCard p,
        .aboutPage .directions > p.introText,
        .aboutPage .directionsCard p,
        .aboutPage .craftText > p:not(.topicLabel),
        .aboutPage .lionText > p:not(.topicLabel) {
          font-size: 17px;
          line-height: 1.82;
        }

        /* Match Creative Consulting: four Areas of Expertise descriptions only. */
        .aboutPage .expertiseCard p {
          font-size: 14px;
          line-height: 1.75;
          font-weight: 300;
          color: #3F3933;
        }

/* EXACT ABOUT REFERENCE: shared brand, header and navigation */
.aboutPage .container {
width: min(1680px, 88vw);
          margin: 0 auto;

          /* SAME POSITION AS OTHER APPROVED INTERNAL PAGES */
          padding: clamp(34px, 4vh, 48px) 0 0;
}
.aboutPage .header {
display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 22px;

          margin-left: clamp(100px, 7vw, 180px);

          margin-bottom: clamp(102px, 11vh, 140px);

          position: relative;
}
.aboutPage .homeLink {
display: flex;
          align-items: flex-start;
          gap: 22px;

          cursor: pointer;

          color: inherit;
          text-decoration: none;

          -webkit-tap-highlight-color: transparent;
}
.aboutPage .homeLink:hover {
opacity: 0.96;
}
.aboutPage .logo {
width: 90px;
          height: auto;

          display: block;

          object-fit: contain;

          opacity: 1;
}
.aboutPage .divider {
width: 1px;
          height: 64px;

          background: rgba(70, 65, 58, 0.22);

          margin-top: 4px;
}
.aboutPage .name {
margin: 0;

          font-size: clamp(24px, 2vw, 34px);

          font-weight: 300;

          letter-spacing: 0.22em;

          line-height: 1;

          color: #1d1b18;
}
.aboutPage .subtitle {
margin-top: 12px;

          font-family: Arial, sans-serif;

          letter-spacing: 0.28em;

          color: #6f685f;
}
.aboutPage .subtitle p {
margin: 4px 0;

          font-size: clamp(10px, 0.85vw, 13px);
}
.aboutPage .desktopNav {
display: flex;

          gap: 34px;

          margin-right: clamp(40px, 5vw, 120px);

          font-family: Arial, sans-serif;

          font-size: clamp(8px, 0.8vw, 12px);

          letter-spacing: 0.18em;

          text-transform: uppercase;

          color: #6f685f;

          white-space: nowrap;
}
.aboutPage .desktopNav span {
cursor: pointer;

          transition:
            color 0.45s ease,
            transform 0.45s ease;
}
.aboutPage .desktopNav span:hover {
color: #1d1b18;

          transform: scale(1.04);
}
.aboutPage .footerWrap {
width: min(1680px, 88vw);

          margin: 0 auto;

          padding-bottom: clamp(14px, 2vh, 28px);
}
.aboutPage .footerLine {
width: 100%;

          height: 1px;

          background: rgba(0, 0, 0, 0.08);

          margin-bottom: 20px;
}
.aboutPage .bottomNav {
display: flex;

          justify-content: center;
          align-items: center;

          flex-wrap: wrap;

          gap: 0;

          padding-bottom: 5px;

          font-family: Arial, sans-serif;

          font-size: clamp(8px, 0.8vw, 12px);

          letter-spacing: 0.18em;

          text-transform: uppercase;

          color: #6f685f;
}
.aboutPage .bottomNavItem {
display: flex;

          align-items: center;
}
.aboutPage .bottomNavLink {
cursor: pointer;

          white-space: nowrap;

          transition:
            color 0.45s ease,
            transform 0.45s ease;
}
.aboutPage .bottomNavLink:hover {
color: #1d1b18;

          transform: scale(1.08);
}
.aboutPage .navDivider {
width: 1px;

          height: clamp(10px, 0.9vw, 14px);

          background:
            rgba(111, 104, 95, 0.25);

          margin-left:
            clamp(4px, 0.7vw, 12px);

          margin-right:
            clamp(4px, 0.7vw, 12px);
}
.aboutPage .copyright {
margin-top: 12px;

          text-align: center;

          font-family: Arial, sans-serif;

          font-size: clamp(7px, 0.55vw, 9px);

          letter-spacing: 0.28em;

          text-transform: uppercase;

          color: #b9b2a8;
}

/* In About, the gold logo follows the measured height of the brand text. */
@media (min-width: 721px) {
 .aboutPage .homeLink > .logo { width:auto; height:calc(var(--brand-text-height, 86px) - 8px); max-width:none; flex-shrink:0; align-self:center; object-fit:contain; margin:0; }
 .aboutPage .homeLink > .divider { height:calc(var(--brand-text-height, 86px) - 20px); align-self:center; margin-top:0; flex-shrink:0; }
}
@media (min-width:721px) and (max-height:900px) {
 .aboutPage .container {padding-top:38px;}
 .aboutPage .header {margin-bottom:104px;}
 .aboutPage .footerLine {margin-bottom:16px;}
 .aboutPage .copyright {margin-top:9px;}
 .aboutPage .footerWrap {padding-bottom:12px;}
}
@media (min-width:721px) and (max-height:760px) {
 .aboutPage .container {padding-top:28px;}
 .aboutPage .header {margin-bottom:82px;}
}
@media (max-width:720px) {
 .aboutPage .container {width:92vw;padding-top:38px;}
 .aboutPage .header {flex-direction:column;align-items:center;gap:0;margin-left:0;margin-bottom:68px;text-align:center;}
 .aboutPage .homeLink {flex-direction:column;align-items:center;gap:0;}
 .aboutPage .logo {width:76px;height:auto;margin-bottom:26px;}
 .aboutPage .divider, .aboutPage .desktopNav {display:none;}
 .aboutPage .name {font-size:18px;letter-spacing:.18em;}
 .aboutPage .subtitle {margin-top:8px;letter-spacing:.26em;}
 .aboutPage .subtitle p {font-size:8px;margin:3px 0;}
 .aboutPage .footerWrap {display:none;}
}
/* Gold active item: COLOR ONLY. No changes to font, weight, scale or spacing. */
.aboutPage .desktopNav .navText.isCurrent,
.aboutPage .desktopNav .navCurrent,
.aboutPage .bottomNavLink.isActive {color:#9C8664 !important;}

      
        /* JA logo — restore original About width; do not resize navigation text. */
        @media (min-width: 721px) {
          .aboutPage .homeLink > .logo { width: 90px; height: auto; max-width: none; }
        }
        @media (min-width: 721px) and (max-height: 900px) {
          .aboutPage .homeLink > .logo { width: 82px; height: auto; }
        }
        @media (min-width: 721px) and (max-height: 760px) {
          .aboutPage .homeLink > .logo { width: 74px; height: auto; }
        }
        @media (max-width: 720px) {
          .aboutPage .homeLink > .logo { width: 76px; height: auto; }
        }
      
/* EXACT HEADER AND FOOTER CSS FROM USER-SUPPLIED ABOUT; NEVER MODIFY THESE DIMENSIONS */
.aboutPage .container {
          width: min(1680px, 88vw);
          margin: 0 auto;

          
          padding: clamp(34px, 4vh, 48px) 0 0;
        }
.aboutPage .header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 22px;

          margin-left: clamp(100px, 7vw, 180px);

          margin-bottom: clamp(102px, 11vh, 140px);

          position: relative;
        }
.aboutPage .homeLink {
          display: flex;
          align-items: flex-start;
          gap: 22px;

          cursor: pointer;

          color: inherit;
          text-decoration: none;

          -webkit-tap-highlight-color: transparent;
        }
.aboutPage .homeLink:hover {
          opacity: 0.96;
        }
.aboutPage .logo {
          width: 90px;
          height: auto;

          display: block;

          object-fit: contain;

          opacity: 1;
        }
.aboutPage .divider {
          width: 1px;
          height: 64px;

          background: rgba(70, 65, 58, 0.22);

          margin-top: 4px;
        }
.aboutPage .name {
          margin: 0;

          font-size: clamp(24px, 2vw, 34px);

          font-weight: 300;

          letter-spacing: 0.22em;

          line-height: 1;

          color: #1d1b18;
        }
.aboutPage .subtitle {
          margin-top: 12px;

          font-family: Arial, sans-serif;

          letter-spacing: 0.28em;

          color: #6f685f;
        }
.aboutPage .subtitle p {
          margin: 4px 0;

          font-size: clamp(10px, 0.85vw, 13px);
        }
.aboutPage .desktopNav {
          display: flex;

          gap: 34px;

          margin-right: clamp(40px, 5vw, 120px);

          font-family: Arial, sans-serif;

          font-size: clamp(8px, 0.8vw, 12px);

          letter-spacing: 0.18em;

          text-transform: uppercase;

          color: #6f685f;

          white-space: nowrap;
        }
.aboutPage .desktopNav span {
          cursor: pointer;

          transition:
            color 0.45s ease,
            transform 0.45s ease;
        }
.aboutPage .desktopNav span:hover {
          color: #1d1b18;

          transform: scale(1.04);
        }
.aboutPage .footerWrap {
          width: min(1680px, 88vw);

          margin: 0 auto;

          padding-bottom: clamp(14px, 2vh, 28px);
        }
.aboutPage .footerLine {
          width: 100%;

          height: 1px;

          background: rgba(0, 0, 0, 0.08);

          margin-bottom: 20px;
        }
.aboutPage .bottomNav {
          display: flex;

          justify-content: center;
          align-items: center;

          flex-wrap: wrap;

          gap: 0;

          padding-bottom: 5px;

          font-family: Arial, sans-serif;

          font-size: clamp(8px, 0.8vw, 12px);

          letter-spacing: 0.18em;

          text-transform: uppercase;

          color: #6f685f;
        }
.aboutPage .bottomNavItem {
          display: flex;

          align-items: center;
        }
.aboutPage .bottomNavLink {
          cursor: pointer;

          white-space: nowrap;

          transition:
            color 0.45s ease,
            transform 0.45s ease;
        }
.aboutPage .bottomNavLink:hover {
          color: #1d1b18;

          transform: scale(1.08);
        }
.aboutPage .navDivider {
          width: 1px;

          height: clamp(10px, 0.9vw, 14px);

          background:
            rgba(111, 104, 95, 0.25);

          margin-left:
            clamp(4px, 0.7vw, 12px);

          margin-right:
            clamp(4px, 0.7vw, 12px);
        }
.aboutPage .copyright {
          margin-top: 12px;

          text-align: center;

          font-family: Arial, sans-serif;

          font-size: clamp(7px, 0.55vw, 9px);

          letter-spacing: 0.28em;

          text-transform: uppercase;

          color: #b9b2a8;
        }
@media  (min-width: 721px) and (max-height: 900px)  {
.aboutPage .container {
            
            padding-top: 38px;
          }
.aboutPage .header {
            margin-bottom: 104px;
          }
.aboutPage .logo {
            width: 82px;
          }
.aboutPage .divider {
            height: 58px;
          }
.aboutPage .footerLine {
            margin-bottom: 16px;
          }
.aboutPage .copyright {
            margin-top: 9px;
          }
.aboutPage .footerWrap {
            padding-bottom: 12px;
          }
}
@media  (min-width: 721px) and (max-height: 760px)  {
.aboutPage .container {
            
            padding-top: 28px;
          }
.aboutPage .header {
            margin-bottom: 82px;
          }
.aboutPage .logo {
            width: 74px;
          }
}
@media  (max-width: 720px)  {
.aboutPage .container {
            width: 92vw;

            
            padding-top: 38px;
          }
.aboutPage .header {
            flex-direction: column;

            align-items: center;

            gap: 0;

            margin-left: 0;

            margin-bottom: 68px;

            text-align: center;
          }
.aboutPage .homeLink {
            flex-direction: column;

            align-items: center;

            gap: 0;
          }
.aboutPage .logo {
            width: 76px;

            margin-bottom: 26px;
          }
.aboutPage .divider, .aboutPage .desktopNav {
            display: none;
          }
.aboutPage .name {
            font-size: 18px;

            letter-spacing: 0.18em;
          }
.aboutPage .subtitle {
            margin-top: 8px;

            letter-spacing: 0.26em;
          }
.aboutPage .subtitle p {
            font-size: 8px;

            margin: 3px 0;
          }
.aboutPage .footerWrap {
            display: none;
          }
}
.aboutPage .navItem { position: relative; }
.aboutPage .desktopNav .navText { display: inline-block; outline-offset: 4px; }
.aboutPage .navDropdownPanel {
          position: absolute;
          z-index: 50;
          top: 100%;
          left: 50%;
          transform: translate(-50%, -10px);
          padding-top: 11px;
          min-width: 0;
          width: max-content;
          max-width: min(85vw, 360px);
          display: block;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 350ms ease, transform 350ms cubic-bezier(.22, 1, .36, 1), visibility 350ms;
        }
.aboutPage .navItem.navOpen .navDropdownPanel {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translate(-50%, 0);
        }
@media  (prefers-reduced-motion: reduce)  {
.aboutPage .navDropdownPanel { transition: none; }
}
.aboutPage .navDropdownInner {
          padding: 9px 0; border: 1px solid rgba(156,134,100,.18);
          background: rgba(255,255,255,.99);
          box-shadow: 0 12px 32px rgba(40,31,20,.09);
        }
.aboutPage .navDropdownLink {
          display: block; width: 100%; padding: 10px 17px;
          border: 0; background: transparent; color: #6f685f;
          text-align: left; font: 400 11px/1.4 Arial,sans-serif;
          letter-spacing: .08em; white-space: nowrap; cursor: pointer;
        }
.aboutPage .navDropdownLink:hover, .aboutPage .navDropdownLink:focus-visible {
          color: #1d1b18; background: #faf8f5;
        }
@media  (min-width: 721px)  {
.aboutPage .homeLink > .logo {
            width: auto;
            height: calc(var(--brand-text-height, 86px) - 8px);
            max-width: none;
            flex-shrink: 0;
            align-self: center;
            object-fit: contain;
            margin: 0;
          }
.aboutPage .homeLink > .divider {
            height: calc(var(--brand-text-height, 86px) - 20px);
            align-self: center;
            margin-top: 0;
            flex-shrink: 0;
          }
}

/* Navigation active state affects COLOR ONLY */
.aboutPage .desktopNav .activeNav, .aboutPage .desktopNav .navActive, .aboutPage .desktopNav .navText.activeNav, .aboutPage .desktopNav .navText.navActive, .aboutPage .bottomNav .activeNav, .aboutPage .bottomNav .navActive { color: #9C8664; }

        /* ACTIVE PAGE ONLY — color and scale; preserve approved About typography,
           logo geometry, spacing and all existing layout rules. */
        .desktopNav .navText.isCurrent,
        .desktopNav .navCurrent {
          color: #9C8664 !important;
          transform: scale(1.08);
          transform-origin: center center;
        }
        .desktopNav .navCurrent { display: inline-block; }
        .bottomNav .bottomNavLink.isActive {
          color: #9C8664 !important;
          transform: scale(1.08);
          transform-origin: center center;
        }

/* ==================================================================
   DESIGN & PROCESS — NEW PAGE CONTENT ONLY
   The supplied About header, footer, logo, all menus and their styles
   above are copied without any modification. No global overrides.
   ================================================================== */
/* CONTENT METRICS TAKEN LITERALLY FROM CONCEPT STUDIES:
   .conceptPage .editorial { width:min(1180px,86vw); margin:0 auto }
   Mobile <=720px: .conceptPage .editorial { width:88vw }
   Header/footer CSS above remains entirely untouched. */
.designCreationPage { --dc-about-width: min(1180px, 86vw); }
.designCreationPage .dcContent { background:#fff; overflow:hidden; }
.designCreationPage .dcContainer { width:var(--dc-about-width); margin-left:auto; margin-right:auto; }
.designCreationPage .dcEyebrow { font:400 13px/1.1 Arial,sans-serif; letter-spacing:.38em; text-transform:uppercase; color:#9C8664; }
.designCreationPage .dcHero { width:var(--dc-about-width); margin:0 auto 124px; position:relative; min-height:650px; display:grid; grid-template-columns:42% 58%; align-items:center; background:#fff; isolation:isolate; }
.designCreationPage .dcHeroIntro { position:relative; z-index:3; min-width:0; padding:35px 18px 110px 0; text-align:left; margin-left:0; transform:translateX(30%); }
.designCreationPage .dcHeroEyebrow { margin:0 0 24px; }
.designCreationPage .dcGoldRule { width:43px; height:1px; background:#B7A17D; display:block; margin:18px 0 24px; }
.designCreationPage .dcHeroTitle { font:400 clamp(30px,2.45vw,44px)/1.12 'Cormorant Garamond',Georgia,serif; letter-spacing:.14em; text-transform:uppercase; color:#2A2723; margin:0 0 34px; }
.designCreationPage .dcHeroLead { font:300 clamp(18px,1.45vw,23px)/1.4 'Cormorant Garamond',Georgia,serif; letter-spacing:.04em; color:#6C6258; margin:0 0 25px; }
.designCreationPage .dcHeroCopy { font:300 17px/1.82 'Times New Roman',Georgia,serif; max-width:355px; color:#3F3933; margin:0 0 30px; }
.designCreationPage .dcTextLink { border:0; border-bottom:1px solid #B7A17D; border-radius:0; background:none; padding:0 0 8px; font:400 10px/1.5 Arial,sans-serif; color:#6f685f; letter-spacing:.2em; cursor:pointer; text-transform:uppercase; transition:color .25s; }
.designCreationPage .dcTextLink:hover { color:#9C8664; }
.designCreationPage .dcHeroArt { position:relative; height:min(690px,62vw); min-height:520px; width:100%; align-self:stretch; }
.designCreationPage .dcHeroArt img { position:absolute; inset:0; width:100%; height:100%; object-fit:contain; object-position:50% 48%; transform:translateY(-20px) scale(.84); transform-origin:50% 48%; image-rendering:auto; user-select:none; -webkit-user-drag:none; }
.designCreationPage .dcHeroOff { opacity:1; }
.designCreationPage .dcHeroOn { transition:opacity .22s linear; }
.designCreationPage .dcHeroLabel { position:absolute; bottom:70px; right:12%; z-index:3; font:10px/1.3 Arial,sans-serif; letter-spacing:.22em; color:#9C8664; text-transform:uppercase; }
/* Hero image and LIGHT / OFF label are two additional controls for the SAME light. */
.designCreationPage .dcHeroImageButton {
  position:absolute; inset:0; width:100%; height:100%; display:block;
  padding:0; margin:0; border:0; background:transparent;
  cursor:pointer; -webkit-tap-highlight-color:transparent;
}
.designCreationPage .dcHeroImageButton:focus-visible {
  outline:1px solid #9C8664; outline-offset:3px;
}
.designCreationPage button.dcHeroLabel {
  border:0; padding:4px 6px; margin:0; background:transparent;
  cursor:pointer; transform-origin:center; font-weight:400;
  transition:transform .35s ease, font-weight .35s ease, color .35s ease;
}
.designCreationPage button.dcHeroLabel:hover,
.designCreationPage button.dcHeroLabel:focus-visible {
  transform:scale(1.06); font-weight:600; color:#6F685F;
}
.designCreationPage button.dcHeroLabel:focus-visible {
  outline:1px solid #9C8664; outline-offset:2px;
}

.designCreationPage .dcArc { display:none; } /* Retire only the old ellipse stroke: the exact approved gradient contour is drawn as the line below. */
/* The tonal wash follows the actual ORIGINAL CSS elliptical arc.
   Its parallel curved bands begin directly against the arc, then fade
   vertically and toward both side edges. No horizontal gradient boundary. */
.designCreationPage .dcArcGlow {
  position:absolute;
  z-index:1;
  pointer-events:none;
  left:-7.5%;
  width:115%;
  top:calc(100% - 42px);
  height:280px;
  overflow:visible;
}
.designCreationPage .dcScrollAction { position:absolute; z-index:5; left:50%; bottom:-115px; transform:translateX(-50%); border:0; background:transparent; padding:12px 22px; color:#9C8664; text-align:center; font:10px/1.3 Arial,sans-serif; letter-spacing:.24em; text-transform:uppercase; cursor:pointer; white-space:nowrap; }
.designCreationPage .dcScrollActionText { display:block; }
.designCreationPage .dcScrollPill { display:flex; margin:15px auto 0; width:25px; height:42px; border:1px solid #9C8664; border-radius:18px; align-items:flex-start; justify-content:center; padding-top:8px; }
.designCreationPage .dcScrollPill::after { content:''; display:block; width:3px; height:11px; border-radius:3px; background:#9C8664; animation: dcMouse 2s ease-in-out infinite; transition:transform .25s ease,opacity .25s ease; }
@keyframes dcMouse { 50% { transform:translateY(10px); opacity:.4; } }
.designCreationPage .dcScrollAction:hover .dcScrollPill { background:#fbf9f5; }
/* While hovered or keyboard-focused, freeze the indicator at the real light state.
   Once manually clicked, it stays fixed even after the pointer moves away. */
.designCreationPage .dcScrollAction:is(:hover,:focus-visible).isLightOn .dcScrollPill::after,
.designCreationPage .dcScrollAction.isManual.isLightOn .dcScrollPill::after { animation:none; transform:translateY(0); opacity:1; }
.designCreationPage .dcScrollAction:is(:hover,:focus-visible).isLightOff .dcScrollPill::after,
.designCreationPage .dcScrollAction.isManual.isLightOff .dcScrollPill::after { animation:none; transform:translateY(10px); opacity:1; }
.designCreationPage .dcSection { padding:100px 0 118px; }
.designCreationPage .dcSection + .dcSection { border-top:1px solid rgba(0,0,0,.06); }
.designCreationPage .dcSectionHead { display:grid; grid-template-columns:270px minmax(0,1fr); align-items:end; gap:66px; margin-bottom:57px; margin-left:0; }
.designCreationPage .dcSectionIndex { font:400 12px/1.3 Arial,sans-serif; color:#9C8664; letter-spacing:.28em; margin:0 0 19px; }
.designCreationPage .dcSectionTitle { font:400 clamp(30px,2.45vw,44px)/1.12 'Cormorant Garamond',Georgia,serif; text-transform:uppercase; letter-spacing:.14em; color:#2A2723; margin:0; }
.designCreationPage .dcSectionDescription { margin:0; font:300 17px/1.82 'Times New Roman',Georgia,serif; color:#3F3933; max-width:670px; }
.designCreationPage .dcSketchGrid { display:grid; grid-template-columns:1.2fr .72fr; align-items:center; gap:45px; }
.designCreationPage .dcSketchBox { background:#fff; border:0; padding:0; cursor:pointer; position:relative; text-align:center; }
.designCreationPage .dcSketchBox img { width:100%; height:auto; max-height:560px; object-fit:contain; display:block; margin:auto; transition:transform .35s ease; }
.designCreationPage .dcSketchBox:hover img { transform:scale(1.012); }
.designCreationPage .dcSketchBoxTall img { max-height:560px; }
.designCreationPage .dcFigureCaption { font:400 10px/1.7 Arial,sans-serif; color:#948879; letter-spacing:.18em; text-transform:uppercase; margin:14px 0 0; text-align:center; }
/* Sketch / Concept: side study | idea development | front study.
   Content spacing, type and gold accent follow the approved editorial system. */
.designCreationPage .dcSketchTriptych { display:grid; grid-template-columns:minmax(0,.88fr) minmax(0,1.05fr) minmax(0,1.12fr); gap:clamp(22px,3vw,48px); align-items:center; }
.designCreationPage .dcSketchTriptychArtwork { min-width:0; margin:0; }
/* Lower both sketch-and-caption groups by 5% of their own height on desktop. */
@media (min-width:721px) {
  .designCreationPage .dcSketchTriptychArtwork { transform:translateY(5%); }
}
/* Both illustrations have the SAME visible vertical stage; left is quieter,
   right has more horizontal room. Image pixels and proportions are untouched. */
.designCreationPage .dcSketchTriptychArtwork .dcSketchBox {
  display:flex; width:100%; height:clamp(280px,29vw,420px);
  align-items:center; justify-content:center;
}
.designCreationPage .dcSketchTriptychArtwork img {
  display:block; height:100%; width:auto; max-width:100%; max-height:100%;
  object-fit:contain; margin:0 auto;
}
.designCreationPage .dcSketchTriptychSide .dcSketchBox { width:92%; margin:0 auto; }
.designCreationPage .dcSketchTriptychFront .dcSketchBox { width:100%; }

.designCreationPage .dcSketchTriptychCopy { min-width:0; text-align:left; }
.designCreationPage .dcSketchTriptychCopy .dcSectionIndex { margin-bottom:23px; }
.designCreationPage .dcSketchTriptychCopy .dcSectionTitle { margin:0; }
.designCreationPage .dcSketchTriptychCopy .dcGoldRule { margin:20px 0 25px; }
.designCreationPage .dcSketchTriptychLead { font:300 clamp(18px,1.45vw,23px)/1.4 'Cormorant Garamond',Georgia,serif; letter-spacing:.04em; color:#6C6258; margin:0 0 20px; }
.designCreationPage .dcSketchTriptychCopy .dcSectionDescription { font:300 17px/1.82 'Times New Roman',Georgia,serif; color:#3F3933; margin:0; }
.designCreationPage .dcSketchTriptychArtwork .dcFigureCaption { margin-top:28px; }
@media (min-width:721px) and (max-width:1050px) {
  .designCreationPage .dcSketchTriptych { gap:18px; grid-template-columns:minmax(0,.88fr) minmax(0,1.2fr) minmax(0,1.12fr); }
  .designCreationPage .dcSketchTriptychCopy .dcSectionDescription { font-size:15px; line-height:1.65; }
}
@media (max-width:720px) {
  .designCreationPage .dcSketchTriptych { grid-template-columns:1fr 1fr; gap:34px 17px; align-items:start; }
  .designCreationPage .dcSketchTriptychCopy { grid-column:1/-1; grid-row:1; }
  .designCreationPage .dcSketchTriptychSide { grid-column:1; grid-row:2; }
  .designCreationPage .dcSketchTriptychFront { grid-column:2; grid-row:2; }
  .designCreationPage .dcSketchTriptychArtwork .dcSketchBox { height:clamp(180px,39vw,320px); }
  .designCreationPage .dcSketchTriptychArtwork img { max-height:100%; }
  .designCreationPage .dcSketchTriptychCopy .dcSectionDescription { font-size:17px; line-height:1.82; }
}
.designCreationPage .dcTonalSection { background:#fcfbf9; }

/* Drawing / Proportion — editorial two-column layout.
   Same title, gold rule, lead and body typography as Sketch / Concept.
   Only this section is affected; the approved hero, arc, menus and footer remain unchanged. */
/* Reduce grey section vertical padding by approximately two / three text lines.
   Original section was 100px top / 118px bottom. */
.designCreationPage #dc-drawing.dcSection {
  padding-top: 64px;
  padding-bottom: 28px;
}
.designCreationPage .dcDrawingGrid {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 2.18fr);
  gap: clamp(36px, 4.4vw, 68px);
  align-items: center;
}
.designCreationPage .dcDrawingCopy {
  min-width: 0;
  text-align: left;
}
.designCreationPage .dcDrawingCopy .dcSectionIndex { margin-bottom: 23px; }
.designCreationPage .dcDrawingCopy .dcSectionTitle { margin: 0; }
.designCreationPage .dcDrawingCopy .dcGoldRule { margin: 20px 0 25px; }
.designCreationPage .dcDrawingLead {
  font: 300 clamp(18px, 1.45vw, 23px)/1.4 'Cormorant Garamond', Georgia, serif;
  letter-spacing: .04em;
  color: #6C6258;
  margin: 0 0 20px;
}
.designCreationPage .dcDrawingCopy .dcSectionDescription {
  margin: 0;
  font: 300 17px/1.82 'Times New Roman', Georgia, serif;
  color: #3F3933;
}
.designCreationPage .dcDrawingArtwork {
  min-width: 0;
  margin: 0;
}
.designCreationPage .dcDrawingArtwork .dcTechnicalFrame {
  padding: 0;
  border: 0;
  box-shadow: none;
}
.designCreationPage .dcDrawingArtwork .dcTechnicalFrame img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}
.designCreationPage .dcDrawingArtwork .dcTechnicalCaption {
  padding-top: 25px;
  justify-content: flex-end;
  text-align: right;
}
@media (min-width: 721px) and (max-width: 1050px) {
  .designCreationPage .dcDrawingGrid {
    grid-template-columns: minmax(0, .9fr) minmax(0, 1.9fr);
    gap: 26px;
  }
  .designCreationPage .dcDrawingCopy .dcSectionDescription {
    font-size: 15px;
    line-height: 1.65;
  }
}
@media (max-width: 720px) {
  .designCreationPage #dc-drawing.dcSection {
    padding-top: 48px;
    padding-bottom: 12px;
  }
  .designCreationPage .dcDrawingGrid {
    grid-template-columns: 1fr;
    gap: 34px;
  }
  .designCreationPage .dcDrawingCopy .dcSectionDescription {
    font-size: 17px;
    line-height: 1.82;
  }
  .designCreationPage .dcDrawingArtwork .dcTechnicalCaption {
    padding-top: 20px;
  }
}

.designCreationPage .dcTechnicalFrame { background:#fff; border:1px solid rgba(156,134,100,.13); padding:17px; box-shadow:0 18px 55px rgba(60,40,24,.035); }
.designCreationPage .dcTechnicalButton { border:0; background:#fff; width:100%; display:block; padding:0; cursor:pointer; }
.designCreationPage .dcTechnicalFrame img { width:100%; display:block; height:auto; transition:transform .35s ease; }
.designCreationPage .dcTechnicalButton:hover img { transform:scale(1.006); }
.designCreationPage .dcTechnicalCaption { display:flex; gap:26px; flex-wrap:wrap; justify-content:space-between; font:400 10px/1.65 Arial,sans-serif; text-transform:uppercase; letter-spacing:.13em; color:#9C8664; padding:22px 0 0; }
.designCreationPage .dcFinishGrid { display:grid; grid-template-columns:repeat(4,1fr); gap:26px; }
.designCreationPage .dcFinishCard { margin:0; min-width:0; }
.designCreationPage .dcFinishButton { background:#fff; border:0; padding:0; display:block; width:100%; cursor:pointer; }
.designCreationPage .dcFinishButton img { display:block; width:100%; height:320px; object-fit:contain; transition:transform .35s ease; }
.designCreationPage .dcFinishButton:hover img { transform:scale(1.025); }
.designCreationPage .dcFinishCard figcaption { font:400 11px/1.6 Arial,sans-serif; text-transform:uppercase; text-align:center; letter-spacing:.2em; color:#6f685f; margin:17px 0 0; }
.designCreationPage .dcPlacementGrid { display:grid; grid-template-columns:1fr 1fr; gap:22px; align-items:stretch; }
.designCreationPage .dcPhotoButton { display:block; width:100%; padding:0; border:0; background:#fff; cursor:pointer; overflow:hidden; }
.designCreationPage .dcPhotoButton img { width:100%; height:100%; max-height:530px; object-fit:cover; display:block; transition:transform .45s ease; }
.designCreationPage .dcPhotoButton:hover img { transform:scale(1.012); }
.designCreationPage .dcPhotoFigure { margin:0; }
.designCreationPage .dcPlacementMain { margin:40px 0 0; }
.designCreationPage .dcPlacementMain img { width:100%; height:auto; max-height:none; object-fit:contain; }
.designCreationPage .dcMagazineRow { margin:70px auto 0; display:grid; grid-template-columns:minmax(0,1fr) 240px; gap:70px; align-items:center; }
.designCreationPage .dcMagazineIntro { font:300 clamp(18px,1.45vw,23px)/1.4 'Cormorant Garamond',Georgia,serif; letter-spacing:.04em; color:#6C6258; margin:0 0 13px; }
.designCreationPage .dcMagazineText { font:300 17px/1.82 'Times New Roman',Georgia,serif; color:#3F3933; margin:0; }
.designCreationPage .dcMagazineThumb { width:100%; border:0; padding:0; background:none; cursor:pointer; }
.designCreationPage .dcMagazineThumb img { width:100%; height:auto; display:block; }
.designCreationPage .dcCta { padding:100px 15px 124px; text-align:center; background:#fff; }
.designCreationPage .dcCta h2 { font:400 clamp(30px,2.45vw,44px)/1.12 'Cormorant Garamond',Georgia,serif; text-transform:uppercase; letter-spacing:.14em; color:#2A2723; margin:0 0 34px; }
.designCreationPage .dcCta p { font:300 17px/1.75 'Times New Roman',Georgia,serif; color:#6C6258; max-width:620px; margin:0 auto 34px; }
.designCreationPage .dcCtaButton { display:inline-block; padding:14px 28px; min-width:220px; border:1px solid rgba(156,134,100,.48); background:white; color:#3F3933; cursor:pointer; font:400 10px/1.4 Arial,sans-serif; letter-spacing:.24em; text-transform:uppercase; transition:all .25s; }
.designCreationPage .dcCtaButton:hover { border-color:#9C8664; color:#9C8664; }
.designCreationPage .dcModal { position:fixed; z-index:9000; inset:0; background:rgba(20,18,16,.84); display:flex; align-items:center; justify-content:center; padding:6vh 6vw; }
.designCreationPage .dcModalImage { display:block; object-fit:contain; max-width:88vw; max-height:85vh; width:auto; height:auto; background:#fff; box-shadow:0 14px 60px rgba(0,0,0,.23); }
.designCreationPage .dcModalClose { position:fixed; top:23px; right:28px; z-index:9001; border:0; cursor:pointer; color:#fff; font:300 33px/1 Georgia,serif; background:transparent; }

/* Approved editorial image interaction — isolated to Design & Process. */
.designCreationPage .dcModal {
  background:rgba(20,18,16,.73);
  -webkit-backdrop-filter:blur(3px);
  backdrop-filter:blur(3px);
  opacity:0;
  visibility:hidden;
  transition:opacity 300ms cubic-bezier(.22,.61,.36,1), visibility 300ms;
  cursor:default;
}
.designCreationPage .dcModal.isVisible { opacity:1; visibility:visible; transition-duration:450ms; }
.designCreationPage .dcModalImage {
  opacity:0;
  transform:translateY(9px) scale(.975);
  transition:transform 450ms cubic-bezier(.22,.61,.36,1),opacity 450ms ease;
}
.designCreationPage .dcModal.isVisible .dcModalImage { opacity:1; transform:translateY(0) scale(1); }
.designCreationPage .dcModal:not(.isVisible) .dcModalImage { transition-duration:300ms; }
.designCreationPage :is(.dcSketchBox,.dcTechnicalButton,.dcFinishButton,.dcPhotoButton,.dcMagazineThumb,.dcColourImageButton,.dcHandImageButton,.dcInteriorImageButton) {
  position:relative;
  cursor:pointer;
}
.designCreationPage :is(.dcSketchBox,.dcTechnicalButton,.dcFinishButton,.dcPhotoButton,.dcMagazineThumb,.dcColourImageButton,.dcHandImageButton,.dcInteriorImageButton)::after {
  content:"";
  position:absolute;
  right:13px;
  bottom:13px;
  width:24px;
  height:24px;
  pointer-events:none;
  opacity:0;
  transform:translateY(4px);
  transition:opacity 280ms ease,transform 280ms ease;
  background:linear-gradient(#9C8664,#9C8664) left top / 9px 1.5px no-repeat,
    linear-gradient(#9C8664,#9C8664) left top / 1.5px 9px no-repeat,
    linear-gradient(#9C8664,#9C8664) right top / 9px 1.5px no-repeat,
    linear-gradient(#9C8664,#9C8664) right top / 1.5px 9px no-repeat,
    linear-gradient(#9C8664,#9C8664) left bottom / 9px 1.5px no-repeat,
    linear-gradient(#9C8664,#9C8664) left bottom / 1.5px 9px no-repeat,
    linear-gradient(#9C8664,#9C8664) right bottom / 9px 1.5px no-repeat,
    linear-gradient(#9C8664,#9C8664) right bottom / 1.5px 9px no-repeat;
  filter:drop-shadow(0 0 3px rgba(255,255,255,.9));
}
@media (hover:hover) and (pointer:fine) {
  .designCreationPage :is(.dcSketchBox,.dcTechnicalButton,.dcFinishButton,.dcPhotoButton,.dcMagazineThumb,.dcColourImageButton,.dcHandImageButton,.dcInteriorImageButton):hover::after { opacity:.92; transform:translateY(0); }
}
.designCreationPage :is(.dcSketchBox,.dcTechnicalButton,.dcFinishButton,.dcPhotoButton,.dcMagazineThumb,.dcColourImageButton,.dcHandImageButton,.dcInteriorImageButton):focus-visible::after { opacity:.92; transform:translateY(0); }
@media (prefers-reduced-motion:reduce) {
  .designCreationPage .dcModal,.designCreationPage .dcModalImage,
  .designCreationPage :is(.dcSketchBox,.dcTechnicalButton,.dcFinishButton,.dcPhotoButton,.dcMagazineThumb,.dcColourImageButton,.dcHandImageButton,.dcInteriorImageButton)::after { transition:none; }
}

@media (max-width:1050px) {
  .designCreationPage .dcHero { grid-template-columns:45% 55%; min-height:560px; margin-bottom:140px; }
  .designCreationPage .dcHeroArt { height:580px; min-height:480px; }
  .designCreationPage .dcHeroIntro { padding-left:0; padding-right:12px; }
  .designCreationPage .dcSectionHead { grid-template-columns:240px 1fr; gap:40px; }
  .designCreationPage .dcFinishButton img { height:280px; }
}
@media (max-width:720px) {
  .designCreationPage { --dc-about-width: 88vw; }
  .designCreationPage .dcContainer { width:var(--dc-about-width); }
  .designCreationPage .dcEyebrow {font-size:12px; letter-spacing:.34em; }
  .designCreationPage .dcHero { display:flex; flex-direction:column; width:var(--dc-about-width); min-height:0; margin-bottom:104px; }
  .designCreationPage .dcHeroIntro { order:0; width:100%; padding:0 0 18px; text-align:left; transform:none; }
  .designCreationPage .dcGoldRule { margin:13px 0 21px; }
  .designCreationPage .dcHeroTitle { font-size:28px; line-height:1.12; letter-spacing:.11em; margin-bottom:17px; }
  .designCreationPage .dcHeroLead { font-size:23px; }
  .designCreationPage .dcHeroCopy { margin:0 0 25px; font-size:17px; line-height:1.82; }
  .designCreationPage .dcHeroArt { order:1; min-height:0; width:100%; height:94vw; max-height:520px; }
  .designCreationPage .dcHeroArt img { object-position:center; transform:translateY(-20px) scale(.84); transform-origin:center; }
  .designCreationPage .dcHeroLabel { bottom:47px; right:8%; font-size:9px; } /* move LIGHT ON/OFF up 39px with the switch */
  .designCreationPage .dcArc { bottom:-44px; height:72px; }
  .designCreationPage .dcArcGlow { top:calc(100% - 28px); height:157.5px; }
  .designCreationPage .dcScrollAction { bottom:-78px; } /* raise Scroll to Explore + switch by 39px so pill midpoint aligns with wave */
  .designCreationPage .dcSection { padding:80px 0 92px; }
  .designCreationPage .dcSectionHead { grid-template-columns:1fr; gap:22px; margin-bottom:32px; text-align:left; }
  .designCreationPage .dcSectionTitle { font-size:28px; letter-spacing:.11em; line-height:1.12; }
  .designCreationPage .dcSectionDescription {font-size:17px;line-height:1.82;}
  .designCreationPage .dcSketchGrid {grid-template-columns:1fr; gap:38px;}
  .designCreationPage .dcSketchBox img {max-height:460px;}
  .designCreationPage .dcSketchBoxTall img {max-height:520px;}
  .designCreationPage .dcTechnicalFrame {padding:7px;}
  .designCreationPage .dcTechnicalCaption {font-size:9px; justify-content:center; text-align:center; gap:5px;}
  .designCreationPage .dcFinishGrid {grid-template-columns:repeat(2,1fr); gap:30px 16px;}
  .designCreationPage .dcFinishButton img {height:260px;}
  .designCreationPage .dcFinishCard figcaption {font-size:10px;letter-spacing:.15em;}
  .designCreationPage .dcPlacementGrid {grid-template-columns:1fr; gap:32px;}
  .designCreationPage .dcPhotoButton img {max-height:none; height:auto;}
  .designCreationPage .dcMagazineRow {grid-template-columns:1fr; gap:25px; margin-top:55px; text-align:center;}
  .designCreationPage .dcMagazineThumb {width:min(255px,65vw);margin:auto;}
  .designCreationPage .dcCta {padding:72px 6vw 100px;}
}
@media (prefers-reduced-motion:reduce) {
  .designCreationPage .dcScrollPill::after {animation:none;}
  .designCreationPage .dcHeroOn {transition:none;}
  .designCreationPage button.dcHeroLabel {transition:none;}
  .designCreationPage .dcSketchBox img,
  .designCreationPage .dcTechnicalFrame img,
  .designCreationPage .dcPhotoButton img,
  .designCreationPage .dcFinishButton img {transition:none;}
}


/* MATERIAL EXPRESSIONS — ONLY THIS SECTION.
   Same editorial column ratio and typographic hierarchy as Drawing / Proportion.
   Two source images per object share exactly the same size, position and scaling. */
.designCreationPage #dc-materials .dcMaterialsLayout {
  display:grid;
  grid-template-columns:minmax(0,1.02fr) minmax(0,1.98fr);
  gap:clamp(48px,5.2vw,82px);
  align-items:center;
}
.designCreationPage #dc-materials .dcMaterialsCopy {min-width:0;text-align:left;}
.designCreationPage #dc-materials .dcMaterialsCopy .dcSectionIndex {margin-bottom:23px;}
.designCreationPage #dc-materials .dcMaterialsCopy .dcSectionTitle {margin:0;}
.designCreationPage #dc-materials .dcMaterialsCopy .dcGoldRule {margin:20px 0 25px;}
.designCreationPage #dc-materials .dcMaterialsLead {
  font:300 clamp(18px,1.45vw,23px)/1.4 'Cormorant Garamond',Georgia,serif;
  letter-spacing:.04em;color:#6C6258;margin:0 0 20px;
}
.designCreationPage #dc-materials .dcMaterialsCopy .dcSectionDescription {
  margin:0;font:300 17px/1.82 'Times New Roman',Georgia,serif;color:#3F3933;
}
.designCreationPage #dc-materials .dcFinishGrid {
  display:grid;grid-template-columns:repeat(4,minmax(0,1fr));
  gap:clamp(8px,1.25vw,18px);min-width:0;align-items:start;
}
.designCreationPage #dc-materials .dcFinishCard {margin:0;min-width:0;}
.designCreationPage #dc-materials .dcFinishButton {
  display:block;position:relative;width:100%;padding:0;margin:0;
  background:#fff;border:0;cursor:pointer;overflow:visible;
}
.designCreationPage #dc-materials .dcFinishStage {
  display:block;position:relative;width:100%;height:clamp(138px,15.6vw,216px);
  transition:transform .38s cubic-bezier(.22,.61,.36,1);
  transform-origin:center center;
}
.designCreationPage #dc-materials .dcFinishStage img {
  position:absolute;inset:0;width:100%;height:100%;object-fit:contain;
  display:block;margin:0;transform:none;transition:opacity .4s ease;
  user-select:none;-webkit-user-drag:none;
}
.designCreationPage #dc-materials .dcFinishStage .dcFinishOn {opacity:0;}
.designCreationPage #dc-materials .dcFinishButton:hover .dcFinishStage,
.designCreationPage #dc-materials .dcFinishButton:focus-visible .dcFinishStage {transform:scale(1.035);}
.designCreationPage #dc-materials .dcFinishButton:hover .dcFinishOn,
.designCreationPage #dc-materials .dcFinishButton:focus-visible .dcFinishOn {opacity:1;}
.designCreationPage #dc-materials .dcFinishCard figcaption {
  margin:20px 0 0;text-align:center;font:400 11px/1.6 Arial,sans-serif;
  text-transform:uppercase;letter-spacing:.2em;color:#6f685f;
}
@media (min-width:721px) and (max-width:1050px) {
  .designCreationPage #dc-materials .dcMaterialsLayout {grid-template-columns:minmax(0,1.03fr) minmax(0,1.97fr);gap:36px;}
  .designCreationPage #dc-materials .dcMaterialsCopy .dcSectionDescription {font-size:15px;line-height:1.65;}
  .designCreationPage #dc-materials .dcFinishGrid {gap:9px;}
  .designCreationPage #dc-materials .dcFinishStage {height:clamp(115px,16.6vw,170px);}
}
@media (max-width:720px) {
  .designCreationPage #dc-materials .dcMaterialsLayout {grid-template-columns:1fr;gap:35px;}
  .designCreationPage #dc-materials .dcMaterialsCopy .dcSectionDescription {font-size:17px;line-height:1.82;}
  .designCreationPage #dc-materials .dcFinishGrid {
    grid-template-columns:repeat(4,minmax(125px,1fr));
    gap:14px;overflow-x:auto;overflow-y:visible;padding:4px 4px 12px;
    scroll-snap-type:x proximity;
  }
  .designCreationPage #dc-materials .dcFinishCard {scroll-snap-align:start;}
  .designCreationPage #dc-materials .dcFinishStage {height:193px;}
  .designCreationPage #dc-materials .dcFinishCard figcaption {font-size:10px;letter-spacing:.15em;}
}
@media (prefers-reduced-motion:reduce) {
  .designCreationPage #dc-materials .dcFinishStage,
  .designCreationPage #dc-materials .dcFinishStage img {transition:none;}
}


/* 06 / 06 INTERIOR PLACEMENT — centred heading, untouched images.
   This isolated block overrides only the final content section. */
.designCreationPage #dc-interiors .dcInteriorsGallery {
  width:80%;
  margin-left:auto;
  margin-right:auto;
}

.designCreationPage #dc-interiors .dcInteriorsIntro {
  max-width:780px; margin:0 auto 58px; text-align:center;
}
.designCreationPage #dc-interiors .dcInteriorsIntro .dcSectionIndex {margin-bottom:21px;}
.designCreationPage #dc-interiors .dcInteriorsIntro .dcSectionTitle {margin:0;}
.designCreationPage #dc-interiors .dcInteriorsIntro .dcGoldRule {margin:22px auto 24px;}
.designCreationPage #dc-interiors .dcInteriorsLead {
  font:300 clamp(18px,1.45vw,23px)/1.4 'Cormorant Garamond',Georgia,serif;
  color:#6C6258; letter-spacing:.04em; margin:0 0 16px;
}
.designCreationPage #dc-interiors .dcInteriorsIntro .dcSectionDescription {
  max-width:660px; margin:0 auto;
  font:300 17px/1.82 'Times New Roman',Georgia,serif;
}
.designCreationPage #dc-interiors .dcInteriorsFirstRow {
  display:grid;
  /* Column ratio equals both photos' intrinsic width / height ratios,
     so their displayed top and bottom edges line up exactly. */
  grid-template-columns:minmax(0,0.87896996fr) minmax(0,1.399180fr);
  gap:clamp(14px,1.8vw,24px);
  align-items:start;
}
.designCreationPage #dc-interiors .dcInteriorsFirstRow > figure {min-width:0;margin:0;}
.designCreationPage #dc-interiors .dcInteriorLeftFrame {
  display:block;
  width:100%;
  aspect-ratio:1024 / 1165;
}
.designCreationPage #dc-interiors .dcInteriorLeftFrame > img {
  display:block;
  width:100%;
  height:100%;
  object-fit:contain;
  object-position:center;
}
.designCreationPage #dc-interiors .dcInteriorImageButton {
  display:block; padding:0; width:100%;
  border:0; background:transparent; cursor:pointer;
}
.designCreationPage #dc-interiors .dcInteriorImageButton img {
  display:block; width:100%; height:auto; object-fit:contain;
  transition:transform .35s ease;
}
.designCreationPage #dc-interiors .dcInteriorImageButton:hover img {transform:scale(1.012);}
.designCreationPage #dc-interiors .dcInteriorLightPair {
  display:block; position:relative; width:100%; aspect-ratio:2047 / 1463;
}
.designCreationPage #dc-interiors .dcInteriorLightPair img {
  position:absolute; inset:0; width:100%; height:100%;
  object-fit:contain; object-position:center;
}
.designCreationPage #dc-interiors .dcInteriorLightPair .dcInteriorOn {
  transition:opacity .35s ease-in-out;
}
.designCreationPage #dc-interiors .dcInteriorMagazine {margin:50px 0 0;}
.designCreationPage #dc-interiors .dcInteriorMagazine img {
  width:100%; height:auto; max-height:none; object-fit:contain;
}
.designCreationPage #dc-interiors .dcFigureCaption {margin-top:24px;}
@media (max-width:720px) {
  .designCreationPage #dc-interiors .dcInteriorsIntro {margin-bottom:37px;}
  .designCreationPage #dc-interiors .dcInteriorsGallery {width:100%;}
  .designCreationPage #dc-interiors .dcInteriorsFirstRow {
    grid-template-columns:1fr; gap:32px;
  }
  .designCreationPage #dc-interiors .dcInteriorMagazine {margin-top:36px;}
}
@media (prefers-reduced-motion:reduce) {
  .designCreationPage #dc-interiors .dcInteriorImageButton img,
  .designCreationPage #dc-interiors .dcInteriorLightPair .dcInteriorOn {transition:none;}
}


/* INSPIRATION / ORIGIN — editorial stage between Sketch and Drawing.
   This section presents the emotional and material source of the idea.
   Header, footer and all other approved sections remain unchanged. */
.designCreationPage #dc-colour.dcSection {
  padding: 84px 0 132px;
  border-top: none !important;
}
.designCreationPage .dcColourGrid {
  display:grid;
  grid-template-columns:minmax(0,1.47fr) minmax(0,1fr);
  gap:clamp(40px,5.2vw,82px);
  /* Bottom edge of the right-hand copy aligns with the artwork caption. */
  align-items:end;
}
.designCreationPage .dcColourArtwork {
  min-width:0;
  width:88%;                /* 12% smaller artwork */
  margin:0 0 0 12%;       /* shift the artwork toward the right */
}
.designCreationPage .dcColourImageButton {
  display:block; width:100%; padding:0; margin:0;
  border:0; background:#fff; cursor:pointer;
}
.designCreationPage .dcColourImageButton img {
  display:block; width:100%; height:auto; object-fit:contain;
  transition:transform .35s ease;
}
.designCreationPage .dcColourImageButton:hover img,
.designCreationPage .dcColourImageButton:focus-visible img { transform:scale(1.012); }
.designCreationPage .dcColourArtwork .dcFigureCaption {
  margin-top: 38px;
  text-align: left;
}
.designCreationPage .dcColourCopy {
  min-width:0;
  width:87%;                /* 13% narrower copy column */
  transform:translateX(-24px);
  text-align:left;
  align-self:end;           /* bottom of copy aligns with artwork caption */
}
.designCreationPage .dcColourCopy .dcSectionIndex { margin-bottom:23px; }
.designCreationPage .dcColourCopy .dcSectionTitle { margin:0; }
.designCreationPage .dcColourCopy .dcGoldRule { margin:20px 0 25px; }
.designCreationPage .dcColourLead {
  font:300 clamp(18px,1.45vw,23px)/1.4 'Cormorant Garamond',Georgia,serif;
  letter-spacing:.04em; color:#6C6258; margin:0 0 20px;
}
.designCreationPage .dcColourCopy .dcSectionDescription {
  margin:0; font:300 17px/1.82 'Times New Roman',Georgia,serif; color:#3F3933;
}
@media (min-width:721px) and (max-width:1050px) {
  .designCreationPage .dcColourGrid { grid-template-columns:minmax(0,1.15fr) minmax(0,1fr); gap:28px; }
  .designCreationPage .dcColourCopy .dcSectionDescription { font-size:15px; line-height:1.65; }
}
@media (max-width:720px) {
  .designCreationPage #dc-colour.dcSection { padding:70px 0 116px; }
  .designCreationPage .dcColourGrid { grid-template-columns:1fr; gap:35px; }
  .designCreationPage .dcColourCopy { grid-row:1; width:100%; transform:none; }
  .designCreationPage .dcColourArtwork { grid-row:2; width:92%; margin-left:8%; }
  .designCreationPage .dcColourArtwork .dcFigureCaption { margin-top: 34px; text-align:left; }
  .designCreationPage .dcColourCopy .dcSectionDescription { font-size:17px; line-height:1.82; }
}
@media (prefers-reduced-motion:reduce) {
  .designCreationPage .dcColourImageButton img { transition:none; }
}


/* HAND SCULPTING / PHYSICAL FORM — new stage after Drawing / Proportion.
   Scope is confined to this section; existing page geometry is unchanged. */
.designCreationPage #dc-hand-sculpting.dcSection {
  padding: 162px 0 112px;
  border-top: none !important;
}
.designCreationPage #dc-hand-sculpting .dcHandGrid {
  display: grid;
  grid-template-columns: minmax(0, 1.47fr) minmax(0, 1fr);
  gap: clamp(40px, 5.2vw, 82px);
  align-items: end;
}
.designCreationPage #dc-hand-sculpting .dcHandArtwork {
  margin: 0 0 0 12%;
  min-width: 0;
  width: 88%;
}
.designCreationPage #dc-hand-sculpting .dcHandImageButton {
  width: 100%;
  display: block;
  padding: 0;
  border: 0;
  background: #fff;
  cursor: pointer;
  position: relative;
}
.designCreationPage #dc-hand-sculpting .dcHandImageButton img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: transform .36s cubic-bezier(.22,.61,.36,1);
}
.designCreationPage #dc-hand-sculpting .dcHandImageButton:hover img,
.designCreationPage #dc-hand-sculpting .dcHandImageButton:focus-visible img {
  transform: scale(1.012);
}
.designCreationPage #dc-hand-sculpting .dcHandArtwork .dcFigureCaption {
  margin-top: 38px;
  text-align: left;
}
.designCreationPage #dc-hand-sculpting .dcHandCopy {
  min-width: 0;
  width: 87%;
  transform: translateX(-24px);
  text-align: left;
  align-self: end;
}
.designCreationPage #dc-hand-sculpting .dcHandCopy .dcSectionIndex { margin-bottom: 23px; }
.designCreationPage #dc-hand-sculpting .dcHandCopy .dcSectionTitle { margin: 0; }
.designCreationPage #dc-hand-sculpting .dcHandCopy .dcGoldRule { margin: 20px 0 25px; }
.designCreationPage #dc-hand-sculpting .dcHandLead {
  font: 300 clamp(18px,1.45vw,23px)/1.4 'Cormorant Garamond', Georgia, serif;
  letter-spacing: .04em;
  color: #6C6258;
  margin: 0 0 20px;
}
.designCreationPage #dc-hand-sculpting .dcHandCopy .dcSectionDescription {
  margin: 0;
  font: 300 17px/1.82 'Times New Roman', Georgia, serif;
  color: #3F3933;
}
@media (min-width:721px) and (max-width:1050px) {
  .designCreationPage #dc-hand-sculpting .dcHandGrid {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    gap: 28px;
  }
  .designCreationPage #dc-hand-sculpting .dcHandCopy .dcSectionDescription {
    font-size: 15px;
    line-height: 1.65;
  }
}
@media (max-width:720px) {
  .designCreationPage #dc-hand-sculpting.dcSection { padding: 132px 0 92px; }
  .designCreationPage #dc-hand-sculpting .dcHandGrid {
    grid-template-columns: 1fr;
    gap: 35px;
  }
  .designCreationPage #dc-hand-sculpting .dcHandCopy { grid-row: 1; width: 100%; transform: none; }
  .designCreationPage #dc-hand-sculpting .dcHandArtwork { grid-row: 2; width: 92%; margin-left: 8%; }
  .designCreationPage #dc-hand-sculpting .dcHandArtwork .dcFigureCaption { margin-top: 34px; }
  .designCreationPage #dc-hand-sculpting .dcHandCopy .dcSectionDescription {
    font-size: 17px;
    line-height: 1.82;
  }
}
@media (prefers-reduced-motion:reduce) {
  .designCreationPage #dc-hand-sculpting .dcHandImageButton img { transition: none; }
}

/* No divider between Hand Sculpting and Material Expressions.
   The global section divider remains untouched everywhere else. */
.designCreationPage #dc-hand-sculpting + #dc-materials { border-top: none !important; }

              /* MOBILE NAVIGATION REFINEMENT — never changes desktop header/layout. */
        @media (max-width: 720px) {
          .designCreationPage .hamburger {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 12px;
            right: 12px;
            width: 56px;
            height: 52px;
            margin: 0;
            border: 0;
            background: transparent;
            z-index: 1300;
            -webkit-tap-highlight-color: transparent;
          }
          .designCreationPage .hamburger span {
            position: absolute;
            display: block;
            width: 38px;
            height: 1.5px;
            margin: 0;
            background: #1d1b18;
            left: 9px;
            top: 25px;
            transform-origin: center;
            transition: transform 480ms cubic-bezier(.22,.61,.36,1),
                        opacity 260ms ease, background-color 340ms ease;
          }
          .designCreationPage .hamburger span:nth-child(1) { transform: translateY(-11px); }
          .designCreationPage .hamburger span:nth-child(2) { transform: translateY(-3.7px); }
          .designCreationPage .hamburger span:nth-child(3) { transform: translateY(3.7px); }
          .designCreationPage .hamburger span:nth-child(4) { transform: translateY(11px); }
          .designCreationPage .hamburger.isOpen span { background: #e1dbcf; }
          .designCreationPage .hamburger.isOpen span:nth-child(1) { transform: rotate(45deg); }
          .designCreationPage .hamburger.isOpen span:nth-child(2) { transform: scaleX(.55); opacity: 0; }
          .designCreationPage .hamburger.isOpen span:nth-child(3) { transform: scaleX(.55); opacity: 0; }
          .designCreationPage .hamburger.isOpen span:nth-child(4) { transform: rotate(-45deg); }
          .designCreationPage .hamburger:focus-visible {
            outline: 1px solid #9C8664;
            outline-offset: 1px;
          }
          .designCreationPage .mobileOverlay { z-index: 1100; }
          .designCreationPage .mobilePanel {
            z-index: 1200;
            height: 100vh;
            height: 100dvh;
            padding: 92px 34px max(30px, env(safe-area-inset-bottom));
            overflow-y: auto;
            overscroll-behavior: contain;
            -webkit-overflow-scrolling: touch;
            transition: transform 480ms cubic-bezier(.22,.61,.36,1);
            visibility: hidden;
            transition: transform 480ms cubic-bezier(.22,.61,.36,1), visibility 480ms;
          }
          .designCreationPage .mobilePanel.open { visibility: visible; }
          .designCreationPage .mobileMenuItem {
            display: block;
            width: 100%;
            text-align: left;
            border: 0;
            background: transparent;
            padding: 0;
            margin: 0 0 31px;
            font-family: "Times New Roman", Georgia, serif;
            font-size: clamp(20px, 5.5vw, 30px);
            font-weight: 400;
            color: #d4cec2;
            line-height: 1.22;
            letter-spacing: .04em;
            cursor: pointer;
          }
          .designCreationPage .mobileMenuItem:hover,
          .designCreationPage .mobileMenuItem:focus-visible { color: #c9b38c; }
          .designCreationPage .mobileMenuItem.isContact { color: #c9b38c; }
          .designCreationPage .mobileMenuItem:focus-visible,
          .designCreationPage .mobileSubmenuLink:focus-visible {
            outline: 1px solid #c9b38c;
            outline-offset: 4px;
          }
          /* Slow editorial accordion: always mounted, smoothly animates its height. */
          .designCreationPage .mobileMenuItem.hasSubmenu {
            position: relative;
            padding-right: 20px;
          }
          .designCreationPage .mobileMenuItem.hasSubmenu::after {
            content: "";
            position: absolute;
            right: 3px;
            top: 8px;
            width: 8px;
            height: 8px;
            border-right: 1px solid #c9b38c;
            border-bottom: 1px solid #c9b38c;
            transform: rotate(45deg);
            transition: transform 650ms cubic-bezier(.22,.61,.36,1);
          }
          .designCreationPage .mobileMenuItem.hasSubmenu[aria-expanded="true"]::after {
            transform: translateY(4px) rotate(225deg);
          }
          .designCreationPage .mobileSubmenu {
            display: grid;
            grid-template-rows: 0fr;
            opacity: 0;
            margin: 0 0 0 18px;
            border-left: 1px solid rgba(201,179,140,.3);
            padding-left: 18px;
            transition:
              grid-template-rows 760ms cubic-bezier(.22,.61,.36,1),
              opacity 620ms ease,
              margin-top 760ms cubic-bezier(.22,.61,.36,1),
              margin-bottom 760ms cubic-bezier(.22,.61,.36,1);
          }
          .designCreationPage .mobileSubmenu.isExpanded {
            grid-template-rows: 1fr;
            opacity: 1;
            margin-top: -18px;
            margin-bottom: 29px;
          }
          .designCreationPage .mobileSubmenuInner {
            min-height: 0;
            overflow: hidden;
          }
          .designCreationPage .mobileSubmenuLink {
            opacity: 0;
            transform: translateY(-8px);
            transition: opacity 580ms ease, transform 680ms cubic-bezier(.22,.61,.36,1), color 250ms ease;
          }
          .designCreationPage .mobileSubmenu.isExpanded .mobileSubmenuLink {
            opacity: 1;
            transform: translateY(0);
          }
          .designCreationPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(2) { transition-delay: 55ms; }
          .designCreationPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(3) { transition-delay: 110ms; }
          .designCreationPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(4) { transition-delay: 165ms; }
          .designCreationPage.isMobileNavigating {
            opacity: 0;
            transition: opacity 360ms cubic-bezier(.22,.61,.36,1);
            pointer-events: none;
          }
        }
        /* The site-wide UP control belongs behind any open mobile drawer. */
        body[data-mobile-menu-open="true"] .siteBackToTop {
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .designCreationPage .hamburger span,
          .designCreationPage .mobilePanel,
          .designCreationPage .mobileSubmenu,
          .designCreationPage .mobileSubmenuLink,
          .designCreationPage .mobileMenuItem.hasSubmenu::after,
          .designCreationPage.isMobileNavigating { transition: none !important; }
        }

        /* Same approved two-line mobile brand typography as Home. */
        @media (max-width: 720px) {
          .designCreationPage .subtitle p:first-child { font-size:10px; letter-spacing:.26em; }
          .designCreationPage .subtitle p:nth-child(2) { font-size:7.4px; letter-spacing:.20em; }
        }

        /* MOBILE DRAWER ONLY — 7% wider than the original panel (3% less
           widening than the preceding 10% version). Keep the left edge of
           all menu labels fixed at their previously approved screen position. */
        @media (max-width: 720px) {
          .designCreationPage .mobilePanel {
            width: min(83.46vw, 417.3px);
            padding-left: calc(34px + min(83.46vw, 417.3px) - min(78vw, 390px));
          }
        }

        /* MOBILE ACCORDION GUIDE DOTS — match approved Contact styling.
           Dots are 4px in diameter and shifted another 1px right.
           Compensate clipping without moving menu labels. */
        @media (max-width: 720px) {
          .designCreationPage .mobileSubmenuInner {
            margin-left: -24px;
            padding-left: 24px;
          }
          .designCreationPage .mobileSubmenuLink {
            position: relative;
            width: 100%;
          }
          .designCreationPage .mobileSubmenuLink::before {
            content: "";
            position: absolute;
            top: 50%;
            left: -20.5px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #c9b38c;
            transform: translateY(-50%);
            pointer-events: none;
          }
        }

        /* Match the approved About mobile captions beneath editorial artwork. */
        @media (max-width: 720px) {
          .designCreationPage .dcFigureCaption,
          .designCreationPage .dcDrawingArtwork .dcTechnicalCaption,
          .designCreationPage .dcTechnicalCaption,
          .designCreationPage .dcFinishCard figcaption,
          .designCreationPage #dc-materials .dcFinishCard figcaption {
            font-size: 9px;
            letter-spacing: .11em;
          }
        }


        /* DESIGN & PROCESS — PHONE ARTWORK +15% ONLY.
           Scale the two graphite studies as a visual pair; enlarge the
           watercolour and physical sculpting image containers proportionally.
           Preserve captions, switch alignment, image source and desktop layout. */
        @media (max-width: 720px) {
          .designCreationPage .dcSketchTriptychArtwork .dcSketchBox img {
            transform: scale(1.15);
            transform-origin: center center;
          }
          .designCreationPage .dcSketchTriptychArtwork .dcSketchBox:hover img,
          .designCreationPage .dcSketchTriptychArtwork .dcSketchBox:focus-visible img {
            transform: scale(1.15);
          }
          .designCreationPage #dc-colour .dcColourArtwork,
          .designCreationPage #dc-hand-sculpting .dcHandArtwork {
            width: 105.8%; /* approved 92% × 1.15 */
            margin-left: -2.9%; /* centered within the same section width */
          }
        }

        /* DESIGN & PROCESS / MOBILE — graphite pair alignment and spacing.
           Treat the left and right drawings as one centered, 10% larger
           composition; keep their relative proportions and 15% artwork zoom.
           One editorial line = 22px. No changes to desktop. */
        @media (max-width: 720px) {
          .designCreationPage #dc-sketch .dcSketchTriptych {
            width: 110%;
            margin-left: -5%;
            margin-right: -5%;
            column-gap: 17px;
            row-gap: 56px; /* previous 34px + one 22px line */
          }
          .designCreationPage #dc-sketch .dcSketchTriptychCopy {
            width: 90.909091%; /* keep upper text at its approved 88vw width */
            justify-self: center;
          }
          .designCreationPage #dc-sketch .dcSketchTriptychArtwork .dcSketchBox {
            height: clamp(198px, 42.9vw, 352px); /* 10% larger drawing stages */
          }
          .designCreationPage #dc-sketch.dcSection {
            padding-bottom: 26px; /* previous 92px - three 22px lines */
          }
        }

        /* DESIGN & PROCESS / MOBILE — precise graphite alignment and shared rhythm.
           One editorial text line = 22px. The left drawing is unchanged. */
        @media (max-width: 720px) {
          /* Right graphite study only: bring it 10px closer to the left drawing.
             Move its figure and caption together; preserve artwork size. */
          .designCreationPage #dc-sketch .dcSketchTriptychFront {
            position: relative;
            left: -10px;
          }

          /* Inspiration / Origin: same +22px text-to-image gap and
             -66px section-bottom spacing as the approved Sketch section. */
          .designCreationPage #dc-colour .dcColourGrid {
            row-gap: 57px; /* 35px + 22px */
          }
          .designCreationPage #dc-colour.dcSection {
            padding-bottom: 50px; /* 116px - 66px */
          }

          /* Sculpturing / Physical Form: matching vertical spacing. */
          .designCreationPage #dc-hand-sculpting .dcHandGrid {
            row-gap: 57px; /* 35px + 22px */
          }
          .designCreationPage #dc-hand-sculpting.dcSection {
            padding-bottom: 26px; /* 92px - 66px */
          }
        }

        /* DESIGN & PROCESS / MOBILE — subtle shift of BOTH graphite studies.
           Preserve the previously approved 10px extra offset of the right study.
           Move figure and its caption together; desktop remains unchanged. */
        @media (max-width: 720px) {
          .designCreationPage #dc-sketch .dcSketchTriptychSide {
            position: relative;
            left: -8px;
          }
          .designCreationPage #dc-sketch .dcSketchTriptychFront {
            left: -18px; /* approved -10px, plus the shared -8px move */
          }

          /* Material Expressions — show Black, Gold, Platinum and White
             together without sideways scrolling on phone screens. */
          .designCreationPage #dc-materials .dcFinishGrid {
            width: 100%;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            column-gap: 6px;
            row-gap: 8px;
            overflow-x: visible;
            overflow-y: visible;
            scroll-snap-type: none;
            padding: 4px 0 12px;
          }
          .designCreationPage #dc-materials .dcFinishCard {
            min-width: 0;
            scroll-snap-align: none;
          }
          .designCreationPage #dc-materials .dcFinishStage {
            height: clamp(92px, 30vw, 132px);
          }
          .designCreationPage #dc-materials .dcFinishCard figcaption {
            margin-top: 10px;
          }
        }

        /* MOBILE ONLY — November 20 refinements: hero-to-sketch gap,
           graphite captions and four visible material studies. */
        @media (max-width: 720px) {
          /* One editorial line (22px) less below the switch / hero. */
          .designCreationPage .dcHero {
            margin-bottom: 82px; /* previous 104px */
          }

          /* Move both graphite caption labels gently right, without moving art. */
          .designCreationPage #dc-sketch .dcSketchTriptychSide .dcFigureCaption,
          .designCreationPage #dc-sketch .dcSketchTriptychFront .dcFigureCaption {
            position: relative;
            left: 12px;
          }

          /* Enlarge each material image by 10%, without widening the grid,
             keeping four columns fully visible and without scrolling. */
          .designCreationPage #dc-materials .dcFinishStage {
            height: clamp(101.2px, 33vw, 145.2px);
          }
          .designCreationPage #dc-materials .dcFinishStage img {
            transform: scale(1.1);
            transform-origin: center center;
          }
        }

        /* MOBILE / approved fine sizing — only hand sculpture and four finishes.
           Preserve the existing four-column grid and all interactions. */
        @media (max-width: 720px) {
          /* 92% × 0.9 = 82.8%. Keep the image centered at its prior x-position. */
          .designCreationPage #dc-hand-sculpting .dcHandArtwork {
            width: 82.8%;
            margin-left: 12.6%;
          }
          /* 1.10 × 1.05 = 1.155: exactly +5% relative to current scale. */
          .designCreationPage #dc-materials .dcFinishStage img {
            transform: scale(1.155);
          }
        }

        /* MOBILE: keep the sculptural photograph centered, 5% larger than current. */
        @media (max-width: 720px) {
          .designCreationPage #dc-hand-sculpting .dcHandArtwork {
            width: 86.94%; /* 82.8% × 1.05 */
            margin-left: 10.53%;
          }

          /* Intentional tap sequence, not the nearly imperceptible hover effect.
             0–230 ms: zoom to 120%, 230–500 ms: illuminate and briefly hold. */
          .designCreationPage #dc-materials .dcFinishStage {
            transition: transform 230ms cubic-bezier(.2,.75,.25,1);
            transform-origin: center center;
          }
          .designCreationPage #dc-materials .dcFinishButton.isFinishAnimating .dcFinishStage {
            transform: scale(1.20);
            z-index: 3;
          }
          .designCreationPage #dc-materials .dcFinishButton .dcFinishOn {
            transition: opacity 200ms ease-in-out;
          }
          .designCreationPage #dc-materials .dcFinishButton.isFinishLit .dcFinishOn {
            opacity: 1;
          }
          .designCreationPage #dc-materials .dcFinishGrid {
            isolation: isolate;
          }
          .designCreationPage #dc-materials .dcFinishCard {
            position: relative;
          }
          .designCreationPage #dc-materials .dcFinishCard:has(.isFinishAnimating) {
            z-index: 4;
          }
          /* Touch devices must not pre-illuminate a lamp simply through sticky hover. */
        }
        /* Mobile finishing gallery: allow the entire enlarged lamp to extend
           outside its tile, as in the originally approved interaction.
           More breathing room between four columns reduces overlap; the
           Photoshop-cropped phone image pairs remove unused side margins. */
        @media (max-width:720px) {
          .designCreationPage #dc-materials .dcFinishGrid {
            column-gap: 20px; /* more breathing room while retaining four columns */
            overflow: visible;
          }
          .designCreationPage #dc-materials .dcFinishCard,
          .designCreationPage #dc-materials .dcFinishButton,
          .designCreationPage #dc-materials .dcFinishStage {
            overflow: visible;
          }
          .designCreationPage #dc-materials .dcFinishStage {
            will-change: transform;
          }
        }
        /* Remove the native blue touch-flash on mobile interactions.
           Keep :focus-visible outlines for keyboard accessibility. */
        @media (max-width:720px) {
          .designCreationPage,
          .designCreationPage a,
          .designCreationPage button,
          .designCreationPage input,
          .designCreationPage select,
          .designCreationPage textarea,
          .designCreationPage summary,
          .designCreationPage [role="button"] {
            -webkit-tap-highlight-color: transparent;
          }
        }
        @media (max-width:720px) and (hover:none) {
          .designCreationPage #dc-materials .dcFinishButton:hover .dcFinishOn,
          .designCreationPage #dc-materials .dcFinishButton:focus-visible .dcFinishOn {
            opacity: 0;
          }
          .designCreationPage #dc-materials .dcFinishButton.isFinishLit .dcFinishOn {
            opacity: 1;
          }
        }
        @media (max-width:720px) {
          /* Softer grey gallery presentation; other lightboxes retain their style. */
          .designCreationPage .dcModal.isMaterialPreview {
            background: rgba(92, 91, 90, .94);
          }
        }
        @media (prefers-reduced-motion:reduce) {
          .designCreationPage #dc-materials .dcFinishStage,
          .designCreationPage #dc-materials .dcFinishOn {
            transition: none;
          }
        }


        /* MOBILE ONLY — editorial modal for all ordinary images.
           Fit landscape and portrait photos inside a consistently inset
           viewport, independent of the size of their thumbnail.
           Keep the previously approved desktop modal untouched. */
        @media (max-width: 720px) {
          .designCreationPage .dcModal:not(.isMaterialPreview) {
            padding: 48px 22px;
          }
          .designCreationPage .dcModal:not(.isMaterialPreview) .dcModalImage {
            width: calc(100vw - 44px) !important;
            height: calc(100dvh - 112px) !important;
            max-width: calc(100vw - 44px);
            max-height: calc(100dvh - 112px);
            object-fit: contain;
            background: transparent;
            box-shadow: none;
          }
          /* Finishing / material previews use a separate modal layout.
             Keep their approved sizing, but enforce the same 22px side minimum. */
          .designCreationPage .dcModal.isMaterialPreview {
            padding-left: 22px;
            padding-right: 22px;
          }
          .designCreationPage .dcModal.isMaterialPreview .dcModalImage {
            max-width: calc(100vw - 44px) !important;
          }
          /* Last approved sculpture width 86.94%; increase by 5%,
             moving the artwork's centre 2% to the left. */
          .designCreationPage #dc-hand-sculpting .dcHandArtwork {
            width: 91.287%;
            margin-left: 6.36%;
          }
        }

        /* Consistent approved Sculpture submenu selection feedback on phones. */
        @media (max-width: 720px) {
          .designCreationPage .mobileSubmenu.isExpanded .mobileSubmenuLink.isSelected {
            color: #fff;
            transform: translateY(0) scale(1.055);
            transform-origin: left center;
            transition: color 140ms ease, transform 140ms ease;
          }
          .designCreationPage .mobileSubmenuLink.isSelected::before {
            width: 6px;
            height: 6px;
            background: #fff;
            transform: translate(-1px, -50%);
          }
          .designCreationPage.isMobileNavigating.hasSubmenuSelection {
            transition-duration: 200ms;
          }
        }
`}</style>

      {/* =======================================================
          HEADER
      ======================================================= */}

      <div className="container">

        <header className="header">

          <div
            className="homeLink"
            ref={brandLockupRef}
            onClick={() => navigate("/")}
          >

            <img
              src="/ja-logo-gold.png"
              alt="JA logo"
              className="logo"
            />

            <div className="divider"></div>

            <div className="brandText" ref={brandTextRef}>

              <h1 className="name">
                ANDREI JILIAEV
              </h1>

              <div className="subtitle">
                <p>Multidisciplinary Designer</p>
                <p>Sculpture · Retail Design · Objects · Jewellery</p>
              </div>

            </div>

          </div>

          <nav className="desktopNav" aria-label="Main navigation" onMouseLeave={() => setDesktopDropdown(null)}>
            <div className={`navItem ${desktopDropdown === "work" ? "navOpen" : ""}`} onMouseEnter={() => setDesktopDropdown("work")}>
              <span className={`navText ${activePath === "/work" ? "isCurrent" : ""}`} role="button" tabIndex={0} aria-haspopup="true"
                aria-expanded={desktopDropdown === "work"}
                onClick={() => go("/work")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") {e.preventDefault();go("/work");} }}
              >Selected Work</span>
              <div className="navDropdownPanel"><div className="navDropdownInner">
                {selectedWorkLinks.map((item) => <button key={item.path} type="button" className="navDropdownLink" onClick={() => go(item.path)}>{item.label}</button>)}
              </div></div>
            </div>
            <div className={`navItem ${desktopDropdown === "jewellery" ? "navOpen" : ""}`} onMouseEnter={() => setDesktopDropdown("jewellery")}>
              <span className={`navText ${activePath === "/jewellery-design" ? "isCurrent" : ""}`} role="button" tabIndex={0} aria-haspopup="true"
                aria-expanded={desktopDropdown === "jewellery"}
                onClick={() => go("/jewellery-design")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") {e.preventDefault();go("/jewellery-design");} }}
              >Jewellery Design</span>
              <div className="navDropdownPanel"><div className="navDropdownInner">
                {jewelleryLinks.map((item) => <button key={item.path} type="button" className="navDropdownLink" onClick={() => go(item.path)}>{item.label}</button>)}
              </div></div>
            </div>
            <span className={activePath === "/about" ? "navCurrent" : ""} role="link" tabIndex={0} onClick={() => go("/about")} onKeyDown={(e) => e.key === "Enter" && go("/about")}>About</span>
            <span className={activePath === "/contact" ? "navCurrent" : ""} role="link" tabIndex={0} onClick={() => go("/contact")} onKeyDown={(e) => e.key === "Enter" && go("/contact")}>Contact</span>
          </nav>

        </header>

      </div>

      {/* =======================================================
          DESIGN & CREATION CONTENT — new; existing site chrome unchanged
      ======================================================= */}
      <div className="dcContent">
        <section className="dcHero" aria-label="Design and Creation" ref={heroRef}>
          <div className="dcHeroIntro">
            <p className="dcEyebrow dcHeroEyebrow">Selected Work / Process</p>
            <span className="dcGoldRule" aria-hidden="true" />
            <h1 className="dcHeroTitle">Design &amp;<br />Creation</h1>
            <p className="dcHeroLead">From the first line to sculptural light.</p>
            <p className="dcHeroCopy">
              A study in form, proportion, and material — where a hand-drawn idea
              becomes a sculptural object, shaped by light and its surroundings.
            </p>
            <button className="dcTextLink" type="button" onClick={() => document.getElementById('dc-sketch')?.scrollIntoView({behavior:'smooth'})}>
              View the process &nbsp; →
            </button>
          </div>
          <div className="dcHeroArt" ref={heroArtRef} aria-label="Interactive golden sculptural lips lamp">
            {/* Both images retain their exact approved geometry. Only opacity changes. */}
            <button className="dcHeroImageButton" type="button" onClick={toggleHeroLight}
              aria-label={lightIsOn ? 'Turn off the sculptural lips light' : 'Turn on the sculptural lips light'}
              aria-pressed={lightIsOn}>
              <img className="dcHeroOff" src="/design-creation-hero-off.jpg" alt="Golden sculptural lips wall luminaire" draggable="false" fetchPriority="high" />
              <img className="dcHeroOn" src="/design-creation-hero-on.jpg" alt="" aria-hidden="true" draggable="false" style={{ opacity: displayedLight }} />
            </button>
            <button className="dcHeroLabel" type="button" onClick={toggleHeroLight}
              aria-label={lightIsOn ? 'LIGHT ON — click to turn off' : 'LIGHT OFF — click to turn on'}
              aria-pressed={lightIsOn}>
              {lightIsOn ? 'LIGHT / ON' : 'LIGHT / OFF'}
            </button>
          </div>
          <div className="dcArc" aria-hidden="true" />
          {/* Tonal glow remains in place; thin Bézier stroke is raised 2px relative to its original position. */}
          <svg className="dcArcGlow" viewBox="0 0 1000 280" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="dcGlowSideFade" x1="0" y1="0" x2="100%" y2="0%">
                <stop offset="0%" stopColor="black" />
                <stop offset="18%" stopColor="white" />
                <stop offset="50%" stopColor="white" />
                <stop offset="82%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </linearGradient>
              <mask id="dcGlowSides"><rect x="0" y="0" width="1000" height="280" fill="url(#dcGlowSideFade)" /></mask>
            </defs>
            <g mask="url(#dcGlowSides)" fill="none" stroke="#BFA580" strokeWidth="4.2">
              {Array.from({ length: 44 }, (_, i) => {
                const d = 2 + i * 3.45;
                const alpha = 0.09 * Math.pow(1 - i / 44, 2.25);
                const edgeInset = i * 1.15;
                const c1x = 145 + i * 0.55;
                const c2x = 292 + i * 0.25;
                return <path
                  key={i}
                  d={`M ${edgeInset} ${d} C ${c1x} ${d} ${c2x} ${d + 128} 500 ${d + 128} C ${1000 - c2x} ${d + 128} ${1000 - c1x} ${d} ${1000 - edgeInset} ${d}`}
                  strokeOpacity={alpha}
                />;
              })}
            </g>
            {/* Identical Bézier shape; only this single stroke is shifted upward by 2 CSS pixels. */}
            <path
              d="M 0 2 C 145 2 292 130 500 130 C 708 130 855 2 1000 2"
              fill="none"
              stroke="rgba(156,134,100,0.19)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transform: 'translateY(-2px)' }}
            />
          </svg>
          <button className={`dcScrollAction${lightIsOn ? ' isLightOn' : ' isLightOff'}${manualLight !== null ? ' isManual' : ''}`} type="button"
            aria-label={lightIsOn ? 'Turn off the sculptural light' : 'Illuminate the sculptural light'}
            aria-pressed={lightIsOn}
            onClick={toggleHeroLight}>
            <span className="dcScrollActionText">Scroll to Explore</span>
            <span className="dcScrollPill" aria-hidden="true" />
          </button>
        </section>

        <section className="dcSection dcContainer" id="dc-sketch">
          <div className="dcSketchTriptych">
            <figure className="dcSketchTriptychArtwork dcSketchTriptychSide">
              <button className="dcSketchBox" type="button" onClick={(e) => showImage(e,'/design-creation-sketch-side.jpg','Side study in graphite')}>
                <img src="/design-creation-sketch-side.jpg" alt="Graphite study of the wall-mounted lamp in profile" loading="lazy" />
              </button>
              <figcaption className="dcFigureCaption">Profile / early exploration</figcaption>
            </figure>
            <div className="dcSketchTriptychCopy">
              <p className="dcSectionIndex">01 / 06</p>
              <h2 className="dcSectionTitle">Sketch /<br />Concept</h2>
              <span className="dcGoldRule" aria-hidden="true" />
              <p className="dcSketchTriptychLead">Ideas before form.</p>
              <p className="dcSectionDescription">
                I begin by exploring ideas, purpose, and possibilities — considering
                the audience, market appeal, and the character of the object.
                This early brainstorming defines a creative direction before
                proportions and technical drawings take shape.
              </p>
            </div>
            <figure className="dcSketchTriptychArtwork dcSketchTriptychFront">
              <button className="dcSketchBox" type="button" onClick={(e) => showImage(e,'/design-creation-sketch-front.jpg','Front and object studies in graphite')}>
                <img src="/design-creation-sketch-front.jpg" alt="Graphite drawing: front elevation and sculptural lips lamp study" loading="lazy" />
              </button>
              <figcaption className="dcFigureCaption">Form / first impressions</figcaption>
            </figure>
          </div>
        </section>


        {/* INSPIRATION / ORIGIN — the emotional and material source of the idea */}
        <section className="dcSection dcContainer" id="dc-colour">
          <div className="dcColourGrid">
            <figure className="dcColourArtwork">
              <button className="dcColourImageButton" type="button"
                aria-label="View inspirational watercolour studies for the sculptural lips concept"
                onClick={(e) => showImage(e, '/Design-production-lips-watercolor.jpg', 'Inspirational watercolour studies for the sculptural lips concept')}>
                <img src="/Design-production-lips-watercolor.jpg"
                  alt="Three soft peach, rose and gold watercolour studies exploring lips, feminine texture and luminous sphere forms"
                  loading="lazy" />
              </button>
              <figcaption className="dcFigureCaption">Inspiration / texture, warmth and femininity</figcaption>
            </figure>
            <div className="dcColourCopy">
              <p className="dcSectionIndex">02 / 06</p>
              <h2 className="dcSectionTitle">Inspiration /<br />Origin</h2>
              <span className="dcGoldRule" aria-hidden="true" />
              <p className="dcColourLead">Where the idea first begins.</p>
              <p className="dcSectionDescription">
                My inspiration begins with emotion, texture and unexpected forms.
                The lips embody warmth, sensuality and feminine beauty — their generous curves and delicate surfaces suggest a sculptural language of their own.
              </p>
              <p className="dcSectionDescription" style={{ marginTop: '18px' }}>
                I transform these qualities into objects while preserving their emotional appeal.
                This interplay of softness, fullness and form reflects my personal approach to expressive design.
              </p>
            </div>
          </div>
        </section>

        <section className="dcSection dcTonalSection" id="dc-drawing">
          <div className="dcContainer dcDrawingGrid">
            <div className="dcDrawingCopy">
              <p className="dcSectionIndex">03 / 06</p>
              <h2 className="dcSectionTitle">Drawing /<br />Proportion</h2>
              <span className="dcGoldRule" aria-hidden="true" />
              <p className="dcDrawingLead">From idea to working drawing.</p>
              <p className="dcSectionDescription">
                After exploring different concepts, I select one direction
                and develop it into a working drawing. It becomes my guide
                for the next stage — whether I refine the design through
                CAD/CAM or translate it directly into sculpture.
              </p>
            </div>
            <figure className="dcDrawingArtwork">
              <div className="dcTechnicalFrame">
                <button className="dcTechnicalButton" type="button" onClick={(e) => showImage(e, '/design-creation-technical-study.jpg', 'Gold Lips wall sconce — front and side elevation study')}>
                  <img src="/design-creation-technical-study.jpg" alt="Gold Lips wall sconce conceptual sheet with front and right side elevations and approximate dimensions" loading="lazy" />
                </button>
              </div>
              <figcaption className="dcTechnicalCaption">
                <span>Front / Right-side elevations</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* HAND SCULPTING / PHYSICAL FORM — manual sculpture before further refinement */}
        <section className="dcSection dcContainer" id="dc-hand-sculpting">
          <div className="dcHandGrid">
            <figure className="dcHandArtwork">
              <button
                className="dcHandImageButton"
                type="button"
                aria-label="View the hand-sculpting and physical model development process"
                onClick={(e) => showImage(e, '/design-process-hand-sculpting.jpg', 'Hand sculpting — developing the physical form')}
              >
                {/* Add the supplied studio photograph to public/ using this filename. */}
                <img
                  src="/design-process-hand-sculpting.jpg"
                  alt="Hands shaping a sculptural study during the physical modelling process"
                  loading="lazy"
                />
              </button>
              <figcaption className="dcFigureCaption">Hand sculpting / development of form</figcaption>
            </figure>
            <div className="dcHandCopy">
              <p className="dcSectionIndex">04 / 06</p>
              <h2 className="dcSectionTitle">Sculpturing /<br />Physical Form</h2>
              <span className="dcGoldRule" aria-hidden="true" />
              <p className="dcHandLead">From drawing to tangible form.</p>
              <p className="dcSectionDescription">
                Depending on the project, particularly when working with larger sculptural
                forms, I begin by shaping the piece by hand to establish its volume,
                proportions and character. The physical model can then be digitised
                and refined through CAD/CAM, where technical details and precision
                are brought to their final level.
              </p>
            </div>
          </div>
        </section>

        <section className="dcSection dcContainer" id="dc-materials">
          <div className="dcMaterialsLayout">
            <div className="dcMaterialsCopy">
              <p className="dcSectionIndex">05 / 06</p>
              <h2 className="dcSectionTitle">Material<br />Expressions</h2>
              <span className="dcGoldRule" aria-hidden="true" />
              <p className="dcMaterialsLead">One form. Four expressions.</p>
              <p className="dcSectionDescription">
                I explore how material and finish transform the character
                of a sculptural object. Black, gold, platinum and white each
                respond differently to light, bringing a distinct atmosphere
                to the same design.
              </p>
            </div>
            <div className="dcFinishGrid" aria-label="Four lighting finishes — hover to illuminate">
              {[
                { off:'/design-creation-finish-black.jpg', on:'/design-creation-finish-black-lighted.jpg', mobileOff:'/design-creation-finish-black-mobile-crop.jpg', mobileOn:'/design-creation-finish-black-lighted-mobile-crop.jpg', options:'/design-creation-options-black.jpg', name:'Black' },
                { off:'/design-creation-finish-gold.jpg', on:'/design-creation-finish-gold-lighted.jpg', mobileOff:'/design-creation-finish-gold-mobile-crop.jpg', mobileOn:'/design-creation-finish-gold-lighted-mobile-crop.jpg', options:'/design-creation-options-gold.jpg', name:'Gold' },
                { off:'/design-creation-finish-platinum.jpg', on:'/design-creation-finish-platinum-lighted.jpg', mobileOff:'/design-creation-finish-platinum-mobile-crop.jpg', mobileOn:'/design-creation-finish-platinum-lighted-mobile-crop.jpg', options:'/design-creation-options-platinum.jpg', name:'Platinum' },
                { off:'/design-creation-finish-white.jpg', on:'/design-creation-finish-white-lighted.jpg', mobileOff:'/design-creation-finish-white-mobile-crop.jpg', mobileOn:'/design-creation-finish-white-lighted-mobile-crop.jpg', options:'/design-creation-options-white.jpg', name:'White' }
              ].map((item) => (
                <figure className="dcFinishCard" key={item.off}>
                  <button
                    className={`dcFinishButton${activeFinish === item.name ? " isFinishAnimating" : ""}${activeFinish === item.name && finishPhase !== "zoom" ? " isFinishLit" : ""}`}
                    type="button"
                    aria-label={`${item.name} finish — tap to illuminate and view design options`}
                    onClick={(e) => presentFinish(e, item)}
                  >
                    <span className="dcFinishStage">
                      {/* New Photoshop-cropped sources are used ONLY on phones.
                          Original images remain unchanged on desktop. */}
                      <picture>
                        <source media="(max-width: 720px)" srcSet={item.mobileOff} />
                        <img className="dcFinishOff" src={item.off} alt={`${item.name} wall sconce, light off`} loading="lazy" draggable="false" />
                      </picture>
                      <picture>
                        <source media="(max-width: 720px)" srcSet={item.mobileOn} />
                        <img className="dcFinishOn" src={item.on} alt="" aria-hidden="true" loading="lazy" draggable="false" />
                      </picture>
                    </span>
                  </button>
                  <figcaption>{item.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="dcSection dcTonalSection" id="dc-interiors">
          <div className="dcContainer">
            <div className="dcInteriorsIntro">
              <p className="dcSectionIndex">06 / 06</p>
              <h2 className="dcSectionTitle">Interior Placement /<br />Atmosphere</h2>
              <span className="dcGoldRule" aria-hidden="true" />
              <p className="dcInteriorsLead">From object to experience.</p>
              <p className="dcSectionDescription">
                The final design is considered in the space it inhabits.
                Sculptural form, material, and light shape an atmosphere
                that connects the object with its surroundings.
                Beyond its physical presence, the final concept can be extended
                into editorial imagery, marketing presentations and digital
                experiences — creating a cohesive visual identity from the
                object to its presentation.
              </p>
            </div>
            <div className="dcInteriorsGallery">
            <div className="dcInteriorsFirstRow">
              <figure className="dcPhotoFigure">
                <button className="dcInteriorImageButton" type="button"
                  onClick={(e) => showImage(e, '/design-creation-interior-white.jpg', 'White sculptural wall lights in a refined interior')}>
                  <span className="dcInteriorLeftFrame">
                    <img src="/design-creation-interior-white.jpg"
                      alt="White sculptural wall lamps arranged in a softly illuminated interior"
                      loading="lazy" />
                  </span>
                </button>
                <figcaption className="dcFigureCaption">Sculptural lighting in space</figcaption>
              </figure>
              <figure className="dcPhotoFigure">
                <button className="dcInteriorImageButton" type="button"
                  onMouseEnter={() => { if (window.matchMedia('(hover: hover)').matches) setInteriorHovered(true); }}
                  onMouseLeave={() => { if (window.matchMedia('(hover: hover)').matches) { setInteriorHovered(false); setInteriorLight(false); } }}
                  onPointerDown={(e) => { if (e.pointerType === 'touch') setInteriorHovered(true); }}
                  onPointerUp={(e) => { if (e.pointerType === 'touch') { setInteriorHovered(false); setInteriorLight(false); } }}
                  onPointerCancel={(e) => { if (e.pointerType === 'touch') { setInteriorHovered(false); setInteriorLight(false); } }}
                  onFocus={() => { if (window.matchMedia('(hover: hover)').matches) setInteriorHovered(true); }}
                  onBlur={() => { setInteriorHovered(false); setInteriorLight(false); }}
                  onClick={(e) => showImage(e,
                    interiorDisplayedLight ? '/design-creation-interior-gold-on.jpg' : '/design-creation-interior-gold-off.jpg',
                    'Gold wall sconce in an architectural setting')}>
                  <span className="dcInteriorLightPair">
                    <img src="/design-creation-interior-gold-off.jpg"
                      alt="Gold wall sconce with its lamp switched off"
                      loading="lazy" />
                    <img className="dcInteriorOn"
                      src="/design-creation-interior-gold-on.jpg"
                      alt="" aria-hidden="true"
                      loading="lazy"
                      style={{opacity: interiorDisplayedLight ? 1 : 0}} />
                  </span>
                </button>
                <figcaption className="dcFigureCaption">Sculpture illuminated by light</figcaption>
              </figure>
            </div>
            <figure className="dcPhotoFigure dcInteriorMagazine">
              <button className="dcInteriorImageButton" type="button"
                onClick={(e) => showImage(e, '/design-creation-editorial.jpg', 'Interior editorial presentation')}>
                <img src="/design-creation-editorial.jpg"
                  alt="Editorial-style interior presentation with sculptural lamps"
                  loading="lazy" />
              </button>
              <figcaption className="dcFigureCaption">The sculptural home / Editorial concept</figcaption>
            </figure>
            </div>
          </div>
        </section>
        <section className="dcCta">
          <h2>From object to experience.</h2>
          <p>Selected works in sculpture, spatial design, objects and material-led design.</p>
          <button className="dcCtaButton" type="button" onClick={() => go('/work')}>Explore more works &nbsp; →</button>
        </section>
      </div>

      {lightbox && (
        <div className={`dcModal${lightboxVisible ? " isVisible" : ""}${lightbox.materialPreview ? " isMaterialPreview" : ""}`}
          role="dialog" aria-modal="true" aria-label={lightbox.alt}
          onClick={closeLightbox}
          onTransitionEnd={(event) => {
            if (event.target === event.currentTarget && event.propertyName === "opacity" && !lightboxVisible) {
              setLightbox(null);
            }
          }}>
          <button className="dcModalClose" type="button" aria-label="Close image" onClick={(event) => { event.stopPropagation(); closeLightbox(); }}>×</button>
          <img className="dcModalImage" src={lightbox.src} alt={lightbox.alt}
            style={lightbox.largeOptions ? { width: "min(1180px, 92vw, 113.3vh)", height: "auto", maxWidth: "92vw", maxHeight: "85vh" } : { width: lightbox.width, height: lightbox.height }}
            onClick={(event) => {
              // On phones the image element fills an inset viewport, while
              // object-fit:contain leaves grey letterbox areas inside it.
              // A tap on those grey margins should dismiss the lightbox.
              if (window.matchMedia("(max-width: 720px)").matches) {
                const img = event.currentTarget;
                const rect = img.getBoundingClientRect();
                const intrinsicW = img.naturalWidth;
                const intrinsicH = img.naturalHeight;
                if (intrinsicW && intrinsicH && rect.width && rect.height) {
                  const factor = Math.min(rect.width / intrinsicW, rect.height / intrinsicH);
                  const paintedW = intrinsicW * factor;
                  const paintedH = intrinsicH * factor;
                  const left = rect.left + (rect.width - paintedW) / 2;
                  const top = rect.top + (rect.height - paintedH) / 2;
                  const x = event.clientX;
                  const y = event.clientY;
                  if (x < left || x > left + paintedW || y < top || y > top + paintedH) {
                    closeLightbox();
                    return;
                  }
                }
              }
              event.stopPropagation();
            }} />
        </div>
      )}

      {/* =======================================================
          FOOTER
      ======================================================= */}

      <footer className="footerWrap">

        <div className="footerLine"></div>

        <div className="bottomNav">

          {bottomNavItems.map((item, index) => (

            <div key={item.path} className="bottomNavItem">
              <span
                className={`bottomNavLink ${activePath === item.path ? "isActive" : ""}`}
                onClick={(event) => {
                  if (item.label === "Sculpture") {
                    event.stopPropagation();
                    window.location.assign("/sculpture");
                    return;
                  }
                  go(item.path);
                }}
              >
                {item.label}
              </span>

              {index !==
                bottomNavItems.length - 1 && (
                  <div className="navDivider"></div>
                )}

            </div>

          ))}

        </div>

        <div className="copyright">
          © ANDREI JILIAEV 2026
        </div>

      </footer>

      <button
        type="button"
        className={`hamburger${menuOpen ? " isOpen" : ""}`}
        onClick={() => {
          setMenuOpen((wasOpen) => !wasOpen);
          setMobileDropdown(null);
        }}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="design-process-mobile-navigation"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>


      {/* =======================================================

          MOBILE OVERLAY

      ======================================================= */}

      <div

        className={

          menuOpen

            ? "mobileOverlay open"

            : "mobileOverlay"

        }

        onClick={() =>

          setMenuOpen(false)

        }

      ></div>

      {/* =======================================================

          MOBILE PANEL

      ======================================================= */}

      <aside
        id="design-process-mobile-navigation"
        className={menuOpen ? "mobilePanel open" : "mobilePanel"}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <button
          type="button"
          className="mobileMenuItem hasSubmenu"
          aria-expanded={mobileDropdown === "work"}
          aria-controls="design-process-work-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "work" ? null : "work")}
        >SELECTED WORK</button>
        <div
          id="design-process-work-submenu"
          className={`mobileSubmenu${mobileDropdown === "work" ? " isExpanded" : ""}`}
          aria-hidden={mobileDropdown !== "work"}
          inert={mobileDropdown !== "work"}
        >
          <div className="mobileSubmenuInner">
            {selectedWorkLinks.map((item) => (
              <button key={item.path} type="button" className={`mobileSubmenuLink${selectedMobileSubLink === item.path ? " isSelected" : ""}`} onClick={() => closeAndNavigate(item.path, true)}>{item.label}</button>
            ))}
          </div>
        </div>

        <button type="button" className="mobileMenuItem" onClick={() => closeAndNavigate("/sculpture")}>SCULPTURE</button>

        <button
          type="button"
          className="mobileMenuItem hasSubmenu"
          aria-expanded={mobileDropdown === "jewellery"}
          aria-controls="design-process-jewellery-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "jewellery" ? null : "jewellery")}
        >JEWELLERY DESIGN</button>
        <div
          id="design-process-jewellery-submenu"
          className={`mobileSubmenu${mobileDropdown === "jewellery" ? " isExpanded" : ""}`}
          aria-hidden={mobileDropdown !== "jewellery"}
          inert={mobileDropdown !== "jewellery"}
        >
          <div className="mobileSubmenuInner">
            {jewelleryLinks.map((item) => (
              <button key={item.path} type="button" className={`mobileSubmenuLink${selectedMobileSubLink === item.path ? " isSelected" : ""}`} onClick={() => closeAndNavigate(item.path, true)}>{item.label}</button>
            ))}
          </div>
        </div>

        <button type="button" className="mobileMenuItem" onClick={() => closeAndNavigate("/design-process")}>DESIGN & PROCESS</button>
        <button type="button" className="mobileMenuItem" onClick={() => closeAndNavigate("/about")}>ABOUT</button>
        <button type="button" className="mobileMenuItem" onClick={() => closeAndNavigate("/awards")}>AWARDS</button>
        <button type="button" className="mobileMenuItem" onClick={() => closeAndNavigate("/creative-consulting")}>CREATIVE CONSULTING</button>
        <button type="button" className="mobileMenuItem isContact" onClick={() => closeAndNavigate("/contact")}>CONTACT</button>
      </aside>

    </main>
  );
}