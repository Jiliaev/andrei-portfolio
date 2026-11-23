import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./Home";
import SketchesDesign from "./SketchesDesign";
import JewelleryPhotoPortfolio from "./JewelleryPhotoPortfolio";
import Process from "./Process";
import DesignProcess from "./design-process";
import About from "./About";
import Contact from "./Contact";
import Awards from "./Awards";
import Photography from "./Photography";
import CreativeConsulting from "./CreativeConsulting";
import JewelleryDesign from "./JewelleryDesign";
import SelectedWork from "./SelectedWork";
import ConceptStudies from "./ConceptStudies";
import SculptureInstallations from "./SculptureInstallations";
import Sculpture from "./Sculpture";
import SpatialRetailDesign from "./SpatialRetailDesign";
import ProductObjectDesign from "./ProductObjectDesign";
import SiteSignature from "./SiteSignature";
import BackToTop from "./BackToTop";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Lightweight site-wide protection. Kept in App.jsx to avoid another import/file.
function SiteContentProtection() {
  useEffect(() => {
    const isImage = (target) =>
      target instanceof Element && Boolean(target.closest("img, picture, svg image"));

    const onImageContextMenu = (event) => {
      if (isImage(event.target)) event.preventDefault();
    };
    const onImageDrag = (event) => {
      if (isImage(event.target)) event.preventDefault();
    };

    document.addEventListener("contextmenu", onImageContextMenu, true);
    document.addEventListener("dragstart", onImageDrag, true);
    return () => {
      document.removeEventListener("contextmenu", onImageContextMenu, true);
      document.removeEventListener("dragstart", onImageDrag, true);
    };
  }, []);

  return (
    <style>{`
      /* Scoped only to the site's content. Inputs and contact links still work. */
      #root main, #root main p, #root main h1, #root main h2,
      #root main h3, #root main h4, #root main h5, #root main h6,
      #root main li, #root main span, #root main figcaption {
        -webkit-user-select: none;
        user-select: none;
      }
      #root input, #root textarea, #root select,
      #root [contenteditable="true"],
      #root a[href^="mailto:"], #root a[href^="tel:"],
      #root .allowTextSelection, #root .allowTextSelection * {
        -webkit-user-select: text !important;
        user-select: text !important;
      }
      #root img { -webkit-user-drag: none; }

      /* Global mobile touch fix: remove the browser's blue tap rectangle.
         Applied inside App.jsx because App.css is not imported here.
         This does not change colours, layout, or existing menu animations. */
      html, body, #root, #root *, #root *::before, #root *::after {
        -webkit-tap-highlight-color: transparent !important;
      }

      /* Remove leftover pointer-focus rings, while preserving visible
         keyboard focus for accessibility. */
      #root :focus:not(:focus-visible) {
        outline: none;
      }
    `}</style>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* One fixed designer signature shared by every page. */}
      <SiteSignature />
      {/* Global return-to-top control matching the Design & Process scroll pill. */}
      <BackToTop />
      <SiteContentProtection />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<SelectedWork />} />
        <Route path="/concept-studies" element={<ConceptStudies />} />
        <Route path="/sculpture" element={<Sculpture />} />
        <Route path="/sculpture-installations" element={<SculptureInstallations />} />
        <Route path="/spatial-retail-design" element={<SpatialRetailDesign />} />
        <Route path="/objects-design" element={<ProductObjectDesign />} />
        <Route path="/sketches-design" element={<SketchesDesign />} />
        <Route path="/process" element={<Process />} />
        <Route path="/design-process" element={<DesignProcess />} />
        <Route path="/jewellery-photo-portfolio" element={<JewelleryPhotoPortfolio />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/jewellery-design" element={<JewelleryDesign />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/creative-consulting" element={<CreativeConsulting />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
