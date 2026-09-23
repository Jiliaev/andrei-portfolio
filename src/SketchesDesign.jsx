import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const works = [
  {
    title: "REGALIA AZURE",
    description:
      "A statement pearl necklace centered on a richly architectural sapphire composition, combining classical grandeur with stylized botanical ornament.",
    image: "/regalia-azure.jpg",
    width: 900,
  },
  {
    title: "PARADIS — CELESTIAL PAIR",
    description:
      "A symbolic pairing of sapphire-blue and rose-pink birds, balancing mirrored movement, colour contrast and cascading gemstone details.",
    image: "/paradis-celestial-pair.jpg",
    width: 680,
    displayScale: 0.85,
  },
  {
    title: "PARADIS — EMBRACE",
    description:
      "A romantic two-bird composition exploring movement, intimacy and ornamental rhythm through sculptural gemstone-set plumage.",
    image: "/paradis-embrace.jpg",
    width: 650,
    displayScale: 0.85,
  },
  {
    title: "PARADIS — TWIN PLUMES",
    description:
      "A pair of fantastical jeweled birds composed through vivid gemstone colour, layered plumage and dramatic suspended pear-shaped stones.",
    image: "/paradis-twin-plumes.jpg",
    width: 650,
    displayScale: 0.85,
  },
  {
    title: "CLOUD ATLAS — GOLD",
    description:
      "A sculptural cuff exploring drifting cloud formations through diamond pavé, polished gold surfaces and celestial points of light.",
    image: "/cloud-atlas-gold.jpg",
    width: 760,
    displayScale: 0.85,
  },
  {
    title: "CLOUD ATLAS — NOCTURNE",
    description:
      "A darker interpretation of the Cloud Atlas concept, contrasting diamond-set cloud formations with a dramatic oxidized metal surface.",
    image: "/cloud-atlas-nocturne.jpg",
    width: 650,
  },
  {
    title: "CASCADE DE LUMIÈRE",
    description:
      "A study in movement and light, exploring cascading diamond forms through rhythm, repetition and architectural structure.",
    image: "/CASCADE DE LUMIÈRE.jpg",
    width: 806,
  },
  {
    title: "ROYALE DECO",
    description:
      "An Art Deco–inspired ring composition combining geometric symmetry, vivid sapphires and rubies, and intricate diamond-set architectural detailing.",
    image: "/royale-deco.jpg",
    width: 650,
    displayScale: 0.85,
  },
  {
    title: "ORNAMENTA",
    description:
      "A study of architectural ornament translated into bold ring forms, exploring engraved movement, symmetry and contrasting precious-metal structures.",
    image: "/ornamenta.jpg",
    width: 900,
    displayScale: 0.9,
  },
  {
    title: "LUMIÈRE BRIDAL",
    description:
      "A technical bridal study exploring the proportions, elevation and architectural setting of an elongated centre diamond from multiple views.",
    image: "/lumiere-bridal-design-study.jpg",
    width: 650,
    displayScale: 0.9,
  },
  {
    title: "LUMIÈRE BRIDAL — STUDY",
    description:
      "A refined engagement-ring study examining centre-stone presentation, gallery construction and pavé detailing through front and profile views.",
    image: "/lumiere-bridal-structural-study.jpg",
    width: 650,
    displayScale: 0.9,
  },
  {
    title: "LUNA DUO",
    description:
      "A contemporary pearl jewellery study exploring contrast, balance and fluid diamond-set curves through complementary ring and earring forms.",
    image: "/luna-duo.jpg",
    width: 650,
  },
  {
    title: "ARABELLE",
    description:
      "An ornamental high jewellery study exploring symmetry, articulated movement and intricate diamond-set architectural forms.",
    image: "/Arabelle.jpg",
    width: 634,
  },
  {
    title: "ÉQUILIBRE",
    description:
      "A study in balance and proportion, combining geometric diamond forms with delicate linear structures and graduated movement.",
    image: "/ÉQUILIBRE.jpg",
    width: 598,
  },
  {
    title: "ÉLODIE",
    description:
      "A refined vertical composition exploring geometry, articulation and the graceful progression of diamond-set elements.",
    image: "/Élodie.jpg",
    width: 560,
  },
  {
    title: "LYRIA",
    description:
      "An exploration of pearls and diamonds through flowing openwork forms, balancing softness, rhythm and sculptural elegance.",
    image: "/Lyria(1).jpg",
    width: 704,
  },
  {
    title: "LUNA PEARL",
    description:
      "A sculptural pearl ring study exploring volume, symmetry and fluid diamond-set architecture from multiple perspectives.",
    image: "/Luna Pearl Painted.jpg",
    width: 576,
  },
  {
    title: "ÉTERNELLE CASCADE",
    description:
      "A study of elongated diamond earrings conceived through cascading geometry, articulated lines and suspended points of light.",
    image: "/Éternelle Cascade.jpg",
    width: 544,
    displayScale: 1.15,
  },
  {
    title: "FLORENTINE",
    description:
      "A technical ring study exploring an ornate pear-shaped setting through multiple views, structural detailing and refined proportions.",
    image: "/florentine.jpg",
    width: 576,
  },
  {
    title: "EQUUS CROWN — CONCEPT EXPLORATION",
    description:
      "Early studies in equestrian symbolism, proportion and ornamental structure, documenting the evolution of an architectural ring concept.",
    image: "/equus-concept.jpg",
    width: 672,
  },
  {
    title: "EQUUS CROWN — DESIGN DEVELOPMENT",
    description:
      "The developed Equus Crown concept, translating early sketches into a richly detailed composition of sculptural horses, enamel and gemstones.",
    image: "/equus-crown.jpg",
    width: 672,
  },
  {
    title: "NOCTURNE",
    description:
      "A sculptural bracelet concept exploring botanical ornamentation, dramatic contrast and the interplay between pavé surfaces and dimensional floral forms.",
    image: "/nocturnebracelet-topand3.4.jpg",
    width: 736,
  },
  {
    title: "SILLAGE",
    description:
      "A gestural jewellery study exploring how diamonds and fluid lines travel across the hand, wrist and body.",
    image: "/Sillage(2).jpg",
    width: 544,
  },
  {
    title: "ÉCLAT",
    description:
      "A diamond necklace study built around a dramatic pear-shaped centre stone, balancing brilliance with an organic, botanical composition.",
    image: "/Eclat.jpg",
    width: 608,
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
      case "Design Direction":
        return "/creative-consulting";

      case "Contact":
        return "/contact";

      default:
        return "/";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="sketchPage">
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

        .sketchPage {
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

          /* MORE SPACE FROM TOP EDGE */
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

        .desktopNav .active {
          color: #1d1b18;
        }

        /* =========================================================
           INTRO
        ========================================================= */

        .intro {
          width: min(900px, 86vw);

          margin: 0 auto;

          padding: 0 0 105px;

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
          margin: 0 auto;

          max-width: 760px;

          font-family: "Cormorant Garamond", serif;

          font-size: clamp(22px, 2.05vw, 35px);

          line-height: 1.35;

          font-weight: 300;

          color: #3a352f;
        }

        /* =========================================================
           WORKS
        ========================================================= */

        .work {
          width: 100%;
          margin: 0 auto;
          text-align: center;
        }

        .workTitle {
          margin: 0 auto 16px;

          max-width: 760px;

          font-family: "Cormorant Garamond", serif;

          font-size: clamp(22px, 1.6vw, 32px);

          line-height: 1.15;

          letter-spacing: 0.12em;

          text-transform: uppercase;

          font-weight: 400;

          color: #2a2723;
        }

        .workDescription {
          margin: 0 auto 52px;

          max-width: 680px;

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

        .workImage:hover {
          transform: scale(1.015);
        }

        /* =========================================================
           SECTION DIVIDERS
        ========================================================= */

        .sectionDivider {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 24px;

          margin: 68px auto 125px;
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
           LIGHTBOX
        ========================================================= */

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
           BACK TO TOP
        ========================================================= */

        .backToTop {
          position: fixed;

          bottom: 36px;
          right: 36px;

          width: 42px;
          height: 42px;

          border: 1px solid rgba(111, 104, 95, 0.32);

          border-radius: 50%;

          display: flex;

          align-items: center;
          justify-content: center;

          background: rgba(255, 255, 255, 0.72);

          backdrop-filter: blur(3px);

          color: rgba(111, 104, 95, 0.32);

          font-size: 30px;

          font-weight: 300;

          cursor: pointer;

          z-index: 3000;

          padding: 0;

          transition:
            transform 0.35s ease,
            color 0.35s ease,
            border-color 0.35s ease;
        }

        .backToTopArrow {
          position: relative;

          top: 3px;

          font-size: 30px;

          line-height: 1;
        }

        .backToTop:hover {
          transform: translateY(-4px);

          color: rgba(111, 104, 95, 0.58);

          border-color: rgba(111, 104, 95, 0.58);
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
            margin-bottom: 104px;
          }

          .logo {
            width: 82px;
          }

          .divider {
            height: 58px;
          }

          .intro {
            padding-bottom: 82px;
          }

          .workDescription {
            margin-bottom: 44px;
          }

          .sectionDivider {
            margin-top: 58px;
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
            /* WAS 15px — NOW 28px */
            padding-top: 28px;
          }

          .header {
            margin-bottom: 82px;
          }

          .logo {
            width: 74px;
          }

          .intro {
            padding-bottom: 70px;
          }

          .sectionDivider {
            margin-top: 52px;
            margin-bottom: 90px;
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

            padding-bottom: 90px;
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

          .work {
            width: 88vw;
          }

          .workTitle {
            font-size: 20px;

            line-height: 1.15;

            letter-spacing: 0.08em;
          }

          .workDescription {
            font-size: 17px;

            margin-bottom: 34px;
          }

          .workImage {
            width: 100%;

            max-width: 100% !important;

            cursor: default;
          }

          .workImage:hover {
            transform: none;
          }

          .sectionDivider {
            margin: 40px auto 85px;

            gap: 18px;
          }

          .sectionDivider::before,
          .sectionDivider::after {
            width: 70px;
          }

          .sectionNumber {
            font-size: 18px;
          }

          .backToTop {
            bottom: 24px;
            right: 20px;

            width: 38px;
            height: 38px;

            font-size: 28px;
          }

          .footerWrap {
            display: none;
          }
        }
      `}</style>

      {/* HEADER */}

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

            <span className="active">
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
                navigate("/jewellery-photo-portfolio")
              }
            >
              Jewellery Photo Portfolio
            </span>

          </nav>

        </header>

        {/* INTRO */}

        <section className="intro">

          <p className="topicLabel">
            Sketches & Design
          </p>

          <h1 className="mainTitle">
            Jewellery Design Portfolio
          </h1>

          <p className="introText">
            A curated collection of original jewellery
            concepts, design studies and finished creations
            exploring sculptural form, gemstone architecture,
            movement and emotional storytelling.
          </p>

        </section>

        {/* WORKS */}

        {works.map((work, index) => (

          <div key={work.title}>

            <section className="work">

              <h2 className="workTitle">
                {work.title}
              </h2>

              <p className="workDescription">
                {work.description}
              </p>

              <img
                src={work.image}

                alt={work.title}

                className="workImage"

                style={{
                  maxWidth: `${
                    work.width *
                    0.85 *
                    (work.displayScale ?? 1)
                  }px`,
                }}

                draggable="false"

                onContextMenu={(e) =>
                  e.preventDefault()
                }

                onClick={() => {
                  if (window.innerWidth > 720) {
                    setSelectedImage(work);
                  }
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

      </div>

      {/* FOOTER */}

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

              {index !== bottomNavItems.length - 1 && (
                <div className="navDivider"></div>
              )}

            </div>

          ))}

        </div>

        <div className="copyright">
          © ANDREI JILIAEV 2026
        </div>

      </footer>

      {/* LIGHTBOX */}

      {selectedImage && (

        <div
          className="imageLightbox"

          onClick={() =>
            setSelectedImage(null)
          }
        >

          <div className="lightboxFrame">

            <button
              className="lightboxClose"

              onClick={() =>
                setSelectedImage(null)
              }
            >
              ✕
            </button>

            <img
              src={selectedImage.image}

              alt={selectedImage.title}

              className="lightboxImage"

              draggable="false"

              onContextMenu={(e) =>
                e.preventDefault()
              }

              onClick={() =>
                setSelectedImage(null)
              }
            />

          </div>

        </div>

      )}

      {/* BACK TO TOP */}

      {showBackToTop && (

        <button
          className="backToTop"

          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >

          <span className="backToTopArrow">
            ↑
          </span>

        </button>

      )}

      {/* MOBILE BUTTON */}

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

      {/* MOBILE OVERLAY */}

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

      {/* MOBILE PANEL */}

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