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

export default function CreativeConsulting() {
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
    <main className="consultingPage">
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

        .consultingPage {
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

          /* SAME APPROVED TOP POSITION */
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
           INTRO
        ========================================================= */

        .pageWrap {
          width: min(1180px, 86vw);

          margin: 0 auto;

          text-align: center;
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
        .sectionTitle {
          margin: 0 0 34px;

          font-family: "Cormorant Garamond", serif;

          font-size: clamp(30px, 2.45vw, 44px);

          line-height: 1.12;

          letter-spacing: 0.14em;

          text-transform: uppercase;

          font-weight: 400;

          color: #2A2723;
        }

        .subTitle {
          margin: 0 auto 64px;

          font-family: Arial, sans-serif;

          font-size: 11px;

          line-height: 1.7;

          letter-spacing: 0.28em;

          text-transform: uppercase;

          color: #6f685f;
        }

        .heroImage {
          width: min(520px, 55vw);
          height: auto;

          display: block;

          margin: 0 auto 92px;

          object-fit: contain;
        }

        .introText {
          max-width: 850px;

          margin: 0 auto 104px;

          font-size: 16px;

          line-height: 1.84;

          color: #3F3933;

          font-weight: 300;
        }

        .introText p {
          margin: 0 auto 20px;
        }

        /* =========================================================
           OPPORTUNITIES
        ========================================================= */

        .opportunitiesSection {
          width: min(860px, 84vw);

          margin: 0 auto 104px;

          text-align: center;
        }

        .opportunitiesSection p {
          margin: 0 auto 20px;

          font-size: 16px;

          line-height: 1.84;

          color: #3F3933;

          font-weight: 300;
        }

        .opportunityStatement {
          color: #6C6258 !important;
        }

        /* =========================================================
           HORIZONTAL DIVIDER
        ========================================================= */

        .horizontalLine {
          width: min(1680px, 88vw);

          height: 1px;

          background: rgba(0, 0, 0, 0.08);

          margin: 0 auto 96px;
        }

        /* =========================================================
           CONTRIBUTION
        ========================================================= */

        .contributionSection {
          width: min(1080px, 86vw);

          margin: 0 auto 104px;

          text-align: center;
        }

        .contributionGrid {
          display: grid;

          grid-template-columns: repeat(4, 1fr);

          gap: 0;

          margin-top: 66px;
        }

        .contributionCard {
          padding: 0 30px;

          border-right:
            1px solid rgba(70, 65, 58, 0.14);
        }

        .contributionCard:last-child {
          border-right: none;
        }

        .contributionCard h3 {
          margin: 0 0 20px;

          font-family: Arial, sans-serif;

          font-size: 10px;

          letter-spacing: 0.26em;

          text-transform: uppercase;

          font-weight: 400;

          color: #1d1b18;
        }

        .contributionCard p {
          margin: 0;

          font-size: 14px;

          line-height: 1.75;

          color: #3F3933;

          font-weight: 300;
        }

        /* =========================================================
           PERSPECTIVE / SCOPE
        ========================================================= */

        .perspectiveSection,
        .scopeSection {
          width: min(880px, 84vw);

          margin: 0 auto 104px;

          text-align: center;
        }

        .perspectiveSection p,
        .scopeSection p {
          margin: 0 auto 20px;

          font-size: 16px;

          line-height: 1.84;

          color: #3F3933;

          font-weight: 300;
        }

        .finalSection {
          margin-bottom: 130px;
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

          background: rgba(111, 104, 95, 0.25);

          margin-left: clamp(4px, 0.7vw, 12px);

          margin-right: clamp(4px, 0.7vw, 12px);
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

          border-left:
            1px solid rgba(201, 179, 140, 0.18);
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

          font-size: clamp(20px, 5.5vw, 30px);

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
            /* SAME APPROVED POSITION */
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

          .subTitle {
            margin-bottom: 54px;
          }

          .heroImage {
            width: min(490px, 54vw);

            margin-bottom: 78px;
          }

          .introText {
            margin-bottom: 88px;
          }

          .opportunitiesSection,
          .contributionSection,
          .perspectiveSection,
          .scopeSection {
            margin-bottom: 88px;
          }

          .horizontalLine {
            margin-bottom: 82px;
          }

          .contributionGrid {
            margin-top: 56px;
          }

          .finalSection {
            margin-bottom: 105px;
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
            /* SAME VERY-SHORT POSITION */
            padding-top: 28px;
          }

          .header {
            margin-bottom: 82px;
          }

          .logo {
            width: 74px;
          }

          .subTitle {
            margin-bottom: 48px;
          }

          .heroImage {
            width: min(460px, 52vw);

            margin-bottom: 70px;
          }

          .introText {
            margin-bottom: 80px;
          }

          .opportunitiesSection,
          .contributionSection,
          .perspectiveSection,
          .scopeSection {
            margin-bottom: 80px;
          }

          .horizontalLine {
            margin-bottom: 74px;
          }

          .contributionGrid {
            margin-top: 50px;
          }

          .finalSection {
            margin-bottom: 94px;
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

          .pageWrap {
            width: 88vw;
          }

          .topicLabel {
            font-size: 12px;

            letter-spacing: 0.34em;

            padding-left: 0.34em;
          }

          .mainTitle,
          .sectionTitle {
            font-size: 28px;

            letter-spacing: 0.11em;

            line-height: 1.12;
          }

          .subTitle {
            width: 88vw;

            margin-bottom: 46px;

            font-size: 9px;

            letter-spacing: 0.22em;

            line-height: 1.8;
          }

          .heroImage {
            width: 108vw;

            transform: translateX(-10vw);

            margin-bottom: 66px;
          }

          .introText,
          .perspectiveSection p,
          .scopeSection p,
          .opportunitiesSection p {
            font-size: 16px;

            line-height: 1.75;
          }

          .introText {
            width: 88vw;

            margin-bottom: 86px;
          }

          .opportunitiesSection {
            width: 88vw;

            margin-bottom: 70px;
          }

          .contributionSection {
            width: 88vw;

            margin-bottom: 70px;
          }

          .contributionGrid {
            grid-template-columns: 1fr;

            gap: 46px;

            margin-top: 54px;
          }

          .contributionCard {
            border-right: none;

            padding: 0;
          }

          .contributionCard:not(:last-child)::after {
            content: "";

            display: block;

            width: 42px;
            height: 1px;

            background: #9C8664;

            opacity: 0.45;

            margin: 22px auto 0;
          }

          .perspectiveSection,
          .scopeSection {
            width: 88vw;

            margin-bottom: 70px;
          }

          .horizontalLine {
            margin-bottom: 70px;
          }

          .finalSection {
            margin-bottom: 112px;
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
          INTRO
      ======================================================= */}

      <section className="pageWrap">

        <p className="topicLabel">
          Creative Consulting
        </p>

        <h1 className="mainTitle">
          Creative Consulting & Collection Development
        </h1>

        <p className="subTitle">
          Collection Development • Creative Direction •
          CAD/CAM Development • Jewellery Photography
        </p>

        <img
          src="/creative-consulting.jpg"
          alt="Creative consulting and jewellery collection development"
          className="heroImage"
        />

        <div className="introText">

          <p>
            Bringing together jewellery design, collection
            development, CAD/CAM development, prototyping,
            jewellery photography and luxury presentation, I
            collaborate with brands, manufacturers and private
            clients to transform ideas into distinctive
            products and meaningful collections.
          </p>

          <p>
            My experience spans concept creation, design
            refinement, technical development and visual
            presentation, providing a comprehensive
            understanding of the creative process from initial
            idea through final realization.
          </p>

        </div>

      </section>

      {/* =======================================================
          OPPORTUNITIES
      ======================================================= */}

      <section className="opportunitiesSection">

        <p className="topicLabel">
          Opportunities
        </p>

        <h2 className="sectionTitle">
          Creative Opportunities
        </h2>

        <p>
          I am available for full-time positions, long-term
          creative collaborations, collection development
          projects and selected consulting engagements.
        </p>

        <p>
          Whether joining an organization as part of an
          internal design team, supporting a project-based
          initiative or providing creative consulting, my
          objective is to help transform ideas into successful
          products, collections and visual presentations.
        </p>

        <p className="opportunityStatement">
          Opportunities may range from the development of a
          single bespoke jewel to complete collections,
          signature product lines, creative direction, CAD/CAM
          development, technical design support and
          professional jewellery photography.
        </p>

      </section>

      <div className="horizontalLine"></div>

      {/* =======================================================
          CONTRIBUTION
      ======================================================= */}

      <section className="contributionSection">

        <p className="topicLabel">
          Contribution
        </p>

        <h2 className="sectionTitle">
          Areas Of Contribution
        </h2>

        <div className="contributionGrid">

          <div className="contributionCard">

            <h3>
              Collection Development
            </h3>

            <p>
              Development of original jewellery collections,
              signature product lines and design concepts
              that balance creative vision, commercial
              awareness and long-term brand identity.
            </p>

          </div>

          <div className="contributionCard">

            <h3>
              Creative Direction
            </h3>

            <p>
              Defining visual language, design consistency
              and artistic direction while helping translate
              concepts into cohesive products and meaningful
              customer experiences.
            </p>

          </div>

          <div className="contributionCard">

            <h3>
              Design Development
            </h3>

            <p>
              Concept sketching, hand rendering, CAD/CAM
              development and technical refinement focused on
              preserving artistic intent while supporting
              successful execution.
            </p>

          </div>

          <div className="contributionCard">

            <h3>
              Jewellery Photography
            </h3>

            <p>
              Professional jewellery photography and image
              refinement developed to communicate
              craftsmanship, gemstone architecture and luxury
              presentation at the highest visual standard.
            </p>

          </div>

        </div>

      </section>

      <div className="horizontalLine"></div>

      {/* =======================================================
          PERSPECTIVE
      ======================================================= */}

      <section className="perspectiveSection">

        <p className="topicLabel">
          Perspective
        </p>

        <h2 className="sectionTitle">
          A Multidisciplinary Perspective
        </h2>

        <p>
          Few professionals possess hands-on experience
          across concept development, hand sketching,
          CAD/CAM development, prototyping, jewellery
          photography and luxury presentation.
        </p>

        <p>
          This multidisciplinary approach provides a broader
          understanding of the complete creative journey,
          helping projects evolve with both artistic vision
          and technical awareness.
        </p>

      </section>

      <div className="horizontalLine"></div>

      {/* =======================================================
          PROJECT SCOPE
      ======================================================= */}

      <section className="scopeSection finalSection">

        <p className="topicLabel">
          Project Scope
        </p>

        <h2 className="sectionTitle">
          Project Scope & Development Process
        </h2>

        <p>
          Every project begins with understanding the brand,
          its philosophy, aesthetic direction, target
          audience, design language and long-term objectives.
        </p>

        <p>
          The creative process varies significantly depending
          on the nature of the engagement. The development of
          a single bespoke jewel differs considerably from the
          creation of a complete collection, signature
          product line or ongoing design program.
        </p>

        <p>
          Projects may involve concept development,
          collection planning, design refinement, CAD/CAM
          development, prototyping, technical problem
          solving, creative direction or visual presentation
          through professional jewellery photography.
        </p>

        <p>
          Timelines and levels of involvement are discussed
          individually following an evaluation of project
          objectives, complexity, technical requirements and
          overall scope of work.
        </p>

      </section>

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