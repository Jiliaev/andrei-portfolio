import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Product & Object Design. Approved header, logo, navigation and footer are retained.
// Only page-specific project data, images, descriptions and gallery CSS are changed.
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

// PRODUCT & OBJECT DESIGN — final five projects; fish and lion studies removed from this page.
// Base image widths follow the approved Spatial & Retail Design reference:
// 90% gallery; centered main image min(470px, 62%); mobile min(440px, 84%).
// Project-specific width adjustments are scoped below and leave the rest unchanged.
// All images are web-optimized display copies in /public/ (matching the user's current VS Code project).
// Keep the original high-resolution masters outside the public website folder.
const objectProjects = [
  {
    id: "sculptural-portrait-vessels",
    title: "Sculptural Portrait Vessels",
    category: "Sculptural Objects · Decorative Vessels · Ornamental Detail",
    description: "Two expressive portrait vessels explore the meeting of sculptural form and intricate surface ornament. Contrasting black-and-gold and ivory-and-blue finishes create a dialogue between character, colour and decorative detail.",
    layout: "portrait",
    images: [
      { number: "01", src: "/01-sculptural-portrait-vessels.jpg", file: "01-sculptural-portrait-vessels.jpg", ratio: 1639 / 2048, caption: "Sculptural portrait vessels · Two decorative interpretations" },
    ],
  },
  {
    id: "decorative-vessels",
    title: "Decorative Vessels & Decanters",
    category: "Product Design · Sculptural Silhouettes · Surface Exploration",
    description: "A family of six vessel concepts, each with a distinct silhouette, surface language and ornamental treatment. The collection moves between organic forms, geometric textures and refined colour contrasts.",
    layout: "wide",
    images: [
      { number: "02", src: "/02-decorative-vessels-collection.jpg", file: "02-decorative-vessels-collection.jpg", ratio: 2048 / 716, caption: "Decorative vessels · Six design directions" },
    ],
  },
  {
    id: "sculptural-lips-lighting",
    title: "Sculptural Lips · Light & Form",
    category: "Sculptural Lighting · Product Design · Form Development",
    description: "An exploration of sculptural lighting through expressive form, textured surfaces and a luminous sphere. Designed as both a decorative object and a source of ambient light, the concept moves from graphite studies to a refined three-dimensional proposal.",
    layout: "lips-light",
    images: [
      { src: "/object-lips-white-off.jpg", file: "object-lips-white-off.jpg", ratio: 396 / 585, caption: "Sculptural lips luminaire · White finish · Light off" },
      { src: "/object-lips-white-on.jpg", file: "object-lips-white-on.jpg", ratio: 396 / 585, caption: "Sculptural lips luminaire · White finish · Light on" },
      { src: "/object-lips-graphite-left.jpg", file: "object-lips-graphite-left.jpg", ratio: 1634 / 1117, caption: "Graphite study sheet · Wall-mounted sculptural light" },
      { src: "/object-lips-graphite-right.jpg", file: "object-lips-graphite-right.jpg", ratio: 1634 / 1117, caption: "Graphite study sheet · Table and freestanding variations" },
      { src: "/object-lips-watercolor-left.jpg", file: "object-lips-watercolor-left.jpg", ratio: 1466 / 1054, caption: "Watercolour study · Lips with pearl · Expressive view" },
      { src: "/object-lips-watercolor-right.jpg", file: "object-lips-watercolor-right.jpg", ratio: 1466 / 1054, caption: "Watercolour study · Sculptural variations" },
      { src: "/object-lips-dimension-board.jpg", file: "object-lips-dimension-board.jpg", ratio: 1634 / 919, caption: "Dimensional presentation · Front and side elevations" },
    ],
  },
  {
    id: "serpent-display",
    title: "Serpent Display Concept",
    category: "Bulgari · Luxury Retail Display Study · Sculptural Form",
    description: "A gold-toned serpent envisioned as a sculptural display statement. The principal view is followed by a second perspective and a separate hand-drawn jewellery study, bringing presentation and design exploration together.",
    layout: "serpent",
    images: [
      { number: "03", src: "/03-serpent-display-primary.jpg", file: "03-serpent-display-primary.jpg", ratio: 1233 / 1358, caption: "Serpent display · Principal presentation" },
      { number: "04", src: "/04-serpent-display-second-view.jpg", file: "04-serpent-display-second-view.jpg", ratio: 1233 / 1358, caption: "Serpent display · Second perspective" },
      { number: "05", src: "/05-bulgari-jewellery-sketch.jpg", file: "05-bulgari-jewellery-sketch.jpg", ratio: 1233 / 1358, caption: "Jewellery design · Original pencil study" },
    ],
  },
  {
    id: "wall-drawing-unit",
    title: "Wall Drawing Unit",
    category: "Product Concept · Children's Creative Spaces · Vinyl Wrap Design",
    description: "A mobile drawing wall with a continuous paper-roll surface and playful graphic treatments. The featured concept introduces the product, followed by five additional vinyl-wrap design options presented together.",
    layout: "drawing",
    images: [
      { number: "09", src: "/09-wall-drawing-unit-presentation.jpg", file: "09-wall-drawing-unit-presentation.jpg", ratio: 2048 / 958, caption: "Wall Drawing Unit · Featured concept and product presentation" },
      { number: "10", src: "/10-wall-drawing-unit-options.jpg", file: "10-wall-drawing-unit-options.jpg", ratio: 2048 / 473, caption: "Wall Drawing Unit · Vinyl wrap options 02–06" },
    ],
  },
];

// Preserves original image proportions. No crop and no forced distortion.
function ObjectFigure({ image, onOpen, onRatioChange, loading = "lazy" }) {
  const [missing, setMissing] = useState(false);
  useEffect(() => setMissing(false), [image.src]);
  return (
    <figure className="objectFigure">
      {missing ? (
        <div className="objectPlaceholder" style={{ aspectRatio: image.ratio }} aria-label={`Photo placeholder for ${image.caption}`}>
          <span className="objectPlaceholderNumber">IMAGE {image.number}</span>
          <span className="objectPlaceholderLine" />
          <span className="objectPlaceholderTitle">PHOTO TO BE ADDED</span>
          <span className="objectPlaceholderFilename">{image.file}</span>
        </div>
      ) : (
        <button
          className="objectImageButton"
          type="button"
          aria-label={`Open ${image.caption} in image viewer`}
          onClick={(event) => {
            const img = event.currentTarget.querySelector("img");
            if (!img?.complete || !img.naturalWidth) return;
            const bounds = img.getBoundingClientRect();
            onOpen({ src: image.src, caption: image.caption, previewWidth: bounds.width, previewHeight: bounds.height });
          }}
        >
          <img
            src={image.src}
            alt={image.caption}
            loading={loading}
            onLoad={(event) => {
              const img = event.currentTarget;
              onRatioChange?.(img.naturalWidth / img.naturalHeight);
            }}
            onError={() => setMissing(true)}
          />
        </button>
      )}
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

// The two actual images have exactly matching visible heights without cropping:
// each grid column is proportional to that image's native aspect ratio.
function ObjectImagePair({ left, right, onOpen }) {
  const [ratios, setRatios] = useState([left.ratio, right.ratio]);
  const setRatio = (index, nextRatio) => {
    if (!Number.isFinite(nextRatio) || nextRatio <= 0) return;
    setRatios((current) => Math.abs(current[index] - nextRatio) < 0.001
      ? current
      : current.map((value, i) => i === index ? nextRatio : value));
  };
  return (
    <div className="objectPair" style={{ "--object-left-fr": `${ratios[0]}fr`, "--object-right-fr": `${ratios[1]}fr` }}>
      <ObjectFigure image={left} onOpen={onOpen} onRatioChange={(r) => setRatio(0, r)} />
      <ObjectFigure image={right} onOpen={onOpen} onRatioChange={(r) => setRatio(1, r)} />
    </div>
  );
}

// Keep both artwork layers mounted so switching in either direction can crossfade.
// The outgoing image remains visible while the incoming image gradually appears.
function ObjectLipsDrawingCrossfade({ graphite, watercolor, lit, onOpen }) {
  const active = lit ? watercolor : graphite;
  const openDrawing = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    onOpen({
      src: active.src,
      caption: active.caption,
      previewWidth: rect.width,
      previewHeight: rect.height,
    });
  };

  return (
    <figure className="objectFigure objectLipsDrawingCard">
      <button
        className="objectImageButton objectLipsCrossfadeButton"
        type="button"
        aria-label={`Preview ${active.caption}`}
        onClick={openDrawing}
      >
        <span className="objectLipsCrossfadeStage">
          <img
            className="objectLipsGraphiteLayer"
            src={graphite.src}
            alt={lit ? "" : graphite.caption}
            aria-hidden={lit}
            loading="lazy"
          />
          <img
            className="objectLipsWatercolorLayer"
            src={watercolor.src}
            alt={lit ? watercolor.caption : ""}
            aria-hidden={!lit}
            loading="lazy"
          />
        </span>
      </button>
      <figcaption className="objectLipsCrossfadeCaption">
        <span className="objectLipsGraphiteCaption" aria-hidden={lit}>{graphite.caption}</span>
        <span className="objectLipsWatercolorCaption" aria-hidden={!lit}>{watercolor.caption}</span>
      </figcaption>
    </figure>
  );
}

function ObjectLipsLighting({ project, onOpen }) {
  const [lit, setLit] = useState(false);
  const off = project.images[0];
  const on = project.images[1];
  const graphiteDrawings = project.images.slice(2, 4);
  const watercolorDrawings = project.images.slice(4, 6);
  const blueprint = project.images[6];
  const drawingsLabel = lit
    ? "Watercolour concept studies for the sculptural lips lighting"
    : "Original graphite design studies for the sculptural lips lighting";

  const openPhoto = (event) => {
    const preview = event.currentTarget.querySelector("img");
    if (!preview?.complete || !preview.naturalWidth) return;
    const rect = preview.getBoundingClientRect();
    onOpen({
      src: lit ? on.src : off.src,
      caption: lit ? on.caption : off.caption,
      previewWidth: rect.width,
      previewHeight: rect.height,
    });
  };

  return (
    <div className="objectLipsSection">
      <div className="objectLipsInteractive">
        <figure className="objectLipsArtwork">
          <button className="objectLipsImageButton" type="button" aria-label="View sculptural lips lamp" onClick={openPhoto}>
            <span className="objectLipsStack">
              <img src={off.src} alt="White sculptural lips wall lamp with light off" loading="lazy" />
              <img className="objectLipsOn" src={on.src} alt="" aria-hidden="true" loading="lazy"
                style={{ opacity: lit ? 1 : 0 }} />
            </span>
          </button>
          <figcaption>SCULPTURAL LIGHTING / WHITE FINISH</figcaption>
        </figure>
        <div className="objectLipsControl">
          <button className="objectLipsToggle" type="button" role="switch" aria-checked={lit}
            aria-label={lit ? "Turn sculptural lamp off" : "Turn sculptural lamp on"}
            onClick={() => setLit(value => !value)}>
            <span className={"objectLipsToggleDot" + (lit ? " isOn" : "")} aria-hidden="true" />
          </button>
          <span className="objectLipsControlState" aria-live="polite">LIGHT / {lit ? "ON" : "OFF"}</span>
          <span className="objectLipsControlHint">CLICK TO {lit ? "TURN OFF" : "ILLUMINATE"}</span>
        </div>
      </div>
      <div className={"objectLipsDrawings" + (lit ? " isWatercolor" : " isGraphite")} aria-label={drawingsLabel}>
        {graphiteDrawings.map((graphite, index) => (
          <ObjectLipsDrawingCrossfade
            key={graphite.src}
            graphite={graphite}
            watercolor={watercolorDrawings[index]}
            lit={lit}
            onOpen={onOpen}
          />
        ))}
        <figcaption className="objectLipsSharedCaption" aria-live="polite">
          <span className="objectLipsGraphiteCaption" aria-hidden={lit}>Sculptural Lips · Graphite Design Studies</span>
          <span className="objectLipsWatercolorCaption" aria-hidden={!lit}>Sculptural Lips · Watercolour Design Studies</span>
        </figcaption>
      </div>
      <div className="objectLipsBlueprint">
        <ObjectFigure image={blueprint} onOpen={onOpen} />
      </div>
      <ObjectMaterialExpressions onOpen={onOpen} />
      <ObjectInteriorHover />
    </div>
  );
}

function ObjectMaterialExpressions({ onOpen }) {
  // Same mobile presentation as Design Process: 20% zoom, illuminate, reveal options.
  const [activeFinish, setActiveFinish] = useState(null);
  const [finishPhase, setFinishPhase] = useState(null);
  const finishTimers = useRef([]);
  const finishBusy = useRef(false);
  useEffect(() => () => {
    finishTimers.current.forEach(window.clearTimeout);
  }, []);

  const finishes = [
    { off: "/design-creation-finish-black.jpg", on: "/design-creation-finish-black-lighted.jpg", mobileOff: "/design-creation-finish-black-mobile-crop.jpg", mobileOn: "/design-creation-finish-black-lighted-mobile-crop.jpg", options: "/design-creation-options-black.jpg", name: "Black" },
    { off: "/design-creation-finish-gold.jpg", on: "/design-creation-finish-gold-lighted.jpg", mobileOff: "/design-creation-finish-gold-mobile-crop.jpg", mobileOn: "/design-creation-finish-gold-lighted-mobile-crop.jpg", options: "/design-creation-options-gold.jpg", name: "Gold" },
    { off: "/design-creation-finish-platinum.jpg", on: "/design-creation-finish-platinum-lighted.jpg", mobileOff: "/design-creation-finish-platinum-mobile-crop.jpg", mobileOn: "/design-creation-finish-platinum-lighted-mobile-crop.jpg", options: "/design-creation-options-platinum.jpg", name: "Platinum" },
    { off: "/design-creation-finish-white.jpg", on: "/design-creation-finish-white-lighted.jpg", mobileOff: "/design-creation-finish-white-mobile-crop.jpg", mobileOn: "/design-creation-finish-white-lighted-mobile-crop.jpg", options: "/design-creation-options-white.jpg", name: "White" },
  ];

  const openOptions = (event, item) => {
    event.preventDefault();
    const options = {
      src: item.options,
      caption: `${item.name} finish — design options`,
      previewWidth: 980,
      previewHeight: 690,
    };
    const mobile = window.matchMedia("(max-width: 720px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!mobile || reduced) {
      onOpen(options);
      return;
    }
    if (finishBusy.current) return;
    finishBusy.current = true;
    finishTimers.current.forEach(window.clearTimeout);
    finishTimers.current = [];
    setActiveFinish(item.name);
    setFinishPhase("zoom");
    finishTimers.current.push(window.setTimeout(() => setFinishPhase("light"), 230));
    finishTimers.current.push(window.setTimeout(() => {
      setFinishPhase("reveal");
      onOpen(options);
    }, 500));
    finishTimers.current.push(window.setTimeout(() => {
      setActiveFinish(null);
      setFinishPhase(null);
      finishBusy.current = false;
    }, 1070));
  };

  return (
    <div className="objectMaterialsSection" aria-label="Material expression options">
      <div className="objectFinishGrid">
        {finishes.map((item) => (
          <figure className="objectFinishCard" key={item.name}>
            <button
              className={`objectFinishButton${activeFinish === item.name ? " isFinishAnimating" : ""}${activeFinish === item.name && finishPhase !== "zoom" ? " isFinishLit" : ""}`}
              type="button"
              aria-label={`${item.name} finish — tap to illuminate and view design options`}
              onClick={(event) => openOptions(event, item)}
            >
              <span className="objectFinishStage">
                <picture>
                  <source media="(max-width: 720px)" srcSet={item.mobileOff} />
                  <img className="objectFinishOff" src={item.off} alt={`${item.name} lips lamp, light off`} loading="lazy" draggable="false" />
                </picture>
                <picture>
                  <source media="(max-width: 720px)" srcSet={item.mobileOn} />
                  <img className="objectFinishOn" src={item.on} alt="" aria-hidden="true" loading="lazy" draggable="false" />
                </picture>
              </span>
            </button>
            <figcaption>{item.name}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function ObjectInteriorHover() {
  return (
    <div className="objectInteriorHoverSection" aria-label="Gold sculptural lips wall sconce in an architectural interior; hover to illuminate">
      <div className="objectInteriorHoverStage">
        <img className="objectInteriorHoverOff" src="/object-lips-interior-off.jpg" alt="Gold sculptural lips wall sconce in an architectural interior, light off" loading="lazy" draggable="false" />
        <img className="objectInteriorHoverOn" src="/object-lips-interior-on.jpg" alt="" aria-hidden="true" loading="lazy" draggable="false" />
      </div>
    </div>
  );
}

// Mobile serpent carousel follows the approved Golden Ascent gallery:
// three thumbnails, centered large image and measured draggable gold rail.
function MobileSerpentCarousel({ images, onOpen }) {
  const [active, setActive] = useState(0);
  const thumbsRef = useRef(null);
  const railRef = useRef(null);
  const draggingRef = useRef(false);
  const [points, setPoints] = useState([0, 0, 0]);
  const [dragX, setDragX] = useState(null);

  useLayoutEffect(() => {
    const measure = () => {
      if (!thumbsRef.current || !railRef.current) return;
      const railLeft = railRef.current.getBoundingClientRect().left;
      const buttons = [...thumbsRef.current.querySelectorAll('.serpentCarouselThumb')];
      if (buttons.length !== images.length) return;
      setPoints(buttons.map((button) => {
        const bounds = button.getBoundingClientRect();
        return bounds.left + bounds.width / 2 - railLeft;
      }));
    };
    measure();
    window.addEventListener('resize', measure);
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (observer && thumbsRef.current) observer.observe(thumbsRef.current);
    return () => { window.removeEventListener('resize', measure); observer?.disconnect(); };
  }, [images.length]);

  const clampX = (clientX) => {
    const rail = railRef.current;
    if (!rail) return points[active];
    const offset = clientX - rail.getBoundingClientRect().left;
    return Math.max(points[0], Math.min(points[points.length - 1], offset));
  };
  const selected = images[active];
  const nearest = (x) => points.reduce((best, p, index) =>
    Math.abs(p - x) < Math.abs(points[best] - x) ? index : best, 0);

  return (
    <div className="serpentMobileCarousel" aria-label="Serpent Display Concept — mobile image gallery">
      <div className="serpentCarouselStage">
        <button type="button" className="serpentCarouselMain"
          aria-label={`Enlarge ${selected.caption}`}
          onClick={(event) => {
            const img = event.currentTarget.querySelector('img');
            const bounds = img?.getBoundingClientRect();
            onOpen({ src: selected.src, caption: selected.caption,
              previewWidth: bounds?.width || 350, previewHeight: bounds?.height || 380 });
          }}>
          <img key={selected.src} src={selected.src} alt={selected.caption}
            loading="lazy" draggable={false} />
        </button>
      </div>
      <div className="serpentCarouselThumbs" ref={thumbsRef}>
        {images.map((image, index) => (
          <button type="button" key={image.src}
            className={`serpentCarouselThumb ${index === active ? 'isActive' : ''}`}
            aria-label={`Show ${image.caption}`} aria-pressed={index === active}
            onClick={() => setActive(index)}>
            <img src={image.src} alt="" loading="lazy" draggable={false} />
          </button>
        ))}
      </div>
      <div className="serpentCarouselRail" ref={railRef} role="slider" tabIndex={0}
        aria-label="Choose serpent image" aria-valuemin={1} aria-valuemax={images.length}
        aria-valuenow={active + 1} aria-valuetext={selected.caption}
        style={{ '--rail-start': `${points[0]}px`,
          '--rail-length': `${Math.max(0, points[points.length - 1] - points[0])}px`,
          '--handle-x': `${dragX ?? points[active]}px` }}
        onPointerDown={(event) => {
          if (points[points.length - 1] <= points[0]) return;
          event.preventDefault();
          draggingRef.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragX(clampX(event.clientX));
        }}
        onPointerMove={(event) => {
          if (draggingRef.current) setDragX(clampX(event.clientX));
        }}
        onPointerUp={(event) => {
          if (!draggingRef.current) return;
          const x = clampX(event.clientX);
          draggingRef.current = false;
          setActive(nearest(x));
          setDragX(null);
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => { draggingRef.current = false; setDragX(null); }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            setActive((index) => Math.max(0, Math.min(images.length - 1,
              index + (event.key === 'ArrowRight' ? 1 : -1))));
          }
        }}>
        <span className="serpentCarouselLine" aria-hidden="true" />
        <span className={`serpentCarouselHandle ${dragX !== null ? 'dragging' : ''}`} aria-hidden="true" />
      </div>
    </div>
  );
}

export default function ProductObjectDesign() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxClosing, setLightboxClosing] = useState(false);
  const lightboxCloseTimer = useRef(null);
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
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


  // Gentle fade-out before removing the image; the 15% image scale is retained.
  const closeLightbox = () => {
    if (!lightboxImage || lightboxClosing) return;
    setLightboxClosing(true);
    window.clearTimeout(lightboxCloseTimer.current);
    lightboxCloseTimer.current = window.setTimeout(() => {
      setLightboxImage(null);
      setLightboxClosing(false);
    }, 300);
  };
  // A tap on the backdrop (including caption space) closes the modal.
  // The image and the close button remain independently interactive.
  const handleLightboxBackdropClick = (event) => {
    if (event.target.closest?.(".objectLightbox img, .objectLightboxClose")) return;
    closeLightbox();
  };


  useEffect(() => () => window.clearTimeout(lightboxCloseTimer.current), []);
  useEffect(() => {
    if (!lightboxImage) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxImage, lightboxClosing]);

  // Match Home mobile navigation: locked background scroll, confirmed submenu selection,
  // and a short page-exit animation. Desktop navigation remains unchanged.
  useEffect(() => {
    if (!menuOpen || typeof window === "undefined" || !window.matchMedia("(max-width: 720px)").matches) return;
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
    const onEscape = (event) => {
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
    setSelectedMobileSubLink(null); setMobileNavigating(false);
    navigate(path);
  };

  const go = (path) => {
    setMenuOpen(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);
    navigate(path);
  };

  return (
    <main className={`aboutPage productObjectPage${mobileNavigating ? " isMobileNavigating" : ""}${selectedMobileSubLink ? " hasSubmenuSelection" : ""}`}>
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
           PRODUCT & OBJECT DESIGN — SEVEN PROJECTS
           Header, logo, navigation and footer styles ABOVE remain untouched.
           ========================================================= */
        .objectPortfolio { width: min(1180px, 86vw); margin: 0 auto; }
        .objectIntro { text-align: center; margin: 0 auto 110px; }
        .objectIntro .mainTitle { margin-bottom: 22px; }
        .objectLead { max-width: 760px; margin: 35px auto 0; color: #6C6258; font: 300 17px/1.82 'Times New Roman', Georgia, serif; }
        .objectProject { margin: 0 auto 135px; }
        .objectProjectHeading { text-align: center; max-width: 830px; margin: 0 auto 48px; }
        .objectProjectHeading h2, .objectClosing h2 { margin: 0 0 15px; font: 400 clamp(30px, 2.45vw, 44px)/1.12 'Cormorant Garamond', serif; letter-spacing: .14em; text-transform: uppercase; color: #2A2723; }
        .objectProjectType { margin: 0 0 22px; font: 400 10px/1.6 Arial, sans-serif; letter-spacing: .22em; text-transform: uppercase; color: #9C8664; }
        .objectDescription, .objectClosing > p:not(.topicLabel) { margin: 0 auto; max-width: 760px; font: 300 17px/1.82 'Times New Roman', Georgia, serif; color: #6C6258; }
        /* =========================================================
           IMAGE SIZES — EXACTLY MATCH SPATIAL & RETAIL DESIGN
           Reference: retailGallery 90%; retailLuxuryHeroBlock > figure
           min(470px, 62%); secondary pairs full gallery width.
           No fixed image heights, no cropping, no distortion.
           ========================================================= */
        .objectGallery { width: 90%; margin: 0 auto; display: flex; flex-direction: column; gap: clamp(46px, 6vw, 82px); }
        /* Base hero size is identical to Retail Design. Individual adjustments
           are scoped by project id below; project 01 and 06 stay unchanged. */
        .objectSingle,
        .objectSingle--wide,
        .objectGallery--serpent .objectHero,
        .objectGallery--drawing .objectDrawingHero {
          width: min(470px, 62%);
          margin: 0 auto;
        }
        /* Retail-style supporting pair: ratio-weighted columns, equal actual image heights. */
        .objectGallery--serpent .objectPair { width: 100%; margin: 0 auto; }
        .objectPair {
          display: grid;
          grid-template-columns: minmax(0, var(--object-left-fr, 1fr)) minmax(0, var(--object-right-fr, 1fr));
          gap: clamp(16px, 2vw, 28px);
          align-items: start;
        }
        .objectPair > .objectFigure { min-width: 0; width: 100%; }
        /* Five options are a single panoramic supporting board; it uses the
           same full-row width as the Retail secondary pair compositions. */
        .objectGallery--drawing .objectDrawingOptions { width: 100%; margin: 0 auto; }
        /* =========================================================
           PROJECT-SPECIFIC IMAGE WIDTHS — LATEST APPROVED REVISION
           Changes relative to the previous version (not original baseline):
           01 portrait vessels: 470px * .85 = 399.5px (-15%).
           02 decorative vessels: 611px * 1.20 = 733.2px (+20%).
           03 serpent hero: 470px * .85 = 399.5px (-15%).
              Lower two-image pair: 70% * .80 = 56% (-20% from current).
           04/05 fish projects retain previously approved -15% widths.
           06 lion stays at Retail reference width.
           07 upper/main presentation: 587.5px * .90 = 528.75px (-10% from current).
              Lower options retain their approved 64% width.
           ========================================================= */
        .objectProject--sculptural-portrait-vessels .objectSingle--portrait {
          width: min(399.5px, 52.7%);
        }
        .objectProject--decorative-vessels .objectSingle--wide {
          width: min(733.2px, 96.72%);
        }
        .objectProject--serpent-display .objectHero {
          width: min(399.5px, 52.7%);
          margin-left: auto;
          margin-right: auto;
        }
        .objectProject--serpent-display .objectPair {
          width: 56%;
          margin-left: auto;
          margin-right: auto;
        }
        .objectProject--leaping-fish .objectSingle--portrait,
        .objectProject--school-of-fish .objectSingle--portrait {
          width: min(399.5px, 52.7%);
        }
        .objectProject--wall-drawing-unit .objectDrawingHero {
          width: min(528.75px, 69.75%);
          margin-left: auto;
          margin-right: auto;
        }
        .objectProject--wall-drawing-unit .objectDrawingOptions {
          width: 64%;
          margin-left: auto;
          margin-right: auto;
        }
        .objectFigure { margin: 0; min-width: 0; }
        .objectImageButton { display: block; position: relative; width: 100%; border: 0; padding: 0; background: #fff; cursor: pointer; overflow: hidden; }
        .objectImageButton img { display: block; width: 100%; height: auto; object-fit: contain; transform: scale(1); transform-origin: center; transition: transform 360ms cubic-bezier(.22,.61,.36,1); }
        @media (hover:hover) and (pointer:fine) { .objectImageButton:hover img { transform: scale(1.012); } }
        .objectImageButton:focus-visible { outline: 1px solid #9C8664; outline-offset: 5px; }
        .objectFigure figcaption { margin: 14px 0 0; text-align: center; color: #978a77; font: 10px/1.5 Arial,sans-serif; letter-spacing: .14em; text-transform: uppercase; }
        .objectPlaceholder { width: 100%; min-height: 200px; background: #F9F8F6; border: 1px solid rgba(156,134,100,.22); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 24px 16px; text-align: center; }
        .objectPlaceholderNumber { font: 400 10px/1.5 Arial,sans-serif; letter-spacing: .25em; color: #B2A28A; }
        .objectPlaceholderLine { display: block; width: 32px; height: 1px; background: rgba(156,134,100,.5); }
        .objectPlaceholderTitle { font: 400 clamp(13px,1.5vw,20px)/1.25 'Cormorant Garamond',serif; letter-spacing: .14em; color: #87745E; }
        .objectPlaceholderFilename { font: 400 10px/1.6 Arial,sans-serif; letter-spacing: .02em; color: #A59A8D; overflow-wrap: anywhere; }
        .objectClosing { text-align: center; padding: 15px 0 135px; }
        .objectClosing > p:not(.topicLabel) { margin: 0 auto 32px; }
        /* A restrained preview, 15% larger than on-page; no full-resolution control. */
        /* APPROVED LIGHTBOX: neutral graphite 73%, 3px blur, 450ms open / 300ms close. */
        .objectLightbox { position: fixed; inset: 0; z-index: 3000; background: rgba(17,17,19,.73); backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px); cursor: default; animation: objectLightboxAppear 450ms ease both; }
        .objectLightbox img { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); max-width: calc(100vw - 44px); max-height: calc(100vh - 175px); object-fit: contain; cursor: default; animation: objectLightboxImageAppear 450ms cubic-bezier(.22,1,.36,1) both; }
        .objectLightbox p { position: absolute; bottom: 54px; left: 22px; right: 22px; margin: 0; color: #E0D9CD; text-align: center; font: 11px/1.5 Arial,sans-serif; letter-spacing: .13em; text-transform: uppercase; }
        .objectLightboxClose { position: absolute; top: 15px; right: 25px; border: 0; background: transparent; color: white; font-size: 40px; cursor: pointer; z-index: 1; }
        .objectLightbox.isClosing { animation: objectLightboxDisappear 300ms ease both; pointer-events: none; }
        .objectLightbox.isClosing img { animation: objectLightboxImageDisappear 300ms ease both; }
        @keyframes objectLightboxAppear { from { opacity: 0; } to { opacity: 1; } }
        @keyframes objectLightboxDisappear { from { opacity: 1; } to { opacity: 0; } }
        @keyframes objectLightboxImageAppear { from { opacity: 0; transform: translate(-50%,-50%) scale(.965); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
        @keyframes objectLightboxImageDisappear { from { opacity: 1; transform: translate(-50%,-50%) scale(1); } to { opacity: 0; transform: translate(-50%,-50%) scale(.98); } }
        /* Consistent refined corner-expand symbol for all clickable gallery images. */
        .objectImageButton, .objectLipsImageButton, .objectFinishButton,
        .objectLipsDrawings .objectLipsCrossfadeButton { cursor: pointer; position: relative; }
        .objectImageButton::after, .objectLipsImageButton::after, .objectFinishButton::after {
          content: ""; position: absolute; bottom: 15px; right: 15px; z-index: 5;
          width: 23px; height: 23px; opacity: 0; pointer-events: none;
          background: center / contain no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239C8664' stroke-width='1.35' stroke-linecap='round'%3E%3Cpath d='M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5'/%3E%3C/svg%3E");
          transition: opacity 320ms ease, transform 320ms ease;
          transform: translateY(3px);
          filter: drop-shadow(0 0 3px rgba(255,255,255,.85));
        }
        @media (hover:hover) and (pointer:fine) {
          .objectImageButton:hover::after, .objectLipsImageButton:hover::after, .objectFinishButton:hover::after,
          .objectImageButton:focus-visible::after, .objectLipsImageButton:focus-visible::after, .objectFinishButton:focus-visible::after { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .objectLightbox, .objectLightbox img, .objectLightbox.isClosing, .objectLightbox.isClosing img { animation-duration: .01ms; }
        }
        /* New lips project only: approved header, footer and other projects unchanged. */
        .objectProject--sculptural-lips-lighting .objectGallery--lips-light { width:90%; }
        .objectLipsSection { width:100%; min-width:0; --lips-switch-duration:1.6s; --lips-switch-easing:cubic-bezier(.42,0,.58,1); }
        .objectLipsInteractive { width:min(660px,94%);margin:0 auto 104px;display:grid;
          grid-template-columns:minmax(0,1fr) 110px;gap:clamp(16px,4vw,57px);align-items:center;
          transform:translateX(clamp(12px,1.1vw,20px)); }
        .objectLipsArtwork { margin:0; min-width:0; width:71.25%; justify-self:center; }
        .objectLipsImageButton { width:100%;padding:0;border:0;background:transparent;cursor:pointer;display:block; }
        .objectLipsStack { display:block;position:relative;width:100%;aspect-ratio:396 / 585; }
        .objectLipsStack img { position:absolute;inset:0;display:block;width:100%;height:100%;
          object-fit:contain;transition:opacity var(--lips-switch-duration) var(--lips-switch-easing); }
        .objectLipsArtwork figcaption { margin:16px 0 0;font:10px/1.5 Arial,sans-serif;
          text-align:center;letter-spacing:.14em;color:#978a77; }
        .objectLipsControl { display:flex;flex-direction:column;align-items:center;gap:14px; }
        .objectLipsToggle { width:37px;height:70px;border:1px solid #9C8664;border-radius:24px;
          position:relative;background:#fff;padding:0;cursor:pointer;transition:background .25s ease; }
        .objectLipsToggle:hover { background:#fbf9f5; }
        .objectLipsToggle:focus-visible { outline:2px solid #9C8664;outline-offset:5px; }
        .objectLipsToggleDot { position:absolute;left:50%;top:40px;transform:translateX(-50%);
          width:9px;height:18px;border-radius:7px;background:#9C8664;
          transition:top .34s cubic-bezier(.22,.61,.36,1); }
        .objectLipsToggleDot.isOn { top:10px; }
        .objectLipsControlState,.objectLipsControlHint { font:10px/1.5 Arial,sans-serif;
          text-transform:uppercase;letter-spacing:.14em;color:#9C8664;text-align:center;white-space:nowrap; }
        .objectLipsControlHint { font-size:9px;letter-spacing:.12em;color:#9A9287; }
        .objectLipsDrawings { width:76%;min-width:0;display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(14px,2vw,28px);align-items:start;
          margin:0 auto; }
        .objectLipsDrawingCard { min-width:0; }
        /* One shared caption is used across both images on phones only. */
        .objectLipsSharedCaption { display: none; }
        .objectLipsDrawings .objectLipsCrossfadeButton {
          position:relative; display:block; width:100%;
          padding:0; border:0; background:#ffffff;
          overflow:hidden; cursor:pointer;
        }
        .objectLipsCrossfadeStage {
          position:relative; display:block; width:100%;
          aspect-ratio:1634 / 1117;
          background:#ffffff;
        }
        .objectLipsDrawings .objectLipsCrossfadeStage img {
          position:absolute; inset:0; display:block;
          width:100%; height:100%; object-fit:contain;
          /* Smooth, slower crossfade in both directions. */
          transition:opacity var(--lips-switch-duration) var(--lips-switch-easing);
        }
        .objectLipsDrawings.isGraphite .objectLipsGraphiteLayer { opacity:1; }
        .objectLipsDrawings.isGraphite .objectLipsWatercolorLayer { opacity:0; }
        .objectLipsDrawings.isWatercolor .objectLipsGraphiteLayer { opacity:0; }
        .objectLipsDrawings.isWatercolor .objectLipsWatercolorLayer { opacity:1; }
        .objectLipsCrossfadeCaption {
          display:grid; margin-top:30px !important;
        }
        .objectLipsCrossfadeCaption span {
          grid-area:1/1; align-self:start;
          transition:opacity var(--lips-switch-duration) var(--lips-switch-easing);
        }
        .objectLipsDrawings.isGraphite .objectLipsGraphiteCaption { opacity:1; }
        .objectLipsDrawings.isGraphite .objectLipsWatercolorCaption { opacity:0; }
        .objectLipsDrawings.isWatercolor .objectLipsGraphiteCaption { opacity:0; }
        .objectLipsDrawings.isWatercolor .objectLipsWatercolorCaption { opacity:1; }
        .objectLipsBlueprint { width:85%; min-width:0; margin:96px auto 0; }
        .objectMaterialsSection { width:100%; min-width:0; margin:120px auto 0; }
        .objectFinishGrid { width:100%; margin:0 auto; display:grid; grid-template-columns:repeat(4,minmax(0,1fr));
          gap:clamp(3.24px,.486vw,7.29px); min-width:0; align-items:start; }
        .objectFinishCard { margin:0; min-width:0; }
        .objectFinishButton { display:block; position:relative; width:100%; padding:0; margin:0; background:#fff; border:0; cursor:pointer; overflow:visible; }
        .objectFinishStage { display:block; position:relative; width:100%; height:clamp(165px,18.5vw,252px);
          transition:transform .38s cubic-bezier(.22,.61,.36,1); transform-origin:center center; }
        .objectFinishStage img { position:absolute; inset:0; width:100%; height:100%; object-fit:contain;
          display:block; margin:0; transform:none; transition:opacity .4s ease; user-select:none; -webkit-user-drag:none; }
        .objectFinishStage .objectFinishOn { opacity:0; }
        .objectFinishButton:hover .objectFinishStage, .objectFinishButton:focus-visible .objectFinishStage { transform:scale(1.035); }
        .objectFinishButton:hover .objectFinishOn, .objectFinishButton:focus-visible .objectFinishOn { opacity:1; }
        .objectFinishCard figcaption { margin:20px 0 0; text-align:center; font:400 11px/1.6 Arial,sans-serif;
          text-transform:uppercase; letter-spacing:.2em; color:#6f685f; }
        .objectInteriorHoverSection { width:100%; min-width:0; margin:120px auto 0; }
        .objectInteriorHoverStage { width:68%; margin:0 auto; position:relative; overflow:hidden; }
        .objectInteriorHoverStage img { display:block; width:100%; height:auto; object-fit:contain; }
        .objectInteriorHoverOff, .objectInteriorHoverOn { transition:opacity .38s ease; }
        .objectInteriorHoverOn { position:absolute; inset:0; opacity:0; }
        .objectInteriorHoverStage:hover .objectInteriorHoverOn, .objectInteriorHoverStage:focus-within .objectInteriorHoverOn { opacity:1; }
        @media (max-width:720px) {
          .objectProject--sculptural-lips-lighting .objectGallery--lips-light { width:90%; }
          .objectLipsInteractive { width:100%;grid-template-columns:minmax(0,1fr) 70px;
            gap:12px;margin-bottom:66px;transform:translateX(0px); }
          .objectLipsToggle { width:30px;height:57px; }
          .objectLipsToggleDot { top:33px;width:7px;height:14px; }
          .objectLipsToggleDot.isOn { top:9px; }
          .objectLipsControlHint { font-size:8px;white-space:normal; }
          .objectLipsDrawings { width:100%; grid-template-columns:repeat(2,minmax(0,1fr));gap:10px; }
          .objectLipsDrawings > .objectLipsDrawingCard > .objectLipsCrossfadeCaption {
            display: none;
          }
          .objectLipsDrawings > .objectLipsSharedCaption {
            display: grid;
            grid-column: 1 / -1;
            width: 100%;
            min-height: 2em;
            margin: 20px auto 0;
            text-align: center;
            color: #978a77;
            font: 9px/1.5 Arial, sans-serif;
            letter-spacing: .14em;
            text-transform: uppercase;
          }
          .objectLipsSharedCaption span {
            grid-area: 1 / 1;
            text-align: center;
            transition: opacity var(--lips-switch-duration) var(--lips-switch-easing);
          }
          .objectLipsDrawings.isGraphite .objectLipsSharedCaption .objectLipsGraphiteCaption { opacity: 1; }
          .objectLipsDrawings.isGraphite .objectLipsSharedCaption .objectLipsWatercolorCaption { opacity: 0; }
          .objectLipsDrawings.isWatercolor .objectLipsSharedCaption .objectLipsGraphiteCaption { opacity: 0; }
          .objectLipsDrawings.isWatercolor .objectLipsSharedCaption .objectLipsWatercolorCaption { opacity: 1; }
          .objectLipsBlueprint { width:100%; margin-top:54px; }
          .objectMaterialsSection { margin-top:58px; }
          .objectFinishGrid { width:100%; grid-template-columns:repeat(2,minmax(0,1fr)); gap:5.67px; }
          .objectFinishStage { height:212px; }
          .objectFinishCard figcaption { font-size:10px; letter-spacing:.15em; margin-top:14px; }
          .objectInteriorHoverSection { margin-top:58px; }
          .objectInteriorHoverStage { width:80%; }
        }
        @media (prefers-reduced-motion:reduce) {
          .objectLipsStack img,.objectLipsToggleDot,.objectLipsCrossfadeStage img,.objectLipsCrossfadeCaption span,.objectFinishStage,.objectFinishStage img,.objectInteriorHoverOff,.objectInteriorHoverOn { transition:none; }
        }
        @media (max-width: 720px) {
          .objectPortfolio { width: 88vw; }
          .objectIntro { margin-bottom: 78px; }
          .objectProject { margin-bottom: 90px; }
          .objectProjectHeading { margin-bottom: 30px; }
          .objectGallery { width: 90%; gap: 50px; }
          /* Same mobile hero width as Spatial & Retail Design. */
          .objectSingle,
          .objectSingle--wide,
          .objectGallery--serpent .objectHero,
          .objectGallery--drawing .objectDrawingHero { width: min(440px, 84%); }
          .objectGallery--serpent .objectPair,
          .objectGallery--drawing .objectDrawingOptions { width: 100%; }
          /* Preserve project-specific size changes on narrow screens;
             never allow any image to overflow its gallery. */
          .objectProject--sculptural-portrait-vessels .objectSingle--portrait {
            width: min(374px, 71.4%);
          }
          .objectProject--decorative-vessels .objectSingle--wide {
            width: min(686.4px, 100%);
          }
          .objectProject--serpent-display .objectHero {
            width: min(374px, 71.4%);
          }
          .objectProject--serpent-display .objectPair { width: 56%; }
          .objectProject--leaping-fish .objectSingle--portrait,
          .objectProject--school-of-fish .objectSingle--portrait {
            width: min(374px, 71.4%);
          }
          .objectProject--wall-drawing-unit .objectDrawingHero { width: min(495px, 90%); }
          .objectProject--wall-drawing-unit .objectDrawingOptions { width: 64%; }
          .objectPair { grid-template-columns: minmax(0,1fr); gap: 34px; }
          .objectLead, .objectDescription, .objectClosing > p:not(.topicLabel) { font-size: 16px; line-height: 1.75; }
          .objectFigure figcaption { font-size: 9px; }
          .objectClosing { padding-bottom: 100px; }
          .objectLightbox p { bottom: 45px; font-size: 9px; }
        }
        @media (prefers-reduced-motion: reduce) { .objectImageButton img { transition: none; } .objectImageButton:hover img { transform: none; } }
              /* MOBILE NAVIGATION REFINEMENT — never changes desktop header/layout. */
        @media (max-width: 720px) {
          .productObjectPage .hamburger {
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
          .productObjectPage .hamburger span {
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
          .productObjectPage .hamburger span:nth-child(1) { transform: translateY(-11px); }
          .productObjectPage .hamburger span:nth-child(2) { transform: translateY(-3.7px); }
          .productObjectPage .hamburger span:nth-child(3) { transform: translateY(3.7px); }
          .productObjectPage .hamburger span:nth-child(4) { transform: translateY(11px); }
          .productObjectPage .hamburger.isOpen span { background: #e1dbcf; }
          .productObjectPage .hamburger.isOpen span:nth-child(1) { transform: rotate(45deg); }
          .productObjectPage .hamburger.isOpen span:nth-child(2) { transform: scaleX(.55); opacity: 0; }
          .productObjectPage .hamburger.isOpen span:nth-child(3) { transform: scaleX(.55); opacity: 0; }
          .productObjectPage .hamburger.isOpen span:nth-child(4) { transform: rotate(-45deg); }
          .productObjectPage .hamburger:focus-visible {
            outline: 1px solid #9C8664;
            outline-offset: 1px;
          }
          .productObjectPage .mobileOverlay { z-index: 1100; }
          .productObjectPage .mobilePanel {
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
          .productObjectPage .mobilePanel.open { visibility: visible; }
          .productObjectPage .mobileMenuItem {
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
          .productObjectPage .mobileMenuItem:hover,
          .productObjectPage .mobileMenuItem:focus-visible { color: #c9b38c; }
          .productObjectPage .mobileMenuItem.isContact { color: #c9b38c; }
          .productObjectPage .mobileMenuItem:focus-visible,
          .productObjectPage .mobileSubmenuLink:focus-visible {
            outline: 1px solid #c9b38c;
            outline-offset: 4px;
          }
          /* Slow editorial accordion: always mounted, smoothly animates its height. */
          .productObjectPage .mobileMenuItem.hasSubmenu {
            position: relative;
            padding-right: 20px;
          }
          .productObjectPage .mobileMenuItem.hasSubmenu::after {
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
          .productObjectPage .mobileMenuItem.hasSubmenu[aria-expanded="true"]::after {
            transform: translateY(4px) rotate(225deg);
          }
          .productObjectPage .mobileSubmenu {
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
          .productObjectPage .mobileSubmenu.isExpanded {
            grid-template-rows: 1fr;
            opacity: 1;
            margin-top: -18px;
            margin-bottom: 29px;
          }
          .productObjectPage .mobileSubmenuInner {
            min-height: 0;
            overflow: hidden;
          }
          .productObjectPage .mobileSubmenuLink {
            opacity: 0;
            transform: translateY(-8px);
            transition: opacity 580ms ease, transform 680ms cubic-bezier(.22,.61,.36,1), color 250ms ease;
          }
          .productObjectPage .mobileSubmenu.isExpanded .mobileSubmenuLink {
            opacity: 1;
            transform: translateY(0);
          }
          .productObjectPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(2) { transition-delay: 55ms; }
          .productObjectPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(3) { transition-delay: 110ms; }
          .productObjectPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(4) { transition-delay: 165ms; }
          .productObjectPage.isMobileNavigating {
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
          .productObjectPage .hamburger span,
          .productObjectPage .mobilePanel,
          .productObjectPage .mobileSubmenu,
          .productObjectPage .mobileSubmenuLink,
          .productObjectPage .mobileMenuItem.hasSubmenu::after,
          .productObjectPage.isMobileNavigating { transition: none !important; }
        }


        /* MOBILE DRAWER ONLY — 7% wider than the original panel (3% less
           widening than the preceding 10% version). Keep the left edge of
           all menu labels fixed at their previously approved screen position. */
        @media (max-width: 720px) {
          .productObjectPage .mobilePanel {
            width: min(83.46vw, 417.3px);
            padding-left: calc(34px + min(83.46vw, 417.3px) - min(78vw, 390px));
          }
        }

        /* MOBILE ACCORDION GUIDE DOTS — match approved Contact styling.
           Dots are 4px in diameter and shifted another 1px right.
           Compensate clipping without moving menu labels. */
        @media (max-width: 720px) {
          .productObjectPage .mobileSubmenuInner {
            margin-left: -24px;
            padding-left: 24px;
          }
          .productObjectPage .mobileSubmenuLink {
            position: relative;
            width: 100%;
          }
          .productObjectPage .mobileSubmenuLink::before {
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
          .productObjectPage,
          .productObjectPage button,
          .productObjectPage a,
          .productObjectPage [role="button"],
          .productObjectPage input,
          .productObjectPage .carouselStage,
          .productObjectPage .carouselImage,
          .productObjectPage .carouselControls,
          .productObjectPage .carouselArrow,
          .productObjectPage .carouselDot,
          .productObjectPage .mobileMenuItem,
          .productObjectPage .mobileSubmenuLink {
            -webkit-tap-highlight-color: transparent;
          }
          /* The gold :focus-visible outlines above remain available for keyboards. */
        }

        /* Consistent approved Sculpture submenu selection feedback on phones. */
        @media (max-width: 720px) {
          .productObjectPage .mobileSubmenu.isExpanded .mobileSubmenuLink.isSelected {
            color: #fff;
            transform: translateY(0) scale(1.055);
            transform-origin: left center;
            transition: color 140ms ease, transform 140ms ease;
          }
          .productObjectPage .mobileSubmenuLink.isSelected::before {
            width: 6px;
            height: 6px;
            background: #fff;
            transform: translate(-1px, -50%);
          }
          .productObjectPage.isMobileNavigating.hasSubmenuSelection {
            transition-duration: 200ms;
          }
        }

        /* HOME MOBILE RESTORATION — this block MUST follow the late shared
           desktop-header definitions above, which otherwise override the
           original mobile layout despite a narrower media query. */
        @media (max-width: 720px) {
          .productObjectPage .container {
            width: 92vw;
            padding-top: 38px;
          }
          .productObjectPage .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0;
            margin-left: 0;
            margin-bottom: 68px;
            text-align: center;
          }
          .productObjectPage .homeLink {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
          }
          .productObjectPage .homeLink > .logo {
            width: 76px;
            max-width: none;
            height: auto;
            margin-bottom: 26px;
          }
          .productObjectPage .homeLink > .divider,
          .productObjectPage .desktopNav { display: none; }
          .productObjectPage .name {
            font-size: 18px;
            letter-spacing: .18em;
          }
          .productObjectPage .subtitle {
            margin-top: 8px;
            letter-spacing: .26em;
          }
          .productObjectPage .subtitle p {
            margin: 3px 0;
            font-size: 8px;
          }
          /* Exact Home mobile descriptor hierarchy (from supplied Home.jsx). */
          .productObjectPage .subtitle p:first-child {
            font-size: 10px;
            letter-spacing: 0.26em;
          }
          .productObjectPage .subtitle p:nth-child(2) {
            font-size: 7.4px;
            letter-spacing: 0.20em;
          }
          .productObjectPage .footerWrap { display: none; }
          /* Home mobile reference — preserve its header colours and baseline. */
          .productObjectPage .header .brandText { text-align: center; }
          .productObjectPage .header .name { margin: 0; font-weight: 300; line-height: 1; color: #1d1b18; }
          .productObjectPage .header .subtitle { font-family: Arial, sans-serif; color: #6f685f; }
          .productObjectPage .header .homeLink, .productObjectPage .header .homeLink:visited {
            color: inherit; text-decoration: none; -webkit-tap-highlight-color: transparent;
          }
          /* Never let iOS/browser default blue override the Home palette. */
          .productObjectPage .mobilePanel button,
          .productObjectPage .mobilePanel a,
          .productObjectPage .mobilePanel a:visited {
            -webkit-tap-highlight-color: transparent;
            -webkit-appearance: none;
            text-decoration: none;
          }
          .productObjectPage .mobilePanel .mobileMenuItem { color: #d4cec2; }
          .productObjectPage .mobilePanel .mobileMenuItem.isContact { color: #c9b38c; }
          .productObjectPage .mobilePanel .mobileSubmenuLink { color: #e1dbcf; }
          .productObjectPage .mobilePanel .mobileSubmenuLink.isSelected { color: #fff; }
        }

        /* Product & Object Design: Sculpture-approved mobile photo viewport.
           24px side margins, 48px vertical panel padding, 112px height reserve.
           Override the 115% thumbnail-relative inline dimensions ONLY on phones. */
        @media (max-width: 720px) {
          .productObjectPage .objectLightbox {
            padding: 48px 24px;
            box-sizing: border-box;
          }
          .productObjectPage .objectLightbox {
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
          }
          .productObjectPage .objectLightbox img {
            display: block;
            /* Use the actual image box instead of a viewport-sized invisible
               rectangle. The surrounding grey area stays tappable. */
            width: auto !important;
            height: auto !important;
            max-width: calc(100vw - 48px) !important;
            max-height: calc(100vh - 112px) !important;
            max-height: calc(100dvh - 112px) !important;
            object-fit: contain;
            object-position: center;
            margin: 0;
            cursor: default;
          }
          .productObjectPage .objectLightbox p {
            /* Caption must not block taps on the grey backdrop. */
            pointer-events: none;
          }
          .productObjectPage .objectLightboxClose {
            right: max(24px, env(safe-area-inset-right));
          }
          .productObjectPage button, .productObjectPage a,
          .productObjectPage [role="button"], .productObjectPage input {
            -webkit-tap-highlight-color: transparent;
          }
        }

        /* Mobile-only correction: decorative vessels and both lips studies +20%.
           The whole graphite/watercolour crossfade gallery is scaled as a unit,
           preserving image ratios, captions, and the light switch behaviour. */
        @media (max-width: 720px) {
          .productObjectPage .objectProject--decorative-vessels .objectSingle--wide {
            width: 138%;
            max-width: none;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            margin-left: 0;
            margin-right: 0;
          }
          /* Mobile follow-up correction: reduce both graphite and watercolour
             galleries by 10% from the current 138% -> 124.2%. */
          .productObjectPage .objectProject--sculptural-lips-lighting .objectLipsDrawings {
            width: 124.2%;
            max-width: none;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            margin-left: 0;
            margin-right: 0;
          }
        }


        /* Serpent gallery: desktop original layout, mobile Golden Ascent carousel only. */
        .serpentDesktopOnly {
          display: flex; flex-direction: column; gap: clamp(46px, 6vw, 82px);
          width: 100%;
        }
        .serpentMobileOnly { display: none; }
        @media (max-width: 720px) {
          .productObjectPage .serpentDesktopOnly { display: none; }
          .productObjectPage .serpentMobileOnly { display: block; width: 100%; }
          .productObjectPage .serpentMobileCarousel { width: 100%; margin: 0 auto; }
          .productObjectPage .serpentCarouselStage {
            height: clamp(246.1px, 80.5vw, 418.6px);
            display: flex; align-items: center; justify-content: center;
          }
          .productObjectPage .serpentCarouselMain {
            display: flex; align-items: center; justify-content: center;
            width: 100%; height: 100%; padding: 0; border: 0;
            background: transparent; cursor: zoom-in;
          }
          .productObjectPage .serpentCarouselMain img {
            display: block; width: 103.5%; max-width: none; height: 100%;
            object-fit: contain; animation: serpentCarouselFade .44s ease both;
          }
          @keyframes serpentCarouselFade { from { opacity: .12; } to { opacity: 1; } }
          .productObjectPage .serpentCarouselThumbs {
            display: flex; align-items: flex-start; justify-content: center;
            gap: 12px; margin: 34px auto 0; width: 100%; padding: 0;
          }
          .productObjectPage .serpentCarouselThumb {
            display: flex; flex: 0 1 min(29%, 122px); min-width: 0;
            align-items: center; justify-content: center;
            border: 0; padding: 0; background: none; opacity: .78;
            -webkit-tap-highlight-color: transparent;
          }
          .productObjectPage .serpentCarouselThumb img {
            display: block; width: 120%; max-width: none;
            height: clamp(78px, 24vw, 104.4px); object-fit: contain;
            transition: transform .3s ease;
          }
          .productObjectPage .serpentCarouselThumb.isActive { opacity: 1; }
          .productObjectPage .serpentCarouselThumb.isActive img { transform: scale(1.07); }
          .productObjectPage .serpentCarouselRail {
            position: relative; display: block; width: 100%; height: 16px;
            margin: 15px auto 0; touch-action: none; cursor: ew-resize;
            -webkit-tap-highlight-color: transparent;
          }
          .productObjectPage .serpentCarouselLine {
            position: absolute; left: var(--rail-start); width: var(--rail-length);
            top: 50%; height: 1px; background: #9C8664;
            transform: translateY(-50%); pointer-events: none;
          }
          .productObjectPage .serpentCarouselHandle {
            position: absolute; left: var(--handle-x); top: 50%;
            width: 13px; height: 13px; border: 1.5px solid #9C8664;
            border-radius: 50%; background: transparent;
            transform: translate(-50%, -50%);
            transition: left .34s cubic-bezier(.22,.61,.36,1); pointer-events: none;
          }
          .productObjectPage .serpentCarouselHandle.dragging { transition: none; }
          .productObjectPage .serpentCarouselRail:focus-visible {
            outline: 1px solid #9C8664; outline-offset: 5px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .productObjectPage .serpentCarouselMain img { animation: none; }
          .productObjectPage .serpentCarouselThumb img,
          .productObjectPage .serpentCarouselHandle { transition: none; }
        }


        /* MOBILE ONLY — final architectural lips photo and drawing-board sizes.
           Desktop gallery, original hover interactions and layouts are untouched. */
        @media (max-width: 720px) {
          /* The final interior installation photo, directly after the four finishes.
             Previous mobile width was 80%; 20% increase -> 96%. */
          .productObjectPage .objectInteriorHoverStage {
            width: 96%;
            max-width: none;
            margin-left: auto;
            margin-right: auto;
          }
          /* ON fades in during 0–1.00 s and back out during 1.00–2.00 s.
             Both states remain mounted, so there are no abrupt image swaps. */
          .productObjectPage .objectInteriorHoverStage .objectInteriorHoverOn {
            animation: objectInteriorLightPulseMobile 2000ms ease-in-out infinite;
            transition: none;
            will-change: opacity;
          }
          @keyframes objectInteriorLightPulseMobile {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }
          /* 90% -> 108% for hero, and match the second drawing-board photo
             to exactly the same gallery width. Both stay centered. */
          .productObjectPage .objectProject--wall-drawing-unit .objectDrawingHero,
          .productObjectPage .objectProject--wall-drawing-unit .objectDrawingOptions {
            width: 108%;
            max-width: none;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            margin-left: 0;
            margin-right: 0;
          }
        }
        @media (max-width: 720px) and (prefers-reduced-motion: reduce) {
          .productObjectPage .objectInteriorHoverStage .objectInteriorHoverOn {
            animation: none;
            opacity: 0;
            will-change: auto;
          }
        }

        /* MOBILE ONLY — Design Process materials reference: four cropped lamp
           images on ONE row; selected lamp grows 20%, lights, then reveals options.
           Original desktop layout and full-size image sources remain unchanged. */
        @media (max-width: 720px) {
          .productObjectPage .objectFinishGrid {
            width: 100%;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            column-gap: clamp(7px, 2.5vw, 16px);
            row-gap: 8px;
            overflow: visible;
            isolation: isolate;
            padding: 4px 0 12px;
          }
          .productObjectPage .objectFinishCard {
            min-width: 0;
            position: relative;
          }
          .productObjectPage .objectFinishCard:has(.isFinishAnimating) { z-index: 4; }
          .productObjectPage .objectFinishButton,
          .productObjectPage .objectFinishStage { overflow: visible; }
          .productObjectPage .objectFinishStage {
            height: clamp(101.2px, 33vw, 145.2px);
            transform-origin: center center;
            transition: transform 230ms cubic-bezier(.2,.75,.25,1);
          }
          .productObjectPage .objectFinishStage img {
            transform: scale(1.155);
            transition: opacity 200ms ease-in-out;
          }
          .productObjectPage .objectFinishButton.isFinishAnimating .objectFinishStage {
            transform: scale(1.20);
            z-index: 3;
          }
          .productObjectPage .objectFinishCard figcaption {
            font-size: 9px;
            letter-spacing: .12em;
            margin-top: 10px;
            white-space: nowrap;
          }
          .productObjectPage .objectFinishButton.isFinishLit .objectFinishOn {
            opacity: 1;
          }
        }
        @media (max-width: 720px) and (hover: none) {
          .productObjectPage .objectFinishButton:hover .objectFinishOn,
          .productObjectPage .objectFinishButton:focus-visible .objectFinishOn { opacity: 0; }
          .productObjectPage .objectFinishButton.isFinishLit .objectFinishOn { opacity: 1; }
        }
        @media (max-width: 720px) and (prefers-reduced-motion: reduce) {
          .productObjectPage .objectFinishStage,
          .productObjectPage .objectFinishStage img { transition: none; }
        }

        /* PHONE — EXACT DESIGN PROCESS FOUR-FINISH GRID GEOMETRY.
           Design Process has an 88vw section and a final 20px column gap.
           Object Design gallery is 90% of an 88vw portfolio = 79.2vw;
           compensate to match the Design Process screen-edge margins.
           Keep cropped image sources, illumination animation and desktop intact. */
        @media (max-width: 720px) {
          .productObjectPage .objectMaterialsSection {
            width: 111.111111%;
            max-width: none;
            min-width: 0;
            margin-left: -5.5555555%;
            margin-right: -5.5555555%;
          }
          .productObjectPage .objectMaterialsSection .objectFinishGrid {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            column-gap: 20px;
            row-gap: 8px;
            padding: 4px 0 12px;
            overflow: visible;
          }
        }

        /* DESKTOP ONLY — match approved Sculpture & Installations gallery width.
           Narrow central portfolio content by 5%; retain all project layouts and mobile CSS. */
        @media (min-width: 721px) {
          .productObjectPage .pageWrap,
          .productObjectPage .objectPortfolio {
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

      {/* PRODUCT & OBJECT DESIGN — EIGHT DISTINCT PROJECTS */}
      <div className="objectPortfolio">
        <section className="objectIntro">
          <p className="topicLabel">Selected Work</p>
          <h1 className="mainTitle">Product &amp; Object Design</h1>
          <p className="mainRole">Sculptural Objects · Display Concepts · Functional Design</p>
          <p className="objectLead">An exploration of form across decorative vessels, sculptural studies, luxury display concepts and functional objects. Each project is presented as an independent design direction, with attention to proportion, material character and the development of an original visual language.</p>
        </section>

        {objectProjects.map((project, index) => (
          <section className={`objectProject objectProject--${project.id}`} key={project.id} id={project.id}>
            <div className="objectProjectHeading">
              <p className="topicLabel">{String(index + 1).padStart(2, "0")} · Selected Project</p>
              <h2>{project.title}</h2>
              <p className="objectProjectType">{project.category}</p>
              <p className="objectDescription">{project.description}</p>
            </div>
            <div className={`objectGallery objectGallery--${project.layout}`}>
              {project.layout === "lips-light" ? (
                <ObjectLipsLighting project={project} onOpen={setLightboxImage} />
              ) : project.layout === "serpent" ? (
                <>
                  <div className="serpentDesktopOnly">
                    <div className="objectHero">
                      <ObjectFigure image={project.images[0]} onOpen={setLightboxImage} />
                    </div>
                    <ObjectImagePair left={project.images[1]} right={project.images[2]} onOpen={setLightboxImage} />
                  </div>
                  <div className="serpentMobileOnly">
                    <MobileSerpentCarousel images={project.images} onOpen={setLightboxImage} />
                  </div>
                </>
              ) : project.layout === "drawing" ? (
                <>
                  <div className="objectDrawingHero">
                    <ObjectFigure image={project.images[0]} onOpen={setLightboxImage} />
                  </div>
                  <div className="objectDrawingOptions">
                    <ObjectFigure image={project.images[1]} onOpen={setLightboxImage} />
                  </div>
                </>
              ) : (
                <div className={`objectSingle objectSingle--${project.layout}`}>
                  <ObjectFigure image={project.images[0]} onOpen={setLightboxImage} loading={index === 0 ? "eager" : "lazy"} />
                </div>
              )}
            </div>
          </section>
        ))}

        <section className="objectClosing">
          <p className="topicLabel">Creative Practice</p>
          <h2>From Idea to Object</h2>
          <p>From the first sketch to a developed sculptural or functional concept, each project explores how proportion, ornament and material can transform an idea into a distinctive object.</p>
          <button type="button" className="aboutContactLink" onClick={() => go("/contact")}>Discuss a Project</button>
        </section>
      </div>

      {lightboxImage && (
        <div
          className={"objectLightbox" + (lightboxClosing ? " isClosing" : "")}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={handleLightboxBackdropClick}
        >
          <button type="button" className="objectLightboxClose" onClick={(event) => { event.stopPropagation(); closeLightbox(); }} aria-label="Close preview">×</button>
          <img
            src={lightboxImage.src}
            alt={lightboxImage.caption}
            style={{ width: `${Math.round(lightboxImage.previewWidth * 1.15)}px`, height: `${Math.round(lightboxImage.previewHeight * 1.15)}px` }}
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

      {/* =======================================================
          MOBILE BUTTON
      ======================================================= */}

      <button
        type="button"
        className={`hamburger${menuOpen ? " isOpen" : ""}`}
        onClick={() => { setMenuOpen((value) => !value); setMobileDropdown(null); }}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="objects-mobile-navigation"
      >
        <span></span><span></span><span></span><span></span>
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
        id="objects-mobile-navigation"
        className={menuOpen ? "mobilePanel open" : "mobilePanel"}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <button
          type="button" className="mobileMenuItem hasSubmenu"
          aria-expanded={mobileDropdown === "work"}
          aria-controls="objects-work-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "work" ? null : "work")}
        >SELECTED WORK</button>
        <div id="objects-work-submenu"
          className={`mobileSubmenu${mobileDropdown === "work" ? " isExpanded" : ""}`}
          aria-hidden={mobileDropdown !== "work"} inert={mobileDropdown !== "work"}>
          <div className="mobileSubmenuInner">
            {selectedWorkLinks.map((item) => (
              <button key={item.path} type="button"
                className={`mobileSubmenuLink${selectedMobileSubLink === item.path ? " isSelected" : ""}`}
                onClick={() => closeAndNavigate(item.path, true)}>{item.label}</button>
            ))}
          </div>
        </div>
        <button type="button" className="mobileMenuItem" onClick={() => closeAndNavigate("/sculpture")}>SCULPTURE</button>
        <button type="button" className="mobileMenuItem hasSubmenu"
          aria-expanded={mobileDropdown === "jewellery"}
          aria-controls="objects-jewellery-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "jewellery" ? null : "jewellery")}
        >JEWELLERY DESIGN</button>
        <div id="objects-jewellery-submenu"
          className={`mobileSubmenu${mobileDropdown === "jewellery" ? " isExpanded" : ""}`}
          aria-hidden={mobileDropdown !== "jewellery"} inert={mobileDropdown !== "jewellery"}>
          <div className="mobileSubmenuInner">
            {jewelleryLinks.map((item) => (
              <button key={item.path} type="button"
                className={`mobileSubmenuLink${selectedMobileSubLink === item.path ? " isSelected" : ""}`}
                onClick={() => closeAndNavigate(item.path, true)}>{item.label}</button>
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