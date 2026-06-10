import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const works = [
  {
    title: "NOCTURNE",
    description: "Exploring contrast, texture and botanical ornamentation.",
    image: "/nocturne.jpg",
  },
  {
    title: "EQUUS CROWN — CONCEPT EXPLORATION",
    description:
      "Studies in equestrian symbolism, concept development and creative exploration.",
    image: "/equus-concept.jpg",
  },
  {
    title: "EQUUS CROWN",
    description:
      "An exploration of equestrian heritage, architectural balance and ornamental refinement.",
    image: "/equus-crown.jpg",
  },
  {
    title: "SILAGE",
    description:
      "Organic movement translated into sculptural form through lightness, structure and negative space.",
    image: "/silage.jpg",
  },
  {
    title: "VERDELLE",
    description:
      "An exploration of detail, dimension, rhythm and Art Deco elegance.",
    image: "/verdelle.jpg",
  },
  {
    title: "SERAPHINE",
    description: "Floral architecture interpreted through high jewellery design.",
    image: "/seraphine.jpg",
  },
  {
    title: "RIFT",
    description: "Exploring tension, asymmetry, texture and negative space.",
    image: "/rift.jpg",
  },
  {
    title: "UNDA",
    description: "Inspired by the rhythm, movement and elevation of water.",
    image: "/unda.jpg",
  },
  {
    title: "ROSÉE",
    description:
      "An exploration of lightness, fluidity and sculptural gemstone composition.",
    image: "/rosee.jpg",
  },
  {
    title: "LUNA PEARL",
    description:
      "Exploring sculptural form, flowing symmetry, and luminous pearl composition.",
    image: "/luna-pearl.jpg",
  },
  {
    title: "FLORENTINE",
    description:
      "Concept study exploring classical pear-shaped proportions, intricate gallery architecture, and pavé-set detailing.",
    image: "/florentine.jpg",
  },
  {
    title: "BRIDAL",
    description: "Contemporary interpretations of timeless bridal design.",
    image: "/bridal.jpg",
  },
];

const bottomNavItems = [
  "About",
  "Sketches & Design",
  "Process",
  "Jewellery Photo Portfolio",
  "Photography",
  "Awards",
  "Creative Consulting",
  "Contact",
];

export default function SketchesDesign() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const getPath = (item) => {
    switch (item) {
      case "About":
        return "/about";
      case "Sketches & Design":
        return "/sketches-design";
      case "Process":
        return "/process";
      case "Jewellery Photo Portfolio":
      case "Photo Portfolio":
        return "/jewellery-photo-portfolio";
      case "Photography":
        return "/photography";
      case "Awards":
        return "/awards";
      case "Creative Consulting":
        return "/creative-consulting";
      case "Contact":
        return "/contact";
      default:
        return "/";
    }
  };

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="sketchPage">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');

        body { margin: 0; background: #ffffff; }

        .sketchPage {
          min-height: 100vh;
          background: #ffffff;
          color: #1d1b18;
          font-family: "Times New Roman", Georgia, serif;
          overflow-x: hidden;
        }

        .container {
          width: min(1680px, 88vw);
          margin: 0 auto;
          padding: 38px 0 0;
        }

        .header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 22px;
          margin-left: clamp(100px, 7vw, 180px);
          margin-bottom: 120px;
          position: relative;
        }

        .homeLink {
          display: flex;
          align-items: flex-start;
          gap: 22px;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .homeLink:hover { opacity: 0.92; }

        .logo {
          width: 90px;
          height: auto;
          object-fit: contain;
          opacity: 0.82;
          filter: grayscale(100%);
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
          position: relative;
          transition: color 0.45s ease, transform 0.45s ease;
        }

        .desktopNav span:hover,
        .desktopNav .active {
          color: #1d1b18;
          transform: scale(1.04);
        }

        .desktopNav span::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 0;
          height: 1.1px;
          background: currentColor;
          opacity: 0;
          transition: width 0.45s ease, opacity 0.35s ease;
        }

        .desktopNav span:hover::after {
          width: 100%;
          opacity: 0.8;
        }

        .hamburger {
          display: none;
          position: absolute;
          right: 0;
          top: 4px;
          width: 44px;
          height: 30px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .hamburger span {
          display: block;
          width: 54px;
          height: 1px;
          margin-bottom: 8px;
          background: #1d1b18;
        }

        .intro {
          width: min(900px, 86vw);
          margin: 0 auto;
          padding: 0 0 130px;
          text-align: center;
        }

        .introTitle {
          margin: 0 0 28px;
          font-family: Arial, sans-serif;
          font-size: clamp(13px, 1.1vw, 16px);
          letter-spacing: 0.42em;
          text-transform: uppercase;
          font-weight: 400;
          color: #1d1b18;
        }

        .introText {
          margin: 0 auto;
          max-width: 760px;
          font-size: clamp(22px, 2.1vw, 36px);
          line-height: 1.35;
          font-weight: 300;
          color: #3a352f;
        }

        .work {
          width: min(620px, 54vw);
          margin: 0 auto;
          text-align: center;
        }

        .workTitle {
          margin: 0 0 18px;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(22px, 1.6vw, 32px);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 400;
          color: #2a2723;
        }

        .workDescription {
          margin: 0 auto 64px;
          max-width: 620px;
          font-size: clamp(17px, 1.25vw, 22px);
          line-height: 1.5;
          font-weight: 300;
          color: #6c6258;
        }

        .workImage {
          width: 95%;
          height: auto;
          display: block;
          margin: 0 auto;
          object-fit: contain;
          cursor: pointer;
          transition: transform 0.3s ease;
          user-select: none;
          -webkit-user-select: none;
          -webkit-user-drag: none;
        }

        .workImage:hover { transform: scale(1.015); }

        .sectionDivider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin: 80px auto 160px auto;
        }

        .sectionDivider::before,
        .sectionDivider::after {
          content: "";
          width: 140px;
          height: 1px;
          background: rgba(40, 35, 30, 0.18);
        }

        .sectionNumber {
          font-family: "Cormorant Garamond", serif;
          font-size: 22px;
          font-weight: 300;
          letter-spacing: 0.06em;
          color: rgba(40, 35, 30, 0.42);
        }

        .bottomNav {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 0;
          margin-top: 20px;
          padding-bottom: 8px;
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
          transition: color 0.45s ease, transform 0.45s ease;
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
          margin-top: 26px;
          padding-bottom: 42px;
          text-align: center;
          font-family: Arial, sans-serif;
          font-size: clamp(7px, 0.55vw, 9px);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #b9b2a8;
        }

        .imageLightbox {
          position: fixed;
          inset: 0;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(1.5px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 5000;
        }

        .lightboxFrame {
          position: relative;
          max-width: 95vw;
          max-height: 92vh;
          cursor: pointer;
          background: #ffffff;
          box-shadow:
            0 18px 45px rgba(0, 0, 0, 0.18),
            0 4px 14px rgba(0, 0, 0, 0.08);
        }

        .lightboxImage {
          display: block;
          max-width: 92vw;
          max-height: 92vh;
          object-fit: contain;
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
          -webkit-user-drag: none;
        }

        .lightboxClose {
          position: absolute;
          top: 13px;
          right: 18px;
          background: transparent;
          border: none;
          color: #9c9589;
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          box-shadow: none;
          outline: none;
          -webkit-tap-highlight-color: transparent;
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
          box-sizing: border-box;
          border-left: 1px solid rgba(201,179,140,0.18);
        }

        .mobilePanel.open { transform: translateX(0); }

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
          font-family: "Times New Roman", Georgia, serif;
          font-size: clamp(20px, 5.5vw, 30px);
          color: #d4cec2;
          letter-spacing: 0.04em;
          cursor: pointer;
        }

        .mobileMenuItem:hover { color: #c9b38c; }

        .backToTop {
          position: fixed;
          bottom: 36px;
          right: 36px;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(111,104,95,0.32);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(3px);
          color: rgba(111,104,95,0.32);
          font-size: 30px;
          font-weight: 300;
          cursor: pointer;
          z-index: 3000;
          padding: 0;
        }

        .backToTopArrow {
          position: relative;
          top: 3px;
          font-size: 30px;
          line-height: 1;
        }

        .backToTop:hover {
          transform: translateY(-4px);
          color: rgba(111,104,95,0.58);
          border-color: rgba(111,104,95,0.58);
        }

        @media (max-width: 720px) {
          .container {
            width: 92vw;
            padding-top: 38px;
            padding-bottom: 60px;
          }

          .header {
            flex-direction: column;
            align-items: center;
            gap: 0;
            margin-left: 0;
            margin-bottom: 82px;
            text-align: center;
          }

          .homeLink {
            flex-direction: column;
            align-items: center;
            gap: 0;
          }

          .logo {
            width: 68px;
            margin-bottom: 26px;
          }

          .divider { display: none; }

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

          .desktopNav { display: none; }

          .hamburger {
            display: block;
            position: fixed;
            top: 18px;
            right: 18px;
            width: 48px;
            z-index: 1000;
          }

          .hamburger span {
            width: 48px;
            height: 1.5px;
            margin-bottom: 7px;
            background: #1d1b18;
          }

          .intro {
            width: 86vw;
            padding-bottom: 100px;
          }

          .introTitle {
            font-size: 10px;
            letter-spacing: 0.34em;
          }

          .introText {
            font-size: 23px;
            line-height: 1.38;
          }

          .work { width: 88vw; }

          .workTitle {
            font-family: "Cormorant Garamond", serif;
            font-size: 20px;
            letter-spacing: 0.08em;
          }

          .workDescription {
            font-size: 17px;
            margin-bottom: 34px;
          }

          .workImage {
            width: 100%;
            cursor: default;
          }

          .workImage:hover { transform: none; }

          .sectionDivider {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 40px auto 85px auto;
            gap: 18px;
          }

          .sectionDivider::before,
          .sectionDivider::after {
            width: 70px;
          }

          .sectionNumber { font-size: 18px; }

          .backToTop {
            bottom: 24px;
            right: 20px;
            width: 38px;
            height: 38px;
            font-size: 28px;
          }

          .bottomNav,
          .copyright {
            display: none;
          }
        }
      `}</style>

      <div className="container">
        <header className="header">
          <div className="homeLink" onClick={() => navigate("/")}>
            <img src="/ja-logo.png" alt="JA logo" className="logo" />
            <div className="divider"></div>

            <div>
              <h1 className="name">ANDREI JILIAEV</h1>
              <div className="subtitle">
                <p>High Jewellery Designer</p>
                <p>Creative Consultant</p>
              </div>
            </div>
          </div>

          <nav className="desktopNav">
            <span className="active">Sketches & Design</span>
            <span onClick={() => navigate("/process")}>Process</span>
            <span onClick={() => navigate("/jewellery-photo-portfolio")}>
              Jewellery Photo Portfolio
            </span>
          </nav>

          {!menuOpen && (
            <button className="hamburger" onClick={() => setMenuOpen(true)}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}
        </header>

        <section className="intro">
          <h1 className="introTitle">JEWELLERY DESIGN PORTFOLIO</h1>
          <p className="introText">
            A curated collection of original jewellery concepts, design studies
            and finished creations exploring sculptural form, gemstone
            architecture, movement and emotional storytelling.
          </p>
        </section>

        {works.map((work, index) => (
          <div key={work.title}>
            <section className="work">
              <h2 className="workTitle">{work.title}</h2>
              <p className="workDescription">{work.description}</p>
              <img
                src={work.image}
                alt={work.title}
                className="workImage"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onClick={() => {
                  if (window.innerWidth > 720) setSelectedImage(work);
                }}
              />
            </section>

            <div className="sectionDivider">
              <span className="sectionNumber">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}

        <footer className="bottomNav">
          {bottomNavItems.map((item, index) => (
            <div key={item} className="bottomNavItem">
              <span
                className="bottomNavLink"
                onClick={() => navigate(getPath(item))}
              >
                {item}
              </span>
              {index !== bottomNavItems.length - 1 && (
                <div className="navDivider"></div>
              )}
            </div>
          ))}
        </footer>

        <div className="copyright">© ANDREI JILIAEV 2026</div>
      </div>

      {selectedImage && (
        <div className="imageLightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightboxFrame">
            <button
              className="lightboxClose"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="lightboxImage"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              onClick={() => setSelectedImage(null)}
            />
          </div>
        </div>
      )}

      {showBackToTop && (
        <button
          className="backToTop"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="backToTopArrow">↑</span>
        </button>
      )}

      <div
        className={menuOpen ? "mobileOverlay open" : "mobileOverlay"}
        onClick={() => setMenuOpen(false)}
      ></div>

      <aside className={menuOpen ? "mobilePanel open" : "mobilePanel"}>
        <button className="closeMenu" onClick={() => setMenuOpen(false)}>
          ✕
        </button>

        {bottomNavItems.map((item) => (
          <span
            key={item}
            className="mobileMenuItem"
            onClick={() => {
              setMenuOpen(false);
              navigate(getPath(item));
            }}
          >
            {item.toUpperCase()}
          </span>
        ))}
      </aside>
    </main>
  );
}