import { useEffect, useLayoutEffect, useRef, useState } from "react";



import { useNavigate, useLocation } from "react-router-dom";



const bottomNavItems = [



  { label: "About", path: "/about" },



  { label: "Selected Work", path: "/work" },



  { label: "Sculpture", path: "/sculpture" },



  { label: "Design & Process", path: "/design-process" },



  { label: "Jewellery Design", path: "/jewellery-design" },



  { label: "Awards", path: "/awards" },



  { label: "Creative Consulting", path: "/creative-consulting" },



  { label: "Contact", path: "/contact" },



];



const selectedWorkLinks = [



  { label: "Sculpture & Installations", path: "/sculpture-installations" },



  { label: "Spatial & Retail Design", path: "/spatial-retail-design" },



  { label: "Product & Object Design", path: "/objects-design" },



  { label: "Concept Studies", path: "/concept-studies" },



];



const jewelleryLinks = [



  { label: "Sketches & Design", path: "/sketches-design" },



  { label: "Jewellery Portfolio", path: "/jewellery-photo-portfolio" },



  { label: "Design Process", path: "/process" },



  { label: "Jewellery Photography", path: "/photography" },



];



export default function Contact() {



  const [menuOpen, setMenuOpen] = useState(false);



  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [mobileNavigating, setMobileNavigating] = useState(false);
  const [selectedMobileSubLink, setSelectedMobileSubLink] = useState(null);
  const mobileSelectionFadeTimer = useRef(null);
  const navigationTimer = useRef(null);



  const [desktopDropdown, setDesktopDropdown] = useState(null);



  const navigate = useNavigate();



  const { pathname } = useLocation();



  const activePath = pathname.replace(/\/+$/, "") || "/";



  // Match the logo and vertical rule to the actual height of the full name + two-line description.



  // ResizeObserver keeps both ends aligned if the font or window size changes.



  const brandLockupRef = useRef(null);



  const brandTextRef = useRef(null);



  useLayoutEffect(() => {



    const lockup = brandLockupRef.current;



    const textBlock = brandTextRef.current;



    if (!lockup || !textBlock) return;



    const syncBrandHeight = () => {



      const height = textBlock.getBoundingClientRect().height;



      if (height > 0) {



        lockup.style.setProperty('--brand-text-height', `${height}px`);



      }



    };



    syncBrandHeight();



    const observer = typeof ResizeObserver !== 'undefined'



      ? new ResizeObserver(syncBrandHeight)



      : null;



    observer?.observe(textBlock);



    window.addEventListener('resize', syncBrandHeight);



    return () => {



      observer?.disconnect();



      window.removeEventListener('resize', syncBrandHeight);



    };



  }, []);



  // While the mobile drawer is open, lock the page behind it (including iOS Safari).
  // The drawer itself remains scrollable for short iPhone screens.
  useEffect(() => {
    if (!menuOpen) return;

    const body = document.body;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.dataset.mobileMenuOpen = "true";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    const onEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setMobileDropdown(null);
      }
    };
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("keydown", onEscape);
      delete body.dataset.mobileMenuOpen;
      Object.entries(previous).forEach(([key, value]) => { body.style[key] = value; });
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  useEffect(() => () => {
    if (navigationTimer.current !== null) window.clearTimeout(navigationTimer.current);
    if (mobileSelectionFadeTimer.current !== null) window.clearTimeout(mobileSelectionFadeTimer.current);
  }, []);

  const closeAndNavigate = (path, isSubmenuSelection = false) => {
    if (navigationTimer.current !== null) return;
    const onPhone = menuOpen && window.matchMedia("(max-width: 720px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (onPhone && !reducedMotion) {
      if (isSubmenuSelection) {
        // Give one short, visible confirmation before the existing page exit.
        setSelectedMobileSubLink(path);
        mobileSelectionFadeTimer.current = window.setTimeout(() => {
          mobileSelectionFadeTimer.current = null;
          setMobileNavigating(true);
        }, 190);
        navigationTimer.current = window.setTimeout(() => {
          navigationTimer.current = null;
          setMenuOpen(false);
          setMobileDropdown(null);
          setDesktopDropdown(null);
          setSelectedMobileSubLink(null);
          setMobileNavigating(false);
          navigate(path);
        }, 390);
      } else {
        setMobileNavigating(true);
        navigationTimer.current = window.setTimeout(() => {
          navigationTimer.current = null;
          setMenuOpen(false);
          setMobileDropdown(null);
          setDesktopDropdown(null);
          navigate(path);
        }, 360);
      }
      return;
    }
    setMenuOpen(false);
    setMobileDropdown(null);
    setDesktopDropdown(null);
    setSelectedMobileSubLink(null);
    navigate(path);
  };




  return (



    <main className={`contactPage${mobileNavigating ? " isMobileNavigating" : ""}${selectedMobileSubLink ? " hasSubmenuSelection" : ""}`}>



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



          opacity: 0.12;



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



          /* Both portfolio download buttons have identical dimensions. */

          width: 350px;

          min-height: 46px;

          max-width: 100%;



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



            opacity: 0.07;



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



        /* NAVIGATION — SAME AS APPROVED HOME AND ABOUT */



        /* Wrappers are unstyled flex items. Original .desktopNav font,



           gap, margin-right and .desktopNav span hover all still apply. */



        .navItem {



          position: relative;



        }



        .desktopNav .navItem > .navText {



          display: inline-block;



          outline-offset: 4px;



        }



        .navDropdownPanel {



          position: absolute;



          z-index: 50;



          top: 100%;



          left: -17px;



          padding-top: 11px;



          min-width: 220px;



          display: none;



        }



        .navItem:hover .navDropdownPanel,



        .navItem:focus-within .navDropdownPanel,



        .navItem.navOpen .navDropdownPanel {



          display: block;



        }



        .navDropdownInner {



          padding: 9px 0;



          border: 1px solid rgba(156, 134, 100, 0.18);



          background: rgba(255, 255, 255, 0.99);



          box-shadow: 0 12px 32px rgba(40, 31, 20, 0.09);



        }



        .navDropdownLink {



          display: block;



          width: 100%;



          padding: 10px 17px;



          border: none;



          background: transparent;



          color: #6f685f;



          text-align: left;



          font-family: Arial, sans-serif;



          font-size: 11px;



          font-weight: 400;



          line-height: 1.4;



          letter-spacing: 0.08em;



          white-space: nowrap;



          cursor: pointer;



        }



        .navDropdownLink:hover,



        .navDropdownLink:focus-visible {



          color: #1d1b18;



          background: #faf8f5;



        }



        /* Submenus of the ORIGINAL mobile menu; original type sizes untouched. */



        .mobileSubmenu {



          margin: -18px 0 28px 18px;



          border-left: 1px solid rgba(201, 179, 140, 0.3);



          padding-left: 18px;



        }



        .mobileSubmenuLink {



          display: block;



          width: 100%;



          border: 0;



          padding: 8px 0;



          text-align: left;



          background: transparent;



          color: #e1dbcf;



          font: 14px/1.5 Arial, sans-serif;



          cursor: pointer;



        }



        .mobilePanel.open:has(.mobileSubmenu) {



          overflow-y: auto;



        }



        /* =========================================================



           CONTACT — SAME APPROVED JA LOGO / TEXT ALIGNMENT



           Match the visible height of the name plus two subtitle lines.



           The text line boxes have a few pixels of invisible padding:



           remove 8px from their measured total height, NOT 40% or more.



           Keep the divider 6px shorter than the logo at both ends.



           Mobile header layout stays unchanged.



        ========================================================= */



        @media (min-width: 721px) {



          .contactPage .homeLink > .logo {



            width: auto;



            height: calc(var(--brand-text-height, 86px) - 8px);



            max-width: none;



            flex-shrink: 0;



            align-self: center;



            object-fit: contain;



            margin: 0;



          }



          .contactPage .homeLink > .divider {



            height: calc(var(--brand-text-height, 86px) - 20px);



            align-self: center;



            margin-top: 0;



            flex-shrink: 0;



          }



        }



              /* Persistent gold indicator for the current bottom-navigation route. */



        .bottomNavLink.isActive { color: #9c8664 !important; }



/* EXACT ABOUT REFERENCE: shared brand, header and navigation */



.contactPage .container {



width: min(1680px, 88vw);



          margin: 0 auto;



          /* SAME POSITION AS OTHER APPROVED INTERNAL PAGES */



          padding: clamp(34px, 4vh, 48px) 0 0;



}



.contactPage .header {



display: flex;



          align-items: flex-start;



          justify-content: space-between;



          gap: 22px;



          margin-left: clamp(100px, 7vw, 180px);



          margin-bottom: clamp(102px, 11vh, 140px);



          position: relative;



}



.contactPage .homeLink {



display: flex;



          align-items: flex-start;



          gap: 22px;



          cursor: pointer;



          color: inherit;



          text-decoration: none;



          -webkit-tap-highlight-color: transparent;



}



.contactPage .homeLink:hover {



opacity: 0.96;



}



.contactPage .logo {



width: 90px;



          height: auto;



          display: block;



          object-fit: contain;



          opacity: 1;



}



.contactPage .divider {



width: 1px;



          height: 64px;



          background: rgba(70, 65, 58, 0.22);



          margin-top: 4px;



}



.contactPage .name {



margin: 0;



          font-size: clamp(24px, 2vw, 34px);



          font-weight: 300;



          letter-spacing: 0.22em;



          line-height: 1;



          color: #1d1b18;



}



.contactPage .subtitle {



margin-top: 12px;



          font-family: Arial, sans-serif;



          letter-spacing: 0.28em;



          color: #6f685f;



}



.contactPage .subtitle p {



margin: 4px 0;



          font-size: clamp(10px, 0.85vw, 13px);



}



.contactPage .desktopNav {



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



.contactPage .desktopNav span {



cursor: pointer;



          transition:



            color 0.45s ease,



            transform 0.45s ease;



}



.contactPage .desktopNav span:hover {



color: #1d1b18;



          transform: scale(1.04);



}



.contactPage .footerWrap {



width: min(1680px, 88vw);



          margin: 0 auto;



          padding-bottom: clamp(14px, 2vh, 28px);



}



.contactPage .footerLine {



width: 100%;



          height: 1px;



          background: rgba(0, 0, 0, 0.08);



          margin-bottom: 20px;



}



.contactPage .bottomNav {



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



.contactPage .bottomNavItem {



display: flex;



          align-items: center;



}



.contactPage .bottomNavLink {



cursor: pointer;



          white-space: nowrap;



          transition:



            color 0.45s ease,



            transform 0.45s ease;



}



.contactPage .bottomNavLink:hover {



color: #1d1b18;



          transform: scale(1.08);



}



.contactPage .navDivider {



width: 1px;



          height: clamp(10px, 0.9vw, 14px);



          background:



            rgba(111, 104, 95, 0.25);



          margin-left:



            clamp(4px, 0.7vw, 12px);



          margin-right:



            clamp(4px, 0.7vw, 12px);



}



.contactPage .copyright {



margin-top: 12px;



          text-align: center;



          font-family: Arial, sans-serif;



          font-size: clamp(7px, 0.55vw, 9px);



          letter-spacing: 0.28em;



          text-transform: uppercase;



          color: #b9b2a8;



}



/* In About, the gold logo follows the measured height of the brand text. */



@media (min-width: 721px) {



 .contactPage .homeLink > .logo { width:auto; height:calc(var(--brand-text-height, 86px) - 8px); max-width:none; flex-shrink:0; align-self:center; object-fit:contain; margin:0; }



 .contactPage .homeLink > .divider { height:calc(var(--brand-text-height, 86px) - 20px); align-self:center; margin-top:0; flex-shrink:0; }



}



@media (min-width:721px) and (max-height:900px) {



 .contactPage .container {padding-top:38px;}



 .contactPage .header {margin-bottom:104px;}



 .contactPage .footerLine {margin-bottom:16px;}



 .contactPage .copyright {margin-top:9px;}



 .contactPage .footerWrap {padding-bottom:12px;}



}



@media (min-width:721px) and (max-height:760px) {



 .contactPage .container {padding-top:28px;}



 .contactPage .header {margin-bottom:82px;}



}



@media (max-width:720px) {



 .contactPage .container {width:92vw;padding-top:38px;}



 .contactPage .header {flex-direction:column;align-items:center;gap:0;margin-left:0;margin-bottom:68px;text-align:center;}



 .contactPage .homeLink {flex-direction:column;align-items:center;gap:0;}



 .contactPage .logo {width:76px;height:auto;margin-bottom:26px;}



 .contactPage .divider, .contactPage .desktopNav {display:none;}



 .contactPage .name {font-size:18px;letter-spacing:.18em;}



 .contactPage .subtitle {margin-top:8px;letter-spacing:.26em;}



 .contactPage .subtitle p {font-size:8px;margin:3px 0;}



 .contactPage .footerWrap {display:none;}



}



/* Gold active item: COLOR ONLY. No changes to font, weight, scale or spacing. */



.contactPage .desktopNav .navText.isCurrent,



.contactPage .desktopNav .navCurrent,



.contactPage .bottomNavLink.isActive {color:#9C8664 !important;}



        /* JA logo — restore original About width; do not resize navigation text. */



        @media (min-width: 721px) {



          .contactPage .homeLink > .logo { width: 90px; height: auto; max-width: none; }



        }



        @media (min-width: 721px) and (max-height: 900px) {



          .contactPage .homeLink > .logo { width: 82px; height: auto; }



        }



        @media (min-width: 721px) and (max-height: 760px) {



          .contactPage .homeLink > .logo { width: 74px; height: auto; }



        }



        @media (max-width: 720px) {



          .contactPage .homeLink > .logo { width: 76px; height: auto; }



        }



/* EXACT HEADER AND FOOTER CSS FROM USER-SUPPLIED ABOUT; NEVER MODIFY THESE DIMENSIONS */



.contactPage .container {



          width: min(1680px, 88vw);



          margin: 0 auto;



          padding: clamp(34px, 4vh, 48px) 0 0;



        }



.contactPage .header {



          display: flex;



          align-items: flex-start;



          justify-content: space-between;



          gap: 22px;



          margin-left: clamp(100px, 7vw, 180px);



          margin-bottom: clamp(102px, 11vh, 140px);



          position: relative;



        }



.contactPage .homeLink {



          display: flex;



          align-items: flex-start;



          gap: 22px;



          cursor: pointer;



          color: inherit;



          text-decoration: none;



          -webkit-tap-highlight-color: transparent;



        }



.contactPage .homeLink:hover {



          opacity: 0.96;



        }



.contactPage .logo {



          width: 90px;



          height: auto;



          display: block;



          object-fit: contain;



          opacity: 1;



        }



.contactPage .divider {



          width: 1px;



          height: 64px;



          background: rgba(70, 65, 58, 0.22);



          margin-top: 4px;



        }



.contactPage .name {



          margin: 0;



          font-size: clamp(24px, 2vw, 34px);



          font-weight: 300;



          letter-spacing: 0.22em;



          line-height: 1;



          color: #1d1b18;



        }



.contactPage .subtitle {



          margin-top: 12px;



          font-family: Arial, sans-serif;



          letter-spacing: 0.28em;



          color: #6f685f;



        }



.contactPage .subtitle p {



          margin: 4px 0;



          font-size: clamp(10px, 0.85vw, 13px);



        }



.contactPage .desktopNav {



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



.contactPage .desktopNav span {



          cursor: pointer;



          transition:



            color 0.45s ease,



            transform 0.45s ease;



        }



.contactPage .desktopNav span:hover {



          color: #1d1b18;



          transform: scale(1.04);



        }



.contactPage .footerWrap {



          width: min(1680px, 88vw);



          margin: 0 auto;



          padding-bottom: clamp(14px, 2vh, 28px);



        }



.contactPage .footerLine {



          width: 100%;



          height: 1px;



          background: rgba(0, 0, 0, 0.08);



          margin-bottom: 20px;



        }



.contactPage .bottomNav {



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



.contactPage .bottomNavItem {



          display: flex;



          align-items: center;



        }



.contactPage .bottomNavLink {



          cursor: pointer;



          white-space: nowrap;



          transition:



            color 0.45s ease,



            transform 0.45s ease;



        }



.contactPage .bottomNavLink:hover {



          color: #1d1b18;



          transform: scale(1.08);



        }



.contactPage .navDivider {



          width: 1px;



          height: clamp(10px, 0.9vw, 14px);



          background:



            rgba(111, 104, 95, 0.25);



          margin-left:



            clamp(4px, 0.7vw, 12px);



          margin-right:



            clamp(4px, 0.7vw, 12px);



        }



.contactPage .copyright {



          margin-top: 12px;



          text-align: center;



          font-family: Arial, sans-serif;



          font-size: clamp(7px, 0.55vw, 9px);



          letter-spacing: 0.28em;



          text-transform: uppercase;



          color: #b9b2a8;



        }



@media  (min-width: 721px) and (max-height: 900px)  {



.contactPage .container {



            padding-top: 38px;



          }



.contactPage .header {



            margin-bottom: 104px;



          }



.contactPage .logo {



            width: 82px;



          }



.contactPage .divider {



            height: 58px;



          }



.contactPage .footerLine {



            margin-bottom: 16px;



          }



.contactPage .copyright {



            margin-top: 9px;



          }



.contactPage .footerWrap {



            padding-bottom: 12px;



          }



}



@media  (min-width: 721px) and (max-height: 760px)  {



.contactPage .container {



            padding-top: 28px;



          }



.contactPage .header {



            margin-bottom: 82px;



          }



.contactPage .logo {



            width: 74px;



          }



}



@media  (max-width: 720px)  {



.contactPage .container {



            width: 92vw;



            padding-top: 38px;



          }



.contactPage .header {



            flex-direction: column;



            align-items: center;



            gap: 0;



            margin-left: 0;



            margin-bottom: 68px;



            text-align: center;



          }



.contactPage .homeLink {



            flex-direction: column;



            align-items: center;



            gap: 0;



          }



.contactPage .logo {



            width: 76px;



            margin-bottom: 26px;



          }



.contactPage .divider, .contactPage .desktopNav {



            display: none;



          }



.contactPage .name {



            font-size: 18px;



            letter-spacing: 0.18em;



          }



.contactPage .subtitle {



            margin-top: 8px;



            letter-spacing: 0.26em;



          }



.contactPage .subtitle p {



            font-size: 8px;



            margin: 3px 0;



          }



.contactPage .footerWrap {



            display: none;



          }



}



.contactPage .navItem { position: relative; }



.contactPage .desktopNav .navText { display: inline-block; outline-offset: 4px; }



.contactPage .navDropdownPanel {



          position: absolute;



          z-index: 50;



          top: 100%;



          left: 50%;



          transform: translate(-50%, -10px);



          padding-top: 11px;



          min-width: 0;



          width: max-content;



          max-width: min(85vw, 360px);



          display: block;



          opacity: 0;



          visibility: hidden;



          pointer-events: none;



          transition: opacity 350ms ease, transform 350ms cubic-bezier(.22, 1, .36, 1), visibility 350ms;



        }



.contactPage .navItem.navOpen .navDropdownPanel {



          opacity: 1;



          visibility: visible;



          pointer-events: auto;



          transform: translate(-50%, 0);



        }



@media  (prefers-reduced-motion: reduce)  {



.contactPage .navDropdownPanel { transition: none; }



}



.contactPage .navDropdownInner {



          padding: 9px 0; border: 1px solid rgba(156,134,100,.18);



          background: rgba(255,255,255,.99);



          box-shadow: 0 12px 32px rgba(40,31,20,.09);



        }



.contactPage .navDropdownLink {



          display: block; width: 100%; padding: 10px 17px;



          border: 0; background: transparent; color: #6f685f;



          text-align: left; font: 400 11px/1.4 Arial,sans-serif;



          letter-spacing: .08em; white-space: nowrap; cursor: pointer;



        }



.contactPage .navDropdownLink:hover, .contactPage .navDropdownLink:focus-visible {



          color: #1d1b18; background: #faf8f5;



        }



@media  (min-width: 721px)  {



.contactPage .homeLink > .logo {



            width: auto;



            height: calc(var(--brand-text-height, 86px) - 8px);



            max-width: none;



            flex-shrink: 0;



            align-self: center;



            object-fit: contain;



            margin: 0;



          }



.contactPage .homeLink > .divider {



            height: calc(var(--brand-text-height, 86px) - 20px);



            align-self: center;



            margin-top: 0;



            flex-shrink: 0;



          }



}



/* Navigation active state affects COLOR ONLY */



.contactPage .desktopNav .activeNav, .contactPage .desktopNav .navActive, .contactPage .desktopNav .navText.activeNav, .contactPage .desktopNav .navText.navActive, .contactPage .bottomNav .activeNav, .contactPage .bottomNav .navActive { color: #9C8664; }



        /* ACTIVE PAGE ONLY — color and scale; preserve approved About typography,



           logo geometry, spacing and all existing layout rules. */



        .desktopNav .navText.isCurrent,



        .desktopNav .navCurrent {



          color: #9C8664 !important;



          transform: scale(1.08);



          transform-origin: center center;



        }



        .desktopNav .navCurrent { display: inline-block; }



        .bottomNav .bottomNavLink.isActive {



          color: #9C8664 !important;



          transform: scale(1.08);



          transform-origin: center center;



        }



      
        /* MOBILE NAVIGATION REFINEMENT — never changes desktop header/layout. */
        @media (max-width: 720px) {
          .contactPage .hamburger {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 12px;
            right: 12px;
            width: 56px;
            height: 52px;
            margin: 0;
            border: 0;
            background: transparent;
            z-index: 1300;
            -webkit-tap-highlight-color: transparent;
          }
          .contactPage .hamburger span {
            position: absolute;
            display: block;
            width: 38px;
            height: 1.5px;
            margin: 0;
            background: #1d1b18;
            left: 9px;
            top: 25px;
            transform-origin: center;
            transition: transform 480ms cubic-bezier(.22,.61,.36,1),
                        opacity 260ms ease, background-color 340ms ease;
          }
          .contactPage .hamburger span:nth-child(1) { transform: translateY(-11px); }
          .contactPage .hamburger span:nth-child(2) { transform: translateY(-3.7px); }
          .contactPage .hamburger span:nth-child(3) { transform: translateY(3.7px); }
          .contactPage .hamburger span:nth-child(4) { transform: translateY(11px); }
          .contactPage .hamburger.isOpen span { background: #e1dbcf; }
          .contactPage .hamburger.isOpen span:nth-child(1) { transform: rotate(45deg); }
          .contactPage .hamburger.isOpen span:nth-child(2) { transform: scaleX(.55); opacity: 0; }
          .contactPage .hamburger.isOpen span:nth-child(3) { transform: scaleX(.55); opacity: 0; }
          .contactPage .hamburger.isOpen span:nth-child(4) { transform: rotate(-45deg); }
          .contactPage .hamburger:focus-visible {
            outline: 1px solid #9C8664;
            outline-offset: 1px;
          }
          .contactPage .mobileOverlay { z-index: 1100; }
          .contactPage .mobilePanel {
            z-index: 1200;
            height: 100vh;
            height: 100dvh;
            padding: 92px 34px max(30px, env(safe-area-inset-bottom));
            overflow-y: auto;
            overscroll-behavior: contain;
            -webkit-overflow-scrolling: touch;
            transition: transform 480ms cubic-bezier(.22,.61,.36,1);
            visibility: hidden;
            transition: transform 480ms cubic-bezier(.22,.61,.36,1), visibility 480ms;
          }
          .contactPage .mobilePanel.open { visibility: visible; }
          .contactPage .mobileMenuItem {
            display: block;
            width: 100%;
            text-align: left;
            border: 0;
            background: transparent;
            padding: 0;
            margin: 0 0 31px;
            font-family: "Times New Roman", Georgia, serif;
            font-size: clamp(20px, 5.5vw, 30px);
            font-weight: 400;
            color: #d4cec2;
            line-height: 1.22;
            letter-spacing: .04em;
            cursor: pointer;
          }
          .contactPage .mobileMenuItem:hover,
          .contactPage .mobileMenuItem:focus-visible { color: #c9b38c; }
          .contactPage .mobileMenuItem.isContact { color: #c9b38c; }
          .contactPage .mobileMenuItem:focus-visible,
          .contactPage .mobileSubmenuLink:focus-visible {
            outline: 1px solid #c9b38c;
            outline-offset: 4px;
          }
          /* Slow editorial accordion: always mounted, smoothly animates its height. */
          .contactPage .mobileMenuItem.hasSubmenu {
            position: relative;
            padding-right: 20px;
          }
          .contactPage .mobileMenuItem.hasSubmenu::after {
            content: "";
            position: absolute;
            right: 3px;
            top: 8px;
            width: 8px;
            height: 8px;
            border-right: 1px solid #c9b38c;
            border-bottom: 1px solid #c9b38c;
            transform: rotate(45deg);
            transition: transform 650ms cubic-bezier(.22,.61,.36,1);
          }
          .contactPage .mobileMenuItem.hasSubmenu[aria-expanded="true"]::after {
            transform: translateY(4px) rotate(225deg);
          }
          .contactPage .mobileSubmenu {
            display: grid;
            grid-template-rows: 0fr;
            opacity: 0;
            margin: 0 0 0 18px;
            border-left: 1px solid rgba(201,179,140,.3);
            padding-left: 18px;
            transition:
              grid-template-rows 760ms cubic-bezier(.22,.61,.36,1),
              opacity 620ms ease,
              margin-top 760ms cubic-bezier(.22,.61,.36,1),
              margin-bottom 760ms cubic-bezier(.22,.61,.36,1);
          }
          .contactPage .mobileSubmenu.isExpanded {
            grid-template-rows: 1fr;
            opacity: 1;
            margin-top: -18px;
            margin-bottom: 29px;
          }
          .contactPage .mobileSubmenuInner {
            min-height: 0;
            overflow: hidden;
          }
          .contactPage .mobileSubmenuLink {
            opacity: 0;
            transform: translateY(-8px);
            transition: opacity 580ms ease, transform 680ms cubic-bezier(.22,.61,.36,1), color 250ms ease;
          }
          .contactPage .mobileSubmenu.isExpanded .mobileSubmenuLink {
            opacity: 1;
            transform: translateY(0);
          }
          .contactPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(2) { transition-delay: 55ms; }
          .contactPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(3) { transition-delay: 110ms; }
          .contactPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(4) { transition-delay: 165ms; }
          .contactPage.isMobileNavigating {
            opacity: 0;
            transition: opacity 360ms cubic-bezier(.22,.61,.36,1);
            pointer-events: none;
          }
        }
        /* The site-wide UP control belongs behind any open mobile drawer. */
        body[data-mobile-menu-open="true"] .siteBackToTop {
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .contactPage .hamburger span,
          .contactPage .mobilePanel,
          .contactPage .mobileSubmenu,
          .contactPage .mobileSubmenuLink,
          .contactPage .mobileMenuItem.hasSubmenu::after,
          .contactPage.isMobileNavigating { transition: none !important; }
        }

        /* MOBILE HOME COMPOSITION — approved menu remains unchanged.
           Only the brand descriptor and hero carousel size are adjusted. */
        @media (max-width: 720px) {
          /* Distinguish the two brand lines and give the longer second line room. */
          .contactPage .subtitle p:first-child {
            font-size: 10px;
            letter-spacing: 0.26em;
          }
          .contactPage .subtitle p:nth-child(2) {
            font-size: 7.4px;
            letter-spacing: 0.20em;
          }

        }

        /* MOBILE DRAWER ONLY — 7% wider than the original panel (3% less
           widening than the preceding 10% version). Keep the left edge of
           all menu labels fixed at their previously approved screen position. */
        @media (max-width: 720px) {
          .contactPage .mobilePanel {
            width: min(83.46vw, 417.3px);
            padding-left: calc(34px + min(83.46vw, 417.3px) - min(78vw, 390px));
          }
        }


        /* CONTACT / iPHONE ONLY — keep the complete identity block together
           while letting its top overlap the decorative watermark slightly. */
        @media (max-width: 720px) {
          .contactPage .contactIdentityBlock {
            transform: translateY(-26px);
          }
          .contactPage .watermark {
            width: 36vw; /* previously 30vw: +20% */
          }

          /* Four fine dots sit exactly on the existing accordion guide line.
             Border belongs to .mobileSubmenu; links are inset 18px from it. */
          /* The accordion inner wrapper was clipping each dot at the left edge.
             Extend its clipping box LEFT by 24px while preserving the exact
             existing text positions and the height animation. */
          .contactPage .mobileSubmenuInner {
            margin-left: -24px;
            padding-left: 24px;
          }
          .contactPage .mobileSubmenuLink {
            position: relative;
            width: 100%;
          }
          .contactPage .mobileSubmenuLink::before {
            content: "";
            position: absolute;
            top: 50%;
            left: -20.5px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #c9b38c;
            transform: translateY(-50%);
            pointer-events: none;
          }
        }


        /* Consistent approved Sculpture submenu selection feedback on phones. */
        @media (max-width: 720px) {
          .contactPage .mobileSubmenu.isExpanded .mobileSubmenuLink.isSelected {
            color: #fff;
            transform: translateY(0) scale(1.055);
            transform-origin: left center;
            transition: color 140ms ease, transform 140ms ease;
          }
          .contactPage .mobileSubmenuLink.isSelected::before {
            width: 6px;
            height: 6px;
            background: #fff;
            transform: translate(-1px, -50%);
          }
          .contactPage.isMobileNavigating.hasSubmenuSelection {
            transition-duration: 200ms;
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



            ref={brandLockupRef}



            onClick={() => navigate("/")}



          >



            <img



              src="/ja-logo-gold.png"



              alt="JA logo"



              className="logo"



            />



            <div className="divider"></div>



            <div className="brandText" ref={brandTextRef}>



              <h1 className="name">



                ANDREI JILIAEV



              </h1>



              <div className="subtitle">



                <p>Multidisciplinary Designer</p>



                <p>Sculpture · Retail Design · Objects · Jewellery</p>



              </div>



            </div>



          </div>



          <nav className="desktopNav" aria-label="Main navigation">



            <div className={`navItem ${desktopDropdown === "work" ? "navOpen" : ""}`} onMouseEnter={() => setDesktopDropdown("work")} onMouseLeave={() => setDesktopDropdown(null)}>



              <span className={`navText ${activePath === "/work" ? "isCurrent" : ""}`} role="link" tabIndex={0} aria-haspopup="true"



                aria-expanded={desktopDropdown === "work"}



                onClick={() => closeAndNavigate("/work")}



                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); closeAndNavigate("/work"); } }}



              >Selected Work</span>



              <div className="navDropdownPanel">



                <div className="navDropdownInner">



                  {selectedWorkLinks.map((item) => (



                    <button key={item.path} type="button" className="navDropdownLink" onClick={() => closeAndNavigate(item.path)}>



                      {item.label}



                    </button>



                  ))}



                </div>



              </div>



            </div>



            <div className={`navItem ${desktopDropdown === "jewellery" ? "navOpen" : ""}`} onMouseEnter={() => setDesktopDropdown("jewellery")} onMouseLeave={() => setDesktopDropdown(null)}>



              <span className={`navText ${activePath === "/jewellery-design" ? "isCurrent" : ""}`} role="link" tabIndex={0} aria-haspopup="true"



                aria-expanded={desktopDropdown === "jewellery"}



                onClick={() => closeAndNavigate("/jewellery-design")}



                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); closeAndNavigate("/jewellery-design"); } }}



              >Jewellery Design</span>



              <div className="navDropdownPanel">



                <div className="navDropdownInner">



                  {jewelleryLinks.map((item) => (



                    <button key={item.path} type="button" className="navDropdownLink" onClick={() => closeAndNavigate(item.path)}>



                      {item.label}



                    </button>



                  ))}



                </div>



              </div>



            </div>



            <span className={activePath === "/about" ? "navCurrent" : ""} role="link" tabIndex={0} onClick={() => navigate("/about")} onKeyDown={(e) => e.key === "Enter" && navigate("/about")}>About</span>



            <span className={activePath === "/contact" ? "navCurrent" : ""} role="link" tabIndex={0} onClick={() => navigate("/contact")} onKeyDown={(e) => e.key === "Enter" && navigate("/contact")}>Contact</span>



          </nav>



        </header>



      </div>



      {/* =======================================================



          CONTACT



      ======================================================= */}



      <section className="contactWrap">



        {/* DECORATIVE WATERMARK — SAME APPROVED JA AS HEADER */}



        <img



          src="/ja-logo-gold.png"



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



            I collaborate with brands, studios, architects and private clients to



            develop distinctive ideas for sculpture, installations, retail and



            spatial environments, objects and jewellery. My approach combines



            concept development, drawing, CAD design and an understanding of



            materials and fabrication. Whether you have an early idea or a



            detailed brief, I welcome the opportunity to discuss your project.



          </p>



          {/* ===================================================



              PORTFOLIO DOWNLOADS



          =================================================== */}



          <div className="portfolioDownloads">



            <p className="topicLabel">



              Portfolio Downloads



            </p>



            <p className="downloadText">



              Explore two dedicated portfolios: Selected Work, featuring sculpture,

              installations, spatial and retail design, product and object

              design, and concept studies; and Jewellery, presenting jewellery

              design, craftsmanship and related creative development.



            </p>



            <div className="downloadButtons">



              <a



                href="/Andrei-Jiliaev-Selected-Work-Portfolio.pdf"



                download



                className="downloadButton"



              >



                Download Selected Work Portfolio



              </a>



              <a



                href="/Andrei-Jiliaev-Complete-Portfolio.pdf"



                download



                className="downloadButton"



              >



                Download Jewellery Portfolio



              </a>



            </div>



          </div>



          {/* ===================================================



              CONTACT DETAILS



          =================================================== */}



          <div className="contactIdentityBlock">
          <h3 className="contactName">



            Andrei Jiliaev



          </h3>



          <p className="contactRole">



            Multidisciplinary Designer · Creative Consultant



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



                key={item.path}



                className="bottomNavItem"



              >



                <span



                  className={`bottomNavLink ${activePath === item.path ? "isActive" : ""}`}



                  aria-current={activePath === item.path ? "page" : undefined}



                  onClick={(event) => {



                    if (item.label === "Sculpture") {



                      event.stopPropagation();



                      window.location.assign("/sculpture");



                      return;



                    }



                    navigate(item.path);



                  }}



                >



                  {item.label}



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



          MOBILE BUTTON



      ======================================================= */}



      <button
        type="button"
        className={`hamburger${menuOpen ? " isOpen" : ""}`}
        onClick={() => {
          setMenuOpen((wasOpen) => !wasOpen);
          setMobileDropdown(null);
        }}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="contact-mobile-navigation"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>


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
        id="contact-mobile-navigation"
        className={menuOpen ? "mobilePanel open" : "mobilePanel"}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <button
          type="button"
          className="mobileMenuItem hasSubmenu"
          aria-expanded={mobileDropdown === "work"}
          aria-controls="contact-work-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "work" ? null : "work")}
        >SELECTED WORK</button>
        <div
          id="contact-work-submenu"
          className={`mobileSubmenu${mobileDropdown === "work" ? " isExpanded" : ""}`}
          aria-hidden={mobileDropdown !== "work"}
          inert={mobileDropdown !== "work"}
        >
          <div className="mobileSubmenuInner">
            {selectedWorkLinks.map((item) => (
              <button key={item.path} type="button" className={`mobileSubmenuLink${selectedMobileSubLink === item.path ? " isSelected" : ""}`} onClick={() => closeAndNavigate(item.path, true)}>{item.label}</button>
            ))}
          </div>
        </div>

        <button type="button" className="mobileMenuItem" onClick={() => closeAndNavigate("/sculpture")}>SCULPTURE</button>

        <button
          type="button"
          className="mobileMenuItem hasSubmenu"
          aria-expanded={mobileDropdown === "jewellery"}
          aria-controls="contact-jewellery-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "jewellery" ? null : "jewellery")}
        >JEWELLERY DESIGN</button>
        <div
          id="contact-jewellery-submenu"
          className={`mobileSubmenu${mobileDropdown === "jewellery" ? " isExpanded" : ""}`}
          aria-hidden={mobileDropdown !== "jewellery"}
          inert={mobileDropdown !== "jewellery"}
        >
          <div className="mobileSubmenuInner">
            {jewelleryLinks.map((item) => (
              <button key={item.path} type="button" className={`mobileSubmenuLink${selectedMobileSubLink === item.path ? " isSelected" : ""}`} onClick={() => closeAndNavigate(item.path, true)}>{item.label}</button>
            ))}
          </div>
        </div>

        <button type="button" className="mobileMenuItem" onClick={() => closeAndNavigate("/design-process")}>DESIGN & PROCESS</button>
        <button type="button" className="mobileMenuItem" onClick={() => closeAndNavigate("/about")}>ABOUT</button>
        <button type="button" className="mobileMenuItem" onClick={() => closeAndNavigate("/awards")}>AWARDS</button>
        <button type="button" className="mobileMenuItem" onClick={() => closeAndNavigate("/creative-consulting")}>CREATIVE CONSULTING</button>
        <button type="button" className="mobileMenuItem isContact" onClick={() => closeAndNavigate("/contact")}>CONTACT</button>
      </aside>


    </main>



  );



}