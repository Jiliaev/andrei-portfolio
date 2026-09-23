import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./Home";
import SketchesDesign from "./SketchesDesign";
import JewelleryPhotoPortfolio from "./JewelleryPhotoPortfolio";
import Process from "./Process";
import About from "./About";
import Contact from "./Contact";
import Awards from "./Awards";
import Photography from "./Photography";
import CreativeConsulting from "./CreativeConsulting";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sketches-design" element={<SketchesDesign />} />
        <Route path="/process" element={<Process />} />
        <Route
          path="/jewellery-photo-portfolio"
          element={<JewelleryPhotoPortfolio />}
        />
        <Route path="/photography" element={<Photography />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/creative-consulting" element={<CreativeConsulting />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}