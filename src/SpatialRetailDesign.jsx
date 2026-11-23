import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Spatial & Retail Design. Header, footer and navigation retained from the approved
// Sculpture & Installations page. Only page-specific project content is new.
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

// Three original presentation boards, supplied for this page. Web-resolution copies
// live in public/. The original master images are not published by this component.
const retailProjects = [
  {
    id: "luxury-retail",
    title: "Luxury Retail",
    category: "Retail Interior · Spatial Planning · Technical Documentation",
    description: "A refined jewellery retail environment defined by warm timber, illuminated glass showcases and carefully considered spatial planning. The project is presented through interior photography, bespoke display detailing, technical elevations and architectural plans.",
    src: "/spatial-retail-luxury-01-display.jpg",
    caption: "Luxury Retail · Freestanding jewellery showcase",
  },
  {
    id: "retail-boutique-interior",
    title: "Retail Boutique Interior",
    category: "Concept Development · 3D Visualization · Shop Drawings",
    description: "A boutique interior presented through store photography, concept visualization, a floor plan and detailed showcase drawings, illustrating the relationship between design intent, material choices and technical development.",
    src: "/spatial-retail-boutique-01-main-interior.jpg",
    caption: "Retail Boutique Interior · Main interior photography",
  },
  {
    id: "chinese-new-year-vinyl-wall",
    title: "Chinese New Year Vinyl Wall",
    category: "Seasonal Retail Experience · Mall Installation · Modular Design",
    description: "A modular festive wall concept for shopping centres and retail environments, combining a red-and-gold vinyl application with eight alternative sculptural form studies. The design explores adaptability, visual impact and visitor interaction.",
    src: "/spatial-retail-chinese-01-vinyl-wall-hero.jpg",
    caption: "Chinese New Year Vinyl Wall · Hero installation concept",
  },
];

// Luxury Retail — seven separate photographs and drawings in the approved order.
// The supplied source files remain private; the page uses optimized web copies.
const luxuryRetailImages = [
  { number: 1, src: "/spatial-retail-luxury-01-display.jpg", width: 1496, height: 2008, caption: "Luxury Retail · Freestanding jewellery showcase" },
  { number: 2, src: "/spatial-retail-luxury-02-main-interior.jpg", width: 2048, height: 1246, caption: "Luxury Retail · Main boutique interior" },
  { number: 3, src: "/spatial-retail-luxury-03-wall-showcase-drawings.jpg", width: 2048, height: 1716, caption: "Luxury Retail · Wall showcase elevations and sections" },
  { number: 4, src: "/spatial-retail-luxury-04-interior-detail.jpg", width: 2048, height: 1246, caption: "Luxury Retail · Interior display counters" },
  { number: 5, src: "/spatial-retail-luxury-05-display-drawings.jpg", width: 2048, height: 1716, caption: "Luxury Retail · Freestanding display details" },
  { number: 6, src: "/spatial-retail-luxury-06-partition-plan.jpg", width: 2048, height: 1246, caption: "Luxury Retail · Partition and glazing plan" },
  { number: 7, src: "/spatial-retail-luxury-07-floor-plan.jpg", width: 2048, height: 1711, caption: "Luxury Retail · Interior space plan" },
];
const luxuryRetailPairs = [
  [luxuryRetailImages[1], luxuryRetailImages[2]], // 2 left / 3 right
  [luxuryRetailImages[4], luxuryRetailImages[3]], // 5 left / 4 right
  [luxuryRetailImages[5], luxuryRetailImages[6]], // 6 left / 7 right
];

// Retail Boutique Interior — five individual supplied images, matching the
// approved Luxury Retail gallery style. Order: 1 centered / 3–2 / 5–4.
const boutiqueRetailImages = [
  { number: 1, src: "/spatial-retail-boutique-01-main-interior.jpg", width: 1800, height: 1800, caption: "Retail Boutique Interior · Main boutique interior" },
  { number: 2, src: "/spatial-retail-boutique-02-concept-rendering.jpg", width: 1800, height: 1095, caption: "Retail Boutique Interior · Concept visualization" },
  { number: 3, src: "/spatial-retail-boutique-03-interior-photography.jpg", width: 1800, height: 1362, caption: "Retail Boutique Interior · Completed interior detail" },
  { number: 4, src: "/spatial-retail-boutique-04-showcase-shop-drawings.jpg", width: 1800, height: 755, caption: "Retail Boutique Interior · Showcase shop drawings" },
  { number: 5, src: "/spatial-retail-boutique-05-showroom-floor-plan.jpg", width: 1800, height: 720, caption: "Retail Boutique Interior · Showroom floor plan" },
 ];
const boutiqueRetailPairs = [
  [boutiqueRetailImages[2], boutiqueRetailImages[1]], // 3 left / 2 right
  [boutiqueRetailImages[4], boutiqueRetailImages[3]], // 5 left / 4 right
];

// Chinese New Year Vinyl Wall — the final three-image gallery.
// Same hero width, typography and spacing as Luxury Retail and Boutique Interior.
// Order: 1 centered / 2 left and 3 right.
const chineseRetailImages = [
  { number: 1, src: "/spatial-retail-chinese-01-vinyl-wall-hero.jpg", width: 1800, height: 1588, caption: "Chinese New Year Vinyl Wall · Main installation concept" },
  { number: 2, src: "/spatial-retail-chinese-02-form-studies-a.jpg", width: 1800, height: 1267, caption: "Chinese New Year Vinyl Wall · Form studies 01, 02, 05 & 06" },
  { number: 3, src: "/spatial-retail-chinese-03-form-studies-b.jpg", width: 1800, height: 1267, caption: "Chinese New Year Vinyl Wall · Form studies 03, 04, 07 & 08" },
];
const chineseRetailPairs = [[chineseRetailImages[1], chineseRetailImages[2]]];

export default function SpatialRetailDesign() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxClosing, setLightboxClosing] = useState(false);

  const closeLightbox = () => setLightboxClosing(true);

  useEffect(() => {
    if (!lightboxClosing) return undefined;
    const timer = window.setTimeout(() => {
      setLightboxImage(null);
      setLightboxClosing(false);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [lightboxClosing]);
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [mobileNavigating, setMobileNavigating] = useState(false);
  const [selectedMobileSubLink, setSelectedMobileSubLink] = useState(null);
  const navigationTimer = useRef(null);
  const mobileSelectionFadeTimer = useRef(null);

  useEffect(() => () => {
    if (navigationTimer.current !== null) window.clearTimeout(navigationTimer.current);
    if (mobileSelectionFadeTimer.current !== null) window.clearTimeout(mobileSelectionFadeTimer.current);
  }, []);

  useEffect(() => {
    if (!menuOpen || !window.matchMedia("(max-width: 720px)").matches) return;
    const body = document.body;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position, top: body.style.top,
      left: body.style.left, right: body.style.right,
      width: body.style.width, overflow: body.style.overflow,
    };
    body.dataset.mobileMenuOpen = "true";
    Object.assign(body.style, {
      position: "fixed", top: `-${scrollY}px`, left: "0", right: "0",
      width: "100%", overflow: "hidden",
    });
    const onEscape = event => {
      if (event.key === "Escape") { setMenuOpen(false); setMobileDropdown(null); }
    };
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("keydown", onEscape);
      delete body.dataset.mobileMenuOpen;
      Object.entries(previous).forEach(([key, value]) => { body.style[key] = value; });
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  const closeAndNavigate = (path, isSubmenuSelection = false) => {
    if (navigationTimer.current !== null) return;
    const onPhone = menuOpen && window.matchMedia("(max-width: 720px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (onPhone && !reducedMotion) {
      if (isSubmenuSelection) {
        setSelectedMobileSubLink(path);
        mobileSelectionFadeTimer.current = window.setTimeout(() => {
          mobileSelectionFadeTimer.current = null;
          setMobileNavigating(true);
        }, 190);
        navigationTimer.current = window.setTimeout(() => {
          navigationTimer.current = null;
          setMenuOpen(false); setMobileDropdown(null); setDesktopDropdown(null);
          setSelectedMobileSubLink(null); setMobileNavigating(false);
          navigate(path);
        }, 390);
      } else {
        setMobileNavigating(true);
        navigationTimer.current = window.setTimeout(() => {
          navigationTimer.current = null;
          setMenuOpen(false); setMobileDropdown(null); setDesktopDropdown(null);
          setMobileNavigating(false);
          navigate(path);
        }, 360);
      }
      return;
    }
    setMenuOpen(false); setMobileDropdown(null); setDesktopDropdown(null);
    setSelectedMobileSubLink(null); navigate(path);
  };

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


  useEffect(() => {
    if (!lightboxImage) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxImage]);

  const go = (path) => {
    setMenuOpen(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);
    navigate(path);
  };

  const renderRetailFigure = (image, loading = "lazy") => (
    <figure className="retailFigure" key={image.src}>
      <button
        className="retailImageButton"
        type="button"
        aria-label={`Enlarge ${image.caption} by 15 percent`}
        onClick={(event) => {
          const preview = event.currentTarget.querySelector("img");
          if (!preview?.complete || !preview.naturalWidth) return;
          setLightboxClosing(false);
          setLightboxImage({
            src: preview.currentSrc || image.src,
            caption: image.caption,
            previewWidth: preview.getBoundingClientRect().width,
            previewHeight: preview.getBoundingClientRect().height,
          });
        }}
      >
        <img
          src={image.src}
          alt={image.caption}
          loading={loading}
          onError={(event) => event.currentTarget.closest(".retailFigure")?.classList.add("imageMissing")}
        />
        <span className="retailExpandMark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5" />
          </svg>
        </span>
      </button>
      <p className="retailImageMissing">Image not found: {image.src}. Please copy this image into your site's public folder.</p>
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
  return (
    <main className={`aboutPage spatialRetailPage${mobileNavigating ? " isMobileNavigating" : ""}${selectedMobileSubLink ? " hasSubmenuSelection" : ""}`}>
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

        /* =========================================================
           SPATIAL & RETAIL DESIGN — PAGE CONTENT ONLY
           The approved header, menu, footer and global typography above
           are copied unchanged from Sculpture & Installations.
           ========================================================= */
        .retailPortfolio { width: min(1180px, 86vw); margin: 0 auto; }
        .retailIntro { text-align: center; margin: 0 auto 112px; }
        .retailIntro .mainTitle { margin-bottom: 22px; }
        .retailLead { max-width: 760px; margin: 35px auto 0; color: #6C6258; font: 300 17px/1.82 'Times New Roman', Georgia, serif; }
        .retailProject { margin: 0 auto 128px; }
        .retailProjectHeading { text-align: center; max-width: 850px; margin: 0 auto 44px; }
        .retailProjectHeading h2, .retailClosing h2 {
          margin: 0 0 15px;
          font: 400 clamp(30px, 2.45vw, 44px)/1.12 'Cormorant Garamond', serif;
          letter-spacing: .14em; text-transform: uppercase; color: #2A2723;
        }
        .retailProjectType { margin: 0 0 22px; font: 400 10px/1.6 Arial, sans-serif; letter-spacing: .22em; text-transform: uppercase; color: #9C8664; }
        .retailDescription, .retailClosing > p:not(.topicLabel) { margin: 0 auto; max-width: 760px; font: 300 17px/1.82 'Times New Roman', Georgia, serif; color: #6C6258; }
        /* The approved 10%-smaller gallery treatment, applied to all three boards. */
        .retailGallery { width: 90%; margin: 0 auto; }
        .retailFigure { margin: 0; width: 100%; }
        .retailImageButton { display: block; position: relative; width: 100%; padding: 0; border: 0; background: #fff; cursor: pointer; overflow: hidden; }
        .retailImageButton img { display: block; width: 100%; height: auto; object-fit: contain; transform: scale(1); transform-origin: center; transition: transform 360ms cubic-bezier(.22, .61, .36, 1); }
        @media (hover: hover) and (pointer: fine) {
          .retailImageButton:hover img { transform: scale(1.012); }
        }
        .retailImageButton:focus-visible { outline: 1px solid #9C8664; outline-offset: 5px; }
        .retailImageButton:focus-visible img { transform: scale(1.012); }
        /* Quiet editorial expand indicator, never the legacy magnifying-glass cursor. */
        .retailExpandMark { position:absolute; right:14px; bottom:14px; display:flex; align-items:center; justify-content:center; width:38px; height:38px; border:1px solid rgba(156,134,100,.30); background:rgba(255,255,255,.90); color:#9C8664; opacity:0; transform:translateY(5px); transition:opacity 320ms ease,transform 320ms ease,background 320ms ease; pointer-events:none; }
        .retailImageButton:hover .retailExpandMark, .retailImageButton:focus-visible .retailExpandMark { opacity:1; transform:translateY(0); }
        @media (hover:none) { .retailExpandMark { opacity:.8; transform:none; width:32px; height:32px; } }

        .retailFigure figcaption { margin: 14px 0 0; text-align: center; color: #978a77; font: 10px/1.5 Arial, sans-serif; letter-spacing: .14em; text-transform: uppercase; }
        .retailImageMissing { display: none; padding: 38px 12px; text-align: center; color: #978a77; font: 12px/1.6 Arial, sans-serif; }
        .retailFigure.imageMissing .retailImageButton { display: none; }
        .retailFigure.imageMissing .retailImageMissing { display: block; }
        .retailClosing { text-align: center; padding: 16px 0 135px; }
        .retailClosing > p:not(.topicLabel) { margin: 0 auto 32px; }


        /* =========================================================
           EDITORIAL GALLERIES — SHARED PRESENTATION RULES
           Luxury Retail: 1 centered / 2–3 / 5–4 / 6–7.
           Boutique Interior: 1 centered / 3–2 / 5–4.
           Chinese New Year: 1 centered / 2–3.
           ========================================================= */
        .retailLuxuryGallery {
          display: flex;
          flex-direction: column;
          gap: clamp(46px, 6vw, 82px);
        }
        .retailLuxuryHeroBlock { text-align: center; }
        .retailLuxuryHeroBlock > .retailFigure {
          width: min(470px, 62%);
          margin: 0 auto;
        }
        .retailLuxuryNote {
          max-width: 625px;
          margin: 25px auto 0;
          color: #6C6258;
          font: 300 16px/1.75 'Times New Roman', Georgia, serif;
          text-align: center;
        }
        .retailPair {
          display: grid;
          grid-template-columns: minmax(0, var(--retail-left-ratio)) minmax(0, var(--retail-right-ratio));
          align-items: start;
          gap: clamp(16px, 2vw, 28px);
        }
        .retailPair > .retailFigure { min-width: 0; width: 100%; }
        .retailPair .retailImageButton,
        .retailPair .retailImageButton img { width: 100%; }
        .retailPair .retailImageButton img { height: auto; object-fit: contain; }
        @media (max-width: 720px) {
          .retailLuxuryGallery { gap: 50px; }
          .retailLuxuryHeroBlock > .retailFigure { width: min(440px, 84%); }
          .retailLuxuryNote { font-size: 15px; line-height: 1.7; margin-top: 22px; }
          .retailPair { grid-template-columns: 1fr; gap: 34px; }
        }

        /* =========================================================
           RETAIL BOUTIQUE INTERIOR — FIVE-IMAGE EDITORIAL GALLERY
           Inherits the EXACT Luxury Retail hero width (470px / 62%),
           including its 440px / 84% mobile breakpoint, as well as
           spacing, typography and equal-height pair logic.
           Hero is centered; pairs remain 3–2 and 5–4.
           ========================================================= */

        /* Click-to-enlarge: 15% of displayed image size, centered and viewport-capped.
           No download or original-resolution link is rendered. */
        /* Approved Sculpture & Installations lightbox treatment: 73% backdrop, soft entry/exit. */
        .retailLightbox { position: fixed; inset: 0; z-index: 3000; background: rgba(17,16,15,.73); backdrop-filter:blur(3px); -webkit-backdrop-filter:blur(3px); cursor: default; animation: retailBackdropIn 450ms ease both; }
        .retailLightbox img { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1); max-width: calc(100vw - 44px); max-height: calc(100vh - 175px); object-fit: contain; cursor: default; animation: retailImageIn 450ms cubic-bezier(.22,1,.36,1) both; }
        .retailLightbox p { position: absolute; bottom: 54px; left: 22px; right: 22px; margin: 0; color: #e0d9cd; text-align: center; font: 11px/1.5 Arial, sans-serif; letter-spacing: .13em; text-transform: uppercase; animation:retailCaptionIn 450ms ease both; }
        .retailLightboxClose { position: absolute; top: 15px; right: 25px; border: 0; background: transparent; color: #fff; font-size: 40px; cursor: pointer; z-index: 1; }
        .retailLightbox.isClosing { animation:retailBackdropOut 300ms ease both; pointer-events:none; }
        .retailLightbox.isClosing img { animation:retailImageOut 300ms ease both; }
        .retailLightbox.isClosing p { animation:retailCaptionOut 300ms ease both; }
        @keyframes retailBackdropIn { from { opacity:0; } to { opacity:1; } }
        @keyframes retailBackdropOut { from { opacity:1; } to { opacity:0; } }
        @keyframes retailImageIn { from { opacity:0; transform:translate(-50%,-50%) scale(.965); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }
        @keyframes retailImageOut { from { opacity:1; transform:translate(-50%,-50%) scale(1); } to { opacity:0; transform:translate(-50%,-50%) scale(.98); } }
        @keyframes retailCaptionIn { from {opacity:0} to {opacity:1} }
        @keyframes retailCaptionOut { from {opacity:1} to {opacity:0} }
        @media (max-width: 720px) {
          .retailPortfolio { width: 88vw; }
          .retailIntro { margin-bottom: 78px; }
          .retailProject { margin-bottom: 90px; }
          .retailProjectHeading { margin-bottom: 30px; }
          .retailLead, .retailDescription, .retailClosing > p:not(.topicLabel) { font-size: 16px; line-height: 1.75; }
          .retailFigure figcaption { font-size: 9px; }
          .retailClosing { padding-bottom: 100px; }
          .retailLightbox img { max-height: calc(100vh - 175px); }
          .retailLightbox p { bottom: 45px; font-size: 9px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .retailImageButton img { transition: none; }
          .retailImageButton:hover img, .retailImageButton:focus-visible img { transform: none; }
          .retailExpandMark { transition:none; }
          .retailLightbox, .retailLightbox img, .retailLightbox p, .retailLightbox.isClosing, .retailLightbox.isClosing img, .retailLightbox.isClosing p { animation:none; }
        }
        /* MOBILE NAVIGATION REFINEMENT — never changes desktop header/layout. */
        @media (max-width: 720px) {
          .spatialRetailPage .hamburger {
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
          .spatialRetailPage .hamburger span {
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
          .spatialRetailPage .hamburger span:nth-child(1) { transform: translateY(-11px); }
          .spatialRetailPage .hamburger span:nth-child(2) { transform: translateY(-3.7px); }
          .spatialRetailPage .hamburger span:nth-child(3) { transform: translateY(3.7px); }
          .spatialRetailPage .hamburger span:nth-child(4) { transform: translateY(11px); }
          .spatialRetailPage .hamburger.isOpen span { background: #e1dbcf; }
          .spatialRetailPage .hamburger.isOpen span:nth-child(1) { transform: rotate(45deg); }
          .spatialRetailPage .hamburger.isOpen span:nth-child(2) { transform: scaleX(.55); opacity: 0; }
          .spatialRetailPage .hamburger.isOpen span:nth-child(3) { transform: scaleX(.55); opacity: 0; }
          .spatialRetailPage .hamburger.isOpen span:nth-child(4) { transform: rotate(-45deg); }
          .spatialRetailPage .hamburger:focus-visible {
            outline: 1px solid #9C8664;
            outline-offset: 1px;
          }
          .spatialRetailPage .mobileOverlay { z-index: 1100; }
          .spatialRetailPage .mobilePanel {
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
          .spatialRetailPage .mobilePanel.open { visibility: visible; }
          .spatialRetailPage .mobileMenuItem {
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
          .spatialRetailPage .mobileMenuItem:hover,
          .spatialRetailPage .mobileMenuItem:focus-visible { color: #c9b38c; }
          .spatialRetailPage .mobileMenuItem.isContact { color: #c9b38c; }
          .spatialRetailPage .mobileMenuItem:focus-visible,
          .spatialRetailPage .mobileSubmenuLink:focus-visible {
            outline: 1px solid #c9b38c;
            outline-offset: 4px;
          }
          /* Slow editorial accordion: always mounted, smoothly animates its height. */
          .spatialRetailPage .mobileMenuItem.hasSubmenu {
            position: relative;
            padding-right: 20px;
          }
          .spatialRetailPage .mobileMenuItem.hasSubmenu::after {
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
          .spatialRetailPage .mobileMenuItem.hasSubmenu[aria-expanded="true"]::after {
            transform: translateY(4px) rotate(225deg);
          }
          .spatialRetailPage .mobileSubmenu {
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
          .spatialRetailPage .mobileSubmenu.isExpanded {
            grid-template-rows: 1fr;
            opacity: 1;
            margin-top: -18px;
            margin-bottom: 29px;
          }
          .spatialRetailPage .mobileSubmenuInner {
            min-height: 0;
            overflow: hidden;
          }
          .spatialRetailPage .mobileSubmenuLink {
            opacity: 0;
            transform: translateY(-8px);
            transition: opacity 580ms ease, transform 680ms cubic-bezier(.22,.61,.36,1), color 250ms ease;
          }
          .spatialRetailPage .mobileSubmenu.isExpanded .mobileSubmenuLink {
            opacity: 1;
            transform: translateY(0);
          }
          .spatialRetailPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(2) { transition-delay: 55ms; }
          .spatialRetailPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(3) { transition-delay: 110ms; }
          .spatialRetailPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(4) { transition-delay: 165ms; }
          .spatialRetailPage.isMobileNavigating {
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
          .spatialRetailPage .hamburger span,
          .spatialRetailPage .mobilePanel,
          .spatialRetailPage .mobileSubmenu,
          .spatialRetailPage .mobileSubmenuLink,
          .spatialRetailPage .mobileMenuItem.hasSubmenu::after,
          .spatialRetailPage.isMobileNavigating { transition: none !important; }
        }

        /* MOBILE HOME COMPOSITION — approved menu remains unchanged.
           Only the brand descriptor and hero carousel size are adjusted. */
        @media (max-width: 720px) {
          /* Distinguish the two brand lines and give the longer second line room. */
          .spatialRetailPage .subtitle p:first-child {
            font-size: 10px;
            letter-spacing: 0.26em;
          }
          .spatialRetailPage .subtitle p:nth-child(2) {
            font-size: 7.4px;
            letter-spacing: 0.20em;
          }
        }

        /* MOBILE DRAWER ONLY — 7% wider than the original panel (3% less
           widening than the preceding 10% version). Keep the left edge of
           all menu labels fixed at their previously approved screen position. */
        @media (max-width: 720px) {
          .spatialRetailPage .mobilePanel {
            width: min(83.46vw, 417.3px);
            padding-left: calc(34px + min(83.46vw, 417.3px) - min(78vw, 390px));
          }
        }

        /* MOBILE ACCORDION GUIDE DOTS — match approved Contact styling.
           Dots are 4px in diameter and shifted another 1px right.
           Compensate clipping without moving menu labels. */
        @media (max-width: 720px) {
          .spatialRetailPage .mobileSubmenuInner {
            margin-left: -24px;
            padding-left: 24px;
          }
          .spatialRetailPage .mobileSubmenuLink {
            position: relative;
            width: 100%;
          }
          .spatialRetailPage .mobileSubmenuLink::before {
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
          .spatialRetailPage,
          .spatialRetailPage button,
          .spatialRetailPage a,
          .spatialRetailPage [role="button"],
          .spatialRetailPage input,
          .spatialRetailPage .carouselStage,
          .spatialRetailPage .carouselImage,
          .spatialRetailPage .carouselControls,
          .spatialRetailPage .carouselArrow,
          .spatialRetailPage .carouselDot,
          .spatialRetailPage .mobileMenuItem,
          .spatialRetailPage .mobileSubmenuLink {
            -webkit-tap-highlight-color: transparent;
          }
          /* The gold :focus-visible outlines above remain available for keyboards. */
        }

        /* Consistent approved Sculpture submenu selection feedback on phones. */
        @media (max-width: 720px) {
          .spatialRetailPage .mobileSubmenu.isExpanded .mobileSubmenuLink.isSelected {
            color: #fff;
            transform: translateY(0) scale(1.055);
            transform-origin: left center;
            transition: color 140ms ease, transform 140ms ease;
          }
          .spatialRetailPage .mobileSubmenuLink.isSelected::before {
            width: 6px;
            height: 6px;
            background: #fff;
            transform: translate(-1px, -50%);
          }
          .spatialRetailPage.isMobileNavigating.hasSubmenuSelection {
            transition-duration: 200ms;
          }
        }


        /* SPATIAL & RETAIL — approved mobile lightbox sizing from Sculpture.
           24px side margins, 48px vertical padding; reserve 112px in height.
           On desktop retain the exact original 115%-of-thumbnail treatment. */
        @media (max-width: 720px) {
          .spatialRetailPage .retailLightbox {
            padding: 48px 24px;
          }
          .spatialRetailPage .retailLightbox img {
            width: auto !important;
            height: auto !important;
            max-width: calc(100vw - 48px);
            max-height: calc(100vh - 112px);
            max-height: calc(100dvh - 112px);
            object-fit: contain;
          }
          .spatialRetailPage .retailLightboxClose {
            top: 12px;
            right: 16px;
          }
          .spatialRetailPage .retailLightbox p {
            left: 24px;
            right: 24px;
            bottom: max(15px, env(safe-area-inset-bottom));
          }
          /* No browser-blue button/tap colors; Home typography and gold accents. */
          .spatialRetailPage button,
          .spatialRetailPage .mobileMenuItem,
          .spatialRetailPage .mobileSubmenuLink {
            -webkit-appearance: none;
            appearance: none;
          }
          .spatialRetailPage .mobileMenuItem { color: #d4cec2; }
          .spatialRetailPage .mobileMenuItem.isContact { color: #c9b38c; }
          .spatialRetailPage .mobileSubmenuLink { color: #e1dbcf; }
          .spatialRetailPage .mobileSubmenu.isExpanded .mobileSubmenuLink.isSelected {
            color: #fff;
          }
        }


        /* DESKTOP ONLY — match approved Sculpture & Installations gallery width.
           Narrow the central content/gallery areas by 5%; preserve mobile and site chrome. */
        @media (min-width: 721px) {
          .spatialRetailPage .pageWrap,
          .spatialRetailPage .retailPortfolio {
            width: min(1121px, 86vw);
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

      {/* SPATIAL & RETAIL DESIGN — SINGLE SCROLLING PORTFOLIO */}
      <div className="retailPortfolio">
        <section className="retailIntro">
          <p className="topicLabel">Selected Work</p>
          <h1 className="mainTitle">Spatial &amp; Retail Design</h1>
          <p className="mainRole">Interior Environments · Retail Experiences · Concept to Documentation</p>
          <p className="retailLead">Retail environments shaped through spatial planning, brand identity, material exploration and precise design development. These selected presentations bring together completed interiors, concept visualizations, construction details and experiential installations.</p>
        </section>

        {retailProjects.map((project, index) => (
          <section className="retailProject" key={project.id} id={project.id}>
            <div className="retailProjectHeading">
              <p className="topicLabel">{String(index + 1).padStart(2, "0")} · Selected Project</p>
              <h2>{project.title}</h2>
              <p className="retailProjectType">{project.category}</p>
              <p className="retailDescription">{project.description}</p>
            </div>
            {project.id === "luxury-retail" ? (
              <div className="retailGallery retailLuxuryGallery">
                <div className="retailLuxuryHeroBlock">
                  {renderRetailFigure(luxuryRetailImages[0], "eager")}
                  <p className="retailLuxuryNote">
                    A refined display composition in warm wood and clear glass,
                    with carefully directed lighting that brings the jewellery into focus.
                  </p>
                </div>
                {luxuryRetailPairs.map(([left, right]) => (
                  <div
                    className="retailPair"
                    key={`${left.number}-${right.number}`}
                    style={{
                      "--retail-left-ratio": `${left.width / left.height}fr`,
                      "--retail-right-ratio": `${right.width / right.height}fr`,
                    }}
                  >
                    {renderRetailFigure(left)}
                    {renderRetailFigure(right)}
                  </div>
                ))}
              </div>
            ) : project.id === "retail-boutique-interior" ? (
              <div className="retailGallery retailLuxuryGallery retailBoutiqueGallery">
                <div className="retailLuxuryHeroBlock">
                  {renderRetailFigure(boutiqueRetailImages[0], "eager")}
                  <p className="retailLuxuryNote">
                    Warm timber finishes, carefully integrated lighting and custom
                    jewellery showcases establish an intimate retail atmosphere.
                    The following studies connect the completed interior with
                    its design visualization and technical documentation.
                  </p>
                </div>
                {boutiqueRetailPairs.map(([left, right]) => (
                  <div
                    className="retailPair"
                    key={`${left.number}-${right.number}`}
                    style={{
                      "--retail-left-ratio": `${left.width / left.height}fr`,
                      "--retail-right-ratio": `${right.width / right.height}fr`,
                    }}
                  >
                    {renderRetailFigure(left)}
                    {renderRetailFigure(right)}
                  </div>
                ))}
              </div>
            ) : project.id === "chinese-new-year-vinyl-wall" ? (
              <div className="retailGallery retailLuxuryGallery retailChineseGallery">
                <div className="retailLuxuryHeroBlock">
                  {renderRetailFigure(chineseRetailImages[0], "eager")}
                  <p className="retailLuxuryNote">
                    A modular red-and-gold installation designed for festive retail
                    environments, with a circular opening and a family of adaptable
                    sculptural wall configurations explored through form studies.
                  </p>
                </div>
                {chineseRetailPairs.map(([left, right]) => (
                  <div
                    className="retailPair"
                    key={`${left.number}-${right.number}`}
                    style={{
                      "--retail-left-ratio": `${left.width / left.height}fr`,
                      "--retail-right-ratio": `${right.width / right.height}fr`,
                    }}
                  >
                    {renderRetailFigure(left)}
                    {renderRetailFigure(right)}
                  </div>
                ))}
              </div>
            ) : (
            <div className="retailGallery">
              <figure className="retailFigure">
                <button
                  className="retailImageButton"
                  type="button"
                  aria-label={`Enlarge ${project.title} by 15 percent`}
                  onClick={(event) => {
                    const preview = event.currentTarget.querySelector("img");
                    if (!preview?.complete || !preview.naturalWidth) return;
                    setLightboxClosing(false);
                    setLightboxImage({
                      src: preview.currentSrc || project.src,
                      caption: project.caption,
                      previewWidth: preview.offsetWidth,
                      previewHeight: preview.offsetHeight,
                    });
                  }}
                >
                  <img
                    src={project.src}
                    alt={project.caption}
                    loading={index === 0 ? "eager" : "lazy"}
                    onError={(event) => event.currentTarget.closest(".retailFigure")?.classList.add("imageMissing")}
                  />
                  <span className="retailExpandMark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5" />
          </svg>
        </span>
                </button>
                <p className="retailImageMissing">Image not found: {project.src}. Please copy the supplied image into your site's public folder.</p>
                <figcaption>{project.caption}</figcaption>
              </figure>
            </div>
            )}
          </section>
        ))}

        <section className="retailClosing">
          <p className="topicLabel">Design Practice</p>
          <h2>From Concept to Environment</h2>
          <p>From initial creative direction and material studies to three-dimensional visualization, detailed drawings and fabrication coordination, each project is developed with attention to both atmosphere and execution.</p>
          <button type="button" className="aboutContactLink" onClick={() => go("/contact")}>Discuss a Project</button>
        </section>
      </div>

      {lightboxImage && (
        <div className={`retailLightbox${lightboxClosing ? " isClosing" : ""}`} role="dialog" aria-modal="true" aria-label="Enlarged project image" onClick={closeLightbox}>
          <button type="button" className="retailLightboxClose" onClick={(event) => { event.stopPropagation(); closeLightbox(); }} aria-label="Close image">×</button>
          <img
            src={lightboxImage.src}
            alt={lightboxImage.caption}
            style={{
              width: `${Math.round(lightboxImage.previewWidth * 1.15)}px`,
              height: `${Math.round(lightboxImage.previewHeight * 1.15)}px`,
            }}
            onClick={(event) => event.stopPropagation()}
          />
          <p>{lightboxImage.caption}</p>
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
              <span className={`bottomNavLink ${activePath === item.path ? "isActive" : ""}`} onClick={() => go(item.path)}>
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

      {/* MOBILE HOME-STANDARD NAVIGATION — Spatial & Retail Design */}
      <button
        type="button"
        className={`hamburger${menuOpen ? " isOpen" : ""}`}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-controls="retail-mobile-navigation"
        aria-expanded={menuOpen}
        onClick={() => { setMenuOpen(!menuOpen); if (menuOpen) setMobileDropdown(null); }}
      >
        <span></span><span></span><span></span><span></span>
      </button>

      <div
        className={menuOpen ? "mobileOverlay open" : "mobileOverlay"}
        onClick={() => { setMenuOpen(false); setMobileDropdown(null); }}
        aria-hidden="true"
      />

      <aside
        id="retail-mobile-navigation"
        className={menuOpen ? "mobilePanel open" : "mobilePanel"}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <button
          type="button"
          className="mobileMenuItem hasSubmenu"
          aria-expanded={mobileDropdown === "work"}
          aria-controls="retail-work-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "work" ? null : "work")}
        >SELECTED WORK</button>
        <div
          id="retail-work-submenu"
          className={`mobileSubmenu${mobileDropdown === "work" ? " isExpanded" : ""}`}
          aria-hidden={mobileDropdown !== "work"}
          inert={mobileDropdown !== "work"}
        >
          <div className="mobileSubmenuInner">
            {selectedWorkLinks.map(item => (
              <button key={item.path} type="button"
                className={`mobileSubmenuLink${selectedMobileSubLink === item.path ? " isSelected" : ""}`}
                onClick={() => closeAndNavigate(item.path, true)}
              >{item.label}</button>
            ))}
          </div>
        </div>
        <button type="button" className="mobileMenuItem" onClick={() => closeAndNavigate("/sculpture")}>SCULPTURE</button>
        <button
          type="button"
          className="mobileMenuItem hasSubmenu"
          aria-expanded={mobileDropdown === "jewellery"}
          aria-controls="retail-jewellery-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "jewellery" ? null : "jewellery")}
        >JEWELLERY DESIGN</button>
        <div
          id="retail-jewellery-submenu"
          className={`mobileSubmenu${mobileDropdown === "jewellery" ? " isExpanded" : ""}`}
          aria-hidden={mobileDropdown !== "jewellery"}
          inert={mobileDropdown !== "jewellery"}
        >
          <div className="mobileSubmenuInner">
            {jewelleryLinks.map(item => (
              <button key={item.path} type="button"
                className={`mobileSubmenuLink${selectedMobileSubLink === item.path ? " isSelected" : ""}`}
                onClick={() => closeAndNavigate(item.path, true)}
              >{item.label}</button>
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