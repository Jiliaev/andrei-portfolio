import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function Process() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <main className="processPage">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');

        body {
          margin: 0;
          background: #ffffff;
        }

        .processPage {
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
          cursor: pointer;
        }

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
          transition: color 0.45s ease, transform 0.45s ease;
        }

        .desktopNav span:hover,
        .desktopNav .active {
          color: #1d1b18;
          transform: scale(1.04);
        }

        .desktopNav span {
          position: relative;
            cursor: pointer;
            transition: color 0.45s ease;
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
          padding: 0 0 70px;
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

        .stage {
          display: grid;
          grid-template-columns: 330px 680px;
          gap: 45px;
          justify-content: center;
          align-items: center;
          width: min(1280px, 88vw);
          margin: 0 auto;
          padding: 90px 0;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .stage.reverse {
          grid-template-columns: 680px 330px;
        }

        .stage.reverse .stageText {
          order: 2;
        }

        .stage.reverse .stageImage {
          order: 1;
        }

        .stageText {
          max-width: 310px;
          margin-left: 40px;
        }

        .stage.reverse .stageText {
          margin-left: 0;
          margin-right: 40px;
        }

        .stageNumber {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 30px;
          font-size: 32px;
          color: #a88b62;
          font-weight: 300;
        }

        .stageNumber::after {
          content: "";
          width: 42px;
          height: 1px;
          background: rgba(168,139,98,0.48);
        }

        .stageTitle {
          margin: 0 0 22px;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(22px, 1.6vw, 32px);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 400;
          color: #2a2723;
        }

        .stageSubtitle {
          margin: 0 0 18px;
          font-size: 15px;
          color: #2f2a25;
        }

        .stageDescription {
          margin: 0;
          font-family: Arial, sans-serif;
          font-size: 12.5px;
          line-height: 1.85;
          color: #514a42;
        }

        .stageImage {
          width: 70%;
          display: block;
          object-fit: contain;
          margin: 0 auto 30px;
          transform: translateX(-12px);
        }

        .stage.reverse .stageImage {
          transform: translateX(12px);
        }

        .finalImage {
          width: 680px;
          max-width: none;
        }

        .stage:last-of-type {
          border-bottom: none;
          padding-bottom: 125px;
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

          .divider {
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

          .desktopNav {
            display: none;
          }

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
            padding-bottom: 55px;
          }

          .introTitle {
            font-size: 10px;
            letter-spacing: 0.34em;
          }

          .introText {
            font-size: 23px;
            line-height: 1.38;
          }

          .stage,
          .stage.reverse {
            width: 88vw;
            grid-template-columns: 1fr;
            gap: 34px;
            padding: 42px 0;
          }

          .stageText,
          .stage.reverse .stageText {
            max-width: 100%;
            width: 100%;
            text-align: center;
            order: 1;
            margin-left: 0;
            margin-right: 0;
            margin-bottom: 18px;
            box-sizing: border-box;
            overflow-wrap: break-word;
            word-wrap: break-word;
          }

          .stageNumber {
            justify-content: center;
            font-size: 28px;
            margin-top: 18px;
            margin-bottom: 22px;
          }

          .stageTitle {
            margin-bottom: 18px;
            font-size: 24px;
            letter-spacing: 0.18em;
          }

          .stageSubtitle {
            margin-bottom: 18px;
            font-size: 17px;
          }

          .stageDescription {
            max-width: 88vw;
            width: 100%;
            margin: 0 auto;
            padding: 0 12px;
            box-sizing: border-box;
            font-size: 14px;
            line-height: 1.85;
            overflow-wrap: break-word;
            word-wrap: break-word;
          }

          .stageImage,
          .stage.reverse .stageImage {
            order: 2;
            width: 100%;
            max-width: 100%;
            transform: none;
            margin: 0 auto 20px auto;
          }

          .stage.reverse .stageImage.finalImage {
            width: 140%;
            max-width: none;
            transform: translateX(-18%);
          }

          .stage:last-of-type {
            padding-bottom: 75px;
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
            <span onClick={() => navigate("/sketches-design")}>
              Sketches & Design
            </span>

            <span className="active">Process</span>

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
          <h1 className="introTitle">PROCESS</h1>
          <p className="introText">
            Creative services encompassing jewellery design, CAD development,
            wax prototyping and professional jewellery photography. Combining
            artistic vision, technical execution and presentation expertise to
            support projects from concept through final realization.
          </p>
        </section>

        <section className="stage">
          <div className="stageText">
            <div className="stageNumber">01</div>
            <h2 className="stageTitle">DESIGN DEVELOPMENT</h2>
            <p className="stageSubtitle">Concept & Creative Exploration</p>
            <p className="stageDescription">
              Development of original jewellery concepts through hand sketching,
              design exploration and visual storytelling. Early-stage studies
              establish form, proportion, movement and the emotional character of
              the piece.
            </p>
          </div>

          <img
            src="/process-sketches.jpg"
            alt="Design development sketches"
            className="stageImage"
          />
        </section>

        <section className="stage reverse">
          <div className="stageText">
            <div className="stageNumber">02</div>
            <h2 className="stageTitle">CAD DEVELOPMENT</h2>
            <p className="stageSubtitle">Digital Design & Engineering</p>
            <p className="stageDescription">
              Transformation of creative concepts into precise
              three-dimensional CAD models. This stage refines structure, stone
              placement, proportions and technical feasibility while preserving
              the integrity of the original design.
            </p>
          </div>

          <img
            src="/process-cad.jpg"
            alt="CAD development"
            className="stageImage"
          />
        </section>

        <section className="stage">
          <div className="stageText">
            <div className="stageNumber">03</div>
            <h2 className="stageTitle">WAX PROTOTYPING</h2>
            <p className="stageSubtitle">Prototype Evaluation & Refinement</p>
            <p className="stageDescription">
              Physical prototype development used to assess scale, ergonomics,
              construction and visual balance. Wax models allow further
              refinement before production and provide valuable insight into the
              final form.
            </p>
          </div>

          <img
            src="/process-wax.jpg"
            alt="Wax prototyping"
            className="stageImage"
          />
        </section>

        <section className="stage reverse">
          <div className="stageText">
            <div className="stageNumber">04</div>
            <h2 className="stageTitle">JEWELLERY PHOTOGRAPHY</h2>
            <p className="stageSubtitle">Photography & Image Refinement</p>
            <p className="stageDescription">
              Professional jewellery photography and image refinement developed
              to showcase craftsmanship, gemstone architecture and luxury
              presentation. Each image is carefully composed and retouched to
              communicate the design at its highest visual standard.
            </p>
          </div>

          <img
            src="/process-final.jpg"
            alt="Jewellery photography"
            className="stageImage finalImage"
          />
        </section>

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