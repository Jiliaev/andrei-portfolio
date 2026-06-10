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

const recognitions = [
  {
    year: "2019",
    title: "JCK Jeweler's Choice Award",
    detail: "Award Recognition",
  },
  {
    year: "2016",
    title: "Canadian Jeweller Award of Excellence",
    detail: "Winner — Best Canadian Diamond Design of the Year",
  },
  {
    year: "2015",
    title: "Canadian Jeweller Award of Excellence",
    detail: "Winner — Best Platinum Design of the Year",
  },
  {
    year: "2015",
    title: "Canadian Jeweller Award of Excellence",
    detail: "Winner — Best Canadian Diamond Design of the Year",
  },
  {
    year: "2015",
    title: "Canadian Jeweller Award of Excellence",
    detail: "Winner — Best Colored Gemstone Design of the Year",
  },
  {
    year: "2015",
    title: "Canadian Jeweller Award of Excellence",
    detail: "Winner — Best Canadian Diamond Design of the Year",
  },
  {
    year: "2015",
    title: "Canadian Jeweller Award of Excellence",
    detail: "Winner — Best Canadian Diamond Design of the Year",
  },
  {
    year: "2009",
    title: "Ed Fielder Architecture Award",
    detail: "Award Recognition",
  },
  {
    year: "2006",
    title: "George Scheultz Jewellery Design Contest",
    detail: "Best Men’s Jewellery Design",
  },
];

export default function Awards() {
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
    <main className="awardsPage">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');

        body { margin: 0; background: #ffffff; }

        .awardsPage {
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
          margin-bottom: 112px;
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

        .desktopNav span:hover {
          color: #1d1b18;
          transform: scale(1.04);
        }

        .awardsWrap {
          width: min(1180px, 86vw);
          margin: 0 auto;
          text-align: center;
          padding-bottom: 80px;
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

        .mainTitle {
          margin: 0 0 34px;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(30px, 2.45vw, 44px);
          line-height: 1.12;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 400;
          color: #2A2723;
        }

        .introText {
          max-width: 760px;
          margin: 0 auto 32px;
          font-size: 16px;
          line-height: 1.82;
          color: #3F3933;
          font-weight: 300;
        }

        .heroImage {
          width: min(560px, 75vw);
          display: block;
          margin: 0 auto 84px;
        }

        .seraphineBlock {
          width: min(920px, 86vw);
          margin: 0 auto 40px;
          text-align: center;
        }

        .seraphineTitle {
          margin: 0 0 26px;
          font-family: Arial, sans-serif;
          font-size: 12px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          font-weight: 400;
          color: #9C8664;
        }

        .seraphineBlock p {
          margin: 0 auto 18px;
          max-width: 860px;
          font-size: 16px;
          line-height: 1.86;
          color: #3F3933;
          font-weight: 300;
        }

        .horizontalLine {
          width: 100vw;
          height: 1px;
          background: rgba(0,0,0,0.08);
          margin-left: 50%;
          transform: translateX(-50%);
        }

        .recognitionSection {
          width: min(940px, 86vw);
          margin: 0 auto;
          padding: 120px 0 110px;
          text-align: center;
        }

        .recognitionList {
          display: grid;
          grid-template-columns: 1fr;
          gap: 34px;
          margin-top: 62px;
        }

        .awardItem {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 42px;
          align-items: start;
          text-align: left;
          padding-bottom: 34px;
          border-bottom: 1px solid rgba(70,65,58,0.12);
        }

        .awardItem:last-child {
          border-bottom: none;
        }

        .awardYear {
          font-family: "Cormorant Garamond", serif;
          font-size: 30px;
          line-height: 1;
          color: #9C8664;
          letter-spacing: 0.08em;
        }

        .awardTitle {
          margin: 0 0 10px;
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          font-weight: 400;
          color: #1d1b18;
        }

        .awardDetail {
          margin: 0;
          font-size: 15px;
          line-height: 1.7;
          color: #3F3933;
          font-weight: 300;
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
          background: rgba(111,104,95,0.25);
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
          background: rgba(0,0,2,0.18);
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
          background: rgba(0,0,2,0.40);
          backdrop-filter: blur(10px);
          transform: translateX(100%);
          transition: transform 0.45s ease;
          z-index: 30;
          padding: 38px 34px;
          box-sizing: border-box;
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

          .awardsWrap {
            width: 88vw;
            padding-bottom: 60px;
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

          .introText,
          .seraphineBlock p {
            font-size: 16px;
            line-height: 1.75;
          }

          .heroImage {
            width: 98vw;
            transform: translateX(-2vw);
            margin-bottom: 54px;
          }

          .seraphineBlock {
            width: 88vw;
            margin-bottom: 40px;
          }

          .recognitionSection {
            width: 88vw;
            padding: 72px 0 86px;
          }

          .recognitionList {
            gap: 38px;
            margin-top: 54px;
          }

          .awardItem {
            grid-template-columns: 1fr;
            gap: 16px;
            text-align: center;
            padding-bottom: 24px;
            border-bottom: none;
          }
          .awardItem:not(:last-child)::after {
            content: "";
            display: block;
            width: 95px;
            height: 1px;
            background: #9C8664;
            opacity: 0.45;
            margin: 30px auto 0;
          }

          .awardYear {
            font-size: 28px;
          }

          .awardTitle {
            font-size: 10px;
            line-height: 1.7;
          }

          .awardDetail {
            font-size: 15px;
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
            <span onClick={() => navigate("/sketches-design")}>Sketches & Design</span>

            <span onClick={() => navigate("/process")}>Process</span>

            <span onClick={() => navigate("/jewellery-photo-portfolio")}>
              Jewellery Photo Portfolio
            </span>
          </nav>
        </header>
      </div>

      {!menuOpen && (
        <button className="hamburger" onClick={() => setMenuOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}

      <section className="awardsWrap">
        <p className="topicLabel">Recognition</p>
        <h1 className="mainTitle">Awards & Distinctions</h1>

        <p className="introText">
          Selected international awards and design recognition received throughout
          a multidisciplinary career spanning jewellery design, creative
          development and luxury presentation.
        </p>

        <img
          src="/seraphine-recognition.jpg"
          alt="Seraphine award-winning jewellery design by Andrei Jiliaev"
          className="heroImage"
        />

        <div className="seraphineBlock">
          <h2 className="seraphineTitle">Seraphine</h2>

          <p>
            Created from a single rough diamond crystal, Seraphine transforms one
            gemstone into an entire narrative. The principal diamond, pear-shaped
            diamond and accompanying accent stones all originate from the same
            source, preserving a unique relationship between every element of the
            design.
          </p>

          <p>
            The composition combines an engagement ring with an interlocking
            wedding band. When assembled together, the rings form a sculptural
            statement piece where the pear-shaped diamond sits within the larger
            fashion band, creating a bold and unified high jewellery composition.
          </p>

          <p>
            Seraphine reflects a design philosophy rooted in transformation,
            connection, gemstone architecture and contemporary luxury design.
          </p>
        </div>
      </section>

      <div className="horizontalLine"></div>

      <section className="recognitionSection">
        <p className="topicLabel">Recognition</p>
        <h2 className="mainTitle">Selected Recognition</h2>

        <div className="recognitionList">
          {recognitions.map((item, index) => (
            <div className="awardItem" key={index}>
              <div className="awardYear">{item.year}</div>

              <div>
                <h3 className="awardTitle">{item.title}</h3>
                <p className="awardDetail">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bottomNav">
        {bottomNavItems.map((item, index) => (
          <div key={item} className="bottomNavItem">
            <span className="bottomNavLink" onClick={() => navigate(getPath(item))}>
              {item}
            </span>
            {index !== bottomNavItems.length - 1 && <div className="navDivider"></div>}
          </div>
        ))}
      </footer>

      <div className="copyright">© ANDREI JILIAEV 2026</div>

      <div
        className={menuOpen ? "mobileOverlay open" : "mobileOverlay"}
        onClick={() => setMenuOpen(false)}
      ></div>

      <aside className={menuOpen ? "mobilePanel open" : "mobilePanel"}>
        <button className="closeMenu" onClick={() => setMenuOpen(false)}>✕</button>

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