import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Save the uploaded store photograph in your project's public/ folder as:
// /vancouver-award-boutique.jpg

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

const recognitions = [
  {
    year: "2019",
    title: "JCK Choice Award",
    detail: "Award Recognition",
  },
  {
    year: "2016",
    title: "Canadian Jeweller Award of Excellence",
    detail: "Winner — Best Canadian Diamond Design of the Year",
  },
  {
    year: "2015",
    title: "Canadian Jeweller Award of Excellence",
    detail: "Winner — Best Platinum Design of the Year",
  },
  {
    year: "2015",
    title: "Canadian Jeweller Award of Excellence",
    detail: "Winner — Best Canadian Diamond Design of the Year",
  },
  {
    year: "2015",
    title: "Canadian Jeweller Award of Excellence",
    detail: "Winner — Best Colored Gemstone Design of the Year",
  },
  {
    year: "2015",
    title: "Canadian Jeweller Award of Excellence",
    detail: "Winner — Best Canadian Diamond Design of the Year",
  },
  {
    year: "2015",
    title: "Canadian Jeweller Award of Excellence",
    detail: "Winner — Best Canadian Diamond Design of the Year",
  },
  {
    year: "2009",
    title: "Ed Fielder Architecture Award",
    detail: "First Place — Vancouver Retail Boutique",
  },
  {
    year: "2006",
    title: "George Scheultz Fashion Design Contest",
    detail: "Best Men’s Fashion Design",
  },
];

export default function Awards() {
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

  const brandLockupRef = useRef(null);
  const brandTextRef = useRef(null);

  useLayoutEffect(() => {
    const lockup = brandLockupRef.current;
    const textBlock = brandTextRef.current;
    if (!lockup || !textBlock) return;

    const syncBrandHeight = () => {
      const height = textBlock.getBoundingClientRect().height;
      if (height > 0) {
        lockup.style.setProperty("--brand-text-height", `${height}px`);
      }
    };

    syncBrandHeight();
    const observer = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(syncBrandHeight)
      : null;
    observer?.observe(textBlock);
    window.addEventListener("resize", syncBrandHeight);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", syncBrandHeight);
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
    if (path === "/sculpture") {
      window.location.assign("/sculpture");
      return;
    }
    navigate(path);
  };

  return (
    <main className={`awardsPage${mobileNavigating ? " isMobileNavigating" : ""}${selectedMobileSubLink ? " hasSubmenuSelection" : ""}`}>
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

        .awardsPage {
          min-height: 100vh;
          background: #ffffff;
          color: #1d1b18;
          font-family: "Times New Roman", Georgia, serif;
          overflow-x: hidden;
        }

        .container {
          width: min(1680px, 88vw);
          margin: 0 auto;
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
          flex: 0 0 auto;
        }

        .homeLink > .divider {
          width: 1px;
          height: var(--brand-text-height, 64px);
          background: rgba(70, 65, 58, 0.22);
          margin-top: 0;
          align-self: stretch;
          flex: 0 0 auto;
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
          transition: color 0.45s ease, transform 0.45s ease;
        }

        .desktopNav span:hover {
          color: #1d1b18;
          transform: scale(1.04);
        }

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
          transform: translateX(-50%);
          padding-top: 11px;
          min-width: 0;
          width: max-content;
          max-width: min(85vw, 360px);
          display: none;
        }

        .navItem.navOpen .navDropdownPanel {
          display: block;
          animation: menuSlideDown 0.24s ease forwards;
          transform-origin: top center;
        }

        @keyframes menuSlideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

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

        .desktopNav .navText:focus-visible,
        .desktopNav span:focus-visible,
        .navDropdownLink:focus-visible,
        .bottomNav button:focus-visible,
        .hamburger:focus-visible,
        .mobileMenu button:focus-visible {
          outline: 1px solid rgba(156, 134, 100, 0.45);
          outline-offset: 4px;
        }

        .hamburger {
          position: fixed;
          right: 20px;
          top: 18px;
          z-index: 1600;
          width: 52px;
          height: 52px;
          border: none;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 10px 24px rgba(40, 31, 20, 0.12);
          display: none;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
        }

        .hamburger span {
          position: absolute;
          width: 20px;
          height: 1.5px;
          background: #6f685f;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .hamburger span:nth-child(1) { transform: translateY(-6px); }
        .hamburger span:nth-child(2) { transform: translateY(-2px); }
        .hamburger span:nth-child(3) { transform: translateY(2px); }
        .hamburger span:nth-child(4) { transform: translateY(6px); }

        .mobileMenuOverlay {
          position: fixed;
          inset: 0;
          z-index: 1500;
          background: rgba(255, 255, 255, 0.97);
          display: none;
        }

        .mobileMenu {
          width: min(460px, 100%);
          height: 100%;
          margin-left: auto;
          padding: 88px 28px 28px;
          overflow-y: auto;
          border-left: 1px solid rgba(156, 134, 100, 0.18);
          box-shadow: -10px 0 30px rgba(40, 31, 20, 0.07);
          background: #ffffff;
        }

        .mobileMenu button {
          width: 100%;
          border: none;
          background: transparent;
          padding: 14px 0;
          text-align: left;
          cursor: pointer;
          color: #6f685f;
          font-family: Arial, sans-serif;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .mobileMenuSection {
          border-top: 1px solid rgba(156, 134, 100, 0.16);
          padding-top: 10px;
          margin-top: 10px;
        }

        .mobileMenuHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .mobileMenuSub {
          padding: 0 0 8px 14px;
        }

        .mobileMenuSub button {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: none;
          padding: 10px 0;
        }

        .pageWrap {
          width: min(1060px, 86vw);
          margin: 0 auto;
          padding: 0 0 56px;
        }

        .topIntro {
          text-align: center;
          margin-bottom: 58px;
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
          color: #9c8664;
          text-align: center;
        }

        /* Identical gold-label typography for 2009, 2016 and RECOGNITION. */
        .awardYearLabel,
        .recognitionTitleLabel {
          font-family: Arial, sans-serif;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: 0.38em;
          color: #9C8664;
        }
        @media (max-width: 720px) {
          .awardYearLabel,
          .recognitionTitleLabel { font-size: 13px; }
        }

        .mainTitle {
          margin: 0 0 16px;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(30px, 2.45vw, 44px);
          line-height: 1.12;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 400;
          color: #1d1b18;
        }

        .titleLine {
          width: 82px;
          height: 1px;
          background: rgba(156, 134, 100, 0.55);
          margin: 0 auto 18px;
        }

        .introCopy {
          width: min(760px, 100%);
          margin: 0 auto;
          font-size: 17px;
          line-height: 1.85;
          color: #524a43;
        }

        /* Editorial float: the second paragraph flows naturally below the photo. */
        .featureCard {
          display: flow-root;
          margin-bottom: 74px;
        }

        .featureImage {
          float: left;
          width: 39%;
          margin: 0 40px 10px 0;
        }

        .featureImage img {
          display: block;
          width: 100%;
          height: auto;
          border: 1px solid rgba(156, 134, 100, 0.12);
          box-shadow: 0 16px 40px rgba(50, 38, 25, 0.08);
        }

        /* Keep the same font, line-height and paragraph spacing. */
        .featureCopy { display: contents; }
        .featureCopy > .featureText:last-child { margin-bottom: 18px; }
        .featureClosing {
          clear: both;
          width: 100%;
          margin: 0 0 18px;
        }

        .featureDivider {
          clear: both;
          width: 100%;
          height: 1px;
          background: rgba(156, 134, 100, 0.18);
          margin: 0 0 22px;
        }

        .featureMeta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 16px;
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #9c8664;
        }

        .featureMeta span:last-child::before {
          content: "";
          display: inline-block;
          width: 26px;
          height: 1px;
          margin: 0 12px 3px 0;
          background: rgba(156, 134, 100, 0.45);
          vertical-align: middle;
        }

        .featureTitle {
          margin: 0 0 16px;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(30px, 2.25vw, 40px);
          line-height: 1.08;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 400;
          color: #1d1b18;
        }

        .featureSub {
          margin: 0 0 20px;
          font-family: Arial, sans-serif;
          font-size: 12px;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          color: #7e7368;
        }

        .featureText {
          margin: 0 0 18px;
          font-size: 17px;
          line-height: 1.9;
          color: #443d36;
        }

        /* The four project details return to the right-hand text column. */
        .detailGrid {
          margin-left: calc(39% + 40px);
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px 22px;
          margin-top: 0;
          padding-top: 0;
        }

        .detailCard span {
          display: block;
          margin-bottom: 8px;
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9c8664;
        }

        .detailCard p {
          margin: 0;
          font-size: 15px;
          line-height: 1.65;
          color: #51473d;
        }


        /* Featured 2016 jewellery award — reverse of the Vancouver layout. */
        .familyAward {
          margin: 76px 0 74px;
        }
        .familyAwardHeading {
          text-align: center;
          margin: 0 auto 50px;
          max-width: 920px;
        }
        .familyAwardHeading .topicLabel {
          margin-bottom: 18px;
        }
        .familyAwardHeading .mainTitle {
          margin-bottom: 16px;
        }
        .familyAwardHeading .introCopy {
          max-width: 740px;
        }
        /* Mirror the boutique: exact same 39% image width and 40px separation. */
        .familyFeature {
          display: flow-root;
          width: 100%;
        }
        .familyFeatureCopy { display: contents; }
        .familyFeature .featureTitle { margin-bottom: 14px; }
        .familyFeature .featureText {
          margin: 0 0 18px;
          font-size: 17px;
          line-height: 1.9;
        }
        .familyImage {
          float: right;
          width: 39%;
          margin: 0 0 12px 40px;
        }
        .familyImage img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
        }
        /* Photo identification only; award history and layout remain unchanged. */
        .familyImageCaption {
          margin-top: 12px;
          font: 400 10px/1.5 Arial, sans-serif;
          letter-spacing: 0.19em;
          text-align: center;
          color: #9C8664;
        }
        .familyFeature .familyClosing {
          clear: both;
          width: 100%;
          margin: 0 0 18px;
        }
        /* Exactly the boutique divider geometry: no extra 32px top gap,
           and 22px from the rule to the detail labels. */
        .familyAwardDetailDivider {
          clear: both;
          width: 100%;
          height: 1px;
          background: rgba(156, 134, 100, 0.18);
          margin: 0 0 22px;
        }
        /* Identical geometry to the boutique .detailGrid: same content-column
           width, 22px column gap, 18px between rows, and matching text style.
           Mirrored to the left because the Family Tree photograph is on the right. */
        .familyDetailGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: 22px;
          row-gap: 18px;
          width: calc(61% - 40px);
          margin-left: 0;
          margin-top: 0;
          padding-top: 0;
          align-items: start;
        }
        .familyDetailColumn {
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-width: 0;
        }
        @media (min-width: 981px) and (max-width: 1180px) {
          .familyImage { margin-left: 28px; }
          .familyDetailGrid { width: calc(61% - 28px); }
        }
        @media (max-width: 980px) {
          .familyImage {
            float: none;
            width: min(100%, 560px);
            margin: 0 auto 28px;
          }
          .familyFeatureCopy { display: block; }
          .familyDetailGrid { width: 100%; }
        }
        @media (max-width: 640px) {
          .familyAward { margin: 54px 0 72px; }
          .familyAwardHeading { margin-bottom: 28px; }
          .familyDetailGrid { column-gap: 22px; row-gap: 18px; }
        }

        .awardsListBlock {
          margin-top: 0;
        }
        .sectionLine {
          width: 100%;
          height: 1px;
          background: rgba(156, 134, 100, 0.2);
          margin: 0 0 46px;
        }
        /* Recognition only: higher specificity than .sectionLine,
           so the desktop/mobile spacing cannot be overwritten. */
        .sectionLine.recognitionDivider {
          margin-top: 0;
          margin-bottom: 120px;
        }
        @media (max-width: 720px) {
          .sectionLine.recognitionDivider { margin-bottom: 78px; }
        }

        .sectionHeading {
          text-align: center;
          margin-bottom: 38px;
        }

        .sectionHeading h2 {
          margin: 0 0 14px;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(30px, 2.45vw, 44px);
          line-height: 1.12;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1d1b18;
        }

        .sectionHeading > .topicLabel {
          color: #9C8664;
        }

        .sectionHeading p {
          width: min(760px, 100%);
          margin: 0 auto;
          font-size: 16px;
          line-height: 1.82;
          color: #524a43;
        }

        /* Original Awards style: quiet, typographic rows — no cards. */
        .recognitionList {
          width: min(900px, 100%);
          display: grid;
          grid-template-columns: 1fr;
          gap: 34px;
          margin: 62px auto 0;
        }

        .awardItem {
          display: grid;
          grid-template-columns: 120px minmax(0, 1fr);
          gap: 42px;
          align-items: start;
          text-align: left;
          padding-bottom: 34px;
          border-bottom: 1px solid rgba(70, 65, 58, 0.12);
        }

        .awardItem:last-child { border-bottom: none; }

        .awardYear {
          font-family: "Cormorant Garamond", serif;
          font-size: 34px;
          line-height: 1;
          color: #9C8664;
          letter-spacing: 0.08em;
        }

        .awardTitle {
          margin: 0 0 10px;
          font-family: Arial, sans-serif;
          font-size: 12px;
          letter-spacing: 0.24em;
          line-height: 1.55;
          text-transform: uppercase;
          font-weight: 400;
          color: #1d1b18;
        }

        .awardDetail {
          margin: 0;
          font-size: 16px;
          line-height: 1.7;
          color: #3F3933;
          font-weight: 300;
        }

        .bottomNavWrap {
          width: min(1680px, 88vw);
          margin: 44px auto 0;
          padding: 0 0 24px;
        }

        .bottomLine {
          width: calc(100% - clamp(40px, 4vw, 76px));
          height: 1px;
          margin: 0 auto 12px;
          background: rgba(120, 110, 98, 0.18);
        }

        .bottomNav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
          color: #8d857b;
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .bottomNavEntry {
          display: inline-flex;
          align-items: center;
          gap: 18px;
        }

        .bottomNavSeparator {
          color: rgba(141, 133, 123, 0.7);
        }

        .bottomNav button {
          border: none;
          background: transparent;
          color: inherit;
          cursor: pointer;
          font: inherit;
          letter-spacing: inherit;
          text-transform: inherit;
          padding: 0;
          transition: color 0.35s ease, transform 0.35s ease;
        }

        .bottomNav button:hover {
          color: #1d1b18;
          transform: scale(1.03);
        }

        .bottomNav button.active {
          color: #9c8664;
        }

        .copyright {
          margin-top: 10px;
          text-align: center;
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #b4aa9e;
        }

        @media (min-width: 641px) and (max-height: 900px) {
          .recognitionList { gap: 28px; margin-top: 52px; }
        }

        @media (max-width: 1180px) {
          .featureImage {
            width: 39%;
            margin-right: 28px;
          }
          .detailGrid {
            margin-left: calc(39% + 28px);
          }


          .header {
            margin-left: 0;
          }
        }

        @media (max-width: 980px) {
          .desktopNav {
            display: none;
          }

          .hamburger {
            display: inline-flex;
          }

          .mobileMenuOverlay {
            display: block;
          }

          .container {
            width: min(92vw, 760px);
          }

          .header {
            margin-bottom: 72px;
          }

          .pageWrap {
            width: min(92vw, 760px);
          }

          .detailGrid {
            margin-left: 0;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .featureImage {
            float: none;
            width: min(100%, 440px);
            margin: 0 auto 24px;
          }
          .featureCopy { display: block; }
          .featureClosing { clear: none; }
          .header {
            gap: 14px;
            margin-bottom: 56px;
          }

          .homeLink {
            gap: 14px;
          }

          .logo {
            width: 74px;
          }

          .name {
            font-size: clamp(22px, 8vw, 30px);
            letter-spacing: 0.18em;
          }

          .subtitle {
            letter-spacing: 0.18em;
          }

          .subtitle p {
            font-size: 10px;
          }

          .topIntro {
            margin-bottom: 42px;
          }

          .featureTitle {
            font-size: clamp(26px, 7vw, 36px);
          }

          .featureText,
          .introCopy,
          .sectionHeading p {
            font-size: 15px;
            line-height: 1.8;
          }

          .recognitionList { gap: 38px; margin-top: 54px; }

          .awardItem {
            grid-template-columns: 1fr;
            gap: 16px;
            text-align: center;
            padding-bottom: 24px;
            border-bottom: none;
          }

          .awardItem:not(:last-child)::after {
            content: "";
            display: block;
            width: 95px;
            height: 1px;
            background: #9C8664;
            opacity: 0.45;
            margin: 30px auto 0;
          }

          .awardYear { font-size: 30px; }
          .awardTitle { font-size: 12px; line-height: 1.6; }
          .awardDetail { font-size: 16px; }
          .detailGrid { grid-template-columns: 1fr; }

          .bottomNav {
            gap: 12px;
            letter-spacing: 0.16em;
            font-size: 10px;
          }
        }

        /* HEADER AND FOOTER — MATCH USER-SUPPLIED HOME.JSX */
 .awardsPage .container {
          width: min(1680px, 88vw);

          margin: 0 auto;

          /* NEW APPROVED DISTANCE FROM TOP EDGE */
          padding: clamp(34px, 4vh, 48px) 0 0;
        }
 .awardsPage .header {
          display: flex;

          align-items: flex-start;
          justify-content: space-between;

          gap: 22px;

          margin-left:
            clamp(100px, 7vw, 180px);

          /* HOME KEEPS ITS OWN VERTICAL RHYTHM */
          margin-bottom:
            clamp(34px, 4.5vh, 68px);

          position: relative;
        }
 .awardsPage .homeLink {
          display: flex;
          align-items: flex-start;
          gap: 22px;

          cursor: pointer;

          color: inherit;
          text-decoration: none;

          -webkit-tap-highlight-color: transparent;
        }
 .awardsPage .homeLink:hover {
          opacity: 0.96;
        }
 .awardsPage .logo {
          width: 90px;
          height: auto;

          display: block;

          object-fit: contain;

          opacity: 1;
        }
 .awardsPage .divider {
          width: 1px;
          height: 64px;

          background:
            rgba(70, 65, 58, 0.22);

          margin-top: 4px;
        }
 .awardsPage .name {
          margin: 0;

          font-size:
            clamp(24px, 2vw, 34px);

          font-weight: 300;

          letter-spacing: 0.22em;

          line-height: 1;

          color: #1d1b18;
        }
 .awardsPage .subtitle {
          margin-top: 12px;

          font-family:
            Arial, sans-serif;

          letter-spacing: 0.28em;

          color: #6f685f;
        }
 .awardsPage .subtitle p {
          margin: 4px 0;

          font-size:
            clamp(10px, 0.85vw, 13px);
        }
 .awardsPage .desktopNav {
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
 .awardsPage .desktopNav span {
          cursor: pointer;

          transition:
            color 0.45s ease,
            transform 0.45s ease;
        }
 .awardsPage .desktopNav span:hover {
          color: #1d1b18;

          transform: scale(1.04);
        }
 .awardsPage .navItem {
          position: relative;
        }
 .awardsPage .desktopNav .navItem > .navText {
          display: inline-block;
          outline-offset: 4px;
        }
 .awardsPage .navDropdownPanel {
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
 .awardsPage .navItem.navOpen .navDropdownPanel {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translate(-50%, 0);
        }
 .awardsPage .navDropdownInner {
          padding: 9px 0;
          border: 1px solid rgba(156, 134, 100, 0.18);
          background: rgba(255, 255, 255, 0.99);
          box-shadow: 0 12px 32px rgba(40, 31, 20, 0.09);
        }
 .awardsPage .navDropdownLink {
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
 .awardsPage .footerWrap {
          width: min(1680px, 88vw);

          margin: auto auto 0;

          padding-bottom:
            clamp(14px, 2vh, 28px);

          flex-shrink: 0;
        }
 .awardsPage .footerLine {
          width: 100%;

          height: 1px;

          background:
            rgba(0, 0, 0, 0.08);

          margin-bottom: 20px;
        }
 .awardsPage .bottomNav {
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
 .awardsPage .bottomNavItem {
          display: flex;

          align-items: center;
        }
 .awardsPage .bottomNavLink {
          cursor: pointer;

          white-space: nowrap;

          transition:
            color 0.45s ease,
            transform 0.45s ease;
        }
 .awardsPage .bottomNavLink:hover {
          color: #1d1b18;

          transform: scale(1.08);
        }
 .awardsPage .navDivider {
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
 .awardsPage .copyright {
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
 .awardsPage .hamburger {
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
 .awardsPage .hamburger span {
          display: block;

          width: 48px;

          height: 1.5px;

          margin-bottom: 7px;

          background: #1d1b18;
        }
 .awardsPage .mobileOverlay {
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
 .awardsPage .mobileOverlay.open {
          opacity: 1;

          pointer-events: auto;
        }
 .awardsPage .mobilePanel {
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
 .awardsPage .mobilePanel.open {
          transform:
            translateX(0);
        }
 .awardsPage .closeMenu {
          background: transparent;

          border: none;

          color: #d4cec2;

          font-size: 42px;

          cursor: pointer;

          display: block;

          margin-left: auto;

          margin-bottom: 70px;
        }
 .awardsPage .mobileMenuItem {
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
 .awardsPage .mobileSubmenu {
          margin: -18px 0 28px 18px;
          border-left: 1px solid rgba(201, 179, 140, 0.3);
          padding-left: 18px;
        }
 .awardsPage .mobileSubmenuLink {
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

        .awardsPage .header {margin-bottom:clamp(34px, 4.5vh, 68px);}
        .awardsPage .footerWrap { margin: 44px auto 0; }
        .awardsPage .hamburger {border-radius:0; box-shadow:none; background:transparent; width:48px; height:34px; right:18px; top:18px;}
        .awardsPage .navDropdownLink:hover,
        .awardsPage .navDropdownLink:focus-visible {color:#1d1b18;background:#faf8f5;}
        .awardsPage .desktopNav .navText:focus-visible {outline:1px solid #9C8664;outline-offset:3px;}
        @media (min-width: 721px) {
          .awardsPage .homeLink > .logo {width:auto;height:calc(var(--brand-text-height,86px) - 8px);max-width:none;flex-shrink:0;align-self:center;object-fit:contain;margin:0;}
          .awardsPage .homeLink > .divider {height:calc(var(--brand-text-height,86px) - 20px);align-self:center;margin-top:0;flex-shrink:0;}
        }
        @media (min-width:721px) and (max-height:900px) {
          .awardsPage .container {padding-top:38px;}
          .awardsPage .logo {width:82px;}
          .awardsPage .header {margin-bottom:30px;}
          .awardsPage .footerLine {margin-bottom:16px;}
          .awardsPage .copyright {margin-top:9px;}
          .awardsPage .footerWrap {padding-bottom:12px;}
        }
        @media (min-width:721px) and (max-height:760px) {
          .awardsPage .container {padding-top:28px;}
          .awardsPage .logo {width:74px;}
          .awardsPage .header {margin-bottom:20px;}
          .awardsPage .footerLine {margin-bottom:13px;}
        }
        @media (max-width:720px) {
          .awardsPage .container {width:92vw;padding-top:38px;}
          .awardsPage .header {flex-direction:column;align-items:center;gap:0;margin-left:0;margin-bottom:68px;text-align:center;}
          .awardsPage .homeLink {flex-direction:column;align-items:center;gap:0;}
          .awardsPage .logo {width:76px;margin-bottom:26px;}
          .awardsPage .divider,.awardsPage .desktopNav {display:none;}
          .awardsPage .name {font-size:18px;letter-spacing:0.18em;}
          .awardsPage .subtitle {margin-top:8px;letter-spacing:0.26em;}
          .awardsPage .subtitle p {font-size:8px;margin:3px 0;}
          .awardsPage .hamburger {display:block;}
          .awardsPage .footerWrap {display:none;}
          .awardsPage .mobilePanel.open:has(.mobileSubmenu) {overflow-y:auto;}
        }
        @media (prefers-reduced-motion:reduce) {.awardsPage .navDropdownPanel {transition:none;}}

      
        /* === Contact.jsx header & footer: exact typography / rhythm source === */
        .awardsPage .container {
          width: min(1680px, 88vw);

          margin: 0 auto;

          /* SAME APPROVED TOP POSITION */
          padding: clamp(34px, 4vh, 48px) 0 0;
        }
        .awardsPage .header {
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
        .awardsPage .homeLink {
          display: flex;

          align-items: flex-start;

          gap: 22px;

          cursor: pointer;

          color: inherit;

          text-decoration: none;

          -webkit-tap-highlight-color:
            transparent;
        }
        .awardsPage .homeLink:hover {
          opacity: 0.96;
        }
        .awardsPage .logo {
          width: 90px;
          height: auto;

          display: block;

          object-fit: contain;

          opacity: 1;
        }
        .awardsPage .divider {
          width: 1px;
          height: 64px;

          background:
            rgba(70, 65, 58, 0.22);

          margin-top: 4px;
        }
        .awardsPage .name {
          margin: 0;

          font-size:
            clamp(24px, 2vw, 34px);

          font-weight: 300;

          letter-spacing: 0.22em;

          line-height: 1;

          color: #1d1b18;
        }
        .awardsPage .subtitle {
          margin-top: 12px;

          font-family:
            Arial, sans-serif;

          letter-spacing: 0.28em;

          color: #6f685f;
        }
        .awardsPage .subtitle p {
          margin: 4px 0;

          font-size:
            clamp(10px, 0.85vw, 13px);
        }
        .awardsPage .desktopNav {
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
        .awardsPage .desktopNav span {
          cursor: pointer;

          transition:
            color 0.45s ease,
            transform 0.45s ease;
        }
        .awardsPage .desktopNav span:hover {
          color: #1d1b18;

          transform: scale(1.04);
        }
        .awardsPage .footerWrap {
          width: min(1680px, 88vw);

          margin: 0 auto;

          padding-bottom:
            clamp(14px, 2vh, 28px);
        }
        .awardsPage .footerLine {
          width: 100%;

          height: 1px;

          background:
            rgba(0, 0, 0, 0.08);

          margin-bottom: 20px;
        }
        .awardsPage .bottomNav {
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
        .awardsPage .bottomNavItem {
          display: flex;

          align-items: center;
        }
        .awardsPage .bottomNavLink {
          cursor: pointer;

          white-space: nowrap;

          transition:
            color 0.45s ease,
            transform 0.45s ease;
        }
        .awardsPage .bottomNavLink:hover {
          color: #1d1b18;

          transform:
            scale(1.08);
        }
        .awardsPage .navDivider {
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
        .awardsPage .copyright {
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
        .awardsPage .navItem {
          position: relative;
        }
        .awardsPage .desktopNav .navItem > .navText {
          display: inline-block;
          outline-offset: 4px;
        }
        .awardsPage .navDropdownPanel {
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
        .awardsPage .navItem.navOpen .navDropdownPanel {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translate(-50%, 0);
        }
        .awardsPage .navDropdownInner {
          padding: 9px 0;
          border: 1px solid rgba(156, 134, 100, 0.18);
          background: rgba(255, 255, 255, 0.99);
          box-shadow: 0 12px 32px rgba(40, 31, 20, 0.09);
        }
        .awardsPage .navDropdownLink {
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
        .awardsPage .navDropdownLink:hover,
        .navDropdownLink:focus-visible {
          color: #1d1b18;
          background: #faf8f5;
        }
        .awardsPage .hamburger {
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
        .awardsPage .hamburger span {
          display: block;

          width: 48px;

          height: 1.5px;

          margin-bottom: 7px;

          background: #1d1b18;
        }
        .awardsPage .mobileOverlay {
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
        .awardsPage .mobileOverlay.open {
          opacity: 1;

          pointer-events: auto;
        }
        .awardsPage .mobilePanel {
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
        .awardsPage .mobilePanel.open {
          transform:
            translateX(0);
        }
        .awardsPage .closeMenu {
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
        .awardsPage .mobileMenuItem {
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
        .awardsPage .mobileMenuItem:hover {
          color: #c9b38c;
        }
        .awardsPage .mobileSubmenu {
          margin: -18px 0 28px 18px;
          border-left: 1px solid rgba(201, 179, 140, 0.3);
          padding-left: 18px;
        }
        .awardsPage .mobileSubmenuLink {
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
          .awardsPage .homeLink > .logo {
            width: auto;
            height: calc(var(--brand-text-height, 86px) - 8px);
            max-width: none;
            flex-shrink: 0;
            align-self: center;
            object-fit: contain;
            margin: 0;
          }
          .awardsPage .homeLink > .divider {
            height: calc(var(--brand-text-height, 86px) - 20px);
            align-self: center;
            margin-top: 0;
            flex-shrink: 0;
          }
        }
        @media (min-width: 721px) and (max-height: 900px) {
          .awardsPage .container { padding-top: 38px; }
          .awardsPage .header { margin-bottom: 104px; }
          .awardsPage .logo { width: 82px; }
          .awardsPage .divider { height: 58px; }
          .awardsPage .footerLine { margin-bottom: 16px; }
          .awardsPage .copyright { margin-top: 9px; }
          .awardsPage .footerWrap { padding-bottom: 12px; }
        }
        @media (min-width: 721px) and (max-height: 760px) {
          .awardsPage .container { padding-top: 28px; }
          .awardsPage .header { margin-bottom: 82px; }
          .awardsPage .logo { width: 74px; }
        }
        @media (max-width: 720px) {
          .awardsPage .container { width: 92vw; padding-top: 38px; }
          .awardsPage .header { flex-direction: column; align-items: center; gap: 0; margin-left: 0; margin-bottom: 68px; text-align: center; }
          .awardsPage .homeLink { flex-direction: column; align-items: center; gap: 0; }
          .awardsPage .logo { width: 76px; margin-bottom: 26px; height: auto; }
          .awardsPage .divider, .awardsPage .desktopNav { display: none; }
          .awardsPage .name { font-size: 18px; letter-spacing: 0.18em; }
          .awardsPage .subtitle { margin-top: 8px; letter-spacing: 0.26em; }
          .awardsPage .subtitle p { font-size: 8px; margin: 3px 0; }
          .awardsPage .hamburger { display: block; }
          .awardsPage .footerWrap { display: none; }
        }

              /* Persistent gold indicator for the current bottom-navigation route. */
        .bottomNavLink.isActive { color: #9c8664 !important; }

/* EXACT ABOUT REFERENCE: shared brand, header and navigation */
.awardsPage .container {
width: min(1680px, 88vw);
          margin: 0 auto;

          /* SAME POSITION AS OTHER APPROVED INTERNAL PAGES */
          padding: clamp(34px, 4vh, 48px) 0 0;
}
.awardsPage .header {
display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 22px;

          margin-left: clamp(100px, 7vw, 180px);

          margin-bottom: clamp(102px, 11vh, 140px);

          position: relative;
}
.awardsPage .homeLink {
display: flex;
          align-items: flex-start;
          gap: 22px;

          cursor: pointer;

          color: inherit;
          text-decoration: none;

          -webkit-tap-highlight-color: transparent;
}
.awardsPage .homeLink:hover {
opacity: 0.96;
}
.awardsPage .logo {
width: 90px;
          height: auto;

          display: block;

          object-fit: contain;

          opacity: 1;
}
.awardsPage .divider {
width: 1px;
          height: 64px;

          background: rgba(70, 65, 58, 0.22);

          margin-top: 4px;
}
.awardsPage .name {
margin: 0;

          font-size: clamp(24px, 2vw, 34px);

          font-weight: 300;

          letter-spacing: 0.22em;

          line-height: 1;

          color: #1d1b18;
}
.awardsPage .subtitle {
margin-top: 12px;

          font-family: Arial, sans-serif;

          letter-spacing: 0.28em;

          color: #6f685f;
}
.awardsPage .subtitle p {
margin: 4px 0;

          font-size: clamp(10px, 0.85vw, 13px);
}
.awardsPage .desktopNav {
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
.awardsPage .desktopNav span {
cursor: pointer;

          transition:
            color 0.45s ease,
            transform 0.45s ease;
}
.awardsPage .desktopNav span:hover {
color: #1d1b18;

          transform: scale(1.04);
}
.awardsPage .footerWrap {
width: min(1680px, 88vw);

          margin: 0 auto;

          padding-bottom: clamp(14px, 2vh, 28px);
}
.awardsPage .footerLine {
width: 100%;

          height: 1px;

          background: rgba(0, 0, 0, 0.08);

          margin-bottom: 20px;
}
.awardsPage .bottomNav {
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
.awardsPage .bottomNavItem {
display: flex;

          align-items: center;
}
.awardsPage .bottomNavLink {
cursor: pointer;

          white-space: nowrap;

          transition:
            color 0.45s ease,
            transform 0.45s ease;
}
.awardsPage .bottomNavLink:hover {
color: #1d1b18;

          transform: scale(1.08);
}
.awardsPage .navDivider {
width: 1px;

          height: clamp(10px, 0.9vw, 14px);

          background:
            rgba(111, 104, 95, 0.25);

          margin-left:
            clamp(4px, 0.7vw, 12px);

          margin-right:
            clamp(4px, 0.7vw, 12px);
}
.awardsPage .copyright {
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
 .awardsPage .homeLink > .logo { width:auto; height:calc(var(--brand-text-height, 86px) - 8px); max-width:none; flex-shrink:0; align-self:center; object-fit:contain; margin:0; }
 .awardsPage .homeLink > .divider { height:calc(var(--brand-text-height, 86px) - 20px); align-self:center; margin-top:0; flex-shrink:0; }
}
@media (min-width:721px) and (max-height:900px) {
 .awardsPage .container {padding-top:38px;}
 .awardsPage .header {margin-bottom:104px;}
 .awardsPage .footerLine {margin-bottom:16px;}
 .awardsPage .copyright {margin-top:9px;}
 .awardsPage .footerWrap {padding-bottom:12px;}
}
@media (min-width:721px) and (max-height:760px) {
 .awardsPage .container {padding-top:28px;}
 .awardsPage .header {margin-bottom:82px;}
}
@media (max-width:720px) {
 .awardsPage .container {width:92vw;padding-top:38px;}
 .awardsPage .header {flex-direction:column;align-items:center;gap:0;margin-left:0;margin-bottom:68px;text-align:center;}
 .awardsPage .homeLink {flex-direction:column;align-items:center;gap:0;}
 .awardsPage .logo {width:76px;height:auto;margin-bottom:26px;}
 .awardsPage .divider, .awardsPage .desktopNav {display:none;}
 .awardsPage .name {font-size:18px;letter-spacing:.18em;}
 .awardsPage .subtitle {margin-top:8px;letter-spacing:.26em;}
 .awardsPage .subtitle p {font-size:8px;margin:3px 0;}
 .awardsPage .footerWrap {display:none;}
}
/* Gold active item: COLOR ONLY. No changes to font, weight, scale or spacing. */
.awardsPage .desktopNav .navText.isCurrent,
.awardsPage .desktopNav .navCurrent,
.awardsPage .bottomNavLink.isActive {color:#9C8664 !important;}

      
        /* JA logo — restore original About width; do not resize navigation text. */
        @media (min-width: 721px) {
          .awardsPage .homeLink > .logo { width: 90px; height: auto; max-width: none; }
        }
        @media (min-width: 721px) and (max-height: 900px) {
          .awardsPage .homeLink > .logo { width: 82px; height: auto; }
        }
        @media (min-width: 721px) and (max-height: 760px) {
          .awardsPage .homeLink > .logo { width: 74px; height: auto; }
        }
        @media (max-width: 720px) {
          .awardsPage .homeLink > .logo { width: 76px; height: auto; }
        }
      
/* EXACT HEADER AND FOOTER CSS FROM USER-SUPPLIED ABOUT; NEVER MODIFY THESE DIMENSIONS */
.awardsPage .container {
          width: min(1680px, 88vw);
          margin: 0 auto;

          
          padding: clamp(34px, 4vh, 48px) 0 0;
        }
.awardsPage .header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 22px;

          margin-left: clamp(100px, 7vw, 180px);

          margin-bottom: clamp(102px, 11vh, 140px);

          position: relative;
        }
.awardsPage .homeLink {
          display: flex;
          align-items: flex-start;
          gap: 22px;

          cursor: pointer;

          color: inherit;
          text-decoration: none;

          -webkit-tap-highlight-color: transparent;
        }
.awardsPage .homeLink:hover {
          opacity: 0.96;
        }
.awardsPage .logo {
          width: 90px;
          height: auto;

          display: block;

          object-fit: contain;

          opacity: 1;
        }
.awardsPage .divider {
          width: 1px;
          height: 64px;

          background: rgba(70, 65, 58, 0.22);

          margin-top: 4px;
        }
.awardsPage .name {
          margin: 0;

          font-size: clamp(24px, 2vw, 34px);

          font-weight: 300;

          letter-spacing: 0.22em;

          line-height: 1;

          color: #1d1b18;
        }
.awardsPage .subtitle {
          margin-top: 12px;

          font-family: Arial, sans-serif;

          letter-spacing: 0.28em;

          color: #6f685f;
        }
.awardsPage .subtitle p {
          margin: 4px 0;

          font-size: clamp(10px, 0.85vw, 13px);
        }
.awardsPage .desktopNav {
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
.awardsPage .desktopNav span {
          cursor: pointer;

          transition:
            color 0.45s ease,
            transform 0.45s ease;
        }
.awardsPage .desktopNav span:hover {
          color: #1d1b18;

          transform: scale(1.04);
        }
.awardsPage .footerWrap {
          width: min(1680px, 88vw);

          margin: 0 auto;

          padding-bottom: clamp(14px, 2vh, 28px);
        }
.awardsPage .footerLine {
          width: 100%;

          height: 1px;

          background: rgba(0, 0, 0, 0.08);

          margin-bottom: 20px;
        }
.awardsPage .bottomNav {
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
.awardsPage .bottomNavItem {
          display: flex;

          align-items: center;
        }
.awardsPage .bottomNavLink {
          cursor: pointer;

          white-space: nowrap;

          transition:
            color 0.45s ease,
            transform 0.45s ease;
        }
.awardsPage .bottomNavLink:hover {
          color: #1d1b18;

          transform: scale(1.08);
        }
.awardsPage .navDivider {
          width: 1px;

          height: clamp(10px, 0.9vw, 14px);

          background:
            rgba(111, 104, 95, 0.25);

          margin-left:
            clamp(4px, 0.7vw, 12px);

          margin-right:
            clamp(4px, 0.7vw, 12px);
        }
.awardsPage .copyright {
          margin-top: 12px;

          text-align: center;

          font-family: Arial, sans-serif;

          font-size: clamp(7px, 0.55vw, 9px);

          letter-spacing: 0.28em;

          text-transform: uppercase;

          color: #b9b2a8;
        }
@media  (min-width: 721px) and (max-height: 900px)  {
.awardsPage .container {
            
            padding-top: 38px;
          }
.awardsPage .header {
            margin-bottom: 104px;
          }
.awardsPage .logo {
            width: 82px;
          }
.awardsPage .divider {
            height: 58px;
          }
.awardsPage .footerLine {
            margin-bottom: 16px;
          }
.awardsPage .copyright {
            margin-top: 9px;
          }
.awardsPage .footerWrap {
            padding-bottom: 12px;
          }
}
@media  (min-width: 721px) and (max-height: 760px)  {
.awardsPage .container {
            
            padding-top: 28px;
          }
.awardsPage .header {
            margin-bottom: 82px;
          }
.awardsPage .logo {
            width: 74px;
          }
}
@media  (max-width: 720px)  {
.awardsPage .container {
            width: 92vw;

            
            padding-top: 38px;
          }
.awardsPage .header {
            flex-direction: column;

            align-items: center;

            gap: 0;

            margin-left: 0;

            margin-bottom: 68px;

            text-align: center;
          }
.awardsPage .homeLink {
            flex-direction: column;

            align-items: center;

            gap: 0;
          }
.awardsPage .logo {
            width: 76px;

            margin-bottom: 26px;
          }
.awardsPage .divider, .awardsPage .desktopNav {
            display: none;
          }
.awardsPage .name {
            font-size: 18px;

            letter-spacing: 0.18em;
          }
.awardsPage .subtitle {
            margin-top: 8px;

            letter-spacing: 0.26em;
          }
.awardsPage .subtitle p {
            font-size: 8px;

            margin: 3px 0;
          }
.awardsPage .footerWrap {
            display: none;
          }
}
.awardsPage .navItem { position: relative; }
.awardsPage .desktopNav .navText { display: inline-block; outline-offset: 4px; }
.awardsPage .navDropdownPanel {
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
.awardsPage .navItem.navOpen .navDropdownPanel {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translate(-50%, 0);
        }
@media  (prefers-reduced-motion: reduce)  {
.awardsPage .navDropdownPanel { transition: none; }
}
.awardsPage .navDropdownInner {
          padding: 9px 0; border: 1px solid rgba(156,134,100,.18);
          background: rgba(255,255,255,.99);
          box-shadow: 0 12px 32px rgba(40,31,20,.09);
        }
.awardsPage .navDropdownLink {
          display: block; width: 100%; padding: 10px 17px;
          border: 0; background: transparent; color: #6f685f;
          text-align: left; font: 400 11px/1.4 Arial,sans-serif;
          letter-spacing: .08em; white-space: nowrap; cursor: pointer;
        }
.awardsPage .navDropdownLink:hover, .awardsPage .navDropdownLink:focus-visible {
          color: #1d1b18; background: #faf8f5;
        }
@media  (min-width: 721px)  {
.awardsPage .homeLink > .logo {
            width: auto;
            height: calc(var(--brand-text-height, 86px) - 8px);
            max-width: none;
            flex-shrink: 0;
            align-self: center;
            object-fit: contain;
            margin: 0;
          }
.awardsPage .homeLink > .divider {
            height: calc(var(--brand-text-height, 86px) - 20px);
            align-self: center;
            margin-top: 0;
            flex-shrink: 0;
          }
}

/* Navigation active state affects COLOR ONLY */
.awardsPage .desktopNav .activeNav, .awardsPage .desktopNav .navActive, .awardsPage .desktopNav .navText.activeNav, .awardsPage .desktopNav .navText.navActive, .awardsPage .bottomNav .activeNav, .awardsPage .bottomNav .navActive { color: #9C8664; }

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
              /* MOBILE NAVIGATION REFINEMENT — never changes desktop header/layout. */
        @media (max-width: 720px) {
          .awardsPage .hamburger {
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
          .awardsPage .hamburger span {
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
          .awardsPage .hamburger span:nth-child(1) { transform: translateY(-11px); }
          .awardsPage .hamburger span:nth-child(2) { transform: translateY(-3.7px); }
          .awardsPage .hamburger span:nth-child(3) { transform: translateY(3.7px); }
          .awardsPage .hamburger span:nth-child(4) { transform: translateY(11px); }
          .awardsPage .hamburger.isOpen span { background: #e1dbcf; }
          .awardsPage .hamburger.isOpen span:nth-child(1) { transform: rotate(45deg); }
          .awardsPage .hamburger.isOpen span:nth-child(2) { transform: scaleX(.55); opacity: 0; }
          .awardsPage .hamburger.isOpen span:nth-child(3) { transform: scaleX(.55); opacity: 0; }
          .awardsPage .hamburger.isOpen span:nth-child(4) { transform: rotate(-45deg); }
          .awardsPage .hamburger:focus-visible {
            outline: 1px solid #9C8664;
            outline-offset: 1px;
          }
          .awardsPage .mobileOverlay { z-index: 1100; }
          .awardsPage .mobilePanel {
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
          .awardsPage .mobilePanel.open { visibility: visible; }
          .awardsPage .mobileMenuItem {
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
          .awardsPage .mobileMenuItem:hover,
          .awardsPage .mobileMenuItem:focus-visible { color: #c9b38c; }
          .awardsPage .mobileMenuItem.isContact { color: #c9b38c; }
          .awardsPage .mobileMenuItem:focus-visible,
          .awardsPage .mobileSubmenuLink:focus-visible {
            outline: 1px solid #c9b38c;
            outline-offset: 4px;
          }
          /* Slow editorial accordion: always mounted, smoothly animates its height. */
          .awardsPage .mobileMenuItem.hasSubmenu {
            position: relative;
            padding-right: 20px;
          }
          .awardsPage .mobileMenuItem.hasSubmenu::after {
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
          .awardsPage .mobileMenuItem.hasSubmenu[aria-expanded="true"]::after {
            transform: translateY(4px) rotate(225deg);
          }
          .awardsPage .mobileSubmenu {
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
          .awardsPage .mobileSubmenu.isExpanded {
            grid-template-rows: 1fr;
            opacity: 1;
            margin-top: -18px;
            margin-bottom: 29px;
          }
          .awardsPage .mobileSubmenuInner {
            min-height: 0;
            overflow: hidden;
          }
          .awardsPage .mobileSubmenuLink {
            opacity: 0;
            transform: translateY(-8px);
            transition: opacity 580ms ease, transform 680ms cubic-bezier(.22,.61,.36,1), color 250ms ease;
          }
          .awardsPage .mobileSubmenu.isExpanded .mobileSubmenuLink {
            opacity: 1;
            transform: translateY(0);
          }
          .awardsPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(2) { transition-delay: 55ms; }
          .awardsPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(3) { transition-delay: 110ms; }
          .awardsPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(4) { transition-delay: 165ms; }
          .awardsPage.isMobileNavigating {
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
          .awardsPage .hamburger span,
          .awardsPage .mobilePanel,
          .awardsPage .mobileSubmenu,
          .awardsPage .mobileSubmenuLink,
          .awardsPage .mobileMenuItem.hasSubmenu::after,
          .awardsPage.isMobileNavigating { transition: none !important; }
        }

        /* Approved Home mobile brand hierarchy, Awards page only. */
        @media (max-width: 720px) {
          .awardsPage .subtitle p:first-child { font-size: 10px; letter-spacing: 0.26em; }
          .awardsPage .subtitle p:nth-child(2) { font-size: 7.4px; letter-spacing: 0.20em; }
        }

        /* MOBILE DRAWER ONLY — 7% wider than the original panel (3% less
           widening than the preceding 10% version). Keep the left edge of
           all menu labels fixed at their previously approved screen position. */
        @media (max-width: 720px) {
          .awardsPage .mobilePanel {
            width: min(83.46vw, 417.3px);
            padding-left: calc(34px + min(83.46vw, 417.3px) - min(78vw, 390px));
          }
        }

        /* MOBILE ACCORDION GUIDE DOTS — match approved Contact styling.
           Dots are 4px in diameter and shifted another 1px right.
           Compensate clipping without moving menu labels. */
        @media (max-width: 720px) {
          .awardsPage .mobileSubmenuInner {
            margin-left: -24px;
            padding-left: 24px;
          }
          .awardsPage .mobileSubmenuLink {
            position: relative;
            width: 100%;
          }
          .awardsPage .mobileSubmenuLink::before {
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

        /* Awards mobile: first two photographs 10% smaller than prior display. */
        @media (max-width: 640px) {
          .awardsPage .featureImage { width: min(90%, 396px); }
          .awardsPage .familyImage { width: min(90%, 504px); }
        }
        @media (min-width: 641px) and (max-width: 720px) {
          .awardsPage .featureImage { width: 35.1%; }
          .awardsPage .familyImage { width: min(90%, 504px); }
        }
        /* Awards mobile: first photo -> FIRST PLACE / Vancouver copy: +1 line. */
        @media (max-width: 720px) {
          .awardsPage .featureImage {
            margin-bottom: 46px; /* previously 24px on small phones; +22px */
          }
          /* Keep the previously established caption footprint beneath the ring. */
          .awardsPage .familyImageCaption {
            min-height: 15px;
          }
          /* Award, Recognition, Piece and Design Role — stacked in that order. */
          .awardsPage .familyDetailGrid {
            grid-template-columns: minmax(0, 1fr);
            row-gap: 18px;
          }
        }
        /* Awards / iPhone — precise vertical rhythm around the boutique details. */
        @media (max-width: 720px) {
          /* "architectural experience." → first horizontal rule: +1 line. */
          .awardsPage .featureCard > .featureClosing {
            margin-bottom: 40px; /* original 18px + 22px */
          }
          /* First horizontal rule → Award: precisely 30px on phone sizes. */
          .awardsPage .featureCard > .featureDivider {
            margin-bottom: 30px;
          }
          /* Material Focus: "Australian lacewood" → following horizontal rule: +1 line from previous version. */
          .awardsPage .featureCard {
            margin-bottom: 30px; /* previously 8px; add 22px */
          }
        }
        /* Family Tree / mobile — match the approved Vancouver boutique divider rhythm. */
        @media (max-width: 720px) {
          /* End of ring description to its divider: same 40px as Vancouver. */
          .awardsPage .familyFeature .familyClosing {
            margin-bottom: 40px;
          }
          /* Divider to Award: same approved 30px. */
          .awardsPage .familyAwardDetailDivider {
            margin-bottom: 30px;
          }
          /* Final detail to the following horizontal rule: same 30px. */
          .awardsPage .familyAward {
            margin-bottom: 30px;
          }
        }
        /* Preserve original tablet and desktop navigation above 720px. */

        /* Consistent approved Sculpture submenu selection feedback on phones. */
        @media (max-width: 720px) {
          .awardsPage .mobileSubmenu.isExpanded .mobileSubmenuLink.isSelected {
            color: #fff;
            transform: translateY(0) scale(1.055);
            transform-origin: left center;
            transition: color 140ms ease, transform 140ms ease;
          }
          .awardsPage .mobileSubmenuLink.isSelected::before {
            width: 6px;
            height: 6px;
            background: #fff;
            transform: translate(-1px, -50%);
          }
          .awardsPage.isMobileNavigating.hasSubmenuSelection {
            transition-duration: 200ms;
          }
        }

        /* Awards → Jewellery Design: editorial continuation after the complete recognition list.
           Scoped to this CTA; existing Awards / Home styles are untouched. */
        .awardsPage .jewelleryExploreSection {
          clear: both;
          width: min(860px, 100%);
          margin: 88px auto 106px;
          text-align: center;
        }
        .awardsPage .jewelleryExploreSection .jewelleryExploreEyebrow {
          margin: 0 0 22px;
          font-family: Arial, sans-serif;
          font-size: 13px;
          line-height: 1.1;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #9C8664;
        }
        .awardsPage .jewelleryExploreSection h2 {
          margin: 0 0 25px;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(30px, 2.45vw, 44px);
          font-weight: 400;
          line-height: 1.12;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #2A2723;
        }
        .awardsPage .jewelleryExploreSection .jewelleryExploreCopy {
          max-width: 760px;
          margin: 0 auto 32px;
          font-family: "Times New Roman", Georgia, serif;
          font-size: 17px;
          font-weight: 300;
          line-height: 1.82;
          color: #6C6258;
        }
        /* The CTA matches Home's gold button, including hover arrow. */
        .awardsPage .jewelleryExploreButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 26px;
          min-width: 330px;
          padding: 16px 26px;
          border: 1px solid #C8B08A;
          border-radius: 0;
          background: #C8B08A;
          color: #FFFDF8;
          font-family: Arial, sans-serif;
          font-size: 11.5px;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 0.23em;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.35s ease, border-color 0.35s ease, background-color 0.35s ease;
        }
        .awardsPage .jewelleryExploreButton:hover,
        .awardsPage .jewelleryExploreButton:focus-visible {
          background: #ffffff;
          border-color: #C8B08A;
          color: #9C8664;
        }
        .awardsPage .jewelleryExploreButton:focus-visible {
          outline: 2px solid #9C8664;
          outline-offset: 4px;
        }
        .awardsPage .jewelleryExploreButton .jewelleryExploreArrow {
          display: inline-block;
          font-size: 16px;
          line-height: 1;
          letter-spacing: 0;
          transition: transform 0.35s ease;
        }
        .awardsPage .jewelleryExploreButton:hover .jewelleryExploreArrow {
          transform: translateX(5px);
        }
        @media (max-width: 720px) {
          .awardsPage .jewelleryExploreSection {
            width: 100%;
            margin: 90px auto 86px; /* Mobile only: +24px space above CTA */
          }
          .awardsPage .jewelleryExploreSection .jewelleryExploreEyebrow {
            font-size: 12px;
            letter-spacing: 0.34em;
          }
          .awardsPage .jewelleryExploreSection h2 {
            font-size: 28px;
            letter-spacing: 0.11em;
          }
          .awardsPage .jewelleryExploreSection .jewelleryExploreCopy {
            font-size: 16px;
            line-height: 1.75;
            margin-bottom: 30px;
          }
          .awardsPage .jewelleryExploreButton {
            width: 100%;
            min-width: 0;
            padding: 16px 15px;
            gap: 14px;
            font-size: 10px;
            letter-spacing: 0.18em;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .awardsPage .jewelleryExploreButton,
          .awardsPage .jewelleryExploreButton .jewelleryExploreArrow { transition: none; }
        }

        /* DESKTOP ONLY — extra 24px between each introductory paragraph
           and the photograph with its accompanying copy; retain their alignment. */
        @media (min-width: 721px) {
          .awardsPage .topIntro { margin-bottom: 82px; } /* 58px + 24px */
          .awardsPage .familyAwardHeading { margin-bottom: 74px; } /* 50px + 24px */
          /* Same 120px space below the preceding rule as the Recognition heading. */
          .awardsPage .familyAward { margin-top: 120px; }
        }
        /* MOBILE ONLY — match 2016 spacing to Recognition's 78px rule-to-label gap. */
        @media (max-width: 720px) {
          .awardsPage .familyAward { margin-top: 78px; }
        }

`}</style>

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
            <div className={`navItem ${desktopDropdown === "work" ? "navOpen" : ""}`} onMouseEnter={() => setDesktopDropdown("work")} onFocusCapture={() => setDesktopDropdown("work")}>
              <span className={`navText ${activePath === "/work" ? "isCurrent" : ""}`} role="link" tabIndex={0} aria-haspopup="true"
                aria-expanded={desktopDropdown === "work"}
                onClick={() => go("/work")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go("/work"); } }}
              >Selected Work</span>
              <div className="navDropdownPanel">
                <div className="navDropdownInner">
                  {selectedWorkLinks.map((item) => (
                    <button key={item.path} type="button" className="navDropdownLink" onClick={() => go(item.path)}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className={`navItem ${desktopDropdown === "jewellery" ? "navOpen" : ""}`} onMouseEnter={() => setDesktopDropdown("jewellery")} onFocusCapture={() => setDesktopDropdown("jewellery")}>
              <span className={`navText ${activePath === "/jewellery-design" ? "isCurrent" : ""}`} role="link" tabIndex={0} aria-haspopup="true"
                aria-expanded={desktopDropdown === "jewellery"}
                onClick={() => go("/jewellery-design")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go("/jewellery-design"); } }}
              >Jewellery Design</span>
              <div className="navDropdownPanel">
                <div className="navDropdownInner">
                  {jewelleryLinks.map((item) => (
                    <button key={item.path} type="button" className="navDropdownLink" onClick={() => go(item.path)}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <span className={activePath === "/about" ? "navCurrent" : ""} role="link" tabIndex={0} onMouseEnter={() => setDesktopDropdown(null)} onFocus={() => setDesktopDropdown(null)} onClick={() => navigate("/about")} onKeyDown={(e) => e.key === "Enter" && navigate("/about")}>About</span>
            <span className={activePath === "/contact" ? "navCurrent" : ""} role="link" tabIndex={0} onMouseEnter={() => setDesktopDropdown(null)} onFocus={() => setDesktopDropdown(null)} onClick={() => navigate("/contact")} onKeyDown={(e) => e.key === "Enter" && navigate("/contact")}>Contact</span>
          </nav>

        </header>

      </div>

      <button
        type="button"
        className={`hamburger${menuOpen ? " isOpen" : ""}`}
        onClick={() => {
          setMenuOpen((wasOpen) => !wasOpen);
          setMobileDropdown(null);
        }}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="awards-mobile-navigation"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>



      <div className="pageWrap">
        <section className="topIntro">
          <p className="topicLabel awardYearLabel">2009</p>
          <h2 className="mainTitle">Ed Fielder Architecture Award</h2>
          <div className="titleLine"></div>
          <p className="introCopy">
            An award-winning retail interior concept developed for a jewellery boutique in Vancouver —
            recognized with First Place for its refined spatial composition, warm material palette and
            luxury presentation.
          </p>
        </section>

        <section className="featureCard">
          <figure className="featureImage">
            <img
              src="/vancouver-award-boutique.jpg"
              alt="Award-winning jewellery boutique interior concept designed by Andrei Jiliaev for Vancouver"
            />
          </figure>

          <div className="featureCopy">
            <div className="featureMeta">
              <span>First Place</span>
              <span>Vancouver</span>
            </div>

            <h3 className="featureTitle">Vancouver Retail Boutique</h3>
            <p className="featureSub">Australian Lacewood · Retail Interior Design</p>

            <p className="featureText">
              Designed by Andrei Jiliaev for a jewellery boutique in Vancouver, this award-winning interior
              brings together an intimate spatial composition, carefully integrated displays and a warm,
              refined material palette. The project received First Place in the 2009 Ed Fielder Architecture
              Award.
            </p>

            <p className="featureText">
              Andrei developed the original concept and interior design, including spatial planning,
              custom furniture and jewellery display systems. His work extended to the technical
              drawings, blueprints and detailed plans for furniture and display fabrication —
              carrying the design from the first idea through to its practical realization.
            </p>

            <p className="featureText">
              Australian lacewood defines the interior's distinctive character. Its richly figured
              surface complements the curved wall panels, custom vitrines and sculptural display
              islands, while layered lighting creates a calm setting that gives the jewellery
              a clear and elegant presence.
            </p>

          </div>

          <p className="featureText featureClosing">
            Conceived as a complete retail environment rather than a collection of individual displays,
            the boutique reflects a unified approach to concept, form, materials and technical detailing.
            Every element was designed to support the jewellery presentation while creating a distinctive
            architectural experience.
          </p>

          <div className="featureDivider" aria-hidden="true"></div>
          <div className="detailGrid">
            <div className="detailCard"><span>Award</span><p>Ed Fielder Architecture Award</p></div>
            <div className="detailCard"><span>Recognition</span><p>First Place</p></div>
            <div className="detailCard"><span>Location</span><p>Vancouver, British Columbia</p></div>
            <div className="detailCard"><span>Material Focus</span><p>Australian lacewood</p></div>
          </div>
        </section>

        <div className="sectionLine"></div>


        {/* 2016 — featured jewellery award. Mirror the interior-design feature above. */}
        <section className="familyAward" aria-labelledby="family-award-heading">
          <div className="familyAwardHeading">
            <p className="topicLabel awardYearLabel">2016</p>
            <h2 id="family-award-heading" className="mainTitle">Canadian Jeweller Award of Excellence</h2>
            <div className="titleLine" aria-hidden="true"></div>
            <p className="introCopy">
              Winner — Best Canadian Diamond Design of the Year. A celebration of
              original jewellery design, technical precision and the relationship
              between two diamonds cut from the same original stone.
            </p>
          </div>

          <div className="familyFeature">
            <figure className="familyImage">
              <img
                src="/seraphine-diamond-architecture.jpg"
                alt="Seraphine — architectural diamond ring study by Andrei Jiliaev"
                loading="lazy"
              />
              <figcaption className="familyImageCaption" aria-hidden="true">&nbsp;</figcaption>
            </figure>
            <div className="familyFeatureCopy">
              <div className="featureMeta">
                <span>Winner</span>
                <span>Best Canadian Diamond Design</span>
              </div>
              <h3 className="featureTitle">The Family Tree</h3>
              <p className="featureSub">High Jewellery · Original Design &amp; Technical Development</p>

              <p className="featureText">
                The Family Tree received the 2016 Canadian Jeweller Award of
                Excellence for Best Canadian Diamond Design. At the centre of the
                design is a remarkable story: a 9.04-carat diamond was divided
                into two unequal portions, yielding a 4.15-carat oval brilliant
                and a 0.79-carat pear-shaped brilliant diamond.
              </p>

              <p className="featureText">
                Andrei Jiliaev developed the piece from the initial concept
                through composition, jewellery design, detailed drawings and
                technical development. Flowing botanical forms surround and
                connect the two principal diamonds, bringing a sense of growth
                and continuity to the sculptural design.
              </p>

              <p className="featureText familyClosing">
                The finished work brings together expressive botanical forms, a distinctive
                relationship between two diamonds and the technical precision needed to
                transform an original concept into a fully resolved piece of high jewellery.
                From the first sketches to the detailed drawings, each element was developed
                as part of one cohesive sculptural composition.
              </p>
            </div>

          </div>

          <div className="familyAwardDetailDivider" aria-hidden="true"></div>
          <div className="familyDetailGrid">
            <div className="familyDetailColumn">
              <div className="detailCard">
                <span>Award</span>
                <p>Canadian Jeweller Award of Excellence</p>
              </div>
              <div className="detailCard">
                <span>Recognition</span>
                <p>Winner — Best Canadian Diamond Design</p>
              </div>
            </div>
            <div className="familyDetailColumn">
              <div className="detailCard">
                <span>Piece</span>
                <p>The Family Tree</p>
              </div>
              <div className="detailCard">
                <span>Design Role</span>
                <p>Concept · Jewellery Design · Technical Drawings</p>
              </div>
            </div>
          </div>
        </section>

        <div className="sectionLine recognitionDivider"></div>

        <section className="awardsListBlock">
          <div className="sectionHeading">
            <p className="topicLabel recognitionTitleLabel">Recognition</p>
            <h2>Awards & Distinctions</h2>
            <p>
              A selected record of professional recognition across jewellery design,
              concept development and award-winning presentation.
            </p>
          </div>

          <div className="recognitionList">
            {recognitions.map((item, index) => (
              <div key={`${item.year}-${item.title}-${index}`} className="awardItem">
                <div className="awardYear">{item.year}</div>
                <div>
                  <h3 className="awardTitle">{item.title}</h3>
                  <p className="awardDetail">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Invitation after the complete awards list into the four-part jewellery portfolio. */}
        <section className="jewelleryExploreSection" aria-labelledby="awards-jewellery-explore-heading">
          <p className="jewelleryExploreEyebrow">Explore Further</p>
          <h2 id="awards-jewellery-explore-heading">Discover More Jewellery Designs</h2>
          <p className="jewelleryExploreCopy">
            Explore original jewellery concepts, distinctive collections and the creative
            process behind each design.
          </p>
          <button
            type="button"
            className="jewelleryExploreButton"
            onClick={() => go("/jewellery-design")}
          >
            <span>Explore Jewellery Design</span>
            <span className="jewelleryExploreArrow" aria-hidden="true">→</span>
          </button>
        </section>

      </div>

      <footer className="footerWrap">

        <div className="footerLine"></div>

        <div className="bottomNav">

          {bottomNavItems.map(
            (item, index) => (

              <div
                key={item.path}
                className="bottomNavItem"
              >

                <span
                  className={`bottomNavLink ${activePath === item.path ? "isActive" : ""}`}
                  aria-current={activePath === item.path ? "page" : undefined}

                  onClick={(event) => {
                    if (item.label === "Sculpture") {
                      event.stopPropagation();
                      window.location.assign("/sculpture");
                      return;
                    }
                    navigate(item.path);
                  }}
                >
                  {item.label}
                </span>

                {index !==
                  bottomNavItems.length - 1 && (
                    <div className="navDivider"></div>
                  )}

              </div>

            )
          )}

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
        id="awards-mobile-navigation"
        className={menuOpen ? "mobilePanel open" : "mobilePanel"}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <button
          type="button"
          className="mobileMenuItem hasSubmenu"
          aria-expanded={mobileDropdown === "work"}
          aria-controls="awards-work-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "work" ? null : "work")}
        >SELECTED WORK</button>
        <div
          id="awards-work-submenu"
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
          aria-controls="awards-jewellery-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "jewellery" ? null : "jewellery")}
        >JEWELLERY DESIGN</button>
        <div
          id="awards-jewellery-submenu"
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
