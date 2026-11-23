import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Sketches & Design: approved About header/navigation/footer and visual system.
// Portfolio images remain external in public/.
const works = [
  {
    title: "REGALIA AZURE",
    description:
      "A statement pearl necklace centered on a richly architectural sapphire composition, combining classical grandeur with stylized botanical ornament.",
    image: "/regalia-azure.jpg",
    width: 900,
    sizeAdjustment: 0.9,
  },
  {
    title: "PARADIS — CELESTIAL PAIR",
    description:
      "A symbolic pairing of sapphire-blue and rose-pink birds, balancing mirrored movement, colour contrast and cascading gemstone details.",
    image: "/paradis-celestial-pair.jpg",
    width: 680,
    displayScale: 0.85,
  },
  {
    title: "PARADIS — EMBRACE",
    description:
      "A romantic two-bird composition exploring movement, intimacy and ornamental rhythm through sculptural gemstone-set plumage.",
    image: "/paradis-embrace.jpg",
    width: 650,
    displayScale: 0.85,
  },
  {
    title: "PARADIS — TWIN PLUMES",
    description:
      "A pair of fantastical jeweled birds composed through vivid gemstone colour, layered plumage and dramatic suspended pear-shaped stones.",
    image: "/paradis-twin-plumes.jpg",
    width: 650,
    displayScale: 0.85,
  },
  {
    title: "CLOUD ATLAS — GOLD",
    description:
      "A sculptural cuff exploring drifting cloud formations through diamond pavé, polished gold surfaces and celestial points of light.",
    image: "/cloud-atlas-gold.jpg",
    width: 760,
    displayScale: 0.85,
  },
  {
    title: "CLOUD ATLAS — NOCTURNE",
    description:
      "A darker interpretation of the Cloud Atlas concept, contrasting diamond-set cloud formations with a dramatic oxidized metal surface.",
    image: "/cloud-atlas-nocturne.jpg",
    width: 650,
  },
  {
    title: "CASCADE DE LUMIÈRE",
    description:
      "A study in movement and light, exploring cascading diamond forms through rhythm, repetition and architectural structure.",
    image: "/CASCADE DE LUMIÈRE.jpg",
    width: 806,
  },
  {
    title: "ROYALE DECO",
    description:
      "An Art Deco–inspired ring composition combining geometric symmetry, vivid sapphires and rubies, and intricate diamond-set architectural detailing.",
    image: "/royale-deco.jpg",
    width: 650,
    displayScale: 0.85,
    sizeAdjustment: 0.9,
  },
  {
    title: "ORNAMENTA",
    description:
      "A study of architectural ornament translated into bold ring forms, exploring engraved movement, symmetry and contrasting precious-metal structures.",
    image: "/ornamenta.jpg",
    width: 900,
    displayScale: 0.9,
  },
  {
    title: "LUMIÈRE BRIDAL",
    description:
      "A technical bridal study exploring the proportions, elevation and architectural setting of an elongated centre diamond from multiple views.",
    image: "/lumiere-bridal-design-study.jpg",
    width: 650,
    displayScale: 0.9,
  },
  {
    title: "LUMIÈRE BRIDAL — STUDY",
    description:
      "A refined engagement-ring study examining centre-stone presentation, gallery construction and pavé detailing through front and profile views.",
    image: "/lumiere-bridal-structural-study.jpg",
    width: 650,
    displayScale: 0.9,
  },
  {
    title: "LUNA DUO",
    description:
      "A contemporary pearl jewellery study exploring contrast, balance and fluid diamond-set curves through complementary ring and earring forms.",
    image: "/luna-duo.jpg",
    width: 650,
  },
  {
    title: "ARABELLE",
    description:
      "An ornamental high jewellery study exploring symmetry, articulated movement and intricate diamond-set architectural forms.",
    image: "/Arabelle.jpg",
    width: 634,
  },
  {
    title: "ÉQUILIBRE",
    description:
      "A study in balance and proportion, combining geometric diamond forms with delicate linear structures and graduated movement.",
    image: "/ÉQUILIBRE.jpg",
    width: 598,
  },
  {
    title: "ÉLODIE",
    description:
      "A refined vertical composition exploring geometry, articulation and the graceful progression of diamond-set elements.",
    image: "/Élodie.jpg",
    width: 560,
  },
  {
    title: "LYRIA",
    description:
      "An exploration of pearls and diamonds through flowing openwork forms, balancing softness, rhythm and sculptural elegance.",
    image: "/Lyria(1).jpg",
    width: 704,
  },
  {
    title: "LUNA PEARL",
    description:
      "A sculptural pearl ring study exploring volume, symmetry and fluid diamond-set architecture from multiple perspectives.",
    image: "/Luna Pearl Painted.jpg",
    width: 576,
    sizeAdjustment: 0.9,
  },
  {
    title: "ÉTERNELLE CASCADE",
    description:
      "A study of elongated diamond earrings conceived through cascading geometry, articulated lines and suspended points of light.",
    image: "/Éternelle Cascade.jpg",
    width: 544,
    displayScale: 1.15,
  },
  {
    title: "FLORENTINE",
    description:
      "A technical ring study exploring an ornate pear-shaped setting through multiple views, structural detailing and refined proportions.",
    image: "/florentine.jpg",
    width: 576,
  },
  {
    title: "EQUUS CROWN — CONCEPT EXPLORATION",
    description:
      "Early studies in equestrian symbolism, proportion and ornamental structure, documenting the evolution of an architectural ring concept.",
    image: "/equus-concept.jpg",
    width: 672,
  },
  {
    title: "EQUUS CROWN — DESIGN DEVELOPMENT",
    description:
      "The developed Equus Crown concept, translating early sketches into a richly detailed composition of sculptural horses, enamel and gemstones.",
    image: "/equus-crown.jpg",
    width: 672,
    sizeAdjustment: 0.9,
  },
  {
    title: "NOCTURNE",
    description:
      "A sculptural bracelet concept exploring botanical ornamentation, dramatic contrast and the interplay between pavé surfaces and dimensional floral forms.",
    image: "/nocturnebracelet-topand3.4.jpg",
    width: 736,
  },
  {
    title: "SILLAGE",
    description:
      "A gestural jewellery study exploring how diamonds and fluid lines travel across the hand, wrist and body.",
    image: "/Sillage(2).jpg",
    width: 544,
    sizeAdjustment: 1.15,
  },
  {
    title: "ÉCLAT",
    description:
      "A diamond necklace study built around a dramatic pear-shaped centre stone, balancing brilliance with an organic, botanical composition.",
    image: "/Eclat.jpg",
    width: 608,
  },
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

export default function SketchesDesign() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [lightboxClosing, setLightboxClosing] = useState(false);
  const lightboxCloseTimer = useRef(null);
  // Mobile-only delayed selection feedback; desktop navigation remains immediate.
  const mobileNavigationTimer = useRef(null);
  const mobileFeedbackTimer = useRef(null);
  const [selectedMobileSubLink, setSelectedMobileSubLink] = useState(null);
  const [mobileNavigating, setMobileNavigating] = useState(false);

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


  const closeLightbox = () => {
    if (!selectedImage || lightboxClosing) return;
    setLightboxVisible(false);
    setLightboxClosing(true);
    window.clearTimeout(lightboxCloseTimer.current);
    lightboxCloseTimer.current = window.setTimeout(() => {
      setSelectedImage(null);
      setLightboxClosing(false);
    }, 300);
  };

  const openLightbox = (event, work) => {
    const image = event.currentTarget.querySelector("img");
    if (!image?.complete || !image.naturalWidth) return;
    const rect = image.getBoundingClientRect();
    window.clearTimeout(lightboxCloseTimer.current);
    setLightboxClosing(false);
    setLightboxVisible(false);
    setSelectedImage({
      image: image.currentSrc || work.image,
      title: work.title,
      previewWidth: rect.width,
      previewHeight: rect.height,
    });
  };

  useEffect(() => {
    if (!selectedImage) return undefined;
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setLightboxVisible(true));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selectedImage]);

  useEffect(() => {
    if (!selectedImage) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedImage, lightboxClosing]);

  useEffect(() => () => window.clearTimeout(lightboxCloseTimer.current), []);

  const cancelMobileNavigation = () => {
    window.clearTimeout(mobileNavigationTimer.current);
    window.clearTimeout(mobileFeedbackTimer.current);
    mobileNavigationTimer.current = null;
    mobileFeedbackTimer.current = null;
  };

  const resetMobileMenu = () => {
    setMenuOpen(false);
    setMobileDropdown(null);
    setSelectedMobileSubLink(null);
    setMobileNavigating(false);
  };

  // Browser Back/Forward must cancel any pending mobile transition.
  useEffect(() => {
    const onHistoryChange = () => {
      cancelMobileNavigation();
      resetMobileMenu();
    };
    window.addEventListener("popstate", onHistoryChange);
    window.addEventListener("pageshow", onHistoryChange);
    return () => {
      window.removeEventListener("popstate", onHistoryChange);
      window.removeEventListener("pageshow", onHistoryChange);
      cancelMobileNavigation();
    };
  }, []);

  useEffect(() => {
    cancelMobileNavigation();
    resetMobileMenu();
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const onResize = () => {
      if (!media.matches) resetMobileMenu();
    };
    media.addEventListener?.("change", onResize);
    return () => media.removeEventListener?.("change", onResize);
  }, []);

  // Only the mobile drawer locks background scrolling.
  useEffect(() => {
    if (!menuOpen || window.innerWidth > 720) return undefined;
    const body = document.body;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position, top: body.style.top,
      left: body.style.left, right: body.style.right,
      width: body.style.width, overflow: body.style.overflow,
    };
    body.dataset.mobileMenuOpen = "true";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    const onEscape = (event) => {
      if (event.key === "Escape") resetMobileMenu();
    };
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("keydown", onEscape);
      delete body.dataset.mobileMenuOpen;
      Object.entries(previous).forEach(([key, value]) => { body.style[key] = value; });
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  const go = (path) => {
    // Keep the approved desktop behavior unchanged.
    if (window.innerWidth <= 720) cancelMobileNavigation();
    setMenuOpen(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);
    if (window.innerWidth > 720 || path !== pathname) navigate(path);
  };

  const mobileGo = (path, isSubmenuSelection = false) => {
    if (mobileNavigationTimer.current !== null) return;
    if (path === window.location.pathname) { resetMobileMenu(); return; }
    const mobile = window.matchMedia("(max-width: 720px)").matches;
    if (!mobile || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      go(path);
      return;
    }
    const initialPath = window.location.pathname;
    if (isSubmenuSelection) {
      setSelectedMobileSubLink(path);
      mobileFeedbackTimer.current = window.setTimeout(() => {
        mobileFeedbackTimer.current = null;
        if (window.location.pathname === initialPath) setMobileNavigating(true);
      }, 190);
    } else {
      setMobileNavigating(true);
    }
    mobileNavigationTimer.current = window.setTimeout(() => {
      mobileNavigationTimer.current = null;
      if (window.location.pathname !== initialPath) return;
      resetMobileMenu();
      navigate(path);
    }, isSubmenuSelection ? 390 : 360);
  };
  return (
    <main className={`aboutPage${mobileNavigating ? " sketchMobileNavigating" : ""}`}>
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
        /* Selected Directions: image and gold-label links only. */
        .directions .directionImageLink {
          display: block;
          width: 100%;
          padding: 0;
          margin: 0;
          background: transparent;
          border: 0;
          border-radius: 0;
          text-align: left;
          cursor: pointer;
        }
        .directions .directionImageLink img {
          transform: scale(1);
          transform-origin: center center;
          transition: transform .4s cubic-bezier(.22,.61,.36,1);
        }
        .directions .directionStatusLink {
          display: inline-block;
          padding: 0;
          margin: 0;
          border: 0;
          border-radius: 0;
          background: transparent;
          text-align: left;
          font-weight: 400;
          cursor: pointer;
          transform: scale(1);
          transform-origin: left center;
          transition: transform .38s cubic-bezier(.22,.61,.36,1), color .38s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .directions .directionImageLink:hover img,
          .directions .directionImageLink:focus-visible img { transform: scale(1.035); }
          .directions .directionStatusLink:hover,
          .directions .directionStatusLink:focus-visible {
            transform: scale(1.06);
            color: #7D6745;
          }
        }
        .directions .directionImageLink:focus-visible,
        .directions .directionStatusLink:focus-visible {
          outline: 2px solid #9C8664;
          outline-offset: 5px;
        }
        @media (prefers-reduced-motion: reduce) {
          .directions .directionImageLink img,
          .directions .directionStatusLink { transition: none; }
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
           SKETCHES & DESIGN — PORTFOLIO BODY ONLY
           The entire approved About header, dropdown navigation, mobile
           navigation, footer, and page tokens above are preserved.
        ========================================================= */
        .aboutPage .sketchPortfolio {
          width: min(1180px, 86vw);
          margin: 0 auto;
          padding: 0 0 42px;
        }
        .aboutPage .sketchPortfolioIntro {
          max-width: 900px;
          margin: 0 auto 105px;
          text-align: center;
        }
        .aboutPage .sketchPortfolioIntro .mainTitle {
          margin-bottom: 34px;
        }
        .aboutPage .sketchPortfolioIntro .sketchIntroText {
          margin: 0 auto;
          max-width: 760px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(24px, 2vw, 34px);
          font-weight: 300;
          line-height: 1.35;
          color: #6C6258;
        }
        .aboutPage .sketchWork {
          margin: 0 auto;
          width: 100%;
          text-align: center;
        }
        .aboutPage .sketchWorkTitle {
          margin: 0 auto 22px;
          max-width: 790px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(30px, 2.45vw, 44px);
          line-height: 1.12;
          letter-spacing: .14em;
          font-weight: 400;
          text-transform: uppercase;
          color: #2A2723;
        }
        .aboutPage .sketchWorkDescription {
          max-width: 760px;
          margin: 0 auto 46px;
          font: 300 17px/1.82 'Times New Roman', Georgia, serif;
          color: #3F3933;
        }
        .aboutPage .sketchWorkImageWrap {
          display: block;
          position: relative;
          width: 95%;
          margin: 0 auto;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          text-align: center;
        }
        .aboutPage .sketchWorkImage {
          display: block;
          width: 100%;
          max-width: 100%;
          height: auto;
          margin: 0 auto;
          object-fit: contain;
          cursor: pointer;
          transform: scale(1);
          transition: transform 360ms cubic-bezier(.22,.61,.36,1);
          user-select: none;
          -webkit-user-select: none;
          -webkit-user-drag: none;
        }
        .aboutPage .sketchExpandIcon {
          position: absolute;
          right: 15px;
          bottom: 15px;
          z-index: 2;
          width: 37px;
          height: 37px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9C8664;
          background: rgba(255,255,255,.88);
          border: 1px solid rgba(156,134,100,.23);
          opacity: 0;
          transform: translateY(5px);
          transition: opacity 320ms ease, transform 320ms cubic-bezier(.22,1,.36,1);
          pointer-events: none;
        }
        .aboutPage .sketchExpandIcon svg { display: block; width: 19px; height: 19px; }
        @media (hover:hover) and (pointer:fine) {
          .aboutPage .sketchWorkImageWrap:hover .sketchWorkImage { transform: scale(1.015); }
          .aboutPage .sketchWorkImageWrap:hover .sketchExpandIcon { opacity: 1; transform: translateY(0); }
        }
        .aboutPage .sketchWorkImageWrap:focus-visible { outline: 1px solid #9C8664; outline-offset: 5px; }
        .aboutPage .sketchWorkImageWrap:focus-visible .sketchExpandIcon { opacity: 1; transform: none; }
        .aboutPage .sketchSectionDivider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin: 68px auto 125px;
        }
        .aboutPage .sketchSectionDivider::before,
        .aboutPage .sketchSectionDivider::after {
          content: '';
          width: 140px;
          height: 1px;
          background: rgba(40,35,30,.14);
        }
        .aboutPage .sketchSectionNumber {
          font: 300 22px/1.2 'Cormorant Garamond', Georgia, serif;
          letter-spacing: .06em;
          color: rgba(40,35,30,.42);
        }
        /* Approved 73% graphite lightbox, fade/scale open 450ms and close 300ms. */
        .aboutPage .sketchLightbox {
          position: fixed;
          inset: 0;
          z-index: 5000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(17,16,15,.73);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          opacity: 0;
          transition: opacity 450ms cubic-bezier(.22,1,.36,1);
        }
        .aboutPage .sketchLightbox.isVisible { opacity: 1; }
        .aboutPage .sketchLightbox.isClosing { transition-duration: 300ms; }
        .aboutPage .sketchLightboxFrame {
          position: relative;
          max-width: calc(100vw - 44px);
          max-height: calc(100vh - 110px);
          background: transparent;
          transform: scale(.965);
          opacity: 0;
          transition: transform 450ms cubic-bezier(.22,1,.36,1), opacity 450ms ease;
        }
        .aboutPage .sketchLightbox.isVisible .sketchLightboxFrame {
          transform: scale(1);
          opacity: 1;
        }
        .aboutPage .sketchLightbox.isClosing .sketchLightboxFrame {
          transition-duration: 300ms;
        }
        .aboutPage .sketchLightboxImage {
          display: block;
          max-width: calc(100vw - 44px);
          max-height: calc(100vh - 110px);
          object-fit: contain;
          user-select: none;
          -webkit-user-select: none;
          -webkit-user-drag: none;
        }
        .aboutPage .sketchLightboxClose {
          position: fixed;
          top: 17px;
          right: 23px;
          z-index: 5001;
          padding: 4px 10px;
          border: 0;
          background: transparent;
          color: #f4f0eb;
          font: 300 38px/1 Arial,sans-serif;
          cursor: pointer;
        }
        .aboutPage .sketchLightboxClose:focus-visible { outline: 1px solid #C8B08A; outline-offset: 4px; }
        @media (min-width: 721px) and (max-height:900px) {
          .aboutPage .sketchPortfolioIntro { margin-bottom: 82px; }
          .aboutPage .sketchSectionDivider { margin-top: 58px; margin-bottom:105px; }
        }
        @media (max-width:720px) {
          .aboutPage .sketchPortfolio { width: 88vw; }
          .aboutPage .sketchPortfolioIntro { margin-bottom: 90px; }
          .aboutPage .sketchPortfolioIntro .mainTitle,
          .aboutPage .sketchWorkTitle { font-size: 28px; letter-spacing: .11em; }
          .aboutPage .sketchPortfolioIntro .sketchIntroText { font-size: 23px; }
          .aboutPage .sketchWorkDescription { font-size: 16px; line-height: 1.75; margin-bottom: 34px; }
          /* Match the second artwork (PARADIS — CELESTIAL PAIR): identical side gutters for every image on phones. */
          .aboutPage .sketchWorkImageWrap { width: 85%; max-width: 85% !important; }
          .aboutPage .sketchWorkImage { width: 100%; max-width: 100% !important; cursor: pointer; }
          .aboutPage .sketchExpandIcon { opacity: .85; transform: none; right: 8px; bottom: 8px; }
          .aboutPage .sketchSectionDivider { margin: 40px auto 85px; gap: 18px; }
          .aboutPage .sketchSectionDivider::before,
          .aboutPage .sketchSectionDivider::after { width: 70px; }
          .aboutPage .sketchSectionNumber { font-size: 18px; }
        }
        @media (prefers-reduced-motion:reduce) {
          .aboutPage .sketchWorkImage,
          .aboutPage .sketchExpandIcon,
          .aboutPage .sketchLightbox,
          .aboutPage .sketchLightboxFrame { transition: none; }
        }


        /* FINAL PROJECT DISCUSSION — mirrors Sculpture & Installations.
           Scoped to Sketches & Design; available on desktop and mobile. */
        .aboutPage .sketchClosing {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 42px 0 135px;
          margin: 0 auto;
          clear: both;
        }
        /* Two additional lines of breathing room before the closing CTA — desktop only. */
        @media (min-width: 721px) {
          .aboutPage .sketchClosing { padding-top: 102px; }
        }
        .aboutPage .sketchClosing > .topicLabel {
          margin-bottom: 22px;
        }
        .aboutPage .sketchClosing > .aboutContactLink {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 245px;
          padding: 14px 22px;
          border: 1px solid rgba(156, 134, 100, .42);
          background: #fff;
          color: #3f3933;
          font: 400 10px Arial, sans-serif;
          letter-spacing: .24em;
          text-transform: uppercase;
          cursor: pointer;
          transition: color .4s ease, border-color .4s ease;
        }
        .aboutPage .sketchClosing > .aboutContactLink:hover {
          color: #9C8664;
          border-color: #9C8664;
        }
        .aboutPage .sketchClosing h2 {
          margin: 0 0 15px;
          font: 400 clamp(30px, 2.45vw, 44px)/1.12 'Cormorant Garamond', serif;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #2A2723;
        }
        .aboutPage .sketchClosing > p:not(.topicLabel) {
          margin: 0 auto 32px;
          max-width: 750px;
          font: 300 17px/1.82 'Times New Roman', Georgia, serif;
          color: #6C6258;
        }
        @media (max-width: 720px) {
          .aboutPage .sketchClosing { padding-bottom: 100px; }
          .aboutPage .sketchClosing h2 { font-size: 28px; letter-spacing: .11em; }
          .aboutPage .sketchClosing > p:not(.topicLabel) { font-size: 16px; line-height: 1.75; }
        }

        /* =========================================================
           SKETCHES & DESIGN — MOBILE STANDARD ONLY (<=720px).
           No desktop layout, styling, header or gallery overrides.
        ========================================================= */
        @media (min-width: 721px) {
          .aboutPage .hamburger,
          .aboutPage .mobileOverlay,
          .aboutPage .mobilePanel { display: none !important; }
        }
        @media (max-width: 720px) {
          .aboutPage .container { width: 92vw; padding-top: 38px; }
          .aboutPage .header { margin: 0 0 68px; }
          .aboutPage .homeLink > .logo { width: 76px; height: auto; margin-bottom: 26px; }
          .aboutPage .name { font-size: 18px; letter-spacing: .18em; }
          .aboutPage .subtitle { margin-top: 8px; letter-spacing: .26em; }
          .aboutPage .subtitle p:first-child { font-size: 10px; letter-spacing: .26em; }
          .aboutPage .subtitle p:nth-child(2) { font-size: 7.4px; letter-spacing: .20em; }

          .aboutPage, .aboutPage *,
          .aboutPage *::before, .aboutPage *::after {
            -webkit-tap-highlight-color: transparent !important;
          }
          .aboutPage .hamburger,
          .aboutPage .mobilePanel button,
          .aboutPage .mobilePanel [role="button"] {
            -webkit-appearance: none; appearance: none;
            border-radius: 0; box-shadow: none;
            -webkit-tap-highlight-color: transparent !important;
          }

          .aboutPage .hamburger {
            display: flex !important;
            align-items: center; justify-content: center;
            position: fixed; top: 12px; right: 12px;
            width: 56px; height: 52px; padding: 0; margin: 0;
            border: 0; background: transparent; z-index: 1300;
          }
          .aboutPage .hamburger span {
            display: block; position: absolute; left: 9px; top: 25px;
            width: 38px; height: 1.5px; margin: 0;
            background: #1d1b18; transform-origin: center;
            transition: transform 480ms cubic-bezier(.22,.61,.36,1),
                        opacity 260ms ease, background-color 340ms ease;
          }
          .aboutPage .hamburger span:nth-child(1) { transform: translateY(-11px); }
          .aboutPage .hamburger span:nth-child(2) { transform: translateY(-3.7px); }
          .aboutPage .hamburger span:nth-child(3) { transform: translateY(3.7px); }
          .aboutPage .hamburger span:nth-child(4) { transform: translateY(11px); }
          .aboutPage .hamburger.isOpen span { background: #e1dbcf; }
          .aboutPage .hamburger.isOpen span:nth-child(1) { transform: rotate(45deg); }
          .aboutPage .hamburger.isOpen span:nth-child(2),
          .aboutPage .hamburger.isOpen span:nth-child(3) { opacity: 0; transform: scaleX(.55); }
          .aboutPage .hamburger.isOpen span:nth-child(4) { transform: rotate(-45deg); }
          .aboutPage .hamburger:focus-visible { outline: 1px solid #9C8664; outline-offset: 1px; }

          .aboutPage .mobileOverlay {
            position: fixed; inset: 0; z-index: 1100;
            background: rgba(0,0,2,.18); backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            opacity: 0; visibility: hidden; pointer-events: none;
            transition: opacity 450ms ease, visibility 450ms ease;
          }
          .aboutPage .mobileOverlay.open { opacity: 1; visibility: visible; pointer-events: auto; }
          .aboutPage .mobilePanel {
            position: fixed; top: 0; right: 0; bottom: 0;
            width: min(83.46vw,417.3px);
            height: 100vh; height: 100dvh;
            padding: 92px 34px max(30px,env(safe-area-inset-bottom));
            padding-left: calc(34px + min(83.46vw,417.3px) - min(78vw,390px));
            z-index: 1200; border-left: 1px solid rgba(201,179,140,.18);
            background: rgba(0,0,2,.40);
            backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
            transform: translateX(100%); visibility: hidden;
            overflow-y: auto; overscroll-behavior: contain;
            -webkit-overflow-scrolling: touch;
            transition: transform 480ms cubic-bezier(.22,.61,.36,1), visibility 480ms;
          }
          .aboutPage .mobilePanel.open { transform: translateX(0); visibility: visible; }
          .aboutPage .closeMenu { display: none; }
          .aboutPage .mobileMenuItem {
            display: block; width: 100%; margin: 0 0 31px; padding: 0;
            border: 0; background: transparent; text-align: left;
            color: #d4cec2; font: 400 clamp(20px,5.5vw,30px)/1.22 "Times New Roman",Georgia,serif;
            letter-spacing: .04em; cursor: pointer;
          }
          .aboutPage .mobileMenuItem:hover,
          .aboutPage .mobileMenuItem:focus-visible { color: #c9b38c; }
          .aboutPage .mobileMenuItem.isContact { color: #c9b38c; }
          .aboutPage .mobileMenuItem:focus-visible,
          .aboutPage .mobileSubmenuLink:focus-visible { outline: 1px solid #c9b38c; outline-offset: 4px; }
          .aboutPage .mobileMenuItem.hasSubmenu { position: relative; padding-right: 20px; }
          .aboutPage .mobileMenuItem.hasSubmenu::after {
            content: ""; position: absolute; right: 3px; top: 8px;
            width: 8px; height: 8px; border-right: 1px solid #c9b38c;
            border-bottom: 1px solid #c9b38c; transform: rotate(45deg);
            transition: transform 650ms cubic-bezier(.22,.61,.36,1);
          }
          .aboutPage .mobileMenuItem.hasSubmenu[aria-expanded="true"]::after {
            transform: translateY(4px) rotate(225deg);
          }
          .aboutPage .mobileSubmenu {
            display: grid; grid-template-rows: 0fr; opacity: 0;
            margin: 0 0 0 18px; padding-left: 18px;
            border-left: 1px solid rgba(201,179,140,.3);
            transition: grid-template-rows 760ms cubic-bezier(.22,.61,.36,1),
                        opacity 620ms ease, margin-top 760ms ease, margin-bottom 760ms ease;
          }
          .aboutPage .mobileSubmenu.isExpanded {
            grid-template-rows: 1fr; opacity: 1;
            margin-top: -18px; margin-bottom: 29px;
          }
          .aboutPage .mobileSubmenuInner {
            min-height: 0; overflow: hidden;
            margin-left: -24px; padding-left: 24px;
          }
          .aboutPage .mobileSubmenuLink {
            position: relative; display: block; width: 100%;
            padding: 8px 0; border: 0; background: transparent;
            text-align: left; color: #e1dbcf; font: 14px/1.5 Arial,sans-serif;
            cursor: pointer; opacity: 0; transform: translateY(-8px);
            transition: opacity 580ms ease, transform 680ms cubic-bezier(.22,.61,.36,1),color 250ms ease;
          }
          .aboutPage .mobileSubmenu.isExpanded .mobileSubmenuLink { opacity: 1; transform: translateY(0); }
          .aboutPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(2) { transition-delay: 55ms; }
          .aboutPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(3) { transition-delay: 110ms; }
          .aboutPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(4) { transition-delay: 165ms; }
          .aboutPage .mobileSubmenuLink::before {
            content: ""; position: absolute; top: 50%; left: -20.5px;
            width: 4px; height: 4px; border-radius: 50%; background: #c9b38c;
            transform: translateY(-50%); pointer-events: none;
          }
          .aboutPage .mobileSubmenu.isExpanded .mobileSubmenuLink.isSelected {
            color: #fff; transform: translateY(0) scale(1.055);
            transform-origin: left center;
            transition: color 140ms ease, transform 140ms ease;
          }
          .aboutPage .mobileSubmenuLink.isSelected::before {
            width: 6px; height: 6px; background: #fff;
            transform: translate(-1px,-50%);
          }
          .aboutPage.sketchMobileNavigating { opacity: 0; transition: opacity 360ms ease; pointer-events: none; }

          /* Gallery lightbox: 22px side gutters, 48px vertical padding.
             Only the visible image intercepts taps; backdrop closes on tap. */
          .aboutPage .sketchLightbox { padding: 48px 22px; box-sizing: border-box; }
          .aboutPage .sketchLightboxFrame {
            max-width: calc(100vw - 44px);
            max-height: calc(100dvh - 96px);
            pointer-events: none;
          }
          .aboutPage .sketchLightboxImage {
            max-width: calc(100vw - 44px);
            max-height: calc(100dvh - 112px);
            width: auto !important; height: auto !important; object-fit: contain;
            pointer-events: auto;
          }
        }
        @media (max-width: 720px) and (prefers-reduced-motion: reduce) {
          .aboutPage .hamburger span,
          .aboutPage .mobilePanel,
          .aboutPage .mobileOverlay,
          .aboutPage .mobileSubmenu,
          .aboutPage .mobileSubmenuLink,
          .aboutPage.sketchMobileNavigating { transition: none !important; }
        }
        /* Keep site-wide BackToTop behind any open mobile drawer. */
        body[data-mobile-menu-open="true"] .siteBackToTop {
          opacity: 0 !important; visibility: hidden !important; pointer-events: none !important;
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
          SKETCHES & DESIGN — CONTENT / ALL ORIGINAL WORKS
      ======================================================= */}
      <div className="sketchPortfolio">
        <section className="sketchPortfolioIntro">
          <p className="topicLabel">Sketches &amp; Design</p>
          <h1 className="mainTitle">Jewellery Design Portfolio</h1>
          <p className="sketchIntroText">
            A curated collection of original jewellery concepts, design studies and
            finished creations exploring sculptural form, gemstone architecture,
            movement and emotional storytelling.
          </p>
        </section>

        {works.map((work, index) => (
          <div key={work.title}>
            <section className="sketchWork">
              <h2 className="sketchWorkTitle">{work.title}</h2>
              <p className="sketchWorkDescription">{work.description}</p>
              <button
                type="button"
                className="sketchWorkImageWrap"
                style={{ maxWidth: `${work.width * 0.85 * 0.85 * (work.displayScale ?? 1) * (work.sizeAdjustment ?? 1)}px`, "--individual-image-scale": work.sizeAdjustment ?? 1 }}
                aria-label={`Enlarge ${work.title} by 15 percent`}
                onClick={(event) => openLightbox(event, work)}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="sketchWorkImage"
                  loading={index > 1 ? "lazy" : "eager"}
                  draggable="false"
                  onContextMenu={(event) => event.preventDefault()}
                />
                <span className="sketchExpandIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5" />
                  </svg>
                </span>
              </button>
            </section>
            <div className="sketchSectionDivider" aria-hidden="true">
              <span className="sketchSectionNumber">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}
        {/* FINAL SECTION — visible after ÉCLAT on both mobile and desktop.
            This is part of the page content, not the footer or mobile menu. */}
        <section id="sketches-creative-practice" className="sketchClosing" aria-label="Discuss a jewellery design project">
          <p className="topicLabel">Creative Practice</p>
          <h2>From Concept to Creation</h2>
          <p>From the first sketch to a distinctive jewel, I develop personal commissions and signature collections for jewellery brands and retailers — bringing together form, proportion and materials to create designs with a strong, recognizable identity.</p>
          <button type="button" className="aboutContactLink" onClick={() => go("/contact")}>Discuss a Project</button>
        </section>
      </div>

      {selectedImage && (
        <div
          className={`sketchLightbox${lightboxVisible ? " isVisible" : ""}${lightboxClosing ? " isClosing" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged ${selectedImage.title}`}
          onClick={closeLightbox}
        >
          <button type="button" className="sketchLightboxClose"
            onClick={(event) => { event.stopPropagation(); closeLightbox(); }} aria-label="Close image">×</button>
          <div className="sketchLightboxFrame" onClick={(event) => {
            if (window.innerWidth > 720) event.stopPropagation();
          }}>
            <img src={selectedImage.image} alt={selectedImage.title}
              className="sketchLightboxImage"
              style={{ width: `${Math.round(selectedImage.previewWidth * 1.15)}px`, height: `${Math.round(selectedImage.previewHeight * 1.15)}px` }}
              draggable="false"
              onClick={(event) => event.stopPropagation()}
              onContextMenu={(event) => event.preventDefault()} />
          </div>
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

      {/* =======================================================
          MOBILE BUTTON
      ======================================================= */}

      <button type="button"
        className={`hamburger${menuOpen ? " isOpen" : ""}`}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-controls="sketches-mobile-navigation"
        aria-expanded={menuOpen}
        onClick={() => { cancelMobileNavigation(); setMenuOpen((open) => !open); }}
      ><span></span><span></span><span></span><span></span></button>

      {/* =======================================================
          MOBILE OVERLAY
      ======================================================= */}

      <div
        className={
          menuOpen
            ? "mobileOverlay open"
            : "mobileOverlay"
        }

        onClick={() => { cancelMobileNavigation(); resetMobileMenu(); }}
      ></div>

      {/* MOBILE MENU — approved Home standard, only visible at <=720px. */}
      <aside id="sketches-mobile-navigation"
        className={menuOpen ? "mobilePanel open" : "mobilePanel"}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <button type="button" className="mobileMenuItem hasSubmenu"
          aria-expanded={mobileDropdown === "work"}
          onClick={() => setMobileDropdown(mobileDropdown === "work" ? null : "work")}
        >SELECTED WORK</button>
        <div className={`mobileSubmenu${mobileDropdown === "work" ? " isExpanded" : ""}`}>
          <div className="mobileSubmenuInner">
            {selectedWorkLinks.map((item) => <button key={item.path} type="button"
              className={`mobileSubmenuLink${selectedMobileSubLink === item.path ? " isSelected" : ""}`}
              onClick={() => mobileGo(item.path, true)}
            >{item.label}</button>)}
          </div>
        </div>
        <button type="button" className="mobileMenuItem hasSubmenu"
          aria-expanded={mobileDropdown === "jewellery"}
          onClick={() => setMobileDropdown(mobileDropdown === "jewellery" ? null : "jewellery")}
        >JEWELLERY DESIGN</button>
        <div className={`mobileSubmenu${mobileDropdown === "jewellery" ? " isExpanded" : ""}`}>
          <div className="mobileSubmenuInner">
            {jewelleryLinks.map((item) => <button key={item.path} type="button"
              className={`mobileSubmenuLink${selectedMobileSubLink === item.path ? " isSelected" : ""}`}
              onClick={() => mobileGo(item.path, true)}
            >{item.label}</button>)}
          </div>
        </div>
        {bottomNavItems.filter((item) => !["Selected Work", "Jewellery Design"].includes(item.label)).map((item) => (
          <button key={item.path} type="button"
            className={`mobileMenuItem${item.path === "/contact" ? " isContact" : ""}`}
            onClick={() => mobileGo(item.path)}
          >{item.label.toUpperCase()}</button>
        ))}
      </aside>

    </main>
  );
}