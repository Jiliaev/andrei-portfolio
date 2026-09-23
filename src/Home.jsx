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

export default function Home() {
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
    <main className="homePage">
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

        .homePage {
          width: 100%;
          min-height: 100vh;

          background: #ffffff;

          color: #1d1b18;

          font-family:
            "Times New Roman",
            Georgia,
            serif;

          overflow-x: hidden;

          display: flex;
          flex-direction: column;
        }

        /* =========================================================
           HEADER
        ========================================================= */

        .container {
          width: min(1680px, 88vw);

          margin: 0 auto;

          /* NEW APPROVED DISTANCE FROM TOP EDGE */
          padding: clamp(34px, 4vh, 48px) 0 0;
        }

        .header {
          display: flex;

          align-items: flex-start;
          justify-content: space-between;

          gap: 22px;

          margin-left:
            clamp(100px, 7vw, 180px);

          /* HOME KEEPS ITS OWN VERTICAL RHYTHM */
          margin-bottom:
            clamp(34px, 4.5vh, 68px);

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

        /* =========================================================
           HERO
        ========================================================= */

        .hero {
          width: min(1220px, 84vw);

          margin:
            0 auto
            clamp(24px, 3.5vh, 48px);

          display: grid;

          grid-template-columns:
            minmax(390px, 0.96fr)
            minmax(400px, 1.04fr);

          gap:
            clamp(50px, 6vw, 110px);

          align-items: center;

          flex: 1 0 auto;
        }

        .artworkWrap {
          width: 100%;

          display: flex;

          align-items: center;
          justify-content: center;
        }

        .heroImage {
          width: auto;

          max-width: 115%;

          max-height:
            min(64vh, 645px);

          height: auto;

          display: block;

          margin: 0 auto;
        }

        .heroContent {
          width: 100%;

          max-width: 610px;

          padding-top: 4px;
        }

        .eyebrow {
          margin: 0 0 18px;

          font-family:
            Arial, sans-serif;

          font-size: 11px;

          letter-spacing: 0.38em;

          text-transform: uppercase;

          color: #9C8664;
        }

        .smallLine {
          width: 62px;
          height: 1px;

          margin-bottom:
            clamp(20px, 2.5vh, 28px);

          background: #9C8664;

          opacity: 0.55;
        }

        .heroTitle {
          margin:
            0 0
            clamp(16px, 2vh, 22px);

          font-family:
            "Cormorant Garamond",
            serif;

          font-size:
            clamp(46px, 4.05vw, 68px);

          line-height: 0.98;

          font-weight: 400;

          letter-spacing: -0.01em;

          color: #1d1b18;
        }

        .disciplineLine {
          margin:
            0 0
            clamp(36px, 5vh, 60px);

          font-family:
            "Cormorant Garamond",
            serif;

          font-size:
            clamp(18px, 1.45vw, 24px);

          line-height: 1.5;

          letter-spacing: 0.025em;

          color: #6C6258;
        }

        .featuredLabel {
          margin: 0 0 16px;

          font-family:
            Arial, sans-serif;

          font-size: 11px;

          letter-spacing: 0.38em;

          text-transform: uppercase;

          color: #9C8664;
        }

        .featuredTitle {
          margin: 0 0 12px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size:
            clamp(29px, 2.35vw, 40px);

          line-height: 1.12;

          font-weight: 400;

          color: #2A2723;
        }

        .featuredText {
          margin:
            0 0
            clamp(22px, 3vh, 30px);

          max-width: 500px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 19px;

          line-height: 1.55;

          letter-spacing: 0.025em;

          color: #6C6258;
        }

        /* =========================================================
           CTA
        ========================================================= */

        .exploreButton {
          display: inline-flex;

          align-items: center;
          justify-content: center;

          gap: 26px;

          min-width: 330px;

          padding: 16px 26px;

          background: #C8B08A;

          border:
            1px solid #C8B08A;

          color: #FFFDF8;

          font-family:
            Arial, sans-serif;

          font-size: 11.5px;

          letter-spacing: 0.23em;

          text-transform: uppercase;

          cursor: pointer;

          transition:
            color 0.35s ease,
            border-color 0.35s ease,
            background-color 0.35s ease;
        }

        .exploreButton:hover,
        .exploreButton:focus,
        .exploreButton:active {
          background: #ffffff;

          border-color: #C8B08A;

          color: #9C8664;

          outline: none;
        }

        .arrow {
          display: inline-block;

          font-size: 16px;

          line-height: 1;

          letter-spacing: 0;

          transition:
            transform 0.35s ease;
        }

        .exploreButton:hover .arrow {
          transform:
            translateX(5px);
        }

        /* =========================================================
           FOOTER
        ========================================================= */

        .footerWrap {
          width: min(1680px, 88vw);

          margin: auto auto 0;

          padding-bottom:
            clamp(14px, 2vh, 28px);

          flex-shrink: 0;
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

        /* =========================================================
           COMPACT DESKTOP
        ========================================================= */

        @media (min-width: 721px) and (max-height: 900px) {

          .container {
            /* WAS 20px — NOW 38px */
            padding-top: 38px;
          }

          .header {
            /* HOME VALUE PRESERVED */
            margin-bottom: 30px;
          }

          .logo {
            width: 82px;
          }

          .divider {
            height: 58px;
          }

          .hero {
            margin-bottom: 18px;

            gap:
              clamp(45px, 5.5vw, 95px);
          }

          .heroImage {
            max-height: 60vh;

            max-width: 115%;
          }

          .eyebrow {
            margin-bottom: 14px;
          }

          .smallLine {
            margin-bottom: 20px;
          }

          .heroTitle {
            font-size:
              clamp(43px, 3.7vw, 61px);

            margin-bottom: 15px;
          }

          .disciplineLine {
            font-size:
              clamp(17px, 1.35vw, 22px);

            margin-bottom: 34px;
          }

          .featuredLabel {
            margin-bottom: 13px;
          }

          .featuredTitle {
            font-size:
              clamp(27px, 2.15vw, 36px);

            margin-bottom: 10px;
          }

          .featuredText {
            font-size: 17px;

            line-height: 1.48;

            margin-bottom: 20px;
          }

          .exploreButton {
            padding-top: 14px;

            padding-bottom: 14px;
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
            /* WAS 15px — NOW 28px */
            padding-top: 28px;
          }

          .header {
            /* HOME VALUE PRESERVED */
            margin-bottom: 20px;
          }

          .logo {
            width: 74px;
          }

          .hero {
            margin-bottom: 14px;
          }

          .heroImage {
            max-height: 56vh;
          }

          .disciplineLine {
            margin-bottom: 26px;
          }

          .featuredText {
            margin-bottom: 16px;
          }

          .footerLine {
            margin-bottom: 13px;
          }
        }

        /* =========================================================
           MOBILE
        ========================================================= */

        @media (max-width: 720px) {

          .homePage {
            display: block;

            min-height: auto;
          }

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

            margin-bottom: 58px;

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

          .hero {
            width: 88vw;

            grid-template-columns: 1fr;

            gap: 60px;

            margin-bottom: 84px;
          }

          .artworkWrap {
            width: 100%;
          }

          .heroImage {
            width: 100%;

            max-width: 620px;

            max-height: none;
          }

          .heroContent {
            max-width: 100%;

            text-align: left;
          }

          .heroTitle {
            font-size: 46px;

            line-height: 1;
          }

          .disciplineLine {
            font-size: 19px;

            margin-bottom: 52px;
          }

          .featuredTitle {
            font-size: 32px;
          }

          .featuredText {
            font-size: 18px;
          }

          .exploreButton {
            min-width: 0;

            width: 100%;
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

            <span
              onClick={() =>
                navigate("/process")
              }
            >
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

      </div>

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
          HERO
      ======================================================= */}

      <section className="hero">

        <div className="artworkWrap">

          <img
            src="/jewelled-birds-home-hero.jpg"
            alt="Jewelled Birds concept study"
            className="heroImage"
          />

        </div>

        <div className="heroContent">

          <p className="eyebrow">
            Selected Work
          </p>

          <div className="smallLine"></div>

          <h2 className="heroTitle">
            Design, Art &amp;
            <br />
            Creative Direction
          </h2>

          <p className="disciplineLine">
            Jewellery · Sculpture · Illustration ·
            CAD/CAM · Photography
          </p>

          <p className="featuredLabel">
            Featured Series
          </p>

          <h3 className="featuredTitle">
            Jewelled Birds — Concept Studies
          </h3>

          <p className="featuredText">
            Hand-rendered explorations of form,
            colour, ornament and sculptural detail.
          </p>

          <button
            className="exploreButton"

            onClick={() =>
              navigate("/sketches-design")
            }
          >

            <span>
              Explore the Portfolio
            </span>

            <span className="arrow">
              ⟶
            </span>

          </button>

        </div>

      </section>

      {/* =======================================================
          FOOTER
      ======================================================= */}

      <footer className="footerWrap">

        <div className="footerLine"></div>

        <div className="bottomNav">

          {bottomNavItems.map(
            (item, index) => (

              <div
                key={item}
                className="bottomNavItem"
              >

                <span
                  className="bottomNavLink"

                  onClick={() =>
                    navigate(
                      getPath(item)
                    )
                  }
                >
                  {item}
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

        {bottomNavItems.map(
          (item) => (

            <span
              key={item}

              className="mobileMenuItem"

              onClick={() => {
                setMenuOpen(false);

                navigate(
                  getPath(item)
                );
              }}
            >
              {item.toUpperCase()}
            </span>

          )
        )}

      </aside>

    </main>
  );
}