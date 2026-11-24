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

// SCULPTURE — 11 independent projects / 17 web-resolution JPGs.
// Place renamed images directly in: public/
// The original files 1.jpg ... 13.jpg plus three new descriptively named images.
// The five Rams previews swap images; Floral Lips and Fish Studies use active / inactive size swaps.
// Clicking an already-featured Floral Lips or Fish image uses the same approved
// lightbox as the other zoomable sculptures, on desktop and mobile.
// Other selected sculptures retain their 1.2% hover / 15% centered lightbox
// behavior as the supplied Sculpture & Installations reference.
// No open-original or full-resolution download link is offered.
const sculptureProjects = [
  {
    id: "lunar-blossom-rams",
    title: "Lunar Blossom Rams",
    category: "SCULPTURAL INSTALLATION · FORM EXPLORATION",
    description: "An exploration of movement, ornament and celebration, bringing together sculptural silhouettes, floral textures and flowing ribbon forms.",
    layout: "rams",
    images: [
      { src: "/07-lunar-blossom-rams-pair.jpg", alt: "Two floral rams with flowing ribbons and delicate branches", ratio: 2048 / 1513 },
      { src: "/10-lunar-blossom-rams-trio.jpg", alt: "Three stacked floral ram figures in warm red and gold tones", ratio: 1639 / 2048 },
      { src: "/03-golden-ram-concept.jpg", alt: "Single sculptural ram with gold horns and translucent ribbon forms", ratio: 1639 / 2048 },
      { src: "/14-lunar-blossom-rams-golden-family.jpg", alt: "Three golden floral rams beneath a soft pink ribbon and blossoming tree", ratio: 2048 / 1513 },
      { src: "/15-lunar-blossom-rams-golden-ram.jpg", alt: "Golden ram sculpture with a sweeping red and gold ribbon", ratio: 1639 / 2048 },
      { src: "/16-lunar-blossom-rams-floral-pair.jpg", alt: "Two floral rams beside a golden flowering tree and red ribbon", ratio: 1639 / 2048 },
    ],
  },
  {
    id: "the-garden-within",
    title: "The Garden Within",
    category: "FIGURATIVE SCULPTURE · BOTANICAL ORNAMENT",
    description: "A poetic meeting of portraiture and botanical form, where a sculpted face emerges through a richly layered composition of flowers and organic detail.",
    layout: "portrait",
    images: [
      { src: "/08-the-garden-within.jpg", alt: "The Garden Within sculptural face surrounded by deep red floral forms" },
    ],
  },
  {
    id: "the-serpent",
    title: "The Serpent",
    category: "SCULPTURAL OBJECT · METALLIC FORM",
    description: "A study of fluid motion and refined surface, translating the serpent's curved silhouette into a bold sculptural object.",
    layout: "portrait",
    images: [
      { src: "/11-the-serpent.jpg", alt: "Golden serpent sculpture with segmented arch and curved head" },
    ],
  },
  {
    id: "floral-lips",
    title: "Floral Lips",
    category: "CONTEMPORARY SCULPTURE · EXPRESSIVE FORM",
    description: "Two interpretations of a familiar form: one unfolding into floral ornament, the other defined by volume, colour and a polished sculptural surface.",
    layout: "duo",
    images: [
      { src: "/02-floral-lips-sephora.jpg", alt: "Burgundy floral lips sculpture with decorative blossoms on a gold Sephora base" },
      {
        src: "/12-floral-lips-burgundy.jpg",
        alt: "Polished burgundy lips sculpture on a slim dark display stand",
        eyebrow: "Selected Project",
        title: "Sculptural Lips",
        category: "Sculptural Studies · Form & Finish",
        description: "An exploration of volume, expression and surface finish. The completed high-gloss red sculpture is presented alongside white works in progress, revealing the transition from sculptural modelling to the finished object.",
      },
    ],
  },
  {
    id: "ice-cream-sculptural-seating",
    title: "Ice Cream · Sculptural Seating",
    category: "FUNCTIONAL SCULPTURE · PUBLIC SEATING",
    description: "A playful sculptural seating concept inspired by scoops of ice cream, where glossy colour, melting forms and textured waffle bases create an inviting place to sit, gather and take photographs.",
    layout: "landscape",
    images: [
      { src: "/ice-cream-01-studio.jpg", alt: "Pastel ice cream sculptural seating with a turquoise scoop, cherry and twin waffle bases on a white background" },
    ],
  },
  {
    id: "the-lion",
    title: "The Lion",
    category: "FIGURATIVE SCULPTURE · CHARACTER STUDY",
    description: "An expressive study of strength and character, developed through careful attention to anatomy, sculptural rhythm and the movement of the mane.",
    layout: "portrait",
    images: [
      { src: "/04-the-lion.jpg", alt: "White sculptural lion head with expressive open mouth and detailed mane" },
    ],
  },
  {
    id: "sculptural-portrait-vessels",
    title: "Sculptural Portrait Vessels",
    category: "DECORATIVE OBJECTS · FIGURATIVE DESIGN",
    description: "A pair of ornamental portrait vessels combining stylised human profiles, rich surface detail and contrasting decorative finishes.",
    layout: "portrait",
    images: [
      { src: "/05-sculptural-portrait-vessels.jpg", alt: "Pair of black and blue ornamental sculptural portrait vessels" },
    ],
  },
  {
    id: "blossom-carriage",
    title: "Blossom Carriage",
    category: "SCULPTURAL INSTALLATION · FLORAL DESIGN",
    description: "An ornate carriage reimagined as a floral sculpture, combining delicate blossoms, decorative metalwork and an architectural sense of symmetry.",
    layout: "landscape",
    images: [
      { src: "/06-blossom-carriage.jpg", alt: "Decorative floral carriage with pale pink roses and intricate wheels" },
    ],
  },
  {
    id: "fish-studies",
    title: "Leaping Fish · Tidal Form",
    category: "SCULPTURE · MOVEMENT STUDY",
    description: "A sculptural interpretation of water and motion, shaped by sweeping curves and the upward energy of a leaping fish.",
    layout: "fish-duo",
    images: [
      {
        title: "Leaping Fish · Tidal Form",
        category: "SCULPTURE · MOVEMENT STUDY",
        description: "A sculptural interpretation of water and motion, shaped by sweeping curves and the upward energy of a leaping fish.",
        src: "/01-leaping-fish.jpg",
        alt: "Sculptural fish leaping through a swirling wave-like form",
      },
      {
        title: "School of Fish · Flow Study",
        category: "SCULPTURE · RHYTHM AND REPETITION",
        description: "An exploration of collective movement, where repeating fish forms create a continuous spiral of rhythm and flow.",
        src: "/13-school-of-fish.jpg",
        alt: "Dark sculpture of a swirling school of fish",
      },
    ],
  },
  {
    id: "swans",
    title: "Swans",
    category: "FIGURATIVE SCULPTURE · ORGANIC FORM",
    description: "A quiet study of elegance and balance, expressed through the graceful curves and interwoven silhouettes of two swans.",
    layout: "landscape",
    images: [
      { src: "/09-swans.jpg", alt: "Pair of white swan sculptures with gracefully curved necks" },
    ],
  },
];

// Exactly these eight projects use the reference hover-and-lightbox interaction.
const sculptureZoomProjectIds = new Set([
  "the-garden-within",
  "the-serpent",
  "the-lion",
  "ice-cream-sculptural-seating",
  "sculptural-portrait-vessels",
  "blossom-carriage",
  "swans",
]);

export default function Sculpture() {
  const [menuOpen, setMenuOpen] = useState(false);
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
    if (!menuOpen) return;
    const body = document.body;
    const scrollY = window.scrollY;
    const previous = { position: body.style.position, top: body.style.top, left: body.style.left,
      right: body.style.right, width: body.style.width, overflow: body.style.overflow };
    body.dataset.mobileMenuOpen = "true";
    Object.assign(body.style, { position: "fixed", top: `-${scrollY}px`, left: "0", right: "0", width: "100%", overflow: "hidden" });
    const escape = event => { if (event.key === "Escape") { setMenuOpen(false); setMobileDropdown(null); } };
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("keydown", escape);
      delete body.dataset.mobileMenuOpen;
      Object.entries(previous).forEach(([key,value]) => { body.style[key] = value; });
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  const [sculptureLightboxImage, setSculptureLightboxImage] = useState(null);
  const [sculptureLightboxClosing, setSculptureLightboxClosing] = useState(false);
  const sculptureLightboxTimer = useRef(null);
  const closeSculptureLightbox = () => {
    if (!sculptureLightboxImage || sculptureLightboxClosing) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setSculptureLightboxImage(null);
      return;
    }
    setSculptureLightboxClosing(true);
    sculptureLightboxTimer.current = window.setTimeout(() => {
      setSculptureLightboxImage(null);
      setSculptureLightboxClosing(false);
      sculptureLightboxTimer.current = null;
    }, 300);
  };
  useEffect(() => () => {
    if (sculptureLightboxTimer.current !== null) window.clearTimeout(sculptureLightboxTimer.current);
  }, []);
  // Floral Lips: start with the left artwork full size and the right at 66%.
  // Mobile Rams filmstrip: a fine progress line follows real horizontal scroll.
  const ramsStripRef = useRef(null);
  const [ramsScrollProgress, setRamsScrollProgress] = useState(0);
  const updateRamsScroll = () => {
    const strip = ramsStripRef.current;
    if (!strip) return;
    const range = Math.max(0, strip.scrollWidth - strip.clientWidth);
    setRamsScrollProgress(range > 0 ? Math.max(0, Math.min(1, strip.scrollLeft / range)) : 0);
  };
  useEffect(() => {
    const strip = ramsStripRef.current;
    if (!strip) return undefined;
    const observer = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(updateRamsScroll) : null;
    observer?.observe(strip);
    const onResize = () => updateRamsScroll();
    window.addEventListener("resize", onResize);
    updateRamsScroll();
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);
  const [featuredLipsIndex, setFeaturedLipsIndex] = useState(0);
  const [featuredLipsTextIndex, setFeaturedLipsTextIndex] = useState(0);
  const [lipsTextHidden, setLipsTextHidden] = useState(false);
  const lipsGalleryRef = useRef(null);
  // Fish Studies: same active / inactive size-swap interaction used in Floral Lips.
  const [featuredFishIndex, setFeaturedFishIndex] = useState(0);
  const fishGalleryRef = useRef(null);
  // The interactive pairs animate their widths. Without a locked gallery height,
  // the grid row can briefly shrink during the transition and move nearby sections.
  // Freeze the exact current height before switching; clear it only on resize.
  const selectLipsPhoto = (index) => {
    // One click immediately commits both photo and text selection.
    // No busy guard or delayed timer: an earlier animation cannot swallow
    // the next click, including quick switching in either direction.
    if (index === featuredLipsIndex) return;
    const gallery = lipsGalleryRef.current;
    if (gallery) {
      const height = gallery.getBoundingClientRect().height;
      if (height > 0) gallery.style.height = `${Math.ceil(height)}px`;
    }
    setFeaturedLipsIndex(index);
    setFeaturedLipsTextIndex(index);
    setLipsTextHidden(false);
  };
  const selectFishPhoto = (index) => {
    if (index === featuredFishIndex) return;
    const gallery = fishGalleryRef.current;
    if (gallery) {
      const height = gallery.getBoundingClientRect().height;
      if (height > 0) gallery.style.height = `${Math.ceil(height)}px`;
    }
    setFeaturedFishIndex(index);
  };
  useLayoutEffect(() => {
    const resetHeightForResponsiveLayout = () => {
      if (lipsGalleryRef.current) lipsGalleryRef.current.style.height = "";
      if (fishGalleryRef.current) fishGalleryRef.current.style.height = "";
    };
    window.addEventListener("resize", resetHeightForResponsiveLayout);
    return () => window.removeEventListener("resize", resetHeightForResponsiveLayout);
  }, []);
  // Same modal behavior as the reference: click an image to view it at
  // 115% of its on-page size, centered and capped by the viewport.
  const openSculptureLightbox = (event, project, photo) => {
    const preview = event.currentTarget.querySelector("img");
    if (!preview || !preview.complete || preview.naturalWidth === 0) return;
    setSculptureLightboxClosing(false);
    setSculptureLightboxImage({
      src: preview.currentSrc || preview.src || photo.src,
      alt: photo.alt,
      caption: project.title,
      previewWidth: preview.offsetWidth,
      previewHeight: preview.offsetHeight,
    });
  };
  useEffect(() => {
    if (!sculptureLightboxImage) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeSculptureLightbox();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sculptureLightboxImage]);
  // Lunar Blossom Rams: animate BOTH ends of the swap inside fixed-size frames.
  // Keep the previous images mounted until their CSS crossfade has finished.
  // No lightbox, full-resolution link, or downloadable image control.
  const [ramsGallery, setRamsGallery] = useState(() => ({
    photos: sculptureProjects[0].images,
    outgoingHero: null,
    outgoingThumb: null,
    changedSlot: null,
    transitionId: 0,
  }));
  const swapRamsPhoto = (thumbnailIndex) => {
    setRamsGallery((current) => {
      if (thumbnailIndex < 1 || thumbnailIndex >= current.photos.length) return current;
      const nextPhotos = [...current.photos];
      [nextPhotos[0], nextPhotos[thumbnailIndex]] = [nextPhotos[thumbnailIndex], nextPhotos[0]];
      return {
        photos: nextPhotos,
        outgoingHero: current.photos[0],
        outgoingThumb: current.photos[thumbnailIndex],
        changedSlot: thumbnailIndex,
        transitionId: current.transitionId + 1,
      };
    });
  };
  const finishRamsSwap = (transitionId) => {
    setRamsGallery((current) => current.transitionId === transitionId
      ? { ...current, outgoingHero: null, outgoingThumb: null, changedSlot: null }
      : current);
  };
  const handleSculptureImageError = (event, src) => {
    // Accommodate .jpeg and uppercase JPG extensions used in some Windows exports.
    const img = event.currentTarget;
    const attempt = Number(img.dataset.extensionAttempt || "0");
    const extensions = [".jpg", ".jpeg", ".JPG", ".JPEG"];
    const base = src.replace(/\.(jpg|jpeg)$/i, "");
    if (attempt < extensions.length - 1) {
      const next = attempt + 1;
      img.dataset.extensionAttempt = String(next);
      img.src = `${base}${extensions[next]}`;
    }
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
    <main className={`aboutPage sculpturePage${mobileNavigating ? " isMobileNavigating" : ""}${selectedMobileSubLink ? " hasSubmenuSelection" : ""}`} data-page="sculpture-independent">
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
        @media (max-width: 720px) {
          .sculpturePage .sculptureImages--fishDuo {
            width: 94%;
            gap: 18px;
          }
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
           SCULPTURE — COMPACT EDITORIAL GALLERY
           Image scale follows the approved Product & Object Design page:
           standard hero 470px, portrait studies approx. 400px.
           Header, navigation, typography and footer ABOVE are untouched.
           Only the Sculpture gallery and project-specific content is styled.
        ========================================================= */
        .sculpturePage .sculpturePortfolio {
          width: min(1180px, 86vw);
          margin: 0 auto;
        }
        .sculpturePage .sculptureIntro {
          text-align: center;
          margin: 0 auto 110px;
        }
        .sculpturePage .sculptureIntro .mainTitle {
          margin-bottom: 22px;
        }
        .sculpturePage .sculptureLead {
          max-width: 760px;
          margin: 35px auto 0;
          font: 300 17px/1.82 "Times New Roman", Georgia, serif;
          color: #6C6258;
          text-align: center;
        }
        .sculpturePage .sculptureWork {
          margin: 0 auto 135px;
          scroll-margin-top: 32px;
        }
        .sculpturePage .sculptureWorkHeading {
          max-width: 830px;
          margin: 0 auto 48px;
          text-align: center;
        }
        /* Match the restrained 10px project category from the reference. */
        .sculpturePage .sculptureWorkHeading .topicLabel {
          display: block;
          margin: 0 0 22px;
          padding: 0;
          font: 400 10px/1.6 Arial, sans-serif;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #9C8664;
        }
        .sculpturePage .sculptureWorkTitle {
          margin: 0 0 15px;
          font: 400 clamp(30px, 2.45vw, 44px)/1.12 "Cormorant Garamond", serif;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #2A2723;
        }
        .sculpturePage .sculptureWorkDescription {
          max-width: 760px;
          margin: 0 auto;
          font: 300 17px/1.82 "Times New Roman", Georgia, serif;
          color: #6C6258;
        }
        /* Floral Lips: switch the entire heading in sync with the active image.
           Both text variants occupy the same grid area, preventing vertical jumps. */
        .sculpturePage .sculptureLipsTextCrossfade {
          display: grid;
          width: 100%;
          align-items: start;
        }
        .sculpturePage .sculptureLipsTextLayer {
          grid-area: 1 / 1;
          width: 100%;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 1.05s ease-in-out, visibility 0s linear 1.05s;
        }
        .sculpturePage .sculptureLipsTextLayer.isActive {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transition: opacity 1.05s ease-in-out, visibility 0s linear 0s;
        }
        .sculpturePage .sculptureLipsSubheading {
          font: 400 11px/1.6 Arial, sans-serif;
          color: #9C8664;
          letter-spacing: .15em;
          text-transform: uppercase;
          margin: 0 auto 17px;
        }
        @media (prefers-reduced-motion: reduce) {
          .sculpturePage .sculptureLipsTextLayer,
          .sculpturePage .sculptureLipsTextLayer.isActive { transition: none; }
        }
        /* Fish Studies: crossfade all three text elements without changing
           the heading's overall height or moving the images below. */
        .sculpturePage .sculptureFishTextCrossfade {
          display: grid;
          width: 100%;
          align-items: start;
        }
        .sculpturePage .sculptureFishTextLayer {
          grid-area: 1 / 1;
          width: 100%;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 1.05s ease-in-out, visibility 0s linear 1.05s;
        }
        .sculpturePage .sculptureFishTextLayer.isActive {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transition: opacity 1.05s ease-in-out, visibility 0s linear 0s;
        }
        /* Gallery uses 90% of the page content width, like the reference.
           Individual images do NOT stretch to fill the gallery. */
        .sculpturePage .sculptureImages {
          width: 90%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 36px;
        }
        .sculpturePage .sculptureFigure {
          width: min(470px, 62%);
          min-width: 0;
          margin: 0 auto;
          padding: 0;
        }
        .sculpturePage .sculptureFigure img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          object-position: center;
          user-select: none;
          -webkit-user-drag: none;
          cursor: default;
        }
        /* Portrait works: match the approved ~400px portrait reference. */
        .sculpturePage .sculptureImages--portrait .sculptureFigure {
          width: min(399.5px, 52.7%);
        }
        /* Garden Within + Lion: another 5% smaller than previous 399.5px. */
        .sculpturePage .sculptureWork--the-garden-within .sculptureFigure,
        .sculpturePage .sculptureWork--the-lion .sculptureFigure {
          width: min(379.525px, 50.065%);
        }
        /* Serpent: another 5% smaller than previous 339.575px. */
        .sculpturePage .sculptureWork--the-serpent .sculptureFigure {
          width: min(322.59625px, 42.55525%);
        }
        /* Leaping Fish and School of Fish: 10% smaller than portrait default. */
        .sculpturePage .sculptureWork--leaping-fish .sculptureFigure,
        .sculpturePage .sculptureWork--school-of-fish .sculptureFigure {
          width: min(359.55px, 47.43%);
        }
        /* Landscape compositions are wider, but no longer 1040px. */
        .sculpturePage .sculptureImages--landscape .sculptureFigure {
          width: min(600px, 80%);
        }
        /* Ice Cream: display 15% smaller than the original 600px landscape image.
           Preserve image proportions, centered alignment and existing lightbox behavior. */
        .sculpturePage .sculptureWork--ice-cream-sculptural-seating .sculptureFigure {
          width: min(510px, 68%);
        }
        /* Blossom Carriage and Swans: 10% smaller than previous sizes. */
        .sculpturePage .sculptureWork--blossom-carriage .sculptureFigure {
          width: min(558px, 73.8%);
        }
        .sculpturePage .sculptureWork--swans .sculptureFigure {
          width: min(504px, 66.6%);
        }
        /* Two lips: restrained 2-column composition, ~315px per image. */
        .sculpturePage .sculptureImages--duo {
          width: min(660px, 90%);
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: center;
          gap: 20.4px; /* 15% less than 24px */
        }
        .sculpturePage .sculptureImages--duo .sculptureFigure {
          width: 100%;
        }
        /* Floral Lips: featured image is full size, the other stays at 66%.
           The smaller image swaps the selection; the featured image opens the
           approved lightbox. Size swap still lasts 1.44 seconds. */
        .sculpturePage .sculptureLipsButton {
          display: block;
          width: 100%;
          max-width: 100%;
          padding: 0;
          margin: 0 auto;
          border: 0;
          border-radius: 0;
          background: transparent;
          appearance: none;
          cursor: default;
          transform: scale(1);
          transform-origin: center center;
          opacity: 1;
          transition:
            width 1.44s cubic-bezier(.22, 1, .36, 1),
            transform .32s ease;
        }
        .sculpturePage .sculptureLipsButton.isSecondary {
          width: 66%;
          cursor: pointer;
        }
        .sculpturePage .sculptureLipsButton.isFeatured {
          width: 100%;
          cursor: pointer;
          pointer-events: auto;
          opacity: 1;
        }
        .sculpturePage .sculptureLipsButton:disabled {
          opacity: 1;
          cursor: default;
        }
        .sculpturePage .sculptureLipsButton img {
          display: block;
          width: 100%;
          height: auto;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
        }
        @media (hover: hover) and (pointer: fine) {
          .sculpturePage .sculptureLipsButton.isSecondary:hover {
            transform: scale(1.055);
          }
        }
        .sculpturePage .sculptureLipsButton:focus-visible {
          outline: 2px solid #9C8664;
          outline-offset: 5px;
        }
        /* Fish Studies: same activation logic as Floral Lips.
           The active image is larger, the inactive one is smaller.
           Clicking the smaller image promotes it and updates the text above. */
        .sculpturePage .sculptureImages--fishDuo {
          width: min(760px, 92%);
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: center;
          gap: 26px;
        }
        .sculpturePage .sculptureImages--fishDuo .sculptureFigure {
          width: 100%;
        }
        .sculpturePage .sculptureFishButton {
          display: block;
          width: 100%;
          max-width: 100%;
          padding: 0;
          margin: 0 auto;
          border: 0;
          border-radius: 0;
          background: transparent;
          appearance: none;
          cursor: default;
          transform: scale(1);
          transform-origin: center center;
          opacity: 1;
          transition:
            width 1.44s cubic-bezier(.22, 1, .36, 1),
            transform .32s ease;
        }
        .sculpturePage .sculptureFishButton.isSecondary {
          width: 66%;
          cursor: pointer;
        }
        .sculpturePage .sculptureFishButton.isFeatured {
          width: 100%;
          cursor: pointer;
          pointer-events: auto;
          opacity: 1;
        }
        .sculpturePage .sculptureFishButton:disabled {
          opacity: 1;
          cursor: default;
        }
        .sculpturePage .sculptureFishButton img {
          display: block;
          width: 100%;
          height: auto;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
        }
        @media (hover: hover) and (pointer: fine) {
          .sculpturePage .sculptureFishButton.isSecondary:hover {
            transform: scale(1.055);
          }
        }
        .sculpturePage .sculptureFishButton:focus-visible {
          outline: 2px solid #9C8664;
          outline-offset: 5px;
        }
        /* Lunar Blossom Rams: keep ONE fixed hero canvas for all six photos.
           Portrait and landscape JPGs have different source aspect ratios;
           never let a click change the display frame dimensions. */
        .sculpturePage .sculptureImages--rams {
          width: min(840px, 90%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }
        .sculpturePage .sculptureImages--rams .sculptureRamsHero {
          width: min(479.4px, 85%);
          max-width: 100%;
          margin: 0 auto;
        }
        /* A square, stable 479.4px frame (responsive on mobile) prevents
           layout jumps and changes in hero size. object-fit: contain preserves
           each original image in full without stretching or cropping. */
        .sculpturePage .sculptureRamsHero {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
        .sculpturePage .sculptureRamsHero .sculptureRamsHeroImage {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
        }
        .sculpturePage .sculptureRamsHero .sculptureRamsHeroOutgoing {
          z-index: 2;
          animation: sculptureRamsCrossfadeOut 1.5s ease-in-out both;
        }
        @keyframes sculptureRamsCrossfadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .sculpturePage .sculptureRamsThumbnails {
          width: min(810px, 100%);
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          align-items: center;
          justify-items: center;
          gap: 18px;
        }
        .sculpturePage .sculptureRamsThumb {
          display: flex;
          justify-content: center;
          align-items: center;
          width: min(147px, 100%);
          aspect-ratio: 1 / 1;
          min-width: 0;
          padding: 0;
          margin: 0;
          border: 0;
          border-radius: 0;
          background: #fff;
          cursor: pointer;
          position: relative;
          transition: none;
        }
        .sculpturePage .sculptureRamsThumb .sculptureRamsThumbImage {
          display: block;
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
          transform: scale(1);
          transform-origin: center center;
          backface-visibility: hidden;
          transition: transform .72s cubic-bezier(.22, 1, .36, 1),
                      filter .72s ease;
        }
        .sculpturePage .sculptureRamsThumb .sculptureRamsThumbOutgoing {
          z-index: 2;
          animation: sculptureRamsCrossfadeOut 1.5s ease-in-out both;
        }
        @media (hover: hover) and (pointer: fine) {
          .sculpturePage .sculptureRamsThumb:hover { z-index: 3; }
          .sculpturePage .sculptureRamsThumb:hover .sculptureRamsThumbImage {
            transform: scale(1.12);
            filter: brightness(1.035);
          }
        }
        .sculpturePage .sculptureRamsThumb:focus-visible {
          outline: 2px solid #9C8664;
          outline-offset: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          .sculpturePage .sculptureRamsThumb .sculptureRamsThumbImage,
          .sculpturePage .sculptureLipsButton,
          .sculpturePage .sculptureFishButton,
          .sculpturePage .sculptureFishTextLayer,
          .sculpturePage .sculptureFishTextLayer.isActive { transition: none; }
          /* Without animationend, hide outgoing layers so the new image is visible. */
          .sculpturePage .sculptureRamsHeroOutgoing,
          .sculpturePage .sculptureRamsThumbOutgoing { display: none; animation: none; }
        }
        /* EXACT reference interaction for the eight selected sculpture projects.
           Hover: 1.2% (360ms). Click: centered 115%-of-gallery-size image.
           The figure and all surrounding text keep their original dimensions. */
        .sculpturePage .sculptureZoomButton {
          display: block;
          position: relative;
          width: 100%;
          padding: 0;
          margin: 0;
          border: 0;
          border-radius: 0;
          background: transparent;
          appearance: none;
          line-height: 0;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
        }
        .sculpturePage .sculptureZoomButton img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          cursor: pointer;
          transform: scale(1);
          transform-origin: center center;
          transition: transform 360ms cubic-bezier(.22, .61, .36, 1);
          will-change: transform;
        }
        @media (hover: hover) and (pointer: fine) {
          .sculpturePage .sculptureZoomButton:hover img {
            transform: scale(1.012);
          }
        }
        .sculpturePage .sculptureZoomButton:focus-visible {
          outline: 2px solid #9C8664;
          outline-offset: 5px;
        }
        .sculpturePage .sculptureZoomButton:focus-visible img {
          transform: scale(1.012);
        }
        /* Refined expansion indicator: appears only on image hover/focus. */
        .sculpturePage .sculptureExpandIcon {
          position: absolute;
          bottom: 15px;
          right: 15px;
          width: 31px;
          height: 31px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          border: 1px solid rgba(156, 134, 100, .48);
          background: rgba(255,255,255,.88);
          color: #9C8664;
          opacity: 0;
          transform: translateY(5px);
          transition: opacity 300ms ease, transform 300ms ease;
          pointer-events: none;
        }
        .sculpturePage .sculptureExpandIcon svg { width: 15px; height: 15px; display: block; }
        @media (hover: hover) and (pointer: fine) {
          .sculpturePage .sculptureZoomButton:hover .sculptureExpandIcon,
          .sculpturePage .sculptureZoomButton:focus-visible .sculptureExpandIcon {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Featured Floral Lips and Fish use the *same* expansion cue and
           gentle 1.2% image hover as the existing zoomable gallery items.
           Animate the image rather than its button: the approved mobile
           translations, scales, and 1.44-second swaps are left untouched. */
        .sculpturePage .sculptureLipsButton.isFeatured,
        .sculpturePage .sculptureFishButton.isFeatured { position: relative; }
        .sculpturePage .sculptureLipsButton.isFeatured img,
        .sculpturePage .sculptureFishButton.isFeatured img {
          transform: scale(1);
          transform-origin: center center;
          transition: transform 360ms cubic-bezier(.22, .61, .36, 1);
        }
        @media (hover: hover) and (pointer: fine) {
          .sculpturePage .sculptureLipsButton.isFeatured:hover img,
          .sculpturePage .sculptureFishButton.isFeatured:hover img {
            transform: scale(1.012);
          }
          .sculpturePage .sculptureLipsButton.isFeatured:hover .sculptureExpandIcon,
          .sculpturePage .sculptureFishButton.isFeatured:hover .sculptureExpandIcon {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .sculpturePage .sculptureLipsButton.isFeatured:focus-visible img,
        .sculpturePage .sculptureFishButton.isFeatured:focus-visible img {
          transform: scale(1.012);
        }
        .sculpturePage .sculptureLipsButton.isFeatured:focus-visible .sculptureExpandIcon,
        .sculpturePage .sculptureFishButton.isFeatured:focus-visible .sculptureExpandIcon {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .sculpturePage .sculptureLipsButton.isFeatured img,
          .sculpturePage .sculptureFishButton.isFeatured img { transition: none; }
          .sculpturePage .sculptureLipsButton.isFeatured:hover img,
          .sculpturePage .sculptureFishButton.isFeatured:hover img,
          .sculpturePage .sculptureLipsButton.isFeatured:focus-visible img,
          .sculpturePage .sculptureFishButton.isFeatured:focus-visible img { transform: none; }
        }
        /* Animated presentation; closing stays mounted for the full fade-out. */
        .sculpturePage .sculptureLightbox { animation: sculptureBackdropIn 450ms cubic-bezier(.22,1,.36,1) both; }
        .sculpturePage .sculptureLightbox img { animation: sculpturePhotoIn 450ms cubic-bezier(.22,1,.36,1) both; }
        .sculpturePage .sculptureLightbox p,
        .sculpturePage .sculptureLightboxClose { animation: sculptureCaptionIn 420ms ease 90ms both; }
        .sculpturePage .sculptureLightbox.isClosing { animation: sculptureBackdropOut 300ms ease both; pointer-events: none; }
        .sculpturePage .sculptureLightbox.isClosing img { animation: sculpturePhotoOut 300ms ease both; }
        .sculpturePage .sculptureLightbox.isClosing p,
        .sculpturePage .sculptureLightbox.isClosing .sculptureLightboxClose { animation: sculptureCaptionOut 220ms ease both; }
        @keyframes sculptureBackdropIn { from { opacity:0; } to { opacity:1; } }
        @keyframes sculptureBackdropOut { from { opacity:1; } to { opacity:0; } }
        @keyframes sculpturePhotoIn { from { opacity:0; transform:translate(-50%,-50%) scale(.965); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }
        @keyframes sculpturePhotoOut { from { opacity:1; transform:translate(-50%,-50%) scale(1); } to { opacity:0; transform:translate(-50%,-50%) scale(.985); } }
        @keyframes sculptureCaptionIn { from { opacity:0; } to { opacity:1; } }
        @keyframes sculptureCaptionOut { from { opacity:1; } to { opacity:0; } }
        @media (prefers-reduced-motion: reduce) {
          .sculpturePage .sculptureLightbox, .sculpturePage .sculptureLightbox img,
          .sculpturePage .sculptureLightbox p, .sculpturePage .sculptureLightboxClose,
          .sculpturePage .sculptureLightbox.isClosing, .sculpturePage .sculptureLightbox.isClosing img,
          .sculpturePage .sculptureLightbox.isClosing p, .sculpturePage .sculptureLightbox.isClosing .sculptureLightboxClose { animation:none; }
          .sculpturePage .sculptureExpandIcon { transition:none; }
        }
        /* Match the reference modal: image at 115% of its actual gallery size,
           never larger than the visible screen; no link to the original. */
        .sculpturePage .sculptureLightbox {
          position: fixed;
          inset: 0;
          z-index: 3000;
          background: rgba(34, 37, 40, .73);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 65px 5vw 35px;
          cursor: default;
        }
        .sculpturePage .sculptureLightbox img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          max-width: calc(100vw - 44px);
          max-height: calc(100vh - 190px);
          object-fit: contain;
          cursor: default;
        }
        .sculpturePage .sculptureLightbox p {
          position: absolute;
          bottom: 66px;
          left: 22px;
          right: 22px;
          margin: 0;
          text-align: center;
          color: #e0d9cd;
          font: 11px/1.5 Arial, sans-serif;
          letter-spacing: .13em;
          text-transform: uppercase;
          pointer-events: none;
        }
        .sculpturePage .sculptureLightboxClose {
          position: absolute;
          right: 25px;
          top: 15px;
          border: 0;
          background: transparent;
          color: #fff;
          font-size: 40px;
          line-height: 1.2;
          cursor: pointer;
        }
        .sculpturePage .sculptureLightboxClose:focus-visible {
          outline: 2px solid #d8c3a0;
          outline-offset: 3px;
        }
        @media (max-width: 720px) {
          .sculpturePage .sculptureLightbox img { max-height: calc(100vh - 200px); }
          .sculpturePage .sculptureLightbox p { bottom: 72px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sculpturePage .sculptureZoomButton img {
            transition: none;
            will-change: auto;
          }
          .sculpturePage .sculptureZoomButton:hover img,
          .sculpturePage .sculptureZoomButton:focus-visible img {
            transform: none;
          }
        }
        .sculpturePage .sculptureWork:last-child {
          margin-bottom: 115px;
        }
        /* =========================================================
           SCULPTURE CLOSING — SAME EDITORIAL CTA AS PRODUCT & OBJECT DESIGN
           Reuses the existing approved .aboutContactLink button styling.
           Only the Sculpture page is affected; header/footer stay unchanged.
           ========================================================= */
        .sculpturePage .sculptureClosing {
          text-align: center;
          padding: 15px 0 135px;
        }
        .sculpturePage .sculptureClosing h2 {
          margin: 0 0 15px;
          font: 400 clamp(30px, 2.45vw, 44px)/1.12 "Cormorant Garamond", serif;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #2A2723;
        }
        .sculpturePage .sculptureClosing > p:not(.topicLabel) {
          margin: 0 auto 32px;
          max-width: 760px;
          font: 300 17px/1.82 "Times New Roman", Georgia, serif;
          color: #6C6258;
        }
        /* Preserve the last project's original spacing after adding the CTA. */
        .sculpturePage .sculptureWork--swans {
          margin-bottom: 115px;
        }
        @media (max-width: 720px) {
          .sculpturePage .sculpturePortfolio { width: 88vw; }
          .sculpturePage .sculptureIntro { margin-bottom: 78px; }
          .sculpturePage .sculptureLead,
          .sculpturePage .sculptureWorkDescription {
            font-size: 16px;
            line-height: 1.75;
          }
          .sculpturePage .sculptureWork { margin-bottom: 90px; }
          .sculpturePage .sculptureWorkHeading { margin-bottom: 30px; }
          .sculpturePage .sculptureWorkTitle {
            font-size: 28px;
            letter-spacing: .11em;
          }
          .sculpturePage .sculptureImages { width: 90%; gap: 30px; }
          .sculpturePage .sculptureFigure,
          .sculpturePage .sculptureImages--portrait .sculptureFigure {
            width: min(440px, 84%);
          }
          /* Three selected portrait projects: another 5% smaller on mobile. */
          .sculpturePage .sculptureWork--the-garden-within .sculptureFigure,
          .sculpturePage .sculptureWork--the-serpent .sculptureFigure,
          .sculpturePage .sculptureWork--the-lion .sculptureFigure {
            width: min(355.3px, 67.83%);
          }
          /* Fish projects: 10% smaller on mobile. */
          .sculpturePage .sculptureWork--leaping-fish .sculptureFigure,
          .sculpturePage .sculptureWork--school-of-fish .sculptureFigure {
            width: min(396px, 75.6%);
          }
          .sculpturePage .sculptureImages--landscape .sculptureFigure {
            width: 100%;
          }
          /* Ice Cream: also 15% smaller on mobile, without cropping. */
          .sculpturePage .sculptureWork--ice-cream-sculptural-seating .sculptureFigure {
            width: 85%;
          }
          /* Landscape projects: 10% smaller on mobile too. */
          .sculpturePage .sculptureWork--blossom-carriage .sculptureFigure,
          .sculpturePage .sculptureWork--swans .sculptureFigure {
            width: 90%;
          }
          .sculpturePage .sculptureImages--duo {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 90%;
            gap: 22.1px; /* 15% less than the previous 26px */
          }
          .sculpturePage .sculptureImages--duo .sculptureFigure {
            width: min(440px, 84%);
          }
          /* On narrow screens, the five previews wrap into balanced rows of 3 + 2. */
          .sculpturePage .sculptureImages--rams {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 90%;
            gap: 20px;
          }
          .sculpturePage .sculptureImages--rams .sculptureRamsHero {
            width: min(448.8px, 85%);
          }
          .sculpturePage .sculptureRamsThumbnails {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 12px;
          }
          .sculpturePage .sculptureRamsThumb {
            width: min(92px, calc((100% - 24px) / 3));
          }
          .sculpturePage .sculptureWork:last-child { margin-bottom: 72px; }
          .sculpturePage .sculptureWork--swans { margin-bottom: 72px; }
          .sculpturePage .sculptureClosing { padding-bottom: 100px; }
          .sculpturePage .sculptureClosing > p:not(.topicLabel) {
            font-size: 16px;
            line-height: 1.75;
          }
        }
      
/* MOBILE NAVIGATION REFINEMENT — never changes desktop header/layout. */
        @media (max-width: 720px) {
          .sculpturePage .hamburger {
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
          .sculpturePage .hamburger span {
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
          .sculpturePage .hamburger span:nth-child(1) { transform: translateY(-11px); }
          .sculpturePage .hamburger span:nth-child(2) { transform: translateY(-3.7px); }
          .sculpturePage .hamburger span:nth-child(3) { transform: translateY(3.7px); }
          .sculpturePage .hamburger span:nth-child(4) { transform: translateY(11px); }
          .sculpturePage .hamburger.isOpen span { background: #e1dbcf; }
          .sculpturePage .hamburger.isOpen span:nth-child(1) { transform: rotate(45deg); }
          .sculpturePage .hamburger.isOpen span:nth-child(2) { transform: scaleX(.55); opacity: 0; }
          .sculpturePage .hamburger.isOpen span:nth-child(3) { transform: scaleX(.55); opacity: 0; }
          .sculpturePage .hamburger.isOpen span:nth-child(4) { transform: rotate(-45deg); }
          .sculpturePage .hamburger:focus-visible {
            outline: 1px solid #9C8664;
            outline-offset: 1px;
          }
          .sculpturePage .mobileOverlay { z-index: 1100; }
          .sculpturePage .mobilePanel {
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
          .sculpturePage .mobilePanel.open { visibility: visible; }
          .sculpturePage .mobileMenuItem {
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
          .sculpturePage .mobileMenuItem:hover,
          .sculpturePage .mobileMenuItem:focus-visible { color: #c9b38c; }
          .sculpturePage .mobileMenuItem.isContact { color: #c9b38c; }
          .sculpturePage .mobileMenuItem:focus-visible,
          .sculpturePage .mobileSubmenuLink:focus-visible {
            outline: 1px solid #c9b38c;
            outline-offset: 4px;
          }
          /* Slow editorial accordion: always mounted, smoothly animates its height. */
          .sculpturePage .mobileMenuItem.hasSubmenu {
            position: relative;
            padding-right: 20px;
            /* The submenu itself owns the 31px gap to the next main item. */
            margin-bottom: 0;
          }
          .sculpturePage .mobileMenuItem.hasSubmenu::after {
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
          .sculpturePage .mobileMenuItem.hasSubmenu[aria-expanded="true"]::after {
            transform: translateY(4px) rotate(225deg);
          }
          .sculpturePage .mobileSubmenu {
            display: grid;
            grid-template-rows: 0fr;
            opacity: 0;
            /* Exactly 31px between main menu buttons, matching ABOUT → AWARDS.
               The collapsed accordion itself contributes zero visible height. */
            margin: 0 0 31px 18px;
            border-left: 1px solid rgba(201,179,140,.3);
            padding-left: 18px;
            transition:
              grid-template-rows 760ms cubic-bezier(.22,.61,.36,1),
              opacity 620ms ease,
              margin-top 760ms cubic-bezier(.22,.61,.36,1),
              margin-bottom 760ms cubic-bezier(.22,.61,.36,1);
          }
          .sculpturePage .mobileSubmenu.isExpanded {
            grid-template-rows: 1fr;
            opacity: 1;
            /* Original expanded placement: 31px - 18px = 13px from the button. */
            margin-top: 13px;
            margin-bottom: 29px;
          }
          .sculpturePage .mobileSubmenuInner {
            min-height: 0;
            overflow: hidden;
          }
          .sculpturePage .mobileSubmenuLink {
            opacity: 0;
            transform: translateY(-8px);
            transition: opacity 580ms ease, transform 680ms cubic-bezier(.22,.61,.36,1), color 250ms ease;
          }
          .sculpturePage .mobileSubmenu.isExpanded .mobileSubmenuLink {
            opacity: 1;
            transform: translateY(0);
          }
          .sculpturePage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(2) { transition-delay: 55ms; }
          .sculpturePage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(3) { transition-delay: 110ms; }
          .sculpturePage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(4) { transition-delay: 165ms; }
          .sculpturePage.isMobileNavigating {
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
          .sculpturePage .hamburger span,
          .sculpturePage .mobilePanel,
          .sculpturePage .mobileSubmenu,
          .sculpturePage .mobileSubmenuLink,
          .sculpturePage .mobileMenuItem.hasSubmenu::after,
          .sculpturePage.isMobileNavigating { transition: none !important; }
        }

        /* MOBILE HOME COMPOSITION — approved menu remains unchanged.
           Only the brand descriptor and hero carousel size are adjusted. */
        @media (max-width: 720px) {
          /* Distinguish the two brand lines and give the longer second line room. */
          .sculpturePage .subtitle p:first-child {
            font-size: 10px;
            letter-spacing: 0.26em;
          }
          .sculpturePage .subtitle p:nth-child(2) {
            font-size: 7.4px;
            letter-spacing: 0.20em;
          }

        }

        /* MOBILE DRAWER ONLY — 7% wider than the original panel (3% less
           widening than the preceding 10% version). Keep the left edge of
           all menu labels fixed at their previously approved screen position. */
        @media (max-width: 720px) {
          .sculpturePage .mobilePanel {
            width: min(83.46vw, 417.3px);
            padding-left: calc(34px + min(83.46vw, 417.3px) - min(78vw, 390px));
          }
        }

        /* MOBILE ACCORDION GUIDE DOTS — match approved Contact styling.
           Dots are 4px in diameter and shifted another 1px right.
           Compensate clipping without moving menu labels. */
        @media (max-width: 720px) {
          .sculpturePage .mobileSubmenuInner {
            margin-left: -24px;
            padding-left: 24px;
          }
          .sculpturePage .mobileSubmenuLink {
            position: relative;
            width: 100%;
          }
          .sculpturePage .mobileSubmenuLink::before {
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
            transition: background-color 140ms ease, width 140ms ease, height 140ms ease, transform 140ms ease;
          }
        }


        
        /* Selected submenu destination: understated 190ms press feedback.
           Only the chosen dot and label turn white, then the drawer exits. */
        @media (max-width: 720px) {
          .sculpturePage .mobileSubmenu.isExpanded .mobileSubmenuLink.isSelected {
            color: #fff;
            transform: translateY(0) scale(1.055);
            transform-origin: left center;
            transition: color 140ms ease, transform 140ms ease;
          }
          .sculpturePage .mobileSubmenuLink.isSelected::before {
            width: 6px;
            height: 6px;
            background: #fff;
            transform: translate(-1px, -50%);
          }
          .sculpturePage.isMobileNavigating.hasSubmenuSelection {
            transition-duration: 200ms;
          }
        }

        /* SCULPTURE — MOBILE GALLERY VIEW: independent of thumbnail size.
           Preserve aspect ratio and expose visible grey backdrop for tap-to-close. */
        @media (max-width: 720px) {
          .sculpturePage .sculptureLightbox { padding: 48px 24px; }
          .sculpturePage .sculptureLightbox img {
            width: auto !important;
            height: auto !important;
            max-width: calc(100vw - 48px) !important;
            max-height: calc(100dvh - 112px) !important;
            object-fit: contain;
          }
          .sculpturePage, .sculpturePage *, .sculpturePage *::before, .sculpturePage *::after {
            -webkit-tap-highlight-color: transparent !important;
          }
          .sculpturePage button, .sculpturePage a, .sculpturePage [role="button"] {
            -webkit-touch-callout: none;
          }
          .sculpturePage button:focus:not(:focus-visible),
          .sculpturePage a:focus:not(:focus-visible),
          .sculpturePage [role="button"]:focus:not(:focus-visible) {
            outline: none;
          }
        }


        /* SCULPTURE — approved phone-only artwork refinements (desktop unchanged).
           Increase the real image containers, not their zoom modal dimensions. */
        @media (max-width: 720px) {
          /* Lunar Blossom Rams hero +20% relative to prior 85% mobile width. */
          .sculpturePage .sculptureImages--rams .sculptureRamsHero {
            width: 102%;
            max-width: none;
          }
          /* The Garden Within +20%. */
          .sculpturePage .sculptureWork--the-garden-within .sculptureFigure {
            width: min(426.36px, 81.396%);
          }
          /* Ice cream seating +20%. */
          .sculpturePage .sculptureWork--ice-cream-sculptural-seating .sculptureFigure {
            width: 102%;
          }
          /* Blossom Carriage +20% without cropping the edges. */
          .sculpturePage .sculptureWork--blossom-carriage .sculptureFigure {
            width: 108%;
          }
          /* Left-study scaling is standardized for both paired galleries below. */
          /* Replace the two-row ram selector by a single finger-scrollable
             strip. This affects only thumbnails, not the fixed hero canvas
             or the image swap/crossfade logic. */
          .sculpturePage .sculptureRamsThumbnails {
            /* Full-bleed mobile filmstrip: the viewport, not the narrower
               Sculpture content column, defines the left/right boundary. */
            width: 100vw;
            max-width: none;
            margin-left: calc(50% - 50vw);
            margin-right: calc(50% - 50vw);
            box-sizing: border-box;
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;
            align-items: center;
            gap: 14px;
            overflow-x: auto;
            overflow-y: hidden;
            overscroll-behavior-x: contain;
            scroll-snap-type: x proximity;
            scroll-padding-inline: 0;
            -webkit-overflow-scrolling: touch;
            touch-action: pan-x;
            padding: 6px 0 12px;
            scrollbar-width: none;
          }
          .sculpturePage .sculptureRamsThumbnails::-webkit-scrollbar {
            display: none;
          }
          .sculpturePage .sculptureRamsThumbnails .sculptureRamsThumb {
            width: clamp(84px, 27vw, 112px);
            flex: 0 0 clamp(84px, 27vw, 112px);
            scroll-snap-align: start;
          }
        }

        /* Rams filmstrip scroll indicator. Only on narrow screens; the hint
           fades after the visitor first swipes. The slim gold thumb tracks
           actual scrollLeft, not the selected main image. */
        .sculpturePage .sculptureRamsScrollGuide { display: none; }
        @media (max-width: 720px) {
          .sculpturePage .sculptureRamsScrollGuide {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0;
            margin: 0 auto;
            padding: 0 0 8px;
            pointer-events: none;
            user-select: none;
          }
          .sculpturePage .sculptureRamsProgressTrack {
            position: relative;
            display: block;
            width: 115px;
            height: 3px;
            border-radius: 2px;
            background: rgba(156,134,100,.22);
          }
          .sculpturePage .sculptureRamsProgressThumb {
            position: absolute;
            top: 0;
            width: 28%;
            height: 3px;
            background: #9C8664;
            border-radius: 2px;
            transition: left 90ms linear;
          }
          /* Exactly match Leaping Fish on phones: two artworks side by side,
             100% active and 66% inactive, 1.44s smooth width swap.
             Keep existing captions and text crossfade behaviour. */
          .sculpturePage .sculptureImages--duo {
            width: 94%;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            align-items: center;
            gap: 18px;
          }
          .sculpturePage .sculptureImages--duo .sculptureFigure {
            width: 100%;
          }
          /* Floral Lips & Leaping Fish: same two-column geometry and the
             same centered stage; only the approved left-artwork scale differs. */
          .sculpturePage .sculptureImages--duo,
          .sculpturePage .sculptureImages--fishDuo {
            width: 94%;
            max-width: none;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            align-items: center;
            justify-items: center;
            gap: 18px;
          }
          .sculpturePage .sculptureImages--duo .sculptureFigure,
          .sculpturePage .sculptureImages--fishDuo .sculptureFigure {
            width: 100%;
            min-width: 0;
          }
          .sculpturePage .sculptureImages--duo .sculptureFigure:first-child .sculptureLipsButton {
            transform: translateX(6px) scale(1.40);
            transform-origin: center center;
          }
          .sculpturePage .sculptureImages--fishDuo .sculptureFigure:first-child .sculptureFishButton {
            transform: translateX(6px) scale(1.25);
            transform-origin: center center;
          }
          /* Preserve tap swapping and 1.44s width transitions; no clipping. */
          .sculpturePage .sculptureImages--duo,
          .sculpturePage .sculptureImages--fishDuo,
          .sculpturePage .sculptureLipsSlot,
          .sculpturePage .sculptureFishSlot { overflow: visible; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sculpturePage .sculptureRamsProgressThumb { transition: none; }
        }

        /* Sculpture phone spacing refinements — all desktop styles untouched. */
        @media (max-width: 720px) {
          /* Only add space above these artworks, not below them. */
          .sculpturePage .sculptureWork--the-garden-within > .sculptureWorkHeading,
          .sculpturePage .sculptureWork--the-serpent > .sculptureWorkHeading,
          .sculpturePage .sculptureWork--fish-studies > .sculptureWorkHeading {
            margin-bottom: 52px; /* previous 30px + 22px */
          }
          /* Keep Floral Lips' existing gap above its gallery. Add 22px
             only after the pair, before the following project. */
          .sculpturePage .sculptureWork--floral-lips {
            margin-bottom: 112px; /* previous 90px + 22px */
          }
          /* The earlier +40% scale accidentally applied to the LEFT image
             even while inactive: 66% * 140% = 92.4% of the full slot.
             Apply that scale to whichever image is FEATURED instead.
             Non-featured images remain truly 66% of their slot. */
          .sculpturePage .sculptureImages--duo .sculptureLipsButton.isSecondary {
            transform: none;
          }
          .sculpturePage .sculptureImages--duo .sculptureLipsButton.isFeatured {
            transform: scale(1.40);
          }
          .sculpturePage .sculptureImages--duo .sculptureFigure:first-child .sculptureLipsButton.isSecondary {
            transform: none;
          }
          .sculpturePage .sculptureImages--duo .sculptureFigure:first-child .sculptureLipsButton.isFeatured {
            transform: translateX(6px) scale(1.40);
          }
          .sculpturePage .sculptureImages--duo .sculptureFigure:last-child .sculptureLipsButton.isFeatured {
            transform: translateX(-6px) scale(1.40);
          }
        }

        /* Sculpture — final mobile editorial refinements, 20 Nov 2026.
           Desktop styles, mobile menu and Rams gallery remain untouched. */
        @media (max-width: 720px) {
          /* Floral Lips: active LEFT +10% versus its previous 1.40 scale;
             inactive artworks +10% versus the original 66% button width.
             Active RIGHT keeps its previously approved 1.40 scale. */
          .sculpturePage .sculptureImages--duo .sculptureLipsButton.isSecondary {
            width: 72.6%;
            transform: none;
          }
          .sculpturePage .sculptureImages--duo .sculptureFigure:first-child .sculptureLipsButton.isFeatured {
            transform: translateX(6px) scale(1.54);
          }
          .sculpturePage .sculptureImages--duo .sculptureFigure:first-child .sculptureLipsButton.isSecondary {
            width: 72.6%;
            transform: translateX(6px);
          }
          .sculpturePage .sculptureImages--duo .sculptureFigure:last-child .sculptureLipsButton.isSecondary {
            width: 72.6%;
          }

          /* Ice cream: 12px more air above; 15px less after the artwork. */
          .sculpturePage .sculptureWork--ice-cream-sculptural-seating > .sculptureWorkHeading {
            margin-bottom: 42px;
          }
          .sculpturePage .sculptureWork--ice-cream-sculptural-seating {
            margin-bottom: 75px;
          }

          /* Lion +10% from the current portrait size; upper space +12px. */
          .sculpturePage .sculptureWork--the-lion > .sculptureWorkHeading {
            margin-bottom: 42px;
          }
          .sculpturePage .sculptureWork--the-lion .sculptureFigure {
            width: min(390.83px, 74.613%);
          }

          /* Sculptural Portrait Vessels: 12px more above; 12px less below. */
          .sculpturePage .sculptureWork--sculptural-portrait-vessels > .sculptureWorkHeading {
            margin-bottom: 42px;
          }
          .sculpturePage .sculptureWork--sculptural-portrait-vessels {
            margin-bottom: 78px;
          }

          /* Blossom Carriage: +12px above and +10% versus 108% gallery width.
             Center the over-width figure using its own center line, not left edge. */
          .sculpturePage .sculptureWork--blossom-carriage > .sculptureWorkHeading {
            margin-bottom: 42px;
          }
          .sculpturePage .sculptureWork--blossom-carriage .sculptureFigure {
            width: 118.8%;
            max-width: none;
            align-self: center;
            margin-left: auto;
            margin-right: auto;
            transform: none;
          }

          /* Leaping Fish: enlarge the active LEFT +10% (1.25 -> 1.375),
             active RIGHT +15%; inactive thumbs remain their former size. */
          .sculpturePage .sculptureImages--fishDuo .sculptureFigure:first-child .sculptureFishButton.isFeatured {
            transform: translateX(6px) scale(1.375);
          }
          .sculpturePage .sculptureImages--fishDuo .sculptureFigure:last-child .sculptureFishButton.isFeatured {
            transform: translateX(-6px) scale(1.15);
          }
          .sculpturePage .sculptureImages--fishDuo .sculptureFigure:first-child .sculptureFishButton.isSecondary {
            transform: translateX(6px);
          }

          /* CTA-to-bottom editorial whitespace already 100px on mobile.
             Explicitly retain approved spacing for consistency. */
          .sculpturePage .sculptureClosing {
            padding-bottom: 100px;
          }
        }

        /* Sculpture — additional precise mobile refinements.
           All values are relative to the most recently approved version;
           desktop geometry and interactions are deliberately unchanged. */
        @media (max-width: 720px) {
          /* Lunar Blossom Rams main artwork: 102% × 1.10. */
          .sculpturePage .sculptureImages--rams .sculptureRamsHero {
            width: 112.2%;
            max-width: none;
          }

          /* The Garden Within: 15% larger without changing its lower spacing. */
          .sculpturePage .sculptureWork--the-garden-within .sculptureFigure {
            width: min(490.314px, 93.6054%);
          }

          /* Only the inactive LEFT Floral Lips image: 72.6% × 1.25.
             Keep the right inactive image and both featured sizes unchanged. */
          .sculpturePage .sculptureImages--duo .sculptureFigure:first-child .sculptureLipsButton.isSecondary {
            width: 90.75%;
            transform: translateX(6px);
          }

          /* The Lion: 15% larger than the previously approved size. */
          .sculpturePage .sculptureWork--the-lion .sculptureFigure {
            width: min(449.4545px, 85.80495%);
          }

          /* Blossom Carriage: the visible top peak is to the right of the
             frame's center, so shift the whole composition LEFT rather than
             merely centering its oversize rectangular image frame. */
          .sculpturePage .sculptureWork--blossom-carriage .sculptureFigure {
            position: relative;
            left: -8%;
            transform: none;
          }

          /* Leaping Fish: 24px additional text-to-photo separation,
             then 12px additional separation to the next project. */
          .sculpturePage .sculptureWork--fish-studies > .sculptureWorkHeading {
            margin-bottom: 76px; /* existing 52px + 24px */
          }
          .sculpturePage .sculptureWork--fish-studies {
            margin-bottom: 102px; /* existing 90px + 12px */
          }
        }

        /* Sculpture — careful mobile refinements, preserving desktop design. */
        @media (max-width: 720px) {
          /* Main Lunar Blossom Rams photo -5% from 112.2%. */
          .sculpturePage .sculptureImages--rams .sculptureRamsHero {
            width: 106.59%;
          }

          /* Floral Lips: active LEFT sculpture closer to the centre/right;
             keep the existing approved active/inactive size differences. */
          .sculpturePage .sculptureImages--duo .sculptureFigure:first-child .sculptureLipsButton.isFeatured {
            transform: translateX(20px) scale(1.54);
            transform-origin: center top;
          }
          /* Scaling down/up from the top prevents either artwork from
             growing upward into the heading during the width transition. */
          .sculpturePage .sculptureImages--duo .sculptureLipsButton {
            transform-origin: center top;
          }
          .sculpturePage .sculptureImages--duo .sculptureFigure:last-child .sculptureLipsButton.isFeatured {
            transform-origin: center top;
          }

          /* Swans +5% relative to their 90% mobile figure width. */
          .sculpturePage .sculptureWork--swans .sculptureFigure {
            width: 94.5%;
          }
        }

        /* Floral Lips — phone-only space and overlap refinements.
           The featured image retains its size/position and text-first timing.
           Move whichever image is inactive AWAY from the centre. */
        @media (max-width: 720px) {
          /* The previous shared heading-to-image spacing is 30px. */
          .sculpturePage .sculptureWork--floral-lips > .sculptureWorkHeading {
            margin-bottom: 18px; /* 30px - 12px */
          }
          .sculpturePage .sculptureWork--floral-lips {
            margin-bottom: 148px; /* 112px + 36px */
          }
          /* Inactive right sculpture moves RIGHT, giving the active left
             sculpture its own visual space while retaining the established
             72.6% inactive width and the approved photo swap animation. */
          .sculpturePage .sculptureImages--duo .sculptureFigure:last-child .sculptureLipsButton.isSecondary {
            transform: translateX(42px);
          }
          /* Inactive left sculpture moves LEFT when the right one is active.
             This overrides the previous +6px inactive translation. */
          .sculpturePage .sculptureImages--duo .sculptureFigure:first-child .sculptureLipsButton.isSecondary {
            transform: translateX(-42px);
          }
        }

        /* Sculpture — mobile-only finishing adjustments, Nov 20. */
        @media (max-width: 720px) {
          /* Main Rams image: preserve its width and shift 10px to the left. */
          .sculpturePage .sculptureImages--rams .sculptureRamsHero {
            transform: translateX(-10px);
          }

          /* Floral Lips inactive images: move each 6px TOWARDS the centre
             relative to the previously approved ±42px offsets. */
          .sculpturePage .sculptureImages--duo .sculptureFigure:last-child .sculptureLipsButton.isSecondary {
            transform: translateX(36px);
          }
          .sculpturePage .sculptureImages--duo .sculptureFigure:first-child .sculptureLipsButton.isSecondary {
            transform: translateX(-36px);
          }

          /* Lion: 95% of its current mobile figure size. */
          .sculpturePage .sculptureWork--the-lion .sculptureFigure {
            width: min(426.981775px, 81.5147025%);
          }

          /* Sculptural Portrait Vessels: 10px extra above,
             10px less below, without changing the image itself. */
          .sculpturePage .sculptureWork--sculptural-portrait-vessels > .sculptureWorkHeading {
            margin-bottom: 52px;
          }
          .sculpturePage .sculptureWork--sculptural-portrait-vessels {
            margin-bottom: 68px;
          }
        }

        /* Sculpture — Floral Lips final positional nudge.
           Shift BOTH left-state images 10px to the right and BOTH right-state
           images 10px to the left, preserving the approved sizing and timing. */
        @media (max-width: 720px) {
          .sculpturePage .sculptureImages--duo .sculptureFigure:first-child .sculptureLipsButton.isFeatured {
            transform: translateX(30px) scale(1.54);
          }
          .sculpturePage .sculptureImages--duo .sculptureFigure:first-child .sculptureLipsButton.isSecondary {
            transform: translateX(-26px);
          }
          .sculpturePage .sculptureImages--duo .sculptureFigure:last-child .sculptureLipsButton.isFeatured {
            transform: translateX(-16px) scale(1.40);
          }
          .sculpturePage .sculptureImages--duo .sculptureFigure:last-child .sculptureLipsButton.isSecondary {
            transform: translateX(26px);
          }
        }

        /* Floral Lips — phone-only editorial transition: text OUT, images
           resize/move, text IN. Keep the desktop crossfade unchanged. */
        @media (max-width: 720px) {
          .sculpturePage .sculptureWork--floral-lips > .sculptureWorkHeading {
            position: relative;
            z-index: 5;
            background: #ffffff;
            isolation: isolate;
          }
          .sculpturePage .sculptureWork--floral-lips .sculptureLipsTextCrossfade {
            opacity: 1;
            transition: opacity 140ms ease;
          }
          .sculpturePage .sculptureWork--floral-lips .sculptureLipsTextCrossfade.isSwitching {
            opacity: 0;
            pointer-events: none;
          }
          .sculpturePage .sculptureWork--floral-lips .sculptureLipsTextLayer {
            transition: opacity 180ms ease, visibility 0s linear 180ms;
          }
          .sculpturePage .sculptureWork--floral-lips .sculptureLipsTextLayer.isActive {
            transition: opacity 180ms ease, visibility 0s linear 0s;
          }
          .sculpturePage .sculptureWork--floral-lips .sculptureImages--duo {
            position: relative;
            z-index: 1;
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
          SCULPTURE — INDEPENDENT CURATED PORTFOLIO
          11 projects / 17 images. No full-resolution or download controls.
      ======================================================= */}
      <div className="pageWrap sculpturePortfolio">
        <section className="topIntro sculptureIntro" aria-labelledby="sculpture-page-title">
          <p className="topicLabel">Selected Sculptural Works</p>
          <h1 className="mainTitle" id="sculpture-page-title">Sculpture</h1>
          <p className="sculptureLead">
            An exploration of form, movement and character — from intimate sculptural objects
            to expressive floral compositions and large-scale installation concepts.
          </p>
        </section>

        {sculptureProjects.map((project) => (
          <section className={`sculptureWork sculptureWork--${project.id}`} key={project.id} id={project.id} aria-labelledby={`${project.id}-title`}>
            <div className="sculptureWorkHeading">
              {project.id === "fish-studies" ? (
                <div className="sculptureFishTextCrossfade" aria-live="polite" aria-atomic="true">
                  {project.images.map((study, studyIndex) => (
                    <div
                      key={study.src}
                      className={`sculptureFishTextLayer ${featuredFishIndex === studyIndex ? "isActive" : ""}`}
                      aria-hidden={featuredFishIndex !== studyIndex}
                    >
                      <p className="topicLabel">{study.category}</p>
                      <h2 className="sculptureWorkTitle" id={featuredFishIndex === studyIndex ? `${project.id}-title` : undefined}>{study.title}</h2>
                      <p className="sculptureWorkDescription">{study.description}</p>
                    </div>
                  ))}
                </div>
              ) : project.id === "floral-lips" ? (
                <div className={`sculptureLipsTextCrossfade${lipsTextHidden ? " isSwitching" : ""}`} aria-live="polite" aria-atomic="true">
                  {project.images.map((study, studyIndex) => (
                    <div
                      key={study.src}
                      className={`sculptureLipsTextLayer ${featuredLipsTextIndex === studyIndex ? "isActive" : ""}`}
                      aria-hidden={lipsTextHidden || featuredLipsTextIndex !== studyIndex}
                    >
                      <p className="topicLabel">{study.eyebrow || project.category}</p>
                      <h2
                        className="sculptureWorkTitle"
                        id={featuredLipsTextIndex === studyIndex ? `${project.id}-title` : undefined}
                      >
                        {study.title || project.title}
                      </h2>
                      <p className="sculptureWorkDescription">
                        {study.description || project.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="topicLabel">{project.category}</p>
                  <h2 className="sculptureWorkTitle" id={`${project.id}-title`}>{project.title}</h2>
                  <p className="sculptureWorkDescription">{project.description}</p>
                </>
              )}
            </div>
            {project.id === "lunar-blossom-rams" ? (
              <div className="sculptureImages sculptureImages--rams">
                <figure
                  className="sculptureFigure sculptureRamsHero"
                  aria-live="polite"
                >
                  <img
                    className="sculptureRamsHeroImage"
                    src={ramsGallery.photos[0].src}
                    alt={ramsGallery.photos[0].alt}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    onError={(event) => handleSculptureImageError(event, ramsGallery.photos[0].src)}
                  />
                  {ramsGallery.outgoingHero && (
                    <img
                      key={`rams-hero-out-${ramsGallery.transitionId}`}
                      className="sculptureRamsHeroImage sculptureRamsHeroOutgoing"
                      src={ramsGallery.outgoingHero.src}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      onError={(event) => handleSculptureImageError(event, ramsGallery.outgoingHero.src)}
                      onAnimationEnd={() => finishRamsSwap(ramsGallery.transitionId)}
                    />
                  )}
                </figure>
                <div ref={ramsStripRef} className="sculptureRamsThumbnails" role="group" aria-label="Swipe horizontally to choose the main Lunar Blossom Rams photograph" onScroll={updateRamsScroll}>
                  {ramsGallery.photos.slice(1).map((photo, index) => (
                    <button
                      type="button"
                      className="sculptureRamsThumb"
                      key={index}
                      onClick={() => swapRamsPhoto(index + 1)}
                      aria-label={`Show as main image: ${photo.alt}`}
                      title="Show as main image"
                    >
                      <img
                        className="sculptureRamsThumbImage"
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        onError={(event) => handleSculptureImageError(event, photo.src)}
                      />
                      {ramsGallery.changedSlot === index + 1 && ramsGallery.outgoingThumb && (
                        <img
                          key={`rams-thumb-out-${ramsGallery.transitionId}`}
                          className="sculptureRamsThumbImage sculptureRamsThumbOutgoing"
                          src={ramsGallery.outgoingThumb.src}
                          alt=""
                          aria-hidden="true"
                          draggable={false}
                          onError={(event) => handleSculptureImageError(event, ramsGallery.outgoingThumb.src)}
                        />
                      )}
                    </button>
                  ))}
                </div>
                <div className="sculptureRamsScrollGuide" aria-hidden="true">
                  <span className="sculptureRamsProgressTrack">
                    <span className="sculptureRamsProgressThumb" style={{ left: `${ramsScrollProgress * 72}%` }} />
                  </span>
                </div>
              </div>
            ) : project.id === "floral-lips" ? (
              <div ref={lipsGalleryRef} className="sculptureImages sculptureImages--duo" role="group" aria-label="Floral Lips photographs: select the larger image">
                {project.images.map((photo, index) => (
                  <figure className="sculptureFigure sculptureLipsSlot" key={photo.src}>
                    <button
                      type="button"
                      className={`sculptureLipsButton ${featuredLipsIndex === index ? "isFeatured" : "isSecondary"}`}
                      onClick={(event) => featuredLipsIndex === index
                        ? openSculptureLightbox(event, { ...project, title: photo.title || project.title }, photo)
                        : selectLipsPhoto(index)}
                      aria-label={featuredLipsIndex === index
                        ? `Enlarge ${photo.title || project.title}: ${photo.alt}`
                        : `Make this Floral Lips image larger: ${photo.alt}`}
                      title={featuredLipsIndex === index ? "Click to enlarge image" : "Click to make this image larger"}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        onError={(event) => handleSculptureImageError(event, photo.src)}
                      />
                      {featuredLipsIndex === index && (
                        <span className="sculptureExpandIcon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </figure>
                ))}
              </div>
            ) : project.id === "fish-studies" ? (
              <div ref={fishGalleryRef} className="sculptureImages sculptureImages--fishDuo" role="group" aria-label="Fish studies photographs: click the smaller image to feature it">
                {project.images.map((photo, index) => (
                  <figure className="sculptureFigure sculptureFishSlot" key={photo.src}>
                    <button
                      type="button"
                      className={`sculptureFishButton ${featuredFishIndex === index ? "isFeatured" : "isSecondary"}`}
                      onClick={(event) => featuredFishIndex === index
                        ? openSculptureLightbox(event, { ...project, title: photo.title || project.title }, photo)
                        : selectFishPhoto(index)}
                      aria-label={featuredFishIndex === index
                        ? `Enlarge ${photo.title}`
                        : `Feature ${photo.title}`}
                      title={featuredFishIndex === index ? "Click to enlarge image" : `Show ${photo.title} as the active image`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        onError={(event) => handleSculptureImageError(event, photo.src)}
                      />
                      {featuredFishIndex === index && (
                        <span className="sculptureExpandIcon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </figure>
                ))}
              </div>
            ) : (
              <div className={`sculptureImages sculptureImages--${project.layout}`}>
                {project.images.map((photo) => (
                  <figure className="sculptureFigure" key={photo.src}>
                    {sculptureZoomProjectIds.has(project.id) ? (
                      <button
                        type="button"
                        className="sculptureZoomButton"
                        onClick={(event) => openSculptureLightbox(event, project, photo)}
                        aria-label={`Enlarge ${project.title}: ${photo.alt}`}
                        title={`Enlarge ${project.title}`}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          onError={(event) => handleSculptureImageError(event, photo.src)}
                        />
                        <span className="sculptureExpandIcon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5" />
                          </svg>
                        </span>
                      </button>
                    ) : (
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        onError={(event) => handleSculptureImageError(event, photo.src)}
                      />
                    )}
                  </figure>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Closing invitation, styled to match Product & Object Design. */}
        <section className="sculptureClosing" aria-labelledby="sculpture-closing-title">
          <p className="topicLabel">Creative Practice</p>
          <h2 id="sculpture-closing-title">Beyond Sculpture</h2>
          <p>
            These sculptural works are part of a broader creative practice, connecting
            form and material with spatial design, objects and visual concepts.
            Explore more projects across the portfolio.
          </p>
          <button
            type="button"
            className="aboutContactLink"
            onClick={() => go("/work")}
          >
            View Selected Work
          </button>
        </section>
      </div>

      {/* Shared approved lightbox: selected sculptures, featured Floral Lips and featured Fish Studies. */}
      {sculptureLightboxImage && (
        <div
          className={`sculptureLightbox${sculptureLightboxClosing ? " isClosing" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged project image"
          onClick={closeSculptureLightbox}
        >
          <button
            type="button"
            className="sculptureLightboxClose"
            aria-label="Close image"
            onClick={closeSculptureLightbox}
          >×</button>
          <img
            src={sculptureLightboxImage.src}
            alt={sculptureLightboxImage.alt}
            style={{
              width: `${Math.round(sculptureLightboxImage.previewWidth * 1.15)}px`,
              height: `${Math.round(sculptureLightboxImage.previewHeight * 1.15)}px`,
            }}
            onClick={(event) => event.stopPropagation()}
            draggable={false}
          />
          <p>{sculptureLightboxImage.caption}</p>
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
                onClick={() => go(item.path)}
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

      <button
        type="button"
        className={`hamburger${menuOpen ? " isOpen" : ""}`}
        onClick={() => {
          setMenuOpen((wasOpen) => !wasOpen);
          setMobileDropdown(null);
        }}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="sculpture-mobile-navigation"
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
        id="sculpture-mobile-navigation"
        className={menuOpen ? "mobilePanel open" : "mobilePanel"}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <button
          type="button"
          className="mobileMenuItem hasSubmenu"
          aria-expanded={mobileDropdown === "work"}
          aria-controls="sculpture-work-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "work" ? null : "work")}
        >SELECTED WORK</button>
        <div
          id="sculpture-work-submenu"
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
          aria-controls="sculpture-jewellery-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "jewellery" ? null : "jewellery")}
        >JEWELLERY DESIGN</button>
        <div
          id="sculpture-jewellery-submenu"
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