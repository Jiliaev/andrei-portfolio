import { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = ["Sketches & Design", "Process", "Jewellery Photo Portfolio"];

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
    <main className="page">
      <style>{`
        body { margin: 0; background: #000002; }

        .page {
          min-height: 100vh;
          background: #000002;
          color: #d8d1c4;
          font-family: "Times New Roman", Georgia, serif;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .container {
          width: min(1530px, 78vw);
          margin: 0 auto;
          padding: 38px 0 0;
        }

        .header {
          display: flex;
          align-items: flex-start;
          gap: 22px;
          margin-left: clamp(100px, 7vw, 180px);
          margin-bottom: 90px;
          position: relative;
        }

        .logo {
          width: 90px;
          height: auto;
          object-fit: contain;
          opacity: 0.82;
          filter: grayscale(100%);
          cursor: pointer;
        }

        .divider {
          width: 1px;
          height: 64px;
          background: rgba(130,120,105,0.22);
          margin-top: 4px;
        }

        .name {
          margin: 0;
          font-size: clamp(24px, 2vw, 34px);
          font-weight: 300;
          letter-spacing: 0.22em;
          line-height: 1;
          color: #d8d1c4;
          cursor: pointer;
        }

        .subtitle {
          margin-top: 12px;
          font-family: Arial, sans-serif;
          letter-spacing: 0.28em;
          color: #9a9286;
          cursor: pointer;
        }

        .subtitle p {
          margin: 4px 0;
          font-size: clamp(10px, 0.85vw, 13px);
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
          background: #d8d1c4;
        }

        .main {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(280px, 26vw);
          gap: clamp(28px, 5vw, 110px);
          align-items: start;
        }

        .imageBox {
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #020202;
        }

        .heroImage {
          width: 113%;
          height: 100%;
          object-fit: cover;
          object-position: 55% center;
          display: block;
        }

        .content {
          padding-top: clamp(40px, 4vw, 90px);
          margin-left: clamp(-60px, -2vw, -20px);
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .menu {
          order: 1;
          margin-bottom: clamp(20px, 3vw, 42px);
        }

        .featuredBlock {
          order: 2;
        }

        .label {
          margin: 0 0 12px;
          font-family: Arial, sans-serif;
          font-size: clamp(8px, 0.65vw, 10px);
          letter-spacing: 0.44em;
          text-transform: uppercase;
          color: #91887b;
        }

        .menuItem {
          cursor: pointer;
          margin-bottom: 8px;
          line-height: 0.98;
        }

        .menuLabel {
          font-size: clamp(16px, 2.2vw, 38px);
          color: #d4cec2d1;
          white-space: nowrap;
          transition: color 0.5s ease, transform 0.5s ease;
        }

        .menuLine {
          height: 1px;
          width: 0;
          opacity: 0;
          margin-top: 5px;
          background: #c9b38c;
          transition: width 0.8s ease, opacity 0.4s ease;
        }

        .menuItem:hover .menuLabel {
          color: #c9b38c;
          transform: translateX(4px);
        }

        .menuItem:hover .menuLine {
          width: 100%;
          opacity: 0.95;
        }

        .pieceName {
          margin: 0 0 12px;
          font-size: clamp(18px, 1.7vw, 28px);
          font-weight: 300;
          letter-spacing: 0.06em;
          color: #a8977a;
        }

        .description {
          margin: 0;
          max-width: min(420px, 100%);
          font-family: Arial, sans-serif;
          font-size: clamp(10px, 0.8vw, 13px);
          line-height: 1.9;
          color: #8f8679;
        }

        .bottomNav {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 0;
          margin-top: 120px;
          padding-bottom: 8px;
          font-family: Arial, sans-serif;
          font-size: clamp(8px, 0.8vw, 13px);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8f8778;
        }

        .bottomNavItem {
          display: flex;
          align-items: center;
        }

        .bottomNavLink {
          cursor: pointer;
          transition:
            color 0.5s ease,
            transform 0.5s ease,
            text-shadow 0.5s ease;
          white-space: nowrap;
        }

        .bottomNavLink:hover {
          color: #c9b38c;
          transform: scale(1.10);
          text-shadow: 0 0 8px rgba(201,179,140,0.14);
        }

        .navDivider {
          width: 1px;
          height: clamp(10px, 0.9vw, 14px);
          background: rgba(143,135,120,0.28);
          margin-left: clamp(4px, 0.7vw, 12px);
          margin-right: clamp(4px, 0.7vw, 12px);
        }

        .copyright {
          margin-top: 26px;
          text-align: center;
          font-family: Arial, sans-serif;
          font-size: clamp(7px, 0.55vw, 9px);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #3f3b36;
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
          color: #8f8778;
          font-size: 42px;
          cursor: pointer;
          display: block;
          margin-left: auto;
          margin-bottom: 70px;
          position: relative;
          top: -12px;
          -webkit-tap-highlight-color: transparent;
          outline: none;
          transition: opacity 0.1s ease, transform 0.25s ease;
        }

        .closeMenu:active {
          opacity: 0;
          transform: scale(0.7);
        }

        .closeMenu:focus {
          outline: none;
        }

        .mobileMenuItem {
          display: block;
          margin-bottom: 36px;
          font-family: "Times New Roman", Georgia, serif;
          font-size: clamp(20px, 5.5vw, 30px);
          color: #d4cec2;
          letter-spacing: 0.04em;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition:
            color 0.25s ease,
            opacity 0.25s ease,
            transform 0.25s ease;
        }

        .mobileMenuItem:active {
          color: #ffffff;
          text-shadow:
            0 0 10px rgba(216,209,196,0.45),
            0 0 18px rgba(216,209,196,0.25);
          opacity: 0.25;
          transform: scale(0.9);
        }

        .mobileMenuItem:hover {
          color: #c9b38c;
        }

        @media (max-width: 720px) {
          .page {
            display: block;
            min-height: auto;
          }

          .container {
            width: 92vw;
            padding-top: 38px;
            padding-bottom: 60px;
            transform: none;
          }

          .header {
            flex-direction: column;
            align-items: center;
            gap: 0;
            margin-left: 0;
            margin-bottom: 42px;
            padding-right: 0;
            text-align: center;
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
          }

          .main {
            grid-template-columns: 1fr;
            gap: 62px;
          }

          .imageBox {
            width: 100%;
            margin-left: calc(-4vw);
            aspect-ratio: 4 / 3;
            overflow: visible;
            background: transparent;
          }

          .heroImage {
            width: 165%;
            height: 100%;
            object-position: 0% center;
            translate: -12%;
          }

          .content {
            padding-top: 0;
            margin-left: 0;
          }

          .featuredBlock {
            order: 1;
          }

          .menu {
            order: 2;
            display: block;
            margin-top: 52px;
            margin-bottom: 0;
          }

          .label {
            font-size: 10px;
            letter-spacing: 0.42em;
          }

          .pieceName {
            font-size: 20px;
            margin-bottom: 12px;
          }

          .description {
            max-width: 100%;
            font-size: 11px;
            line-height: 1.8;
          }

          .menuLabel {
            font-size: 36px;
            color: #c8c2b7;
            letter-spacing: 0.03em;
          }

          .menuItem {
            margin-bottom: 6px;
            transform: scale(0.75);
            transform-origin: left top;
          }

          .bottomNav {
            display: none;
          }

          .copyright {
            display: none;
          }
        }
      `}</style>

      <div className="container">
        <header className="header">
          <img
            src="/ja-logo.png"
            alt="JA logo"
            className="logo"
            onClick={() => navigate("/")}
          />

          <div className="divider"></div>

          <div onClick={() => navigate("/")}>
            <h1 className="name">ANDREI JILIAEV</h1>
            <div className="subtitle">
              <p>High Jewellery Designer</p>
              <p>Creative Consultant</p>
            </div>
          </div>

          {!menuOpen && (
            <button className="hamburger" onClick={() => setMenuOpen(true)}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}
        </header>

        <section className="main">
          <div className="imageBox">
            <img
              src="/AzureMajesty.jpg"
              alt="Azure Majesty"
              className="heroImage"
            />
          </div>

          <div className="content">
            <div className="featuredBlock">
              <p className="label">Featured Work</p>
              <h2 className="pieceName">Azure Majesty</h2>
              <p className="description">
                Contemporary jewellery design focused on sculptural form,
                gemstone architecture, refined craftsmanship and creative
                direction.
              </p>
            </div>

            <div className="menu">
              <p className="label">Presentation</p>

              {menuItems.map((item) => (
                <div
                  key={item}
                  className="menuItem"
                  onClick={() => navigate(getPath(item))}
                >
                  <span className="menuLabel">{item}</span>
                  <div className="menuLine"></div>
                </div>
              ))}
            </div>
          </div>
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