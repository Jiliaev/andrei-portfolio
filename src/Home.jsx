import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

// Upload all eight photographs SEPARATELY to the public/ folder.

// Keep the image filenames exactly as written below; slides 7 and 8 are added last.

const slides = [

  { src: "/sephora-sculpture.jpg", alt: "Sephora sculptural retail concept" },

  { src: "/sculptural-vessels.jpg", alt: "Three sculptural decorative vessels" },

  { src: "/golden-ram.jpg", alt: "Golden Ram sculptural concept" },

  { src: "/jewelled-birds.jpg", alt: "Jewelled Birds high jewellery illustration" },

  { src: "/tidal-forms.jpg", alt: "Fish and waves contemporary sculpture" },

  { src: "/garden-within.jpg", alt: "The Garden Within sculptural drawing" },

  { src: "/equus-crown-hero.jpg", alt: "Equus Crown high jewellery ring — design views" },

  { src: "/three-rums.jpg", alt: "Three floral ram sculptures in red and gold" },

];

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

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);

  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [mobileNavigating, setMobileNavigating] = useState(false);
  const [selectedMobileSubLink, setSelectedMobileSubLink] = useState(null);
  const mobileSelectionFadeTimer = useRef(null);
  const navigationTimer = useRef(null);

  const [desktopDropdown, setDesktopDropdown] = useState(null);

  const [activeSlide, setActiveSlide] = useState(0);

  // Keep the first auto-advance snappy, then use a calm regular cadence.
  const hasAutoplayAdvanced = useRef(false);
  const preloadedSlides = useRef(new Map());

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const activePath = pathname.replace(/\/+$/, "") || "/";

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

  // Warm the next two pictures in advance: hidden <img loading="lazy">
  // elements are not guaranteed to be fetched before the fade.
  useEffect(() => {
    for (const offset of [1, 2]) {
      const src = slides[(activeSlide + offset) % slides.length].src;
      if (!preloadedSlides.current.has(src)) {
        const image = new window.Image();
        image.decoding = "async";
        image.src = src;
        preloadedSlides.current.set(src, image);
      }
    }
  }, [activeSlide]);

  useEffect(() => {
    // A stationary cursor over the hero must never freeze the carousel.
    // Pause only while the site's mobile navigation is open.
    if (menuOpen) return undefined;

    const delay = hasAutoplayAdvanced.current ? 3200 : 2500;
    const timer = window.setTimeout(() => {
      hasAutoplayAdvanced.current = true;
      setActiveSlide((previous) => (previous + 1) % slides.length);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [menuOpen, activeSlide]);

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

  const goToSlide = (index) =>

    setActiveSlide((index + slides.length) % slides.length);

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

  return (

    <main className={`homePage${mobileNavigating ? " isMobileNavigating" : ""}${selectedMobileSubLink ? " hasSubmenuSelection" : ""}`}>

      <style>{`

        @import url('https\://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');

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

        .homePage {

          width: 100%;

          min-height: 100vh;

          background: #ffffff;

          color: #1d1b18;

          font-family:

            "Times New Roman",

            Georgia,

            serif;

          overflow-x: hidden;

          display: flex;

          flex-direction: column;

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

           HERO

        ========================================================= */

        .hero {

          width: min(1220px, 84vw);

          margin:

            0 auto

            clamp(24px, 3.5vh, 48px);

          display: grid;

          grid-template-columns:

            minmax(390px, 0.96fr)

            minmax(400px, 1.04fr);

          gap:

            clamp(50px, 6vw, 110px);

          align-items: center;

          flex: 1 0 auto;

        }

        .artworkWrap {

          width: 100%;

          display: flex;

          align-items: center;

          justify-content: center;

        }

        .heroImage {

          width: auto;

          max-width: 115%;

          max-height:

            min(64vh, 645px);

          height: auto;

          display: block;

          margin: 0 auto;

        }

        .heroContent {

          width: 100%;

          max-width: 610px;

          padding-top: 4px;

        }

        .eyebrow {

          margin: 0 0 18px;

          font-family:

            Arial, sans-serif;

          font-size: 11px;

          letter-spacing: 0.38em;

          text-transform: uppercase;

          color: #9C8664;

        }

        .smallLine {

          width: 62px;

          height: 1px;

          margin-bottom:

            clamp(20px, 2.5vh, 28px);

          background: #9C8664;

          opacity: 0.55;

        }

        .heroTitle {

          margin:

            0 0

            clamp(16px, 2vh, 22px);

          font-family:

            "Cormorant Garamond",

            serif;

          font-size:

            clamp(46px, 4.05vw, 68px);

          line-height: 0.98;

          font-weight: 400;

          letter-spacing: -0.01em;

          color: #1d1b18;

        }

        .disciplineLine {

          margin:

            0 0

            clamp(36px, 5vh, 60px);

          font-family:

            "Cormorant Garamond",

            serif;

          font-size:

            clamp(18px, 1.45vw, 24px);

          line-height: 1.5;

          letter-spacing: 0.025em;

          color: #6C6258;

        }

        .featuredLabel {

          margin: 0 0 16px;

          font-family:

            Arial, sans-serif;

          font-size: 11px;

          letter-spacing: 0.38em;

          text-transform: uppercase;

          color: #9C8664;

        }

        .featuredTitle {

          margin: 0 0 12px;

          font-family:

            "Cormorant Garamond",

            serif;

          font-size:

            clamp(29px, 2.35vw, 40px);

          line-height: 1.12;

          font-weight: 400;

          color: #2A2723;

        }

        .featuredText {

          margin:

            0 0

            clamp(22px, 3vh, 30px);

          max-width: 500px;

          font-family:

            "Cormorant Garamond",

            serif;

          font-size: 19px;

          line-height: 1.55;

          letter-spacing: 0.025em;

          color: #6C6258;

        }

        /* =========================================================

           CTA

        ========================================================= */

        .exploreButton {

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 26px;

          min-width: 330px;

          padding: 16px 26px;

          background: #C8B08A;

          border:

            1px solid #C8B08A;

          color: #FFFDF8;

          font-family:

            Arial, sans-serif;

          font-size: 11.5px;

          letter-spacing: 0.23em;

          text-transform: uppercase;

          cursor: pointer;

          transition:

            color 0.35s ease,

            border-color 0.35s ease,

            background-color 0.35s ease;

        }

        .exploreButton:hover,

        .exploreButton:focus,

        .exploreButton:active {

          background: #ffffff;

          border-color: #C8B08A;

          color: #9C8664;

          outline: none;

        }

        .arrow {

          display: inline-block;

          font-size: 16px;

          line-height: 1;

          letter-spacing: 0;

          transition:

            transform 0.35s ease;

        }

        .exploreButton:hover .arrow {

          transform:

            translateX(5px);

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

          backdrop-filter:

            blur(2px);

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

          width:

            min(78vw, 390px);

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

        /* =========================================================

           COMPACT DESKTOP

        ========================================================= */

        @media (min-width: 721px) and (max-height: 900px) {

          .container {

            /* WAS 20px — NOW 38px */

            padding-top: 38px;

          }

          .header {

            /* HOME VALUE PRESERVED */

            margin-bottom: 30px;

          }

          .logo {

            width: 82px;

          }

          .divider {

            height: 58px;

          }

          .hero {

            margin-bottom: 18px;

            gap:

              clamp(45px, 5.5vw, 95px);

          }

          .heroImage {

            max-height: 60vh;

            max-width: 115%;

          }

          .eyebrow {

            margin-bottom: 14px;

          }

          .smallLine {

            margin-bottom: 20px;

          }

          .heroTitle {

            font-size:

              clamp(43px, 3.7vw, 61px);

            margin-bottom: 15px;

          }

          .disciplineLine {

            font-size:

              clamp(17px, 1.35vw, 22px);

            margin-bottom: 34px;

          }

          .featuredLabel {

            margin-bottom: 13px;

          }

          .featuredTitle {

            font-size:

              clamp(27px, 2.15vw, 36px);

            margin-bottom: 10px;

          }

          .featuredText {

            font-size: 17px;

            line-height: 1.48;

            margin-bottom: 20px;

          }

          .exploreButton {

            padding-top: 14px;

            padding-bottom: 14px;

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

            /* WAS 15px — NOW 28px */

            padding-top: 28px;

          }

          .header {

            /* HOME VALUE PRESERVED */

            margin-bottom: 20px;

          }

          .logo {

            width: 74px;

          }

          .hero {

            margin-bottom: 14px;

          }

          .heroImage {

            max-height: 56vh;

          }

          .disciplineLine {

            margin-bottom: 26px;

          }

          .featuredText {

            margin-bottom: 16px;

          }

          .footerLine {

            margin-bottom: 13px;

          }

        }

        /* =========================================================

           MOBILE

        ========================================================= */

        @media (max-width: 720px) {

          .homePage {

            display: block;

            min-height: auto;

          }

          .container {

            width: 92vw;

            /* MOBILE REMAINS UNCHANGED */

            padding-top: 38px;

          }

          .header {

            flex-direction: column;

            align-items: center;

            gap: 0;

            margin-left: 0;

            margin-bottom: 58px;

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

          .hero {

            width: 88vw;

            grid-template-columns: 1fr;

            gap: 60px;

            margin-bottom: 84px;

          }

          .artworkWrap {

            width: 100%;

          }

          .heroImage {

            width: 100%;

            max-width: 620px;

            max-height: none;

          }

          .heroContent {

            max-width: 100%;

            text-align: left;

          }

          .heroTitle {

            font-size: 46px;

            line-height: 1;

          }

          .disciplineLine {

            font-size: 19px;

            margin-bottom: 52px;

          }

          .featuredTitle {

            font-size: 32px;

          }

          .featuredText {

            font-size: 18px;

          }

          .exploreButton {

            min-width: 0;

            width: 100%;

          }

          .footerWrap {

            display: none;

          }

        }

        /* =========================================================

           ADDED FEATURES ONLY. ALL 935 LINES OF ORIGINAL CSS ABOVE

           REMAIN EXACTLY AS PROVIDED. NO ORIGINAL CLASS OVERRIDES.

        ========================================================= */

        /* Wrappers are unstyled flex items. Original .desktopNav font,

           gap, margin-right and .desktopNav span hover all still apply. */

        .navItem {

          position: relative;

        }

        .desktopNav .navItem > .navText {

          display: inline-block;

          outline-offset: 4px;

        }

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

        /* Exactly one dropdown is visible, controlled by React state. */

        .navDropdownInner {

          padding: 9px 0;

          border: 1px solid rgba(156, 134, 100, 0.18);

          background: rgba(255, 255, 255, 0.99);

          box-shadow: 0 12px 32px rgba(40, 31, 20, 0.09);

        }

        .navDropdownLink {

          display: block;

          width: 100%;

          padding: 10px 17px;

          border: none;

          background: transparent;

          color: #6f685f;

          text-align: left;

          font-family: Arial, sans-serif;

          font-size: 11px;

          font-weight: 400;

          line-height: 1.4;

          letter-spacing: 0.08em;

          white-space: nowrap;

          cursor: pointer;

        }

        .navDropdownLink:hover,

        .navDropdownLink:focus-visible {

          color: #1d1b18;

          background: #faf8f5;

        }

        /* Carousel is contained inside the original artworkWrap.

           Absolutely positioned controls cannot change hero spacing. */

        .artworkWrap {

          flex-direction: column;

        }

        .carouselStage {

          position: relative;

          width: 100%;

          height: min(64vh, 645px);

          margin: 0 auto;

        }

        .carouselImage {

          position: absolute;

          inset: 0;

          width: 100%;

          height: 100%;

          object-fit: contain;

          /* Enlarge each artwork by 5% without changing the original page layout. */

          transform: scale(1.05);

          transform-origin: center center;

          opacity: 0;

          pointer-events: none;

          transition: opacity 900ms ease-in-out;

        }

        .carouselImage.isActive {

          opacity: 1;

        }

        .carouselControls {

          position: relative;

          z-index: 2;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 11px;

          width: 100%;

          margin-top: 16px;

        }

        .carouselArrow {

          width: 26px;

          height: 26px;

          flex: 0 0 26px;

          display: flex;

          align-items: center;

          justify-content: center;

          border: none;

          padding: 0;

          background: transparent;

          color: #9C8664;

          line-height: 0;

          cursor: pointer;

          opacity: 0;

          pointer-events: none;

          transition: opacity 0.3s ease;

        }

        .carouselArrow svg {

          display: block;

          width: 16px;

          height: 16px;

        }

        /* Show arrows while hovering over the artwork. Keep them visible

           while moving down to the controls, so they remain clickable. */

        .carouselControls::before {

          content: "";

          position: absolute;

          left: 0;

          right: 0;

          top: -16px;

          height: 16px;

        }

        .carouselStage:hover + .carouselControls .carouselArrow,

        .carouselControls:hover .carouselArrow,

        .carouselControls:focus-within .carouselArrow {

          opacity: 1;

          pointer-events: auto;

        }

        .carouselDot {

          width: 7px;

          height: 7px;

          flex: 0 0 7px;

          padding: 0;

          border: 1px solid #9C8664;

          border-radius: 50%;

          background: transparent;

          cursor: pointer;

        }

        .carouselDot.isActive {

          background: #9C8664;

        }

        .carouselDot:focus-visible,

        .carouselArrow:focus-visible,

        .desktopNav .navText:focus-visible {

          outline: 1px solid #9C8664;

          outline-offset: 3px;

        }

        /* Submenus of the ORIGINAL mobile menu; original type sizes untouched. */

        .mobileSubmenu {

          margin: -18px 0 28px 18px;

          border-left: 1px solid rgba(201, 179, 140, 0.3);

          padding-left: 18px;

        }

        .mobileSubmenuLink {

          display: block;

          width: 100%;

          border: 0;

          padding: 8px 0;

          text-align: left;

          background: transparent;

          color: #e1dbcf;

          font: 14px/1.5 Arial, sans-serif;

          cursor: pointer;

        }

        .mobilePanel.open:has(.mobileSubmenu) {

          overflow-y: auto;

        }

        @media (min-width: 721px) and (max-height: 900px) {

          .carouselStage { height: 60vh; }

        }

        @media (min-width: 721px) and (max-height: 760px) {

          .carouselStage { height: 56vh; }

        }

        @media (max-width: 720px) {

          .carouselStage {

            width: 100%;

            height: auto;

            aspect-ratio: 1639 / 2048;

          }

          /* Touch devices have no reliable hover: keep arrows available. */

          .carouselArrow { opacity: 1; pointer-events: auto; }

        }

        @media (prefers-reduced-motion: reduce) {

          .carouselImage { transition-duration: 0ms; }

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

          .homePage .homeLink > .logo {

            width: auto;

            height: calc(var(--brand-text-height, 86px) - 8px);

            max-width: none;

            flex-shrink: 0;

            align-self: center;

            object-fit: contain;

            margin: 0;

          }

          .homePage .homeLink > .divider {

            height: calc(var(--brand-text-height, 86px) - 20px);

            align-self: center;

            margin-top: 0;

            flex-shrink: 0;

          }

        }

        /* CONTACT REFERENCE: EXACT HEADER / NAV / FOOTER PRESENTATION. */

        .homePage .container {

          width: min(1680px, 88vw);

          margin: 0 auto;

          /* SAME APPROVED TOP POSITION */

          padding: clamp(34px, 4vh, 48px) 0 0;

        }

        .homePage .header {

          display: flex;

          align-items: flex-start;

          justify-content: space-between;

          gap: 22px;

          margin-left:

            clamp(100px, 7vw, 180px);

          margin-bottom:

            clamp(102px, 11vh, 140px);

          position: relative;

        }

        .homePage .homeLink {

          display: flex;

          align-items: flex-start;

          gap: 22px;

          cursor: pointer;

          color: inherit;

          text-decoration: none;

          -webkit-tap-highlight-color:

            transparent;

        }

        .homePage .homeLink:hover {

          opacity: 0.96;

        }

        .homePage .logo {

          width: 90px;

          height: auto;

          display: block;

          object-fit: contain;

          opacity: 1;

        }

        .homePage .divider {

          width: 1px;

          height: 64px;

          background:

            rgba(70, 65, 58, 0.22);

          margin-top: 4px;

        }

        .homePage .name {

          margin: 0;

          font-size:

            clamp(24px, 2vw, 34px);

          font-weight: 300;

          letter-spacing: 0.22em;

          line-height: 1;

          color: #1d1b18;

        }

        .homePage .subtitle {

          margin-top: 12px;

          font-family:

            Arial, sans-serif;

          letter-spacing: 0.28em;

          color: #6f685f;

        }

        .homePage .subtitle p {

          margin: 4px 0;

          font-size:

            clamp(10px, 0.85vw, 13px);

        }

        .homePage .desktopNav {

          display: flex;

          gap: 34px;

          margin-right:

            clamp(40px, 5vw, 120px);

          font-family:

            Arial, sans-serif;

          font-size:

            clamp(8px, 0.8vw, 12px);

          letter-spacing: 0.18em;

          text-transform: uppercase;

          color: #6f685f;

          white-space: nowrap;

        }

        .homePage .desktopNav span {

          cursor: pointer;

          transition:

            color 0.45s ease,

            transform 0.45s ease;

        }

        .homePage .desktopNav span:hover {

          color: #1d1b18;

          transform: scale(1.04);

        }

        .homePage .footerWrap {

          width: min(1680px, 88vw);

          margin: auto auto 0;

          padding-bottom:

            clamp(14px, 2vh, 28px);

        }

        .homePage .footerLine {

          width: 100%;

          height: 1px;

          background:

            rgba(0, 0, 0, 0.08);

          margin-bottom: 20px;

        }

        .homePage .bottomNav {

          display: flex;

          justify-content: center;

          align-items: center;

          flex-wrap: wrap;

          gap: 0;

          padding-bottom: 5px;

          font-family:

            Arial, sans-serif;

          font-size:

            clamp(8px, 0.8vw, 12px);

          letter-spacing: 0.18em;

          text-transform: uppercase;

          color: #6f685f;

        }

        .homePage .bottomNavItem {

          display: flex;

          align-items: center;

        }

        .homePage .bottomNavLink {

          cursor: pointer;

          white-space: nowrap;

          transition:

            color 0.45s ease,

            transform 0.45s ease;

        }

        .homePage .bottomNavLink:hover {

          color: #1d1b18;

          transform:

            scale(1.08);

        }

        .homePage .navDivider {

          width: 1px;

          height:

            clamp(10px, 0.9vw, 14px);

          background:

            rgba(111, 104, 95, 0.25);

          margin-left:

            clamp(4px, 0.7vw, 12px);

          margin-right:

            clamp(4px, 0.7vw, 12px);

        }

        .homePage .copyright {

          margin-top: 12px;

          text-align: center;

          font-family:

            Arial, sans-serif;

          font-size:

            clamp(7px, 0.55vw, 9px);

          letter-spacing: 0.28em;

          text-transform: uppercase;

          color: #b9b2a8;

        }

        .homePage .navItem {

          position: relative;

        }

        .homePage .desktopNav .navItem > .navText {

          display: inline-block;

          outline-offset: 4px;

        }

        .homePage .navDropdownPanel {

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

        .homePage .navItem.navOpen .navDropdownPanel {

          opacity: 1;

          visibility: visible;

          pointer-events: auto;

          transform: translate(-50%, 0);

        }

        .homePage .navDropdownInner {

          padding: 9px 0;

          border: 1px solid rgba(156, 134, 100, 0.18);

          background: rgba(255, 255, 255, 0.99);

          box-shadow: 0 12px 32px rgba(40, 31, 20, 0.09);

        }

        .homePage .navDropdownLink {

          display: block;

          width: 100%;

          padding: 10px 17px;

          border: none;

          background: transparent;

          color: #6f685f;

          text-align: left;

          font-family: Arial, sans-serif;

          font-size: 11px;

          font-weight: 400;

          line-height: 1.4;

          letter-spacing: 0.08em;

          white-space: nowrap;

          cursor: pointer;

        }

        .homePage .navDropdownLink:hover,

.homePage .navDropdownLink:focus-visible {

          color: #1d1b18;

          background: #faf8f5;

        }

        .homePage .hamburger {

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

        .homePage .hamburger span {

          display: block;

          width: 48px;

          height: 1.5px;

          margin-bottom: 7px;

          background: #1d1b18;

        }

        .homePage .mobileOverlay {

          position: fixed;

          inset: 0;

          background:

            rgba(0, 0, 2, 0.18);

          backdrop-filter:

            blur(2px);

          opacity: 0;

          pointer-events: none;

          transition:

            opacity 0.45s ease;

          z-index: 20;

        }

        .homePage .mobileOverlay.open {

          opacity: 1;

          pointer-events: auto;

        }

        .homePage .mobilePanel {

          position: fixed;

          top: 0;

          right: 0;

          width:

            min(78vw, 390px);

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

        .homePage .mobilePanel.open {

          transform:

            translateX(0);

        }

        .homePage .closeMenu {

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

        .homePage .mobileMenuItem {

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

        .homePage .mobileMenuItem:hover {

          color: #c9b38c;

        }

        .homePage .mobileSubmenu {

          margin: -18px 0 28px 18px;

          border-left: 1px solid rgba(201, 179, 140, 0.3);

          padding-left: 18px;

        }

        .homePage .mobileSubmenuLink {

          display: block;

          width: 100%;

          border: 0;

          padding: 8px 0;

          text-align: left;

          background: transparent;

          color: #e1dbcf;

          font: 14px/1.5 Arial, sans-serif;

          cursor: pointer;

        }

        @media (min-width: 721px) {

          .homePage .homeLink > .logo {

            width: auto;

            height: calc(var(--brand-text-height, 86px) - 8px);

            max-width: none;

            flex-shrink: 0;

            align-self: center;

            object-fit: contain;

            margin: 0;

          }

          .homePage .homeLink > .divider {

            height: calc(var(--brand-text-height, 86px) - 20px);

            align-self: center;

            margin-top: 0;

            flex-shrink: 0;

          }

        }

        @media (min-width: 721px) and (max-height: 900px) {

          .homePage .container { padding-top: 38px; }

          .homePage .header { margin-bottom: 104px; }

          .homePage .logo { width: 82px; }

          .homePage .divider { height: 58px; }

          .homePage .footerLine { margin-bottom: 16px; }

          .homePage .copyright { margin-top: 9px; }

          .homePage .footerWrap { padding-bottom: 12px; }

        }

        @media (min-width: 721px) and (max-height: 760px) {

          .homePage .container { padding-top: 28px; }

          .homePage .header { margin-bottom: 82px; }

          .homePage .logo { width: 74px; }

        }

        @media (max-width: 720px) {

          .homePage .container { width: 92vw; padding-top: 38px; }

          .homePage .header { flex-direction: column; align-items: center; gap: 0; margin-left: 0; margin-bottom: 68px; text-align: center; }

          .homePage .homeLink { flex-direction: column; align-items: center; gap: 0; }

          .homePage .logo { width: 76px; margin-bottom: 26px; height: auto; }

          .homePage .divider, .homePage .desktopNav { display: none; }

          .homePage .name { font-size: 18px; letter-spacing: 0.18em; }

          .homePage .subtitle { margin-top: 8px; letter-spacing: 0.26em; }

          .homePage .subtitle p { font-size: 8px; margin: 3px 0; }

          .homePage .hamburger { display: block; }

          .homePage .footerWrap { display: none; }

        }

              /* Persistent gold indicator for the current bottom-navigation route. */

        .bottomNavLink.isActive { color: #9c8664 !important; }

/* ONE-TO-ONE COPY OF APPROVED ABOUT HEADER AND FOOTER. DO NOT RESIZE. */

.homePage .container {

          width: min(1680px, 88vw);

          margin: 0 auto;

          /* SAME POSITION AS OTHER APPROVED INTERNAL PAGES */

          padding: clamp(34px, 4vh, 48px) 0 0;

        }

.homePage .header {

          display: flex;

          align-items: flex-start;

          justify-content: space-between;

          gap: 22px;

          margin-left: clamp(100px, 7vw, 180px);

          margin-bottom: clamp(102px, 11vh, 140px);

          position: relative;

        }

.homePage .homeLink {

          display: flex;

          align-items: flex-start;

          gap: 22px;

          cursor: pointer;

          color: inherit;

          text-decoration: none;

          -webkit-tap-highlight-color: transparent;

        }

.homePage .homeLink:hover {

          opacity: 0.96;

        }

.homePage .logo {

          width: 90px;

          height: auto;

          display: block;

          object-fit: contain;

          opacity: 1;

        }

.homePage .divider {

          width: 1px;

          height: 64px;

          background: rgba(70, 65, 58, 0.22);

          margin-top: 4px;

        }

.homePage .name {

          margin: 0;

          font-size: clamp(24px, 2vw, 34px);

          font-weight: 300;

          letter-spacing: 0.22em;

          line-height: 1;

          color: #1d1b18;

        }

.homePage .subtitle {

          margin-top: 12px;

          font-family: Arial, sans-serif;

          letter-spacing: 0.28em;

          color: #6f685f;

        }

.homePage .subtitle p {

          margin: 4px 0;

          font-size: clamp(10px, 0.85vw, 13px);

        }

.homePage .desktopNav {

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

.homePage .desktopNav span {

          cursor: pointer;

          transition:

            color 0.45s ease,

            transform 0.45s ease;

        }

.homePage .desktopNav span:hover {

          color: #1d1b18;

          transform: scale(1.04);

        }

.homePage .footerWrap {

          width: min(1680px, 88vw);

          margin: 0 auto;

          padding-bottom: clamp(14px, 2vh, 28px);

        }

.homePage .footerLine {

          width: 100%;

          height: 1px;

          background: rgba(0, 0, 0, 0.08);

          margin-bottom: 20px;

        }

.homePage .bottomNav {

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

.homePage .bottomNavItem {

          display: flex;

          align-items: center;

        }

.homePage .bottomNavLink {

          cursor: pointer;

          white-space: nowrap;

          transition:

            color 0.45s ease,

            transform 0.45s ease;

        }

.homePage .bottomNavLink:hover {

          color: #1d1b18;

          transform: scale(1.08);

        }

.homePage .navDivider {

          width: 1px;

          height: clamp(10px, 0.9vw, 14px);

          background:

            rgba(111, 104, 95, 0.25);

          margin-left:

            clamp(4px, 0.7vw, 12px);

          margin-right:

            clamp(4px, 0.7vw, 12px);

        }

.homePage .copyright {

          margin-top: 12px;

          text-align: center;

          font-family: Arial, sans-serif;

          font-size: clamp(7px, 0.55vw, 9px);

          letter-spacing: 0.28em;

          text-transform: uppercase;

          color: #b9b2a8;

        }

@media (min-width:721px) {

  .homePage .homeLink > .logo { width:auto; height:calc(var(--brand-text-height, 86px) - 8px); max-width:none; flex-shrink:0; align-self:center; object-fit:contain; margin:0; transform:none; }

  .homePage .homeLink > .divider { height:calc(var(--brand-text-height, 86px) - 20px); align-self:center; margin-top:0; flex-shrink:0; }

}

@media (min-width:721px) and (max-height:900px) {

  .homePage .container {padding-top:38px;}

  .homePage .header {margin-bottom:104px;}

  .homePage .footerLine {margin-bottom:16px;}

  .homePage .copyright {margin-top:9px;}

  .homePage .footerWrap {padding-bottom:12px;}

}

@media (min-width:721px) and (max-height:760px) {

  .homePage .container {padding-top:28px;}

  .homePage .header {margin-bottom:82px;}

}

@media (max-width:720px) {

  .homePage .container {width:92vw;padding-top:38px;}

  .homePage .header {flex-direction:column;align-items:center;gap:0;margin-left:0;margin-bottom:68px;text-align:center;}

  .homePage .homeLink {flex-direction:column;align-items:center;gap:0;}

  .homePage .logo {width:76px;height:auto;margin-bottom:26px;}

  .homePage .divider, .homePage .desktopNav {display:none;}

  .homePage .name {font-size:18px;letter-spacing:.18em;}

  .homePage .subtitle {margin-top:8px;letter-spacing:.26em;}

  .homePage .subtitle p {font-size:8px;margin:3px 0;}

  .homePage .footerWrap {display:none;}

}

/* Only the active link receives the approved 8% enlargement. */

.homePage .desktopNav .navText.isCurrent,.homePage .desktopNav .navCurrent,.homePage .bottomNavLink.isActive { color:#9C8664 !important; transform:scale(1.08); transform-origin:center; }

.homePage .footerWrap {margin-left:auto;margin-right:auto;}


        /* MOBILE NAVIGATION REFINEMENT — never changes desktop header/layout. */
        @media (max-width: 720px) {
          .homePage .hamburger {
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
          .homePage .hamburger span {
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
          .homePage .hamburger span:nth-child(1) { transform: translateY(-11px); }
          .homePage .hamburger span:nth-child(2) { transform: translateY(-3.7px); }
          .homePage .hamburger span:nth-child(3) { transform: translateY(3.7px); }
          .homePage .hamburger span:nth-child(4) { transform: translateY(11px); }
          .homePage .hamburger.isOpen span { background: #e1dbcf; }
          .homePage .hamburger.isOpen span:nth-child(1) { transform: rotate(45deg); }
          .homePage .hamburger.isOpen span:nth-child(2) { transform: scaleX(.55); opacity: 0; }
          .homePage .hamburger.isOpen span:nth-child(3) { transform: scaleX(.55); opacity: 0; }
          .homePage .hamburger.isOpen span:nth-child(4) { transform: rotate(-45deg); }
          .homePage .hamburger:focus-visible {
            outline: 1px solid #9C8664;
            outline-offset: 1px;
          }
          .homePage .mobileOverlay { z-index: 1100; }
          .homePage .mobilePanel {
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
          .homePage .mobilePanel.open { visibility: visible; }
          .homePage .mobileMenuItem {
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
          .homePage .mobileMenuItem:hover,
          .homePage .mobileMenuItem:focus-visible { color: #c9b38c; }
          .homePage .mobileMenuItem.isContact { color: #c9b38c; }
          .homePage .mobileMenuItem:focus-visible,
          .homePage .mobileSubmenuLink:focus-visible {
            outline: 1px solid #c9b38c;
            outline-offset: 4px;
          }
          /* Slow editorial accordion: always mounted, smoothly animates its height. */
          .homePage .mobileMenuItem.hasSubmenu {
            position: relative;
            padding-right: 20px;
          }
          .homePage .mobileMenuItem.hasSubmenu::after {
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
          .homePage .mobileMenuItem.hasSubmenu[aria-expanded="true"]::after {
            transform: translateY(4px) rotate(225deg);
          }
          .homePage .mobileSubmenu {
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
          .homePage .mobileSubmenu.isExpanded {
            grid-template-rows: 1fr;
            opacity: 1;
            margin-top: -18px;
            margin-bottom: 29px;
          }
          .homePage .mobileSubmenuInner {
            min-height: 0;
            overflow: hidden;
          }
          .homePage .mobileSubmenuLink {
            opacity: 0;
            transform: translateY(-8px);
            transition: opacity 580ms ease, transform 680ms cubic-bezier(.22,.61,.36,1), color 250ms ease;
          }
          .homePage .mobileSubmenu.isExpanded .mobileSubmenuLink {
            opacity: 1;
            transform: translateY(0);
          }
          .homePage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(2) { transition-delay: 55ms; }
          .homePage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(3) { transition-delay: 110ms; }
          .homePage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(4) { transition-delay: 165ms; }
          .homePage.isMobileNavigating {
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
          .homePage .hamburger span,
          .homePage .mobilePanel,
          .homePage .mobileSubmenu,
          .homePage .mobileSubmenuLink,
          .homePage .mobileMenuItem.hasSubmenu::after,
          .homePage.isMobileNavigating { transition: none !important; }
        }

        /* MOBILE HOME COMPOSITION — approved menu remains unchanged.
           Only the brand descriptor and hero carousel size are adjusted. */
        @media (max-width: 720px) {
          /* Distinguish the two brand lines and give the longer second line room. */
          .homePage .subtitle p:first-child {
            font-size: 10px;
            letter-spacing: 0.26em;
          }
          .homePage .subtitle p:nth-child(2) {
            font-size: 7.4px;
            letter-spacing: 0.20em;
          }
          /* Reduce the carousel artwork by 15% without changing its
             photographic proportions, transition or navigation controls. */
          .homePage .carouselStage {
            width: 85%;
          }
        }

        /* MOBILE DRAWER ONLY — 7% wider than the original panel (3% less
           widening than the preceding 10% version). Keep the left edge of
           all menu labels fixed at their previously approved screen position. */
        @media (max-width: 720px) {
          .homePage .mobilePanel {
            width: min(83.46vw, 417.3px);
            padding-left: calc(34px + min(83.46vw, 417.3px) - min(78vw, 390px));
          }
        }

        /* MOBILE ACCORDION GUIDE DOTS — match approved Contact styling.
           Dots are 4px in diameter and shifted another 1px right.
           Compensate clipping without moving menu labels. */
        @media (max-width: 720px) {
          .homePage .mobileSubmenuInner {
            margin-left: -24px;
            padding-left: 24px;
          }
          .homePage .mobileSubmenuLink {
            position: relative;
            width: 100%;
          }
          .homePage .mobileSubmenuLink::before {
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

        /* MOBILE — remove transient browser-blue tap rectangles from controls.
           Preserve intentional gold keyboard-focus indicators. */
        @media (max-width: 720px) {
          .homePage,
          .homePage button,
          .homePage a,
          .homePage [role="button"],
          .homePage input,
          .homePage .carouselStage,
          .homePage .carouselImage,
          .homePage .carouselControls,
          .homePage .carouselArrow,
          .homePage .carouselDot,
          .homePage .mobileMenuItem,
          .homePage .mobileSubmenuLink {
            -webkit-tap-highlight-color: transparent;
          }
          /* The gold :focus-visible outlines above remain available for keyboards. */
        }

        /* Consistent approved Sculpture submenu selection feedback on phones. */
        @media (max-width: 720px) {
          .homePage .mobileSubmenu.isExpanded .mobileSubmenuLink.isSelected {
            color: #fff;
            transform: translateY(0) scale(1.055);
            transform-origin: left center;
            transition: color 140ms ease, transform 140ms ease;
          }
          .homePage .mobileSubmenuLink.isSelected::before {
            width: 6px;
            height: 6px;
            background: #fff;
            transform: translate(-1px, -50%);
          }
          .homePage.isMobileNavigating.hasSubmenuSelection {
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

                onClick={() => closeAndNavigate("/work")}

                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") {e.preventDefault();closeAndNavigate("/work");} }}

              >Selected Work</span>

              <div className="navDropdownPanel"><div className="navDropdownInner">

                {selectedWorkLinks.map((item) => <button key={item.path} type="button" className="navDropdownLink" onClick={() => closeAndNavigate(item.path)}>{item.label}</button>)}

              </div></div>

            </div>

            <div className={`navItem ${desktopDropdown === "jewellery" ? "navOpen" : ""}`} onMouseEnter={() => setDesktopDropdown("jewellery")}>

              <span className={`navText ${activePath === "/jewellery-design" ? "isCurrent" : ""}`} role="button" tabIndex={0} aria-haspopup="true"

                aria-expanded={desktopDropdown === "jewellery"}

                onClick={() => closeAndNavigate("/jewellery-design")}

                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") {e.preventDefault();closeAndNavigate("/jewellery-design");} }}

              >Jewellery Design</span>

              <div className="navDropdownPanel"><div className="navDropdownInner">

                {jewelleryLinks.map((item) => <button key={item.path} type="button" className="navDropdownLink" onClick={() => closeAndNavigate(item.path)}>{item.label}</button>)}

              </div></div>

            </div>

            <span className={activePath === "/about" ? "navCurrent" : ""} role="link" tabIndex={0} onClick={() => closeAndNavigate("/about")} onKeyDown={(e) => e.key === "Enter" && closeAndNavigate("/about")}>About</span>

            <span className={activePath === "/contact" ? "navCurrent" : ""} role="link" tabIndex={0} onClick={() => closeAndNavigate("/contact")} onKeyDown={(e) => e.key === "Enter" && closeAndNavigate("/contact")}>Contact</span>

          </nav>

        </header>

      </div>

      {/* =======================================================

          MOBILE BUTTON

      ======================================================= */}

      <button
        type="button"
        className={`hamburger${menuOpen ? " isOpen" : ""}`}
        onClick={() => {
          setMenuOpen((wasOpen) => !wasOpen);
          setMobileDropdown(null);
        }}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="home-mobile-navigation"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      {/* =======================================================

          HERO

      ======================================================= */}

      <section className="hero">

        <div

          className="artworkWrap"

        >

          <div className="carouselStage" aria-label="Selected work image carousel" aria-roledescription="carousel">

            {slides.map((slide, index) => (

              <img

                key={slide.src}

                src={slide.src}

                alt={slide.alt}

                loading={index === 0 ? "eager" : "lazy"}

                className={`carouselImage ${activeSlide === index ? "isActive" : ""}`}

                aria-hidden={activeSlide !== index}

              />

            ))}

          </div>

          <div className="carouselControls">

            <button type="button" className="carouselArrow" aria-label="Previous image" onClick={() => goToSlide(activeSlide - 1)}>

              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">

                <path d="M15 5 8 12l7 7" />

              </svg>

            </button>

            {slides.map((slide, index) => (

              <button type="button" key={slide.src}

                className={`carouselDot ${activeSlide === index ? "isActive" : ""}`}

                aria-label={`Show image ${index + 1} of ${slides.length}`}

                aria-current={activeSlide === index ? "true" : undefined}

                onClick={() => goToSlide(index)}

              />

            ))}

            <button type="button" className="carouselArrow" aria-label="Next image" onClick={() => goToSlide(activeSlide + 1)}>

              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">

                <path d="m9 5 7 7-7 7" />

              </svg>

            </button>

          </div>

        </div>

        <div className="heroContent">

          <p className="eyebrow">

            Selected Work

          </p>

          <div className="smallLine"></div>

          <h2 className="heroTitle">

            From Concept

            <br />

            to Physical Form

          </h2>

          <p className="disciplineLine">

            Sculpture · Installations · Spatial Design ·

            Objects · Jewellery

          </p>

          <p className="featuredLabel">

            Across Disciplines

          </p>

          <h3 className="featuredTitle">

            Ideas in Form, Object &amp; Space

          </h3>

          <p className="featuredText">

            Sculpture, spatial design and refined objects —

            from concept to developed design.

          </p>

          <button

            className="exploreButton"

            onClick={() =>

              navigate("/work")

            }

          >

            <span>

              Explore Selected Work

            </span>

            <span className="arrow">

              ⟶

            </span>

          </button>

        </div>

      </section>

      {/* =======================================================

          FOOTER

      ======================================================= */}

      <footer className="footerWrap">

        <div className="footerLine"></div>

        <div className="bottomNav">

          {bottomNavItems.map((item, index) => (

            <div key={item.path} className="bottomNavItem">

              <span className={`bottomNavLink ${activePath === item.path ? "isActive" : ""}`} onClick={() => closeAndNavigate(item.path)}>

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
        id="home-mobile-navigation"
        className={menuOpen ? "mobilePanel open" : "mobilePanel"}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <button
          type="button"
          className="mobileMenuItem hasSubmenu"
          aria-expanded={mobileDropdown === "work"}
          aria-controls="home-work-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "work" ? null : "work")}
        >SELECTED WORK</button>
        <div
          id="home-work-submenu"
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
          aria-controls="home-jewellery-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "jewellery" ? null : "jewellery")}
        >JEWELLERY DESIGN</button>
        <div
          id="home-jewellery-submenu"
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
