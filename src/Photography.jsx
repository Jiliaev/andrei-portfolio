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

export default function Photography() {
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
    <main className="photographyPage">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');

        body { margin: 0; background: #ffffff; }

        .photographyPage {
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
          background: rgba(70,65,58,0.22);
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

        .introText {
          max-width: 840px;
          margin: 0 auto 92px;
          font-size: 16px;
          line-height: 1.82;
          color: #3F3933;
          font-weight: 300;
        }

        .introText p {
          margin: 0 auto 20px;
        }

        .heroImage {
          width: min(520px, 86vw);
          display: block;
          margin: 0 auto 112px;
        }

        .contentSection {
          width: min(980px, 86vw);
          margin: 0 auto 118px;
          text-align: center;
        }

        .contentSection p {
          max-width: 820px;
          margin: 0 auto 20px;
          font-size: 16px;
          line-height: 1.82;
          color: #3F3933;
          font-weight: 300;
        }

        .imageSingle {
          width: min(560px, 78vw);
          display: block;
          margin: 78px auto 0;
        }

        .advertisingImage {
          width: min(520px, 86vw);
          display: block;
          margin: 72px auto 0;
        }

        .wideImage {
          width: min(460px, 86vw);
          display: block;
          margin: 78px auto 0;
        }

        .closingSection {
          width: min(880px, 84vw);
          margin: 0 auto 180px;
          text-align: center;
        }

        .closingSection p {
          margin: 0 auto 20px;
          font-size: 16px;
          line-height: 1.82;
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

          .introText,
          .contentSection p,
          .closingSection p {
            font-size: 16px;
            line-height: 1.75;
          }

          .introText {
            margin-bottom: 64px;
          }

          .heroImage {
            width: 100%;
            transform: none;
            display: block;
            margin: 0 auto 86px;
          }

          .contentSection {
            width: 88vw;
            margin-bottom: 72px;
          }

          .wideImage {
            width: 92%;
            display: block;
            margin: 54px auto 0;
          }

          .imageSingle {
            width: 100%;
            display: block;
            margin: 58px auto 0;
          }

          .advertisingImage {
            width: 100%;
            display: block;
            margin: 48px auto 0;
          }

          .closingSection {
            width: 88vw;
            margin-bottom: 88px;
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

      <section className="pageWrap">
        <p className="topicLabel">Photography</p>
        <h1 className="mainTitle">Jewellery Photography</h1>

        <div className="introText">
          <p>
            Professional jewellery photography requires far more than technical
            camera knowledge. It demands an understanding of jewellery design,
            gemstones, precious metals, manufacturing techniques and the complex
            interaction between light and highly reflective surfaces.
          </p>

          <p>
            As a jewellery designer, I approach photography from the perspective
            of the creator. Every image is carefully composed to communicate
            design intent, reveal important structural details and present each
            piece with clarity, accuracy and visual impact.
          </p>

          <p>
            My work includes advertising photography, catalogue photography,
            editorial presentation and high-resolution imagery for print and
            digital media. Through focus stacking, advanced retouching and
            meticulous colour correction, each photograph is refined to achieve
            exceptional sharpness, accurate gemstone representation and a luxury
            standard of presentation.
          </p>
        </div>

        <img
          src="/jewellery-photography-hero.jpg"
          alt="Luxury jewellery advertising photography by Andrei Jiliaev"
          className="heroImage"
        />
      </section>

      <section className="contentSection">
        <p className="topicLabel">Advertising</p>
        <h2 className="sectionTitle">Advertising & Editorial Photography</h2>

        <p>
          Advertising photography is designed to communicate atmosphere, emotion
          and visual impact. These images are created for luxury marketing,
          publications, advertising campaigns, websites and large-format printing
          where presentation plays an essential role in communicating
          craftsmanship and design excellence.
        </p>

        <p>
          Every reflection, highlight and shadow is carefully controlled to
          enhance the visual language of the design while preserving the natural
          beauty of gemstones and precious metals.
        </p>

        <img
          src="/advertising-photography.jpg"
          alt="Advertising jewellery photography"
          className="advertisingImage"
        />
      </section>


      <section className="contentSection">
        <p className="topicLabel">Catalogue</p>
        <h2 className="sectionTitle">Catalogue Photography</h2>

        <p>
          Catalogue photography focuses on precision, consistency and accuracy.
          The objective is to represent each piece faithfully while maintaining
          correct colour balance, gemstone appearance, metal finish and sharp
          focus throughout the entire composition.
        </p>

        <p>
          These images are commonly used for product catalogues, e-commerce
          platforms, client presentations, archival records and sales materials
          where visual accuracy is essential.
        </p>

        <img
          src="/sapphire-multiview.jpg"
          alt="Sapphire ring multi-view jewellery photography"
          className="imageSingle"
        />
      </section>


      <section className="contentSection">
        <p className="topicLabel">Technique</p>
        <h2 className="sectionTitle">Focus Stacking & Technical Presentation</h2>

        <p>
          Jewellery photography often requires focus stacking techniques due to
          the extremely shallow depth of field encountered during macro
          photography.
        </p>

        <p>
          Multiple photographs are captured from the same position at different
          focus distances and carefully combined to create a single image with
          complete sharpness throughout the entire piece. This process requires
          precise camera control, advanced post-production and a detailed
          understanding of jewellery structure.
        </p>

        <p>
          The resulting images reveal fine craftsmanship, gemstone detail, pavé
          work and design elements that would otherwise remain partially out of
          focus.
        </p>

        <img
          src="/seraphine-catalogue.jpg"
          alt="Seraphine catalogue jewellery photography"
          className="wideImage"
        />
      </section>


      <section className="closingSection">
        <p>
          My experience as both a jewellery designer and photographer provides a
          unique perspective during the imaging process. Understanding gemstone
          architecture, metal behaviour, manufacturing techniques and design
          intent allows me to present jewellery with a level of accuracy and
          sensitivity that extends beyond conventional product photography.
        </p>

        <p>
          The goal is not simply to document a piece, but to communicate its
          craftsmanship, character and visual identity through carefully executed
          imagery.
        </p>
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