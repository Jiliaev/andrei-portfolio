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
      case "Design Direction":
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

        .processPage {
          min-height: 100vh;

          background: #ffffff;

          color: #1d1b18;

          font-family:
            "Times New Roman",
            Georgia,
            serif;

          overflow-x: hidden;
        }

        /* =========================================================
           HEADER
        ========================================================= */

        .container {
          width: min(1680px, 88vw);

          margin: 0 auto;

          /* SAME NEW TOP SPACING AS SKETCHES & DESIGN */
          padding: clamp(34px, 4vh, 48px) 0 0;
        }

        .header {
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

        .homeLink {
          display: flex;

          align-items: flex-start;

          gap: 22px;

          cursor: pointer;

          color: inherit;

          text-decoration: none;

          -webkit-tap-highlight-color:
            transparent;
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

          background:
            rgba(70, 65, 58, 0.22);

          margin-top: 4px;
        }

        .name {
          margin: 0;

          font-size:
            clamp(24px, 2vw, 34px);

          font-weight: 300;

          letter-spacing: 0.22em;

          line-height: 1;

          color: #1d1b18;
        }

        .subtitle {
          margin-top: 12px;

          font-family:
            Arial, sans-serif;

          letter-spacing: 0.28em;

          color: #6f685f;
        }

        .subtitle p {
          margin: 4px 0;

          font-size:
            clamp(10px, 0.85vw, 13px);
        }

        .desktopNav {
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

        .desktopNav .active {
          color: #1d1b18;
        }

        /* =========================================================
           PAGE INTRO
        ========================================================= */

        .intro {
          width: min(900px, 86vw);

          margin: 0 auto;

          padding: 0 0 76px;

          text-align: center;
        }

        .topicLabel {
          display: inline-block;

          margin: 0 0 22px;

          padding-left: 0.38em;

          font-family:
            Arial, sans-serif;

          font-size: 13px;

          line-height: 1.1;

          letter-spacing: 0.38em;

          text-transform: uppercase;

          font-weight: 400;

          color: #9C8664;

          text-align: center;
        }

        .mainTitle {
          margin: 0 0 34px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size:
            clamp(30px, 2.45vw, 44px);

          line-height: 1.12;

          letter-spacing: 0.14em;

          text-transform: uppercase;

          font-weight: 400;

          color: #2A2723;
        }

        .introText {
          margin: 0 auto;

          max-width: 760px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size:
            clamp(22px, 2.05vw, 35px);

          line-height: 1.35;

          font-weight: 300;

          color: #3a352f;
        }

        /* =========================================================
           PROCESS STAGES
        ========================================================= */

        .stage {
          display: grid;

          grid-template-columns:
            330px minmax(500px, 680px);

          gap: 45px;

          justify-content: center;

          align-items: center;

          width: min(1180px, 86vw);

          margin: 0 auto;

          padding: 76px 0;

          border-bottom:
            1px solid rgba(0, 0, 0, 0.08);
        }

        .stage.reverse {
          grid-template-columns:
            minmax(500px, 680px) 330px;
        }

        .stage.reverse .stageText {
          order: 2;
        }

        .stage.reverse .stageImage {
          order: 1;
        }

        .stageText {
          max-width: 310px;

          margin-left: 32px;
        }

        .stage.reverse .stageText {
          margin-left: 0;

          margin-right: 32px;
        }

        .stageNumber {
          display: flex;

          align-items: center;

          gap: 18px;

          margin-bottom: 26px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 30px;

          color: #9C8664;

          font-weight: 300;
        }

        .stageNumber::after {
          content: "";

          width: 42px;

          height: 1px;

          background:
            rgba(156, 134, 100, 0.48);
        }

        .stageTitle {
          margin: 0 0 20px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size:
            clamp(22px, 1.6vw, 32px);

          line-height: 1.15;

          letter-spacing: 0.12em;

          text-transform: uppercase;

          font-weight: 400;

          color: #2a2723;
        }

        .stageSubtitle {
          margin: 0 0 18px;

          font-family:
            "Times New Roman",
            Georgia,
            serif;

          font-size: 15px;

          line-height: 1.45;

          color: #2f2a25;
        }

        .stageDescription {
          margin: 0;

          font-family:
            Arial,
            sans-serif;

          font-size: 12.5px;

          line-height: 1.85;

          color: #514a42;
        }

        .stageImage {
          width: 70%;

          height: auto;

          display: block;

          object-fit: contain;

          margin: 0 auto 30px;

          transform:
            translateX(-12px);
        }

        .stage.reverse .stageImage {
          transform:
            translateX(12px);
        }

        .finalImage {
          width: 680px;

          max-width: 100%;
        }

        .stage:last-of-type {
          border-bottom: none;

          padding-bottom: 105px;
        }

        /* =========================================================
           FOOTER
        ========================================================= */

        .footerWrap {
          width: min(1680px, 88vw);

          margin: 0 auto;

          padding-bottom:
            clamp(14px, 2vh, 28px);
        }

        .footerLine {
          width: 100%;

          height: 1px;

          background:
            rgba(0, 0, 0, 0.08);

          margin-bottom: 20px;
        }

        .bottomNav {
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

          height:
            clamp(10px, 0.9vw, 14px);

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

          font-family:
            Arial, sans-serif;

          font-size:
            clamp(7px, 0.55vw, 9px);

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

          backdrop-filter:
            blur(2px);

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
            /* SAME NEW POSITION AS SKETCHES & DESIGN */
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

          .intro {
            padding-bottom: 62px;
          }

          .stage {
            width: min(1100px, 84vw);

            grid-template-columns:
              300px minmax(460px, 620px);

            gap: 38px;

            padding: 62px 0;
          }

          .stage.reverse {
            grid-template-columns:
              minmax(460px, 620px) 300px;
          }

          .stageText {
            max-width: 290px;

            margin-left: 22px;
          }

          .stage.reverse .stageText {
            margin-left: 0;

            margin-right: 22px;
          }

          .stageNumber {
            font-size: 28px;

            margin-bottom: 24px;
          }

          .stageTitle {
            margin-bottom: 17px;
          }

          .stageDescription {
            font-size: 12px;

            line-height: 1.78;
          }

          .stageImage {
            width: 66%;
          }

          .finalImage {
            width: 590px;
          }

          .stage:last-of-type {
            padding-bottom: 82px;
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

          .intro {
            padding-bottom: 52px;
          }

          .stage {
            padding: 52px 0;
          }

          .stageImage {
            width: 62%;
          }

          .finalImage {
            width: 550px;
          }

          .stage:last-of-type {
            padding-bottom: 75px;
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

          .intro {
            width: 86vw;

            padding-bottom: 55px;
          }

          .topicLabel {
            font-size: 12px;

            letter-spacing: 0.34em;

            padding-left: 0.34em;
          }

          .mainTitle {
            font-size: 28px;

            letter-spacing: 0.11em;

            line-height: 1.12;
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

            overflow-wrap:
              break-word;

            word-wrap:
              break-word;
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

            font-size: 14px;

            line-height: 1.85;

            overflow-wrap:
              break-word;

            word-wrap:
              break-word;
          }

          .stageImage,
          .stage.reverse .stageImage {
            order: 2;

            width: 100%;

            max-width: 100%;

            transform: none;

            margin:
              0 auto 20px;
          }

          .stage.reverse .stageImage.finalImage {
            width: 140%;

            max-width: none;

            transform:
              translateX(-18%);
          }

          .stage:last-of-type {
            padding-bottom: 75px;
          }

          .footerWrap {
            display: none;
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
            onClick={() => navigate("/")}
          >

            <img
              src="/ja-logo-gold.png"
              alt="JA logo"
              className="logo"
            />

            <div className="divider"></div>

            <div>

              <h1 className="name">
                ANDREI JILIAEV
              </h1>

              <div className="subtitle">
                <p>High Jewellery Designer</p>
                <p>Creative Consultant</p>
              </div>

            </div>

          </div>

          <nav className="desktopNav">

            <span
              onClick={() =>
                navigate("/sketches-design")
              }
            >
              Sketches & Design
            </span>

            <span className="active">
              Process
            </span>

            <span
              onClick={() =>
                navigate(
                  "/jewellery-photo-portfolio"
                )
              }
            >
              Jewellery Photo Portfolio
            </span>

          </nav>

        </header>

        {/* =====================================================
            INTRO
        ===================================================== */}

        <section className="intro">

          <p className="topicLabel">
            Process
          </p>

          <h1 className="mainTitle">
            From Concept Through Final Realization
          </h1>

          <p className="introText">
            Creative services encompassing jewellery design,
            CAD development, wax prototyping and professional
            jewellery photography. Combining artistic vision,
            technical execution and presentation expertise.
          </p>

        </section>

        {/* =====================================================
            01 DESIGN DEVELOPMENT
        ===================================================== */}

        <section className="stage">

          <div className="stageText">

            <div className="stageNumber">
              01
            </div>

            <h2 className="stageTitle">
              Design Development
            </h2>

            <p className="stageSubtitle">
              Concept & Creative Exploration
            </p>

            <p className="stageDescription">
              Development of original jewellery concepts
              through hand sketching, design exploration
              and visual storytelling. Early-stage studies
              establish form, proportion, movement and the
              emotional character of the piece.
            </p>

          </div>

          <img
            src="/process-sketches.jpg"
            alt="Design development sketches"
            className="stageImage"
          />

        </section>

        {/* =====================================================
            02 CAD DEVELOPMENT
        ===================================================== */}

        <section className="stage reverse">

          <div className="stageText">

            <div className="stageNumber">
              02
            </div>

            <h2 className="stageTitle">
              CAD Development
            </h2>

            <p className="stageSubtitle">
              Digital Design & Engineering
            </p>

            <p className="stageDescription">
              Transformation of creative concepts into
              precise three-dimensional CAD models. This
              stage refines structure, stone placement,
              proportions and technical feasibility while
              preserving the integrity of the original
              design.
            </p>

          </div>

          <img
            src="/process-cad.jpg"
            alt="CAD development"
            className="stageImage"
          />

        </section>

        {/* =====================================================
            03 WAX PROTOTYPING
        ===================================================== */}

        <section className="stage">

          <div className="stageText">

            <div className="stageNumber">
              03
            </div>

            <h2 className="stageTitle">
              Wax Prototyping
            </h2>

            <p className="stageSubtitle">
              Prototype Evaluation & Refinement
            </p>

            <p className="stageDescription">
              Physical prototype development used to
              assess scale, ergonomics, construction and
              visual balance. Wax models allow further
              refinement before production and provide
              valuable insight into the final form.
            </p>

          </div>

          <img
            src="/process-wax.jpg"
            alt="Wax prototyping"
            className="stageImage"
          />

        </section>

        {/* =====================================================
            04 JEWELLERY PHOTOGRAPHY
        ===================================================== */}

        <section className="stage reverse">

          <div className="stageText">

            <div className="stageNumber">
              04
            </div>

            <h2 className="stageTitle">
              Jewellery Photography
            </h2>

            <p className="stageSubtitle">
              Photography & Image Refinement
            </p>

            <p className="stageDescription">
              Professional jewellery photography and image
              refinement developed to showcase craftsmanship,
              gemstone architecture and luxury presentation.
              Each image is carefully composed and retouched
              to communicate the design at its highest visual
              standard.
            </p>

          </div>

          <img
            src="/process-final.jpg"
            alt="Jewellery photography"
            className="stageImage finalImage"
          />

        </section>

      </div>

      {/* =======================================================
          FOOTER
      ======================================================= */}

      <footer className="footerWrap">

        <div className="footerLine"></div>

        <div className="bottomNav">

          {bottomNavItems.map((item, index) => (

            <div
              key={item}
              className="bottomNavItem"
            >

              <span
                className="bottomNavLink"

                onClick={() =>
                  navigate(getPath(item))
                }
              >
                {item}
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

      {!menuOpen && (

        <button
          className="hamburger"

          onClick={() =>
            setMenuOpen(true)
          }
        >

          <span></span>
          <span></span>
          <span></span>
          <span></span>

        </button>

      )}

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
        className={
          menuOpen
            ? "mobilePanel open"
            : "mobilePanel"
        }
      >

        <button
          className="closeMenu"

          onClick={() =>
            setMenuOpen(false)
          }
        >
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