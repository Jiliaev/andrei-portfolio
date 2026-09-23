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

export default function Contact() {
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
    <main className="contactPage">
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

        .contactPage {
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

          /* SAME APPROVED TOP POSITION */
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

        /* =========================================================
           CONTACT
        ========================================================= */

        .contactWrap {
          width: min(880px, 86vw);

          margin: 0 auto;

          text-align: center;

          padding: 0 0 105px;

          position: relative;
        }

        .watermark {
          position: absolute;

          top: 61.5%;
          left: 50%;

          transform:
            translate(-50%, calc(-50% - 1px));

          width: min(168px, 27vw);

          opacity: 0.07;

          z-index: 0;

          pointer-events: none;

          filter: grayscale(100%);
        }

        .contactContent {
          position: relative;

          z-index: 1;
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
          max-width: 720px;

          margin: 0 auto 92px;

          font-size: 16px;

          line-height: 1.82;

          color: #3F3933;

          font-weight: 300;
        }

        /* =========================================================
           PORTFOLIO DOWNLOADS
        ========================================================= */

        .portfolioDownloads {
          margin: 0 auto 180px;

          text-align: center;
        }

        .downloadText {
          max-width: 680px;

          margin: 0 auto 34px;

          font-size: 15px;

          line-height: 1.78;

          color: #6C6258;

          font-weight: 300;
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

          border:
            1px solid rgba(156, 134, 100, 0.42);

          font-family:
            Arial, sans-serif;

          font-size: 10px;

          letter-spacing: 0.24em;

          text-transform: uppercase;

          color: #3F3933;

          text-decoration: none;

          background:
            rgba(255, 255, 255, 0.68);

          transition:
            color 0.4s ease,
            border-color 0.4s ease,
            background-color 0.4s ease,
            transform 0.4s ease;

          -webkit-tap-highlight-color:
            rgba(156, 134, 100, 0.12);
        }

        .downloadButton:hover {
          color: #9C8664;

          border-color:
            rgba(156, 134, 100, 0.78);

          transform:
            translateY(-2px);
        }

        .downloadButton:active,
        .downloadButton:focus {
          color: #9C8664;

          border-color: #9C8664;

          background-color:
            rgba(156, 134, 100, 0.08);

          outline: none;
        }

        /* =========================================================
           CONTACT DETAILS
        ========================================================= */

        .contactName {
          margin: 0 0 12px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size:
            clamp(24px, 2vw, 34px);

          line-height: 1.25;

          letter-spacing: 0.14em;

          text-transform: uppercase;

          font-weight: 300;

          color: #2A2723;
        }

        .contactRole {
          margin: 0 0 48px;

          font-family:
            Arial, sans-serif;

          font-size: 10px;

          letter-spacing: 0.32em;

          text-transform: uppercase;

          color: #9C8664;
        }

        .contactDetails {
          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 18px;

          margin-bottom: 54px;

          font-family:
            Arial, sans-serif;

          font-size: 12px;

          letter-spacing: 0.22em;

          text-transform: uppercase;

          color: #3F3933;
        }

        .contactDetails a {
          color: inherit;

          text-decoration: none;

          transition:
            color 0.4s ease;
        }

        .contactDetails a:hover {
          color: #9C8664;
        }

        .available {
          margin: 0;

          font-family:
            Arial, sans-serif;

          font-size: 10px;

          letter-spacing: 0.28em;

          text-transform: uppercase;

          color: #9C8664;
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

          transform:
            scale(1.08);
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

          .contactWrap {
            padding-bottom: 95px;
          }

          .portfolioDownloads {
            margin-bottom: 160px;
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

          .portfolioDownloads {
            margin-bottom: 145px;
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

          .contactWrap {
            width: 88vw;

            padding: 0 0 90px;
          }

          .watermark {
            width: 30vw;

            opacity: 0.035;

            top: 68%;
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

            margin-bottom: 34px;
          }

          .introText {
            font-size: 16px;

            line-height: 1.75;

            margin-bottom: 78px;
          }

          .portfolioDownloads {
            margin-bottom: 180px;
          }

          .downloadText {
            font-size: 15px;

            line-height: 1.7;

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

          .contactName {
            font-size: 23px;

            letter-spacing: 0.12em;
          }

          .contactRole {
            font-size: 9px;

            line-height: 1.7;

            margin-bottom: 44px;
          }

          .contactDetails {
            font-size: 12px;

            letter-spacing: 0.18em;

            gap: 18px;

            margin-bottom: 48px;
          }

          .available {
            font-size: 9px;

            line-height: 1.7;

            letter-spacing: 0.22em;
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
          CONTACT
      ======================================================= */}

      <section className="contactWrap">

        {/* DECORATIVE WATERMARK — KEEP ORIGINAL LOGO */}
        <img
          src="/ja-logo.png"
          alt=""
          className="watermark"
        />

        <div className="contactContent">

          <p className="topicLabel">
            Contact
          </p>

          <h1 className="mainTitle">
            Let's Create Something Exceptional
          </h1>

          <p className="introText">
            For collaborations, creative consulting,
            jewellery design, CAD/CAM development,
            collection creation, jewellery photography or
            bespoke projects, please get in touch.
          </p>

          {/* ===================================================
              PORTFOLIO DOWNLOADS
          =================================================== */}

          <div className="portfolioDownloads">

            <p className="topicLabel">
              Portfolio Downloads
            </p>

            <p className="downloadText">
              Download a concise portfolio selection for a
              quick review, or the complete portfolio for a
              more detailed presentation of design, process,
              CAD/CAM development, photography and selected
              work.
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

          </div>

          {/* ===================================================
              CONTACT DETAILS
          =================================================== */}

          <h3 className="contactName">
            Andrei Jiliaev
          </h3>

          <p className="contactRole">
            Jewellery Designer • Creative Consultant
          </p>

          <div className="contactDetails">

            <a href="tel:+16043418479">
              T +1 604.341.8479
            </a>

            <a href="mailto:andrei@andreijiliaev.com">
              E andrei@andreijiliaev.com
            </a>

            <a
              href="https://www.instagram.com/andrei_jiliaev/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram @andrei_jiliaev
            </a>

            <a
              href="https://www.linkedin.com/in/andreijiliaev"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>

          </div>

          <p className="available">
            Available for selected projects worldwide.
          </p>

        </div>

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