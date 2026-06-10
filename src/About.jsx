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

export default function About() {
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
    <main className="aboutPage">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');

        body { margin: 0; background: #ffffff; }

        .aboutPage {
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

        .desktopNav span:hover {
          color: #1d1b18;
          transform: scale(1.04);
        }

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
          margin: 0 auto;
          display: block;
          transform: translateY(-30px);
        }

        .sketchGrid {
          display: grid;
          grid-template-columns: 400px 640px;
          gap: 78px;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .sketchImage {
          width: 640px;
          display: block;
          margin: 0 auto;
          transform: translateY(-70px);
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

        .fullPhilosophy {
          width: min(1120px, 88vw);
          margin: 0 auto 60px;
        }

        .fullBiography p,
        .fullPhilosophy p {
          margin: 0 0 18px;
          font-size: 16px;
          line-height: 1.92;
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

        .recognition {
          width: min(820px, 84vw);
          margin: 0 auto;
          text-align: center;
          padding: 100px 0 108px;
        }

        .recognition p {
          margin: 0 auto 20px;
          max-width: 760px;
          font-size: 16px;
          line-height: 1.78;
          font-weight: 300;
          color: #3F3933;
        }

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
          border-right: 1px solid rgba(70,65,58,0.14);
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
          border: 1px solid rgba(156,134,100,0.42);
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #3F3933;
          text-decoration: none;
          background: rgba(255,255,255,0.68);
          transition: color 0.4s ease, border-color 0.4s ease, background-color 0.4s ease, transform 0.4s ease;
          -webkit-tap-highlight-color: rgba(156,134,100,0.12);
        }

        .downloadButton:hover {
          color: #9C8664;
          border-color: rgba(156,134,100,0.78);
          transform: translateY(-2px);
        }

        .downloadButton:active,
        .downloadButton:focus {
          color: #9C8664;
          border-color: #9C8664;
          background-color: rgba(156,134,100,0.08);
          outline: none;
        }

        .cta {
          width: min(860px, 84vw);
          margin: 0 auto;
          text-align: center;
          padding: 86px 0 200px;
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
            padding-top: 0;
          }

          .topIntro {
            margin-bottom: 74px;
          }

          .topicLabel {
            font-size: 12px;
            letter-spacing: 0.34em;
            padding-left: 0.34em;
            color: #9C8664;
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
          }

          .sketchImage {
            width: 115%;
            transform: translateX(-6%);
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
            margin: 0 auto 60px;
            text-align: center;
          }

          .fullBiography {
            width: 88vw;
            margin: 0 auto 85px;
            text-align: center;
          }

          .recognition {
            padding: 86px 0 96px;
          }

          .expertise {
            padding: 86px 0 100px;
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
            padding: 70px 0 120px;
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
            padding: 80px 0 150px;
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

            <span onClick={() => navigate("/process")}>
              Process
            </span>

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

      <div className="pageWrap">
        <section className="topIntro">
          <p className="topicLabel">About</p>
          <h1 className="mainTitle">About Andrei Jiliaev</h1>
          <p className="mainRole">
            Jewellery Designer • Creative Director • CAD/CAM Artist • Photographer
          </p>
        </section>

        <section className="sectionGrid biographyIntro">
          <div>
            <img src="/about-portrait.jpg" alt="Andrei Jiliaev" className="portraitImage" />
          </div>

          <div className="textBlock">
            <p>Andrei Jiliaev is an award-winning jewellery designer, creative director and multidisciplinary artist whose work bridges high jewellery design, CAD/CAM development, hand rendering, prototyping and luxury visual presentation.</p>
            <p>Born into a family of master craftsmen, he is the eldest son of master goldsmith Iouri Jiliaev. Immersed in an atelier environment from an early age, he developed a deep understanding of craftsmanship, gemstones, structure and technical execution.</p>
            <p>Beginning his professional journey at the age of twenty, Andrei contributed design work to internationally recognized jewellery companies including Hearts On Fire, Frederic Goldman and Kurt Wayne. These early experiences shaped a career dedicated to the union of artistic imagination, technical innovation and exceptional craftsmanship.</p>
            <p>Over the course of his career, Andrei has cultivated an international clientele that includes private collectors, prominent public figures and members of royal households. His work has been commissioned across North America, Europe, Asia and the Middle East, including bespoke projects undertaken for clients from the Kingdom of Saudi Arabia.</p>
          </div>
        </section>

        <section className="fullBiography">
          <p>Over the following decades, he developed a multidisciplinary practice that integrates concept development, gemstone knowledge, sculptural thinking, technical execution, CAD/CAM development and luxury presentation.</p>
          <p>This combination allows him to guide projects from the earliest concept through hand sketching, gemstone architecture, prototyping, production awareness and final photography — while preserving the emotional and artistic integrity of the original idea.</p>
          <p>Today, Andrei continues to explore the relationship between form, movement, gemstone structure and design storytelling, creating jewellery concepts that balance artistic expression, technical intelligence and timeless visual identity.</p>
        </section>

        <section className="sectionGrid approach">
          <div>
            <img src="/about-camera.jpg" alt="Andrei Jiliaev design process" className="cameraImage" />
          </div>

          <div className="textBlock">
            <p className="topicLabel">Approach</p>
            <h2>A Multidisciplinary Approach</h2>
            <p>Unlike traditional development workflows where design, engineering, production and presentation are often divided among multiple specialists, my process brings these disciplines together within one creative vision.</p>
            <p>This integrated approach allows each idea to develop with greater continuity — from concept exploration and hand rendering to CAD modelling, prototyping, gemstone placement, production considerations and final photography.</p>
            <p>By understanding both the artistic and technical sides of jewellery creation, I am able to anticipate structural challenges, refine proportions and preserve the emotional character of a design throughout every stage of development.</p>
          </div>
        </section>

        <section className="sketchGrid">
          <div className="textBlock">
            <p className="topicLabel">Philosophy</p>
            <h2>Design As Discovery</h2>
            <p>For me, design is not simply the act of creating objects — it is the pursuit of ideas.</p>
            <p>What has fascinated me throughout my career is the ability to recognize concepts where others may see only forms, materials or technical challenges. The discovery of meaningful ideas, the exploration of their potential and the transformation of those ideas into objects of beauty and lasting value remains at the heart of my creative process.</p>
            <p>Many of the strongest concepts are not immediately visible. They emerge through observation, experience and the ability to connect seemingly unrelated influences. Architecture, sculpture, nature, culture, engineering, history and human emotion often intersect in unexpected ways, revealing opportunities for new forms, narratives and design languages.</p>
          </div>

          <div>
            <img src="/about-sketch.jpg" alt="Jewellery bracelet sketch" className="sketchImage" />
          </div>
        </section>

        <section className="fullPhilosophy">
          <p>I am particularly drawn to the development of concepts that can extend beyond a single piece. A successful idea often contains the foundation for an entire collection, a recognizable visual identity or a long-term creative direction. The ability to uncover these possibilities and develop them into coherent, meaningful bodies of work is one of the most rewarding aspects of design.</p>
          <p>My background in sculpture, gemstone studies, traditional craftsmanship, manufacturing and CAD/CAM development allows me to approach creativity from multiple perspectives simultaneously. Ideas are not viewed solely through an artistic lens, but also through an understanding of structure, engineering, production, wearability and market relevance.</p>
          <p>Ultimately, my goal is not simply to design jewellery, but to develop ideas, narratives and collections that contribute to the identity, recognition and long-term success of the brands they represent.</p>
        </section>
      </div>

      <div className="horizontalLine"></div>

      <section className="recognition">
        <p className="topicLabel">Recognition</p>
        <h2>Awards & Distinctions</h2>
        <p>Internationally recognized through prestigious design competitions and industry awards including JCK, GIA and the Canadian Jewellery Awards of Excellence.</p>
        <p>A complete selection of awards and distinctions can be viewed on the Awards page.</p>
      </section>

      <div className="horizontalLine"></div>

      <section className="expertise">
        <p className="topicLabel">Expertise</p>
        <h2>Areas Of Expertise</h2>

        <div className="expertiseGrid">
          <div className="expertiseCard">
            <h3>Jewellery Design</h3>
            <p>Original concepts, bespoke commissions and collection development.</p>
          </div>

          <div className="expertiseCard">
            <h3>CAD/CAM Development</h3>
            <p>Technical modelling, engineering and production-ready solutions.</p>
          </div>

          <div className="expertiseCard">
            <h3>Creative Direction</h3>
            <p>Product storytelling, visual identity and collection development.</p>
          </div>

          <div className="expertiseCard">
            <h3>Jewellery Photography</h3>
            <p>Professional photography and retouching focused on luxury presentation.</p>
          </div>
        </div>
      </section>

      <section className="portfolioDownloads">
        <p className="topicLabel">Portfolio</p>
        <h2>Portfolio Downloads</h2>

        <p>
          Download a concise portfolio selection for a quick review, or the
          complete portfolio for a more detailed presentation of design,
          process, CAD/CAM development, photography and selected work.
        </p>

        <div className="downloadButtons">
          <a
            href="/Andrei-Jiliaev-Portfolio-Selection.pdf"
            download
            className="downloadButton"
          >
            Download Selection
          </a>

          <a
            href="/Andrei-Jiliaev-Complete-Portfolio.pdf"
            download
            className="downloadButton"
          >
            Download Complete Portfolio
          </a>
        </div>
      </section>

      <section className="cta">
        <h2>Let's Create Something Exceptional</h2>
        <p>Open to collaborations, consulting, design development and bespoke projects worldwide.</p>
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