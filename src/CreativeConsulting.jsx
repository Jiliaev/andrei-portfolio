import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

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

export default function CreativeConsulting() {

  const [menuOpen, setMenuOpen] = useState(false);

  const [mobileDropdown, setMobileDropdown] = useState(null);

  const [desktopDropdown, setDesktopDropdown] = useState(null);

  const [mobileNavigating, setMobileNavigating] = useState(false);

  const [selectedMobileSubLink, setSelectedMobileSubLink] = useState(null);

  const mobileSelectionFadeTimer = useRef(null);

  const navigationTimer = useRef(null);

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

  return (

    <main className={`consultingPage${mobileNavigating ? " isMobileNavigating" : ""}${selectedMobileSubLink ? " hasSubmenuSelection" : ""}`}>

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

        .consultingPage {

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

          /* SAME APPROVED TOP POSITION */

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

           INTRO

        ========================================================= */

        .pageWrap {

          width: min(1180px, 86vw);

          margin: 0 auto;

          text-align: center;

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

        /* All five large section headings share this exact typography. */

        .mainTitle,

        .sectionTitle {

          margin: 0 0 34px;

          font-family: "Cormorant Garamond", serif;

          font-size: clamp(30px, 2.45vw, 44px);

          line-height: 1.12;

          letter-spacing: 0.14em;

          text-transform: uppercase;

          font-weight: 400;

          color: #2A2723;

        }

        .subTitle {

          margin: 0 auto 88px;

          font-family: Arial, sans-serif;

          font-size: 11px;

          line-height: 1.7;

          letter-spacing: 0.28em;

          text-transform: uppercase;

          color: #6f685f;

        }

        .heroImage,

        .carriageImage {

          width: min(658px, 69.575vw);

          height: auto;

          display: block;

          margin: 0 auto 92px;

          object-fit: contain;

        }

        .projectScopeRamImage {

          width: min(757px, 80.011vw);

        }

        .introText {

          max-width: 850px;

          margin: 0 auto 104px;

          font-size: 16px;

          line-height: 1.84;

          color: #3F3933;

          font-weight: 300;

        }

        .introText p {

          margin: 0 auto 20px;

        }

        /* =========================================================

           OPPORTUNITIES

        ========================================================= */

        .opportunitiesSection {

          width: min(860px, 84vw);

          margin: 0 auto 104px;

          text-align: center;

        }

        .opportunitiesSection p {

          margin: 0 auto 20px;

          font-size: 16px;

          line-height: 1.84;

          color: #3F3933;

          font-weight: 300;

        }

        .opportunityStatement {

          color: #6C6258 !important;

        }

        /* =========================================================

           HORIZONTAL DIVIDER

        ========================================================= */

        .horizontalLine {

          width: min(1680px, 88vw);

          height: 1px;

          background: rgba(0, 0, 0, 0.08);

          margin: 0 auto 96px;

        }

        /* =========================================================

           CONTRIBUTION

        ========================================================= */

        .contributionSection {

          width: min(1080px, 86vw);

          margin: 0 auto 104px;

          text-align: center;

        }

        .contributionGrid {

          display: grid;

          grid-template-columns: repeat(4, 1fr);

          gap: 0;

          margin-top: 66px;

        }

        .contributionCard {

          padding: 0 30px;

          border-right:

            1px solid rgba(70, 65, 58, 0.14);

        }

        .contributionCard:last-child {

          border-right: none;

        }

        .contributionCard h3 {

          margin: 0 0 20px;

          font-family: Arial, sans-serif;

          font-size: 10px;

          line-height: 1.5;

          letter-spacing: 0.26em;

          text-transform: uppercase;

          font-weight: 400;

          color: #1d1b18;

        }

        .contributionCard p {

          margin: 0;

          font-size: 14px;

          line-height: 1.75;

          color: #3F3933;

          font-weight: 300;

        }

        /* =========================================================

           PERSPECTIVE / SCOPE

        ========================================================= */

        .perspectiveSection,

        .scopeSection {

          width: min(880px, 84vw);

          margin: 0 auto 104px;

          text-align: center;

        }

        .perspectiveSection p,

        .scopeSection p {

          margin: 0 auto 20px;

          font-size: 16px;

          line-height: 1.84;

          color: #3F3933;

          font-weight: 300;

        }

        .finalSection {

          margin-bottom: 130px;

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

          background: rgba(111, 104, 95, 0.25);

          margin-left: clamp(4px, 0.7vw, 12px);

          margin-right: clamp(4px, 0.7vw, 12px);

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

          background: rgba(0, 0, 2, 0.18);

          backdrop-filter: blur(2px);

          opacity: 0;

          pointer-events: none;

          transition: opacity 0.45s ease;

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

          background: rgba(0, 0, 2, 0.40);

          backdrop-filter: blur(10px);

          transform: translateX(100%);

          transition: transform 0.45s ease;

          z-index: 30;

          padding: 38px 34px;

          border-left:

            1px solid rgba(201, 179, 140, 0.18);

        }

        .mobilePanel.open {

          transform: translateX(0);

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

          font-size: clamp(20px, 5.5vw, 30px);

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

            /* SAME APPROVED POSITION */

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

          .subTitle {

            margin-bottom: 78px;

          }

          .heroImage,

        .carriageImage {

            width: min(620px, 68.31vw);

            margin-bottom: 78px;

          }

          .projectScopeRamImage {

            width: min(713px, 78.557vw);

          }

          .introText {

            margin-bottom: 88px;

          }

          .opportunitiesSection,

          .contributionSection,

          .perspectiveSection,

          .scopeSection {

            margin-bottom: 88px;

          }

          .horizontalLine {

            margin-bottom: 82px;

          }

          .contributionGrid {

            margin-top: 56px;

          }

          .finalSection {

            margin-bottom: 105px;

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

            /* SAME VERY-SHORT POSITION */

            padding-top: 28px;

          }

          .header {

            margin-bottom: 82px;

          }

          .logo {

            width: 74px;

          }

          .subTitle {

            margin-bottom: 72px;

          }

          .heroImage,

        .carriageImage {

            width: min(582px, 65.78vw);

            margin-bottom: 70px;

          }

          .projectScopeRamImage {

            width: min(669px, 75.647vw);

          }

          .introText {

            margin-bottom: 80px;

          }

          .opportunitiesSection,

          .contributionSection,

          .perspectiveSection,

          .scopeSection {

            margin-bottom: 80px;

          }

          .horizontalLine {

            margin-bottom: 74px;

          }

          .contributionGrid {

            margin-top: 50px;

          }

          .finalSection {

            margin-bottom: 94px;

          }

        }

        /* =========================================================

           MOBILE

        ========================================================= */

        @media (max-width: 720px) {

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

          }

          .topicLabel {

            font-size: 12px;

            letter-spacing: 0.34em;

            padding-left: 0.34em;

          }

          .mainTitle,

          .sectionTitle {

            font-size: 28px;

            letter-spacing: 0.11em;

            line-height: 1.12;

          }

          .subTitle {

            width: 88vw;

            margin-bottom: 70px;

            font-size: 9px;

            letter-spacing: 0.22em;

            line-height: 1.8;

          }

          .heroImage,

        .carriageImage {

            width: 118.8vw;

            transform: translateX(-15.4vw);

            margin-bottom: 66px;

          }

          .projectScopeRamImage {

            width: 136.62vw;

            transform: translateX(-24.3vw);

          }

          .introText,

          .perspectiveSection p,

          .scopeSection p,

          .opportunitiesSection p {

            font-size: 16px;

            line-height: 1.75;

          }

          .introText {

            width: 88vw;

            margin-bottom: 86px;

          }

          .opportunitiesSection {

            width: 88vw;

            margin-bottom: 70px;

          }

          .contributionSection {

            width: 88vw;

            margin-bottom: 70px;

          }

          .contributionGrid {

            grid-template-columns: 1fr;

            gap: 46px;

            margin-top: 54px;

          }

          .contributionCard {

            border-right: none;

            padding: 0;

          }

          .contributionCard:not(:last-child)::after {

            content: "";

            display: block;

            width: 42px;

            height: 1px;

            background: #9C8664;

            opacity: 0.45;

            margin: 22px auto 0;

          }

          .perspectiveSection,

          .scopeSection {

            width: 88vw;

            margin-bottom: 70px;

          }

          .horizontalLine {

            margin-bottom: 70px;

          }

          .finalSection {

            margin-bottom: 68px; /* 44px (two text lines) closer to the final ram image on mobile */

          }

          .footerWrap {

            display: none;

          }

        }

        .navItem {

          position: relative;

        }

        .desktopNav .navItem > .navText {

          display: inline-block;

          outline-offset: 4px;

        }

        /* Match About: fade + vertical motion instead of legacy display toggle. */

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

        /* =========================================================

           CONTACT — SAME APPROVED JA LOGO / TEXT ALIGNMENT

           Match the visible height of the name plus two subtitle lines.

           The text line boxes have a few pixels of invisible padding:

           remove 8px from their measured total height, NOT 40% or more.

           Keep the divider 6px shorter than the logo at both ends.

           Mobile header layout stays unchanged.

        ========================================================= */

        @media (min-width: 721px) {

          .consultingPage .homeLink > .logo {

            width: auto;

            height: calc(var(--brand-text-height, 86px) - 8px);

            max-width: none;

            flex-shrink: 0;

            align-self: center;

            object-fit: contain;

            margin: 0;

          }

          .consultingPage .homeLink > .divider {

            height: calc(var(--brand-text-height, 86px) - 20px);

            align-self: center;

            margin-top: 0;

            flex-shrink: 0;

          }

        }

        /* FINAL TYPOGRAPHY — descriptions only, desktop + mobile */

        .consultingPage .introText,

        .consultingPage .downloadText {

          font-size: 17px;

          line-height: 1.82;

        }

        /* CREATIVE CONSULTING — original design proportions preserved.

           Main prose matches the approved 17 px About / Contact typography.

           The hero image, headings, small labels, card text and colours

           remain under the original page rules above. */

        .consultingPage .opportunitiesSection > p:not(.topicLabel),

        .consultingPage .perspectiveSection > p:not(.topicLabel),

        .consultingPage .scopeSection > p:not(.topicLabel) {

          font-size: 17px;

          line-height: 1.82;

        }

        /* Unified gold section labels. Keep the same type hierarchy as

           Creative Consulting even where section-specific p rules apply. */

        .consultingPage .pageWrap > .topicLabel,

        .consultingPage .opportunitiesSection > .topicLabel,

        .consultingPage .contributionSection > .topicLabel,

        .consultingPage .perspectiveSection > .topicLabel,

        .consultingPage .scopeSection > .topicLabel {

          font-family: Arial, sans-serif;

          font-size: 13px;

          font-weight: 400;

          line-height: 1.1;

          letter-spacing: 0.38em;

          text-transform: uppercase;

          color: #9C8664;

        }

        @media (max-width: 720px) {

          .consultingPage .pageWrap > .topicLabel,

          .consultingPage .opportunitiesSection > .topicLabel,

          .consultingPage .contributionSection > .topicLabel,

          .consultingPage .perspectiveSection > .topicLabel,

          .consultingPage .scopeSection > .topicLabel {

            font-size: 12px;

            letter-spacing: 0.34em;

          }

        }

        /* The third and fourth artworks only: 85% of previously approved size. */

        .consultingPage .carriageImage.consultingThirdImage {

          width: min(559.3px, 59.13875vw);

        }

        .consultingPage .carriageImage.projectScopeRamImage {

          width: min(643.45px, 68.00935vw);

        }

        @media (min-width: 721px) and (max-height: 900px) {

          .consultingPage .carriageImage.consultingThirdImage {

            width: min(527px, 58.0635vw);

          }

          .consultingPage .carriageImage.projectScopeRamImage {

            width: min(606.05px, 66.77345vw);

          }

        }

        @media (min-width: 721px) and (max-height: 760px) {

          .consultingPage .carriageImage.consultingThirdImage {

            width: min(494.7px, 55.913vw);

          }

          .consultingPage .carriageImage.projectScopeRamImage {

            width: min(568.65px, 64.29995vw);

          }

        }

        @media (max-width: 720px) {

          .consultingPage .carriageImage.consultingThirdImage {

            width: 100.98vw;

            position: relative;

            left: 50%;

            transform: translateX(-50%);

          }

          .consultingPage .carriageImage.projectScopeRamImage {

            width: 116.127vw;

            position: relative;

            left: 50%;

            transform: translateX(-50%);

          }

        }

        /* Active footer link: same gold + subtle scale as About. */

        .consultingPage .bottomNav .bottomNavLink.isActive {

          color: #9C8664 !important;

          transform: scale(1.08);

          transform-origin: center center;

        }

              /* MOBILE NAVIGATION REFINEMENT — never changes desktop header/layout. */

        @media (max-width: 720px) {

          .consultingPage .hamburger {

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

          .consultingPage .hamburger span {

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

          .consultingPage .hamburger span:nth-child(1) { transform: translateY(-11px); }

          .consultingPage .hamburger span:nth-child(2) { transform: translateY(-3.7px); }

          .consultingPage .hamburger span:nth-child(3) { transform: translateY(3.7px); }

          .consultingPage .hamburger span:nth-child(4) { transform: translateY(11px); }

          .consultingPage .hamburger.isOpen span { background: #e1dbcf; }

          .consultingPage .hamburger.isOpen span:nth-child(1) { transform: rotate(45deg); }

          .consultingPage .hamburger.isOpen span:nth-child(2) { transform: scaleX(.55); opacity: 0; }

          .consultingPage .hamburger.isOpen span:nth-child(3) { transform: scaleX(.55); opacity: 0; }

          .consultingPage .hamburger.isOpen span:nth-child(4) { transform: rotate(-45deg); }

          .consultingPage .hamburger:focus-visible {

            outline: 1px solid #9C8664;

            outline-offset: 1px;

          }

          .consultingPage .mobileOverlay { z-index: 1100; }

          .consultingPage .mobilePanel {

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

          .consultingPage .mobilePanel.open { visibility: visible; }

          .consultingPage .mobileMenuItem {

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

          .consultingPage .mobileMenuItem:hover,

          .consultingPage .mobileMenuItem:focus-visible { color: #c9b38c; }

          .consultingPage .mobileMenuItem.isContact { color: #c9b38c; }

          .consultingPage .mobileMenuItem:focus-visible,

          .consultingPage .mobileSubmenuLink:focus-visible {

            outline: 1px solid #c9b38c;

            outline-offset: 4px;

          }

          /* Slow editorial accordion: always mounted, smoothly animates its height. */

          .consultingPage .mobileMenuItem.hasSubmenu {

            position: relative;

            padding-right: 20px;

          }

          .consultingPage .mobileMenuItem.hasSubmenu::after {

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

          .consultingPage .mobileMenuItem.hasSubmenu[aria-expanded="true"]::after {

            transform: translateY(4px) rotate(225deg);

          }

          .consultingPage .mobileSubmenu {

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

          .consultingPage .mobileSubmenu.isExpanded {

            grid-template-rows: 1fr;

            opacity: 1;

            margin-top: -18px;

            margin-bottom: 29px;

          }

          .consultingPage .mobileSubmenuInner {

            min-height: 0;

            overflow: hidden;

          }

          .consultingPage .mobileSubmenuLink {

            opacity: 0;

            transform: translateY(-8px);

            transition: opacity 580ms ease, transform 680ms cubic-bezier(.22,.61,.36,1), color 250ms ease;

          }

          .consultingPage .mobileSubmenu.isExpanded .mobileSubmenuLink {

            opacity: 1;

            transform: translateY(0);

          }

          .consultingPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(2) { transition-delay: 55ms; }

          .consultingPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(3) { transition-delay: 110ms; }

          .consultingPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(4) { transition-delay: 165ms; }

          .consultingPage.isMobileNavigating {

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

          .consultingPage .hamburger span,

          .consultingPage .mobilePanel,

          .consultingPage .mobileSubmenu,

          .consultingPage .mobileSubmenuLink,

          .consultingPage .mobileMenuItem.hasSubmenu::after,

          .consultingPage.isMobileNavigating { transition: none !important; }

        }

        @media (max-width: 720px) {

          .consultingPage .subtitle p:first-child {font-size:10px;letter-spacing:.26em;}

          .consultingPage .subtitle p:nth-child(2) {font-size:7.4px;letter-spacing:.20em;}

        }

        /* MOBILE DRAWER ONLY — 7% wider than the original panel (3% less

           widening than the preceding 10% version). Keep the left edge of

           all menu labels fixed at their previously approved screen position. */

        @media (max-width: 720px) {

          .consultingPage .mobilePanel {

            width: min(83.46vw, 417.3px);

            padding-left: calc(34px + min(83.46vw, 417.3px) - min(78vw, 390px));

          }

        }

        /* MOBILE ACCORDION GUIDE DOTS — match approved Contact styling.

           Dots are 4px in diameter and shifted another 1px right.

           Compensate clipping without moving menu labels. */

        @media (max-width: 720px) {

          .consultingPage .mobileSubmenuInner {

            margin-left: -24px;

            padding-left: 24px;

          }

          .consultingPage .mobileSubmenuLink {

            position: relative;

            width: 100%;

          }

          .consultingPage .mobileSubmenuLink::before {

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

        /* Only the second photograph: Floral Carriage. 5% larger than previous mobile version. */

        @media (max-width: 720px) {

          .consultingPage > .carriageImage:not(.consultingThirdImage):not(.projectScopeRamImage) {

            width: 99.792vw;

            max-width: none;

            position: relative;

            left: 50%;

            transform: translateX(-50%);

          }

        }



        /* Consistent approved Sculpture submenu selection feedback on phones. */

        @media (max-width: 720px) {

          .consultingPage .mobileSubmenu.isExpanded .mobileSubmenuLink.isSelected {

            color: #fff;

            transform: translateY(0) scale(1.055);

            transform-origin: left center;

            transition: color 140ms ease, transform 140ms ease;

          }

          .consultingPage .mobileSubmenuLink.isSelected::before {

            width: 6px;

            height: 6px;

            background: #fff;

            transform: translate(-1px, -50%);

          }

          .consultingPage.isMobileNavigating.hasSubmenuSelection {

            transition-duration: 200ms;

          }

        }

        /* Desktop only: add one true heading-line (15px) before the SECOND
           card description. Padding avoids sibling-margin collapsing;
           the other three cards and all phone styles remain untouched. */
        @media (min-width: 721px) {
          .consultingPage .contributionGrid > .contributionCard:nth-child(2) > p {
            padding-top: 15px;
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

              <span

                className="navText"

                role="button"

                tabIndex={0}

                aria-haspopup="true"

                aria-expanded={desktopDropdown === "work"}

                onClick={() => closeAndNavigate("/work")}

                onKeyDown={(e) => {

                  if (e.key === "Enter" || e.key === " ") {

                    e.preventDefault();

                    closeAndNavigate("/work");

                  }

                }}

              >Selected Work</span>

              <div className="navDropdownPanel">

                <div className="navDropdownInner">

                  {selectedWorkLinks.map((item) => (

                    <button key={item.path} type="button" className="navDropdownLink" onClick={() => closeAndNavigate(item.path)}>

                      {item.label}

                    </button>

                  ))}

                </div>

              </div>

            </div>

            <div className={`navItem ${desktopDropdown === "jewellery" ? "navOpen" : ""}`} onMouseEnter={() => setDesktopDropdown("jewellery")}>

              <span

                className="navText"

                role="button"

                tabIndex={0}

                aria-haspopup="true"

                aria-expanded={desktopDropdown === "jewellery"}

                onClick={() => closeAndNavigate("/jewellery-design")}

                onKeyDown={(e) => {

                  if (e.key === "Enter" || e.key === " ") {

                    e.preventDefault();

                    closeAndNavigate("/jewellery-design");

                  }

                }}

              >Jewellery Design</span>

              <div className="navDropdownPanel">

                <div className="navDropdownInner">

                  {jewelleryLinks.map((item) => (

                    <button key={item.path} type="button" className="navDropdownLink" onClick={() => closeAndNavigate(item.path)}>

                      {item.label}

                    </button>

                  ))}

                </div>

              </div>

            </div>

            <span role="link" tabIndex={0} onClick={() => navigate("/about")} onKeyDown={(e) => e.key === "Enter" && navigate("/about")}>About</span>

            <span role="link" tabIndex={0} onClick={() => navigate("/contact")} onKeyDown={(e) => e.key === "Enter" && navigate("/contact")}>Contact</span>

          </nav>

        </header>

      </div>

      {/* CREATIVE CONSULTING — CONCEPT-LED PORTFOLIO */}

      <section className="pageWrap">

        <p className="topicLabel">Creative Consulting</p>

        <h1 className="mainTitle">Creative Consulting &amp; Collection Development</h1>

        <p className="subTitle">

          Concept Development • Collection Development • Creative Direction • CAD Design

        </p>

        <img

          src="/creative-consulting.jpg"

          alt="Floral ram sculpture concept studies exploring variation, collection development and sculptural form"

          className="heroImage"

        />

        <div className="introText">

          <p>

            I work with brands, studios and private clients to develop ideas into distinctive

            collections, objects and visual concepts with a clear identity.

          </p>

          <p>

            My role often begins before a final form exists — at the stage where a concept

            needs to be found, clarified and shaped into something meaningful, original and

            appropriate to the brand. From early visual thinking and design exploration to

            refinement, CAD development and presentation, I help guide projects toward a

            strong and coherent result.

          </p>

        </div>

      </section>

      <section className="opportunitiesSection">

        <p className="topicLabel">Opportunities</p>

        <h2 className="sectionTitle">Creative Opportunities</h2>

        <p>

          I am open to full-time positions, long-term collaborations and selected consulting

          engagements where concept development, design thinking and visual direction are

          central to the work.

        </p>

        <p>

          This may involve joining a company as part of a creative team, contributing to the

          development of a new collection or product direction, supporting special projects,

          or helping transform an early idea into a clear and professionally developed design language.

        </p>

        <p className="opportunityStatement">

          Opportunities may range from a single object, sculptural concept or jewellery piece

          to complete collections, signature product lines, brand-driven visual concepts,

          CAD design support and presentation development.

        </p>

      </section>

      <img

        src="/floral-carriage.jpg"

        alt="Floral carriage sculpture concept, two elevations with overall dimensions"

        className="carriageImage"

      />

      <div className="horizontalLine"></div>

      <section className="contributionSection">

        <p className="topicLabel">Contribution</p>

        <h2 className="sectionTitle">Areas of Contribution</h2>

        <div className="contributionGrid">

          <div className="contributionCard">

            <h3>Concept &amp; Collection Development</h3>

            <p>

              Developing original concepts, collection structures and design directions that

              balance artistic character, clarity of idea and long-term brand relevance.

            </p>

          </div>

          <div className="contributionCard">

            <h3>Creative Direction</h3>

            <p>

              Helping define the visual language of a project so that design decisions feel

              consistent, meaningful and aligned with the identity of the brand or client.

            </p>

          </div>

          <div className="contributionCard">

            <h3>Design Development &amp; CAD</h3>

            <p>

              Translating ideas into resolved forms through sketching, design refinement and

              CAD development while preserving the original spirit of the concept.

            </p>

          </div>

          <div className="contributionCard">

            <h3>Brand Identity &amp; Visual Communication</h3>

            <p>

              Distinctive brand identities, marketing materials and digital experiences shaped
              through creative vision and product understanding to build recognition.

            </p>

          </div>

        </div>

      </section>

      <div className="horizontalLine"></div>

      <section className="perspectiveSection">

        <p className="topicLabel">Perspective</p>

        <h2 className="sectionTitle">A Multidisciplinary Perspective</h2>

        <p>

          My work combines concept thinking, hand drawing, sculptural understanding, CAD

          design and visual presentation. This allows me to approach projects not only as

          isolated designs, but as complete creative systems with form, structure, proportion

          and identity.

        </p>

        <p>

          Because I understand both the artistic and practical sides of development, I can

          help move a project from an early idea toward a result that is visually compelling,

          technically considered and appropriate for its intended context.

        </p>

      </section>

      <img

        src="/jewellery-perspective.jpg"

        alt="Jewellery design process showing a ring sketch and refined ring views"

        className="carriageImage consultingThirdImage"

      />

      <div className="horizontalLine"></div>

      <section className="scopeSection finalSection">

        <p className="topicLabel">Project Scope</p>

        <h2 className="sectionTitle">Project Scope &amp; Development Process</h2>

        <p>

          Every project begins with understanding the context: the brand, the product category,

          the audience, the visual language and the broader objective behind the brief.

        </p>

        <p>

          Some projects require the development of a single concept. Others involve shaping a

          full collection, refining an existing direction, contributing CAD support or helping

          establish a stronger visual identity across a series of pieces or presentations.

        </p>

        <p>

          The process is always adapted to the scale and nature of the work, but the goal

          remains the same: to build a concept that is clear, distinctive and capable of

          becoming a strong finished result.

        </p>

        <p>

          The level of involvement may range from concept consultation and design development

          to longer-term collaboration across multiple stages of a project.

        </p>

      </section>

      {/* Golden Ribbon Ram — after Project Scope text */}

      <img

        src="/project-scope-ram.jpg"

        alt="Watercolor golden ram sculpture framed by flowing red and gold ribbons"

        className="carriageImage projectScopeRamImage"

      />

      {/* =======================================================

          FOOTER

      ======================================================= */}

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

                  onClick={() =>

                    navigate(

                      item.path

                    )

                  }

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

      <button

        type="button"

        className={`hamburger${menuOpen ? " isOpen" : ""}`}

        onClick={() => {

          setMenuOpen((wasOpen) => !wasOpen);

          setMobileDropdown(null);

        }}

        aria-label={menuOpen ? "Close menu" : "Open menu"}

        aria-expanded={menuOpen}

        aria-controls="consulting-mobile-navigation"

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

        id="consulting-mobile-navigation"

        className={menuOpen ? "mobilePanel open" : "mobilePanel"}

        aria-label="Mobile navigation"

        aria-hidden={!menuOpen}

        inert={!menuOpen}

      >

        <button

          type="button"

          className="mobileMenuItem hasSubmenu"

          aria-expanded={mobileDropdown === "work"}

          aria-controls="consulting-work-submenu"

          onClick={() => setMobileDropdown(mobileDropdown === "work" ? null : "work")}

        >SELECTED WORK</button>

        <div

          id="consulting-work-submenu"

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

          aria-controls="consulting-jewellery-submenu"

          onClick={() => setMobileDropdown(mobileDropdown === "jewellery" ? null : "jewellery")}

        >JEWELLERY DESIGN</button>

        <div

          id="consulting-jewellery-submenu"

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