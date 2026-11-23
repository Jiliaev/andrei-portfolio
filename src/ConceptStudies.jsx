import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

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

const icons = [

  { image: "/concept-icon-lips.jpg", label: "Lips", caption: "Sensuality & expression" },

  { image: "/concept-icon-leaves.jpg", label: "Leaves", caption: "Organic rhythm & nature" },

  { image: "/concept-icon-fragrance.jpg", label: "Fragrance", caption: "Atmosphere & memory" },

  { image: "/concept-icon-lipstick.jpg", label: "Lipstick", caption: "Colour & identity" },

];

export default function ConceptStudies() {

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const activePath = pathname.replace(/\/+$/, "") || "/";

  const [menuOpen, setMenuOpen] = useState(false);

  const [dropdown, setDropdown] = useState(null);

  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [mobileNavigating, setMobileNavigating] = useState(false);
  const [selectedMobileSubLink, setSelectedMobileSubLink] = useState(null);
  const mobileSelectionFadeTimer = useRef(null);
  const navigationTimer = useRef(null);

  const [developmentLightbox, setDevelopmentLightbox] = useState(null);

  const [lightboxVisible, setLightboxVisible] = useState(false);

  const closeTimerRef = useRef(null);

  const openFrameRef = useRef(null);


  // Closing the mobile drawer on desktop resize also restores scroll locking.
  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const syncViewport = () => {
      if (!media.matches) {
        setMenuOpen(false);
        setMobileDropdown(null);
        setMobileNavigating(false);
        setSelectedMobileSubLink(null);
      }
    };
    syncViewport();
    media.addEventListener?.("change", syncViewport);
    return () => media.removeEventListener?.("change", syncViewport);
  }, []);

  const openDevelopmentLightbox = (payload) => {

    window.clearTimeout(closeTimerRef.current);

    window.cancelAnimationFrame(openFrameRef.current);

    setLightboxVisible(false);

    setDevelopmentLightbox(payload);

    openFrameRef.current = window.requestAnimationFrame(() => {

      openFrameRef.current = window.requestAnimationFrame(() => setLightboxVisible(true));

    });

  };

  const closeDevelopmentLightbox = () => {

    setLightboxVisible(false);

    window.clearTimeout(closeTimerRef.current);

    closeTimerRef.current = window.setTimeout(() => setDevelopmentLightbox(null), 300);

  };

  useEffect(() => () => {

    window.clearTimeout(closeTimerRef.current);

    window.cancelAnimationFrame(openFrameRef.current);

  }, []);

  const brandLockupRef = useRef(null);

  const brandTextRef = useRef(null);

  useLayoutEffect(() => {

    const lockup = brandLockupRef.current;

    const text = brandTextRef.current;

    if (!lockup || !text) return;

    const sync = () => lockup.style.setProperty("--brand-text-height", `${text.getBoundingClientRect().height}px`);

    sync();

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(sync) : null;

    observer?.observe(text);

    window.addEventListener("resize", sync);

    return () => { observer?.disconnect(); window.removeEventListener("resize", sync); };

  }, []);

  // Match the approved Retail/Sculpture lightbox: Escape closes the overlay.

  useEffect(() => {

    if (!developmentLightbox) return undefined;

    const onKeyDown = (event) => {

      if (event.key === "Escape") closeDevelopmentLightbox();

    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);

  }, [developmentLightbox]);

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


  // Cancel pending delayed navigation when the browser history changes.
  // A Back/Forward action must never be superseded by a menu timer.
  const cancelPendingNavigation = () => {
    if (navigationTimer.current !== null) {
      window.clearTimeout(navigationTimer.current);
      navigationTimer.current = null;
    }
    if (mobileSelectionFadeTimer.current !== null) {
      window.clearTimeout(mobileSelectionFadeTimer.current);
      mobileSelectionFadeTimer.current = null;
    }
  };

  useEffect(() => {
    const onHistoryNavigation = () => {
      cancelPendingNavigation();
      setMenuOpen(false);
      setMobileDropdown(null);
      setDropdown(null);
      setMobileNavigating(false);
      setSelectedMobileSubLink(null);
    };
    window.addEventListener("popstate", onHistoryNavigation);
    window.addEventListener("pageshow", onHistoryNavigation);
    return () => {
      window.removeEventListener("popstate", onHistoryNavigation);
      window.removeEventListener("pageshow", onHistoryNavigation);
      cancelPendingNavigation();
    };
  }, []);

  // React Router may reuse the mounted component during a history transition.
  // Clear transient UI state after *any* route change, not only menu clicks.
  useEffect(() => {
    cancelPendingNavigation();
    setMenuOpen(false);
    setMobileDropdown(null);
    setDropdown(null);
    setMobileNavigating(false);
    setSelectedMobileSubLink(null);
  }, [pathname]);

  const closeAndNavigate = (path, isSubmenuSelection = false) => {
    if (navigationTimer.current !== null) return;
    if (path === pathname) {
      setMenuOpen(false);
      setMobileDropdown(null);
      setSelectedMobileSubLink(null);
      return;
    }
    const onPhone = menuOpen && window.matchMedia("(max-width: 720px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const originPath = window.location.pathname;
    const completeNavigation = () => {
      navigationTimer.current = null;
      // If browser Back/Forward already changed the route, do not override it.
      if (window.location.pathname !== originPath) return;
      setMenuOpen(false);
      setMobileDropdown(null);
      setDropdown(null);
      setSelectedMobileSubLink(null);
      setMobileNavigating(false);
      navigate(path);
    };
    if (onPhone && !reducedMotion) {
      if (isSubmenuSelection) {
        setSelectedMobileSubLink(path);
        mobileSelectionFadeTimer.current = window.setTimeout(() => {
          mobileSelectionFadeTimer.current = null;
          if (window.location.pathname === originPath) setMobileNavigating(true);
        }, 190);
        navigationTimer.current = window.setTimeout(completeNavigation, 390);
      } else {
        setMobileNavigating(true);
        navigationTimer.current = window.setTimeout(completeNavigation, 360);
      }
      return;
    }
    completeNavigation();
  };

  const go = (path) => {
    cancelPendingNavigation();
    setMenuOpen(false);
    setDropdown(null);
    setMobileDropdown(null);
    setMobileNavigating(false);
    setSelectedMobileSubLink(null);
    // Always use React Router, including Sculpture, so browser history works.
    if (path !== pathname) navigate(path);
  };

  const workActive = activePath === "/work" || activePath === "/concept-studies" || selectedWorkLinks.some(x => x.path === activePath);

  const jewelActive = activePath === "/jewellery-design" || jewelleryLinks.some(x => x.path === activePath);

  return (

    <main className={`conceptPage${mobileNavigating ? " isMobileNavigating" : ""}${selectedMobileSubLink ? " hasSubmenuSelection" : ""}`}>

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');

        /* Same document-edge reset as Home. Without it, the browser's default
           8px body margin can push the entire Concept Studies header down. */
        html, body, #root { margin: 0; min-height: 100%; background: #ffffff; }
        body { margin: 0; background: #ffffff; }

        .conceptPage, .conceptPage * { box-sizing: border-box; }

        .conceptPage { min-height:100vh; background:#fff; color:#1d1b18; font-family:"Times New Roman",Georgia,serif; overflow-x:hidden; }

        .conceptPage .container { width:min(1680px,88vw); margin:0 auto; padding:clamp(34px,4vh,48px) 0 0; }

        .conceptPage .header { display:flex; align-items:flex-start; justify-content:space-between; gap:22px; margin-left:clamp(100px,7vw,180px); margin-bottom:clamp(102px,11vh,140px); position:relative; }

        .conceptPage .homeLink { display:flex; align-items:flex-start; gap:22px; cursor:pointer; color:inherit; text-decoration:none; -webkit-tap-highlight-color:transparent; }

        .conceptPage .homeLink:hover { opacity:.96; }

        .conceptPage .logo { width:90px; height:auto; display:block; object-fit:contain; opacity:1; }

        .conceptPage .divider { width:1px; height:64px; background:rgba(70,65,58,.22); margin-top:4px; }

        .conceptPage .name { margin:0; font-size:clamp(24px,2vw,34px); font-weight:300; letter-spacing:.22em; line-height:1; color:#1d1b18; }

        .conceptPage .subtitle { margin-top:12px; font-family:Arial,sans-serif; letter-spacing:.28em; color:#6f685f; }

        .conceptPage .subtitle p { margin:4px 0; font-size:clamp(10px,.85vw,13px); }

        .conceptPage .desktopNav { display:flex; gap:34px; margin-right:clamp(40px,5vw,120px); font-family:Arial,sans-serif; font-size:clamp(8px,.8vw,12px); letter-spacing:.18em; text-transform:uppercase; color:#6f685f; white-space:nowrap; }

        .conceptPage .navItem { position:relative; }

        .conceptPage .navText { display:inline-block; cursor:pointer; transition:color .45s ease,transform .45s ease; }

        .conceptPage .navText:hover { color:#1d1b18; transform:scale(1.04); }

        .conceptPage .navText.isCurrent, .conceptPage .bottomNavLink.isActive { color:#9C8664 !important; }

        .conceptPage .navText.isCurrent { transform:none; }

        .conceptPage .navDropdownPanel { position:absolute; left:50%; top:100%; z-index:50; padding-top:11px; width:max-content; max-width:min(85vw,360px); transform:translate(-50%,-10px); opacity:0; visibility:hidden; pointer-events:none; transition:opacity .35s ease,transform .35s ease,visibility .35s; }

        .conceptPage .navItem.open .navDropdownPanel { opacity:1; visibility:visible; pointer-events:auto; transform:translate(-50%,0); }

        .conceptPage .navDropdownInner { padding:9px 0; background:rgba(255,255,255,.99); border:1px solid rgba(156,134,100,.18); box-shadow:0 12px 32px rgba(40,31,20,.09); }

        .conceptPage .navDropdownLink { display:block; width:100%; padding:10px 17px; border:0; background:transparent; font:400 11px/1.4 Arial,sans-serif; letter-spacing:.08em; text-align:left; white-space:nowrap; color:#6f685f; cursor:pointer; }

        .conceptPage .navDropdownLink:hover { color:#1d1b18; background:#faf8f5; }

        @media (min-width:721px) {

          .conceptPage .homeLink>.logo { width:auto; height:calc(var(--brand-text-height,86px) - 8px); max-width:none; flex-shrink:0; align-self:center; margin:0; }

          .conceptPage .homeLink>.divider { height:calc(var(--brand-text-height,86px) - 20px); align-self:center; margin-top:0; flex-shrink:0; }

        }

        .conceptPage .editorial { width:min(1180px,86vw); margin:0 auto; padding:0 0 42px; }

        .conceptPage .intro, .conceptPage .process { display:grid; grid-template-columns:minmax(0, 1fr) minmax(0, 1fr); gap:78px; align-items:center; }

        .conceptPage .heroPhoto,.conceptPage .sketchPhoto { display:block; width:100%; height:auto; }

        .conceptPage .copy { max-width:590px; min-width:0; }

        .conceptPage .goldLabel { display:flex; align-items:center; gap:14px; margin:0 0 22px; padding-left:.38em; font:400 13px/1.1 Arial,sans-serif; letter-spacing:.38em; text-transform:uppercase; color:#9C8664; }

        .conceptPage .goldLabel::after { content:""; height:1px; flex:1; background:rgba(70,65,58,.14); }

        .conceptPage .introTitle { margin:0 0 34px; font:400 clamp(30px,2.45vw,44px)/1.12 "Cormorant Garamond",Georgia,serif; letter-spacing:.14em; text-transform:uppercase; color:#2A2723; }

        .conceptPage .copy p, .conceptPage .processCopy p { margin:0 0 20px; font:300 17px/1.82 "Times New Roman",Georgia,serif; letter-spacing:normal; color:#3F3933; }

        .conceptPage .rule { border:0; border-top:1px solid rgba(0,0,0,.08); margin:72px 0; }

        .conceptPage .inspirationRow { display:grid; grid-template-columns:minmax(0,1.08fr) minmax(0,1fr); gap:78px; align-items:start; }

        .conceptPage .inspirationImg { display:block; width:88%; max-width:100%; height:auto; margin-top:24px; }

        .conceptPage .keyElements { border-left:1px solid rgba(70,65,58,.14); padding-left:36px; }

        .conceptPage .iconRow { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; text-align:center; margin-top:24px; }

        .conceptPage .iconRow img { width:100%; max-width:68px; aspect-ratio:1/1; object-fit:contain; }

        .conceptPage .iconRow strong { display:block; font:400 10px/1.4 Arial,sans-serif; letter-spacing:.17em; text-transform:uppercase; margin-top:10px; color:#1d1b18; }

        .conceptPage .iconRow small { display:block; font:300 13px/1.55 "Times New Roman",Georgia,serif; color:#6C6258; margin-top:7px; }

        .conceptPage .process { grid-template-columns:minmax(0,1.14fr) minmax(0,.86fr); align-items:stretch; gap:48px; }

        .conceptPage .processCopy { display:flex; flex-direction:column; min-width:0; }

        .conceptPage .processSketch { display:flex; align-items:flex-end; justify-content:flex-end; min-width:0; }

        .conceptPage .processSketch .sketchPhoto { width:min(100%, 440.8px, calc(34.4vw - 31.2px)); height:auto; margin:0 0 0 auto; }

        .conceptPage .processHeading { margin:0 0 34px; font:400 clamp(30px,2.45vw,44px)/1.12 "Cormorant Garamond",Georgia,serif; letter-spacing:.14em; text-transform:uppercase; color:#2A2723; }

        .conceptPage .processCopy p:last-of-type { margin-bottom:10px; }

        /* Concept Development — 95% of the text-column width, centered.

           Keep the button bottom-anchored so the left image and the unchanged

           right sketch remain aligned along their lower edges. */

        .conceptPage .developmentStripButton {

          display:block; width:95%; margin:auto auto 0; padding:0;

          border:0; background:transparent; cursor:zoom-in; overflow:hidden;

        }

        .conceptPage .developmentStrip {

          display:block; width:100%; max-width:100%; height:auto; margin:0;

          transform:scale(1); transform-origin:center center;

          transition:transform 360ms cubic-bezier(.22,.61,.36,1);

        }

        @media (hover:hover) and (pointer:fine) {

          .conceptPage .developmentStripButton:hover .developmentStrip { transform:scale(1.012); }

        }

        .conceptPage .developmentStripButton:focus-visible { outline:1px solid #9C8664; outline-offset:5px; }

        .conceptPage .developmentStripButton:focus-visible .developmentStrip { transform:scale(1.012); }

        /* Click enlarges by 40% of displayed size, with the same viewport caps

           and dark overlay as Spatial & Retail Design. No original-file link. */

        .conceptPage .developmentLightbox {

          position:fixed; inset:0; z-index:3000;

          background:rgba(17,16,15,.94); cursor:zoom-out;

        }

        .conceptPage .developmentLightbox img {

          position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);

          max-width:calc(100vw - 44px); max-height:calc(100vh - 175px);

          object-fit:contain; cursor:default;

        }

        .conceptPage .developmentLightbox p {

          position:absolute; bottom:54px; left:22px; right:22px; margin:0;

          color:#e0d9cd; text-align:center;

          font:11px/1.5 Arial,sans-serif; letter-spacing:.13em; text-transform:uppercase;

        }

        .conceptPage .developmentLightboxClose {

          position:absolute; top:15px; right:25px; z-index:1;

          border:0; background:transparent; color:#fff; font-size:40px; cursor:pointer;

        }

        @media (prefers-reduced-motion:reduce) {

          .conceptPage .developmentStrip { transition:none; }

          .conceptPage .developmentStripButton:hover .developmentStrip,

          .conceptPage .developmentStripButton:focus-visible .developmentStrip { transform:none; }

        }

        .conceptPage .centerHeading { display:flex; gap:24px; align-items:center; justify-content:center; margin:108px auto 14px; font:400 clamp(30px,2.45vw,44px)/1.12 "Cormorant Garamond",Georgia,serif; letter-spacing:.14em; text-transform:uppercase; text-align:center; color:#2A2723; }

        .conceptPage .centerHeading::before,.conceptPage .centerHeading::after { content:""; flex:1; max-width:120px; height:1px; background:rgba(0,0,0,.08); }

        .conceptPage .centerSubtitle { margin:0 auto 48px; text-align:center; font:300 clamp(18px,1.45vw,23px)/1.4 "Cormorant Garamond",Georgia,serif; letter-spacing:.04em; color:#6C6258; }

        .conceptPage .finalFeature { width:min(1180px,86vw); margin:0 auto; display:grid; grid-template-columns:52% 48%; background:#0c0605; }

        .conceptPage .finalCopy { color:#fff; padding:clamp(28px,4vw,64px); display:flex; flex-direction:column; justify-content:center; }

        .conceptPage .finalCopy::before { content:""; display:block; width:70px; height:1px; background:#bfa27b; margin-bottom:23px; }

        .conceptPage .finalCopy h3 { font:400 clamp(30px,2.45vw,44px)/1.12 "Cormorant Garamond",Georgia,serif; letter-spacing:.14em; text-transform:uppercase; margin:0 0 34px; }

        .conceptPage .finalCopy p { font:300 17px/1.82 "Times New Roman",Georgia,serif; color:#e6dfd4; margin:0 0 20px; }

        .conceptPage .finalCopy p:last-child { margin-bottom:0; }

        .conceptPage .finalImage { width:100%; height:100%; min-height:540px; object-fit:cover; object-position:center center; display:block; }

        .conceptPage .footerWrap { width:min(1680px,88vw); margin:110px auto 0; padding-bottom:clamp(14px,2vh,28px); }

        .conceptPage .footerLine { width:100%; height:1px; background:rgba(0,0,0,.08); margin-bottom:20px; }

        .conceptPage .bottomNav { display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:0; padding-bottom:5px; font-family:Arial,sans-serif; font-size:clamp(8px,.8vw,12px); letter-spacing:.18em; text-transform:uppercase; color:#6f685f; }

        .conceptPage .bottomNavItem { display:flex; align-items:center; }

        .conceptPage .bottomNavLink { cursor:pointer; white-space:nowrap; transition:color .3s,transform .3s; }

        .conceptPage .bottomNavLink:hover { color:#1d1b18; transform:scale(1.08); }

        .conceptPage .bottomNavLink.isActive { display:inline-block; transform:none; }

        .conceptPage .navDivider { width:1px; height:clamp(10px,.9vw,14px); background:rgba(111,104,95,.25); margin-left:clamp(4px,.7vw,12px); margin-right:clamp(4px,.7vw,12px); }

        .conceptPage .copyright { margin-top:12px; text-align:center; font:clamp(7px,.55vw,9px) Arial,sans-serif; letter-spacing:.28em; text-transform:uppercase; color:#b9b2a8; }

        .conceptPage .hamburger { display:none; position:fixed; top:18px; right:18px; width:48px; height:38px; border:0; background:transparent; z-index:100; cursor:pointer; }

        .conceptPage .hamburger span { display:block; width:44px; height:1.5px; margin:7px 0; background:#1d1b18; }

        .conceptPage .mobileOverlay { position:fixed; inset:0; background:rgba(0,0,0,.35); z-index:101; }

        .conceptPage .mobilePanel { position:fixed; right:0; top:0; bottom:0; width:min(85vw,390px); overflow-y:auto; background:#26211c; color:#e6dfd4; z-index:102; padding:34px; }

        .conceptPage .mobileClose { display:block; border:0; background:transparent; color:#fff; margin:0 0 36px auto; font-size:32px; cursor:pointer; }

        .conceptPage .mobileMenuItem,.conceptPage .mobileSubItem { display:block; width:100%; border:0; background:transparent; color:inherit; text-align:left; cursor:pointer; }

        .conceptPage .mobileMenuItem { font:24px/1.4 "Times New Roman",Georgia,serif; margin:20px 0; }

        .conceptPage .mobileSubItem { padding:9px 15px; color:#d5bea0; font:13px/1.4 Arial,sans-serif; }

        @media (min-width:721px) and (max-height:900px) {

          .conceptPage .container { padding-top:38px; } .conceptPage .header { margin-bottom:104px; }

          .conceptPage .logo { width:82px; } .conceptPage .divider { height:58px; }

          .conceptPage .footerLine { margin-bottom:16px; } .conceptPage .copyright { margin-top:9px; } .conceptPage .footerWrap { padding-bottom:12px; }

        }

        @media (min-width:721px) and (max-height:760px) {

          .conceptPage .container { padding-top:28px; } .conceptPage .header { margin-bottom:82px; } .conceptPage .logo { width:74px; }

        }

        @media (min-width:721px) and (max-width:1180px) {

          .conceptPage .intro, .conceptPage .process { gap:40px; }

          .conceptPage .inspirationRow { gap:32px; }

          .conceptPage .finalCopy { padding:28px; }

        }

        @media (max-width:980px) and (min-width:721px) {

          /* Header dimensions remain identical to About at this breakpoint. */

          .conceptPage .inspirationRow { grid-template-columns:1fr; }

          .conceptPage .keyElements { border-left:0; padding-left:0; }

        }

        @media (max-width:720px) {

          .conceptPage .container { width:92vw; padding-top:38px; }

          .conceptPage .header { flex-direction:column; align-items:center; gap:0; margin:0 0 68px; text-align:center; }

          .conceptPage .homeLink { flex-direction:column; align-items:center; gap:0; }

          .conceptPage .logo { width:76px; margin-bottom:26px; }

          .conceptPage .divider,.conceptPage .desktopNav { display:none; }

          .conceptPage .name { font-size:18px; letter-spacing:.18em; }

          .conceptPage .subtitle { margin-top:8px; letter-spacing:.26em; }

          .conceptPage .subtitle p { font-size:8px; margin:3px 0; }

          .conceptPage .hamburger { display:block; }

          .conceptPage .editorial { width:88vw; }

          .conceptPage .intro,.conceptPage .process,.conceptPage .inspirationRow { grid-template-columns:1fr; gap:35px; }

          .conceptPage .introTitle, .conceptPage .processHeading, .conceptPage .centerHeading { font-size:28px; letter-spacing:.11em; line-height:1.12; }

          .conceptPage .goldLabel { font-size:12px; letter-spacing:.34em; padding-left:.34em; }

          .conceptPage .copy p,.conceptPage .processCopy p,.conceptPage .finalCopy p { font-size:17px; line-height:1.82; }

          .conceptPage .process { display:flex; flex-direction:column; align-items:stretch; }

          .conceptPage .processCopy { display:block; }

          .conceptPage .processSketch { display:block; }

          .conceptPage .developmentStripButton { width:95%; margin:12px auto 0; }

          .conceptPage .processSketch { order:1; } .conceptPage .processCopy { order:0; }

          .conceptPage .keyElements { border-left:0; padding-left:0; }

          .conceptPage .iconRow { gap:7px; }

          .conceptPage .iconRow small { font-size:11px; line-height:1.5; }

          .conceptPage .iconRow img { max-width:58px; }

          .conceptPage .inspirationImg { width:100%; }

          .conceptPage .processSketch .sketchPhoto { width:80%; margin:0 auto; }

          .conceptPage .centerHeading { margin:80px auto 12px; gap:12px; }

          .conceptPage .centerSubtitle { margin-bottom:36px; font-size:18px; }

          .conceptPage .centerHeading::before,.conceptPage .centerHeading::after { max-width:30px; }

          .conceptPage .finalFeature { width:88vw; grid-template-columns:1fr; }

          .conceptPage .finalCopy { padding:36px 30px; }

          .conceptPage .finalCopy h3 { font-size:28px; letter-spacing:.11em; }

          .conceptPage .finalImage { min-height:0; height:auto; object-fit:contain; }

          .conceptPage .footerWrap { display:none; }

        }

        /* JA logo: FINAL About reference values, including responsive overrides. */

        @media (min-width:721px) {

          .conceptPage .homeLink > .logo { width:90px; height:auto; max-width:none; }

        }

        @media (min-width:721px) and (max-height:900px) {

          .conceptPage .homeLink > .logo { width:82px; height:auto; }

        }

        @media (min-width:721px) and (max-height:760px) {

          .conceptPage .homeLink > .logo { width:74px; height:auto; }

        }

        @media (max-width:720px) {

          .conceptPage .homeLink > .logo { width:76px; height:auto; }

        }

        /* EXACT HEADER AND FOOTER CSS FROM USER-SUPPLIED ABOUT; NEVER MODIFY THESE DIMENSIONS */

.conceptPage .container {

          width: min(1680px, 88vw);

          margin: 0 auto;

          padding: clamp(34px, 4vh, 48px) 0 0;

        }

.conceptPage .header {

          display: flex;

          align-items: flex-start;

          justify-content: space-between;

          gap: 22px;

          margin-left: clamp(100px, 7vw, 180px);

          margin-bottom: clamp(102px, 11vh, 140px);

          position: relative;

        }

.conceptPage .homeLink {

          display: flex;

          align-items: flex-start;

          gap: 22px;

          cursor: pointer;

          color: inherit;

          text-decoration: none;

          -webkit-tap-highlight-color: transparent;

        }

.conceptPage .homeLink:hover {

          opacity: 0.96;

        }

.conceptPage .logo {

          width: 90px;

          height: auto;

          display: block;

          object-fit: contain;

          opacity: 1;

        }

.conceptPage .divider {

          width: 1px;

          height: 64px;

          background: rgba(70, 65, 58, 0.22);

          margin-top: 4px;

        }

.conceptPage .name {

          margin: 0;

          font-size: clamp(24px, 2vw, 34px);

          font-weight: 300;

          letter-spacing: 0.22em;

          line-height: 1;

          color: #1d1b18;

        }

.conceptPage .subtitle {

          margin-top: 12px;

          font-family: Arial, sans-serif;

          letter-spacing: 0.28em;

          color: #6f685f;

        }

.conceptPage .subtitle p {

          margin: 4px 0;

          font-size: clamp(10px, 0.85vw, 13px);

        }

.conceptPage .desktopNav {

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

.conceptPage .desktopNav span {

          cursor: pointer;

          transition:

            color 0.45s ease,

            transform 0.45s ease;

        }

.conceptPage .desktopNav span:hover {

          color: #1d1b18;

          transform: scale(1.04);

        }

.conceptPage .footerWrap {

          width: min(1680px, 88vw);

          margin: 0 auto;

          padding-bottom: clamp(14px, 2vh, 28px);

        }

.conceptPage .footerLine {

          width: 100%;

          height: 1px;

          background: rgba(0, 0, 0, 0.08);

          margin-bottom: 20px;

        }

.conceptPage .bottomNav {

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

.conceptPage .bottomNavItem {

          display: flex;

          align-items: center;

        }

.conceptPage .bottomNavLink {

          cursor: pointer;

          white-space: nowrap;

          transition:

            color 0.45s ease,

            transform 0.45s ease;

        }

.conceptPage .bottomNavLink:hover {

          color: #1d1b18;

          transform: scale(1.08);

        }

.conceptPage .navDivider {

          width: 1px;

          height: clamp(10px, 0.9vw, 14px);

          background:

            rgba(111, 104, 95, 0.25);

          margin-left:

            clamp(4px, 0.7vw, 12px);

          margin-right:

            clamp(4px, 0.7vw, 12px);

        }

.conceptPage .copyright {

          margin-top: 12px;

          text-align: center;

          font-family: Arial, sans-serif;

          font-size: clamp(7px, 0.55vw, 9px);

          letter-spacing: 0.28em;

          text-transform: uppercase;

          color: #b9b2a8;

        }

@media  (min-width: 721px) and (max-height: 900px)  {

.conceptPage .container {

            padding-top: 38px;

          }

.conceptPage .header {

            margin-bottom: 104px;

          }

.conceptPage .logo {

            width: 82px;

          }

.conceptPage .divider {

            height: 58px;

          }

.conceptPage .footerLine {

            margin-bottom: 16px;

          }

.conceptPage .copyright {

            margin-top: 9px;

          }

.conceptPage .footerWrap {

            padding-bottom: 12px;

          }

}

@media  (min-width: 721px) and (max-height: 760px)  {

.conceptPage .container {

            padding-top: 28px;

          }

.conceptPage .header {

            margin-bottom: 82px;

          }

.conceptPage .logo {

            width: 74px;

          }

}

@media  (max-width: 720px)  {

.conceptPage .container {

            width: 92vw;

            padding-top: 38px;

          }

.conceptPage .header {

            flex-direction: column;

            align-items: center;

            gap: 0;

            margin-left: 0;

            margin-bottom: 68px;

            text-align: center;

          }

.conceptPage .homeLink {

            flex-direction: column;

            align-items: center;

            gap: 0;

          }

.conceptPage .logo {

            width: 76px;

            margin-bottom: 26px;

          }

.conceptPage .divider, .conceptPage .desktopNav {

            display: none;

          }

.conceptPage .name {

            font-size: 18px;

            letter-spacing: 0.18em;

          }

.conceptPage .subtitle {

            margin-top: 8px;

            letter-spacing: 0.26em;

          }

.conceptPage .subtitle p {

            font-size: 8px;

            margin: 3px 0;

          }

.conceptPage .footerWrap {

            display: none;

          }

}

.conceptPage .navItem { position: relative; }

.conceptPage .desktopNav .navText { display: inline-block; outline-offset: 4px; }

.conceptPage .navDropdownPanel {

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

.conceptPage .navItem.navOpen .navDropdownPanel {

          opacity: 1;

          visibility: visible;

          pointer-events: auto;

          transform: translate(-50%, 0);

        }

@media  (prefers-reduced-motion: reduce)  {

.conceptPage .navDropdownPanel { transition: none; }

}

.conceptPage .navDropdownInner {

          padding: 9px 0; border: 1px solid rgba(156,134,100,.18);

          background: rgba(255,255,255,.99);

          box-shadow: 0 12px 32px rgba(40,31,20,.09);

        }

.conceptPage .navDropdownLink {

          display: block; width: 100%; padding: 10px 17px;

          border: 0; background: transparent; color: #6f685f;

          text-align: left; font: 400 11px/1.4 Arial,sans-serif;

          letter-spacing: .08em; white-space: nowrap; cursor: pointer;

        }

.conceptPage .navDropdownLink:hover, .conceptPage .navDropdownLink:focus-visible {

          color: #1d1b18; background: #faf8f5;

        }

@media  (min-width: 721px)  {

.conceptPage .homeLink > .logo {

            width: auto;

            height: calc(var(--brand-text-height, 86px) - 8px);

            max-width: none;

            flex-shrink: 0;

            align-self: center;

            object-fit: contain;

            margin: 0;

          }

.conceptPage .homeLink > .divider {

            height: calc(var(--brand-text-height, 86px) - 20px);

            align-self: center;

            margin-top: 0;

            flex-shrink: 0;

          }

}

/* ABOUT navigation: active page colour and scale (same rule, scoped to Concept Studies). */

.conceptPage .desktopNav .navText.isCurrent,

.conceptPage .desktopNav .navCurrent {

  color: #9C8664 !important;

  transform: scale(1.08);

  transform-origin: center center;

}

.conceptPage .bottomNav .bottomNavLink.isActive {

  color: #9C8664 !important;

  transform: scale(1.08);

  transform-origin: center center;

}

        /* NOV 03 — EDITORIAL POSITION CORRECTIONS ONLY.

           Keep JA/logo/nav sizes from About unchanged. */

        @media (min-width: 721px) {

          /* Restore top-edge alignment; do not scale brand or menu. */

          .conceptPage .container {

            padding-top: calc(clamp(34px, 4vh, 48px) - 8px);

          }

          .conceptPage .process .developmentStripButton,

          .conceptPage .process .sketchPhoto {

            transform: translateY(24px);

          }

          /* Reserve the displaced artwork's space before the following heading. */

          .conceptPage .process { margin-bottom: 24px; }

        }

        @media (min-width: 721px) and (max-height: 900px) {

          .conceptPage .container { padding-top: 30px; }

        }

        @media (min-width: 721px) and (max-height: 760px) {

          .conceptPage .container { padding-top: 20px; }

        }

        /* NOV 03 — ONLY THREE FOLLOW-UP LAYOUT CORRECTIONS.

           The approved header, JA logo, desktop navigation and typography

           are intentionally untouched. */

        @media (min-width: 721px) {

          /* Match both edges of the hero photograph to the adjacent copy.

             The image fits inside the grid cell without distortion. */

          .conceptPage .intro { align-items: stretch; }

          .conceptPage .intro > .heroPhoto {

            /* Display the complete original image; never crop the lips. */

            width: 100%;

            height: 100%;

            object-fit: contain;

            /* Align the visible image bottom with the copy's bottom edge. */

            object-position: left bottom;

            align-self: stretch;

          }

          /* The final paragraph must not add invisible space below the copy. */

          .conceptPage .intro > .copy p:last-child { margin-bottom: 0; }

          /* A shorter single line of space between intro copy and first rule. */

          .conceptPage .intro + .rule { margin-top: 48px; }

          /* Retain the previously approved space before the concluding heading. */

          .conceptPage .centerHeading { margin-top: 162px; }

          /* Halve the overly large gap above the final footer rule.

             The About footer's INTERNAL spacing and bottom padding remain

             identical, so its position relative to the viewport bottom matches. */

          .conceptPage .footerWrap { margin-top: 110px; }

        }

        @media (max-width: 720px) {

          /* Keep existing mobile stacking; give next heading a little air. */

          .conceptPage .centerHeading { margin-top: 105px; }

        }

        /* FOOTER POSITION — only the whitespace BELOW the footer changes.

           About reference: footer padding-bottom = clamp(14px, 2vh, 28px),

           or 12px for desktop screens up to 900px high.

           Reduce by 8px total (1px less than prior revision) to lower the last menu row in the end-of-page viewport.

           Do not alter header, nav dimensions, copyright, or gap above footer. */

        @media (min-width: 721px) {

          .conceptPage .footerWrap {

            padding-bottom: max(0px, calc(clamp(14px, 2vh, 28px) - 8px));

          }

        }

        @media (min-width: 721px) and (max-height: 900px) {

          .conceptPage .footerWrap { padding-bottom: 4px; }

        }



/* REFINED LIGHTBOX — approved 73% backdrop and editorial motion. */

.conceptPage .developmentStripButton {

  position: relative;

  cursor: pointer;

}

.conceptPage .developmentStripButton::after {

  content: "";

  position: absolute;

  right: 14px;

  bottom: 14px;

  width: 22px;

  height: 22px;

  opacity: 0;

  pointer-events: none;

  transform: translateY(5px);

  transition: opacity 320ms ease, transform 320ms ease;

  background: no-repeat center / contain url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239C8664' stroke-width='1.35' stroke-linecap='round'%3E%3Cpath d='M9 3H3v6M15 3h6v6M3 15v6h6M21 15v6h-6'/%3E%3C/svg%3E");

}

@media (hover: hover) and (pointer: fine) {

  .conceptPage .developmentStripButton:hover::after,

  .conceptPage .developmentStripButton:focus-visible::after {

    opacity: .94;

    transform: translateY(0);

  }

}

.conceptPage .developmentLightbox {

  background: rgba(17,16,15,.73);

  backdrop-filter: blur(3px);

  -webkit-backdrop-filter: blur(3px);

  cursor: default;

  opacity: 0;

  transition: opacity 300ms ease;

}

.conceptPage .developmentLightbox.isVisible { opacity: 1; }

.conceptPage .developmentLightbox img {

  opacity: 0;

  transform: translate(-50%, -50%) scale(.965);

  transition: opacity 450ms cubic-bezier(.22,1,.36,1), transform 450ms cubic-bezier(.22,1,.36,1);

}

.conceptPage .developmentLightbox.isVisible img {

  opacity: 1;

  transform: translate(-50%, -50%) scale(1);

}

.conceptPage .developmentLightbox p {

  opacity: 0;

  transition: opacity 450ms ease;

}

.conceptPage .developmentLightbox.isVisible p { opacity: 1; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {

  .conceptPage .developmentLightbox,

  .conceptPage .developmentLightbox img,

  .conceptPage .developmentLightbox p,

  .conceptPage .developmentStripButton::after { transition-duration: .01ms; }

}


        /* MOBILE NAVIGATION REFINEMENT — never changes desktop header/layout. */
        @media (max-width: 720px) {
          .conceptPage .hamburger {
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
          .conceptPage .hamburger span {
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
          .conceptPage .hamburger span:nth-child(1) { transform: translateY(-11px); }
          .conceptPage .hamburger span:nth-child(2) { transform: translateY(-3.7px); }
          .conceptPage .hamburger span:nth-child(3) { transform: translateY(3.7px); }
          .conceptPage .hamburger span:nth-child(4) { transform: translateY(11px); }
          .conceptPage .hamburger.isOpen span { background: #e1dbcf; }
          .conceptPage .hamburger.isOpen span:nth-child(1) { transform: rotate(45deg); }
          .conceptPage .hamburger.isOpen span:nth-child(2) { transform: scaleX(.55); opacity: 0; }
          .conceptPage .hamburger.isOpen span:nth-child(3) { transform: scaleX(.55); opacity: 0; }
          .conceptPage .hamburger.isOpen span:nth-child(4) { transform: rotate(-45deg); }
          .conceptPage .hamburger:focus-visible {
            outline: 1px solid #9C8664;
            outline-offset: 1px;
          }
          .conceptPage .mobileOverlay { z-index: 1100; }
          .conceptPage .mobilePanel {
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
          .conceptPage .mobilePanel.open { visibility: visible; }
          .conceptPage .mobileMenuItem {
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
          .conceptPage .mobileMenuItem:hover,
          .conceptPage .mobileMenuItem:focus-visible { color: #c9b38c; }
          .conceptPage .mobileMenuItem.isContact { color: #c9b38c; }
          .conceptPage .mobileMenuItem:focus-visible,
          .conceptPage .mobileSubmenuLink:focus-visible {
            outline: 1px solid #c9b38c;
            outline-offset: 4px;
          }
          /* Slow editorial accordion: always mounted, smoothly animates its height. */
          .conceptPage .mobileMenuItem.hasSubmenu {
            position: relative;
            padding-right: 20px;
          }
          .conceptPage .mobileMenuItem.hasSubmenu::after {
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
          .conceptPage .mobileMenuItem.hasSubmenu[aria-expanded="true"]::after {
            transform: translateY(4px) rotate(225deg);
          }
          .conceptPage .mobileSubmenu {
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
          .conceptPage .mobileSubmenu.isExpanded {
            grid-template-rows: 1fr;
            opacity: 1;
            margin-top: -18px;
            margin-bottom: 29px;
          }
          .conceptPage .mobileSubmenuInner {
            min-height: 0;
            overflow: hidden;
          }
          .conceptPage .mobileSubmenuLink {
            opacity: 0;
            transform: translateY(-8px);
            transition: opacity 580ms ease, transform 680ms cubic-bezier(.22,.61,.36,1), color 250ms ease;
          }
          .conceptPage .mobileSubmenu.isExpanded .mobileSubmenuLink {
            opacity: 1;
            transform: translateY(0);
          }
          .conceptPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(2) { transition-delay: 55ms; }
          .conceptPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(3) { transition-delay: 110ms; }
          .conceptPage .mobileSubmenu.isExpanded .mobileSubmenuLink:nth-child(4) { transition-delay: 165ms; }
          .conceptPage.isMobileNavigating {
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
          .conceptPage .hamburger span,
          .conceptPage .mobilePanel,
          .conceptPage .mobileSubmenu,
          .conceptPage .mobileSubmenuLink,
          .conceptPage .mobileMenuItem.hasSubmenu::after,
          .conceptPage.isMobileNavigating { transition: none !important; }
        }

        /* MOBILE HOME COMPOSITION — approved menu remains unchanged.
           Only the brand descriptor and hero carousel size are adjusted. */
        @media (max-width: 720px) {
          /* Distinguish the two brand lines and give the longer second line room. */
          .conceptPage .subtitle p:first-child {
            font-size: 10px;
            letter-spacing: 0.26em;
          }
          .conceptPage .subtitle p:nth-child(2) {
            font-size: 7.4px;
            letter-spacing: 0.20em;
          }
          /* Reduce the carousel artwork by 15% without changing its
             photographic proportions, transition or navigation controls. */
          .conceptPage .carouselStage {
            width: 85%;
          }
        }

        /* MOBILE DRAWER ONLY — 7% wider than the original panel (3% less
           widening than the preceding 10% version). Keep the left edge of
           all menu labels fixed at their previously approved screen position. */
        @media (max-width: 720px) {
          .conceptPage .mobilePanel {
            width: min(83.46vw, 417.3px);
            padding-left: calc(34px + min(83.46vw, 417.3px) - min(78vw, 390px));
          }
        }

        /* MOBILE ACCORDION GUIDE DOTS — match approved Contact styling.
           Dots are 4px in diameter and shifted another 1px right.
           Compensate clipping without moving menu labels. */
        @media (max-width: 720px) {
          .conceptPage .mobileSubmenuInner {
            margin-left: -24px;
            padding-left: 24px;
          }
          .conceptPage .mobileSubmenuLink {
            position: relative;
            width: 100%;
          }
          .conceptPage .mobileSubmenuLink::before {
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

        /* MOBILE — remove transient browser-blue tap rectangles from controls.
           Preserve intentional gold keyboard-focus indicators. */
        @media (max-width: 720px) {
          .conceptPage,
          .conceptPage button,
          .conceptPage a,
          .conceptPage [role="button"],
          .conceptPage input,
          .conceptPage .carouselStage,
          .conceptPage .carouselImage,
          .conceptPage .carouselControls,
          .conceptPage .carouselArrow,
          .conceptPage .carouselDot,
          .conceptPage .mobileMenuItem,
          .conceptPage .mobileSubmenuLink {
            -webkit-tap-highlight-color: transparent;
          }
          /* The gold :focus-visible outlines above remain available for keyboards. */
        }

        /* Consistent approved Sculpture submenu selection feedback on phones. */
        @media (max-width: 720px) {
          .conceptPage .mobileSubmenu.isExpanded .mobileSubmenuLink.isSelected {
            color: #fff;
            transform: translateY(0) scale(1.055);
            transform-origin: left center;
            transition: color 140ms ease, transform 140ms ease;
          }
          .conceptPage .mobileSubmenuLink.isSelected::before {
            width: 6px;
            height: 6px;
            background: #fff;
            transform: translate(-1px, -50%);
          }
          .conceptPage.isMobileNavigating.hasSubmenuSelection {
            transition-duration: 200ms;
          }
        }


        /* Concept Studies: final mobile-only Home header and lightbox overrides.
           Desktop header, navigation, artwork sizes and footer remain unchanged. */
        @media (max-width: 720px) {
          /* Home-style drawer base state; Concept previously had a static dark panel. */
          .conceptPage .mobileOverlay {
            position: fixed; inset: 0; z-index: 1100;
            background: rgba(0,0,2,.18); backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            opacity: 0; visibility: hidden; pointer-events: none;
            transition: opacity 450ms ease, visibility 450ms ease;
          }
          .conceptPage .mobileOverlay.open {
            opacity: 1; visibility: visible; pointer-events: auto;
          }
          .conceptPage .mobilePanel {
            position: fixed; top: 0; right: 0; bottom: 0;
            width: min(78vw, 390px);
            background: rgba(0,0,2,.40);
            color: #d4cec2;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            transform: translateX(100%);
            border-left: 1px solid rgba(201,179,140,.18);
            visibility: hidden; pointer-events: none;
            transition: transform 480ms cubic-bezier(.22,.61,.36,1), visibility 480ms;
          }
          .conceptPage .mobilePanel.open {
            transform: translateX(0); visibility: visible; pointer-events: auto;
          }
          .conceptPage .container { width: 92vw; padding-top: 38px; }
          .conceptPage .header {
            flex-direction: column; align-items: center; justify-content: flex-start;
            margin: 0 0 68px; gap: 0; text-align: center;
          }
          .conceptPage .homeLink { flex-direction: column; align-items: center; gap: 0; }
          .conceptPage .homeLink > .logo { width: 76px; height: auto; margin: 0 0 26px; }
          .conceptPage .divider, .conceptPage .desktopNav { display: none; }
          .conceptPage .name { font-size: 18px; font-weight: 300; letter-spacing: .18em; line-height: 1; }
          .conceptPage .subtitle { margin-top: 8px; letter-spacing: .26em; }
          .conceptPage .subtitle p { margin: 3px 0; }
          .conceptPage .subtitle p:first-child { font-size: 10px; letter-spacing: .26em; }
          .conceptPage .subtitle p:nth-child(2) { font-size: 7.4px; letter-spacing: .20em; }
          .conceptPage .footerWrap { display: none; }

          /* 24px left/right; 48px vertical padding; 112px image height reserve.
             Real image bounds stay inside the overlay, leaving touchable backdrop. */
          .conceptPage .developmentLightbox {
            padding: 48px 24px;
            box-sizing: border-box;
            cursor: zoom-out;
            touch-action: manipulation;
          }
          .conceptPage .developmentLightbox img {
            width: auto !important;
            height: auto !important;
            max-width: calc(100vw - 48px) !important;
            max-height: calc(100vh - 112px) !important;
            max-height: calc(100dvh - 112px) !important;
            object-fit: contain;
            cursor: default;
          }
          .conceptPage .developmentLightbox p {
            pointer-events: none;
            bottom: max(16px, env(safe-area-inset-bottom));
            left: 24px; right: 24px;
          }
          .conceptPage .developmentLightboxClose { top: 12px; right: 16px; }
          .conceptPage, .conceptPage button, .conceptPage a,
          .conceptPage [role="link"], .conceptPage [role="button"],
          .conceptPage img { -webkit-tap-highlight-color: transparent; }
        }


        /* Brainstorming: click-to-enlarge applies only to the mobile version. */
        @media (max-width: 720px) {
          .conceptPage .processSketch .sketchPhoto[role="button"] {
            cursor: zoom-in;
            -webkit-tap-highlight-color: transparent;
          }
          .conceptPage .processSketch .sketchPhoto[role="button"]:focus-visible {
            outline: 1px solid #9C8664;
            outline-offset: 5px;
          }
        }

        /* Process image captions exist as accessible descriptions on all sizes;
           show the paired editorial labels only in the mobile layout. */
        .conceptPage .conceptProcessCaption { display: none; }

        /* FINAL FIX — Home-style MOBILE submenu buttons and centred rail dots.
           The imported Concept Studies CSS had mobileSubItem defaults, while
           the new markup uses mobileSubmenuLink; reset native button chrome. */
        @media (max-width: 720px) {
          .conceptPage .mobileSubmenuInner {
            /* Preserve the accordion's overflow clipping while allowing dots
               to sit exactly on the vertical gold guide. */
            margin-left: -24px;
            padding-left: 24px;
          }
          .conceptPage .mobileSubmenuLink {
            -webkit-appearance: none;
            appearance: none;
            position: relative;
            display: block;
            box-sizing: border-box;
            width: 100%;
            min-height: 37px;
            margin: 0;
            padding: 8px 0;
            border: 0;
            border-radius: 0;
            outline: none;
            background: transparent;
            background-image: none;
            box-shadow: none;
            color: #e1dbcf;
            font: 400 14px/1.5 Arial, sans-serif;
            letter-spacing: 0;
            text-align: left;
            text-decoration: none;
            text-transform: none;
            white-space: normal;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
          }
          .conceptPage .mobileSubmenuLink::before {
            content: "";
            position: absolute;
            left: -20.5px;
            top: 50%;
            width: 4px;
            height: 4px;
            margin: 0;
            padding: 0;
            border: none;
            border-radius: 50%;
            background: #c9b38c;
            transform: translateY(-50%);
            pointer-events: none;
          }
          /* Selection feedback: only the selected text and dot turn white. */
          .conceptPage .mobileSubmenuLink.isSelected {
            color: #fff;
          }
          .conceptPage .mobileSubmenuLink.isSelected::before {
            left: -21.5px;
            width: 6px;
            height: 6px;
            background: #fff;
            transform: translateY(-50%);
          }
          /* A true 22px white outer gap below the final photo.
             Never append a pseudo-element inside the dark finalFeature grid:
             that looked like a thin frame underneath the picture. */
          .conceptPage .finalFeature::after {
            content: none;
            display: none;
          }
          .conceptPage .finalFeature {
            margin-bottom: 22px;
          }

          /* One line less between the final introductory paragraph and the rule.
             At 17px / 1.82, one body-text line is approximately 31px. */
          .conceptPage .intro + .rule {
            margin-top: 41px;
          }

          /* Creative Process: two extra text lines before the horizontal strip,
             and one extra line between the strip/caption and the lower artwork. */
          .conceptPage .process .developmentStripButton {
            margin-top: 74px;
          }
          .conceptPage .process {
            gap: 66px;
          }
          .conceptPage .processCopy > .conceptProcessCaption,
          .conceptPage .processSketch > .conceptProcessCaption {
            display: block;
            margin: 12px auto 0;
            max-width: 95%;
            text-align: center;
            color: #978a77;
            font: 400 10px/1.6 Arial, sans-serif;
            letter-spacing: .10em;
          }
          .conceptPage .processSketch {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .conceptPage .processSketch .sketchPhoto {
            margin: 0 auto;
          }
        }


        /* MOBILE ONLY — Keep the horizontal development strip aligned to
           Inspiration (100% of the 88vw editorial column). Restore the lower
           brainstorming sketch to its original 80% mobile size. Each caption
           matches exactly the width of its corresponding image. */
        @media (max-width: 720px) {
          .conceptPage .process .processCopy,
          .conceptPage .process .processSketch {
            width: 100%;
            min-width: 0;
            max-width: 100%;
          }
          .conceptPage .process .developmentStripButton {
            width: 100%;
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }
          .conceptPage .process .developmentStrip {
            display: block;
            width: 100%;
            height: auto;
          }
          .conceptPage .process .processSketch .sketchPhoto {
            display: block;
            width: 80%;
            max-width: 80%;
            height: auto;
            margin-left: auto;
            margin-right: auto;
          }
          .conceptPage .process .processCopy > .conceptProcessCaption {
            box-sizing: border-box;
            width: 100%;
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }
          .conceptPage .process .processSketch > .conceptProcessCaption {
            box-sizing: border-box;
            width: 80%;
            max-width: 80%;
            margin-left: auto;
            margin-right: auto;
          }
        }

        /* CRITICAL DESKTOP SAFEGUARD — mobile drawer and veil must never
           be displayed at desktop widths, regardless of open state.
           Keeps the mobile-only menu styling untouched at <= 720px. */
        @media (min-width: 721px) {
          .conceptPage .hamburger,
          .conceptPage .mobileOverlay,
          .conceptPage .mobilePanel {
            display: none !important;
            visibility: hidden !important;
            pointer-events: none !important;
          }
        }
        @media (max-width: 720px) {
          .conceptPage .mobileOverlay,
          .conceptPage .mobilePanel {
            display: block;
          }
        }


        /* DESKTOP ONLY — match approved Sculpture & Installations gallery width.
           Scale central editorial and final showcase widths; preserve mobile layouts. */
        @media (min-width: 721px) {
          .conceptPage .editorial,
          .conceptPage .finalFeature {
            width: min(1121px, 86vw);
          }
        }
      `}</style>

      <div className="container">

        <header className="header">

          <div className="homeLink" ref={brandLockupRef} role="link" tabIndex={0} onClick={() => go("/")} onKeyDown={e => {if(e.key==="Enter") go("/");}}>

            <img className="logo" src="/ja-logo-gold.png" alt="JA logo" />

            <div className="divider" />

            <div ref={brandTextRef} className="brandText">

              <h1 className="name">ANDREI JILIAEV</h1>

              <div className="subtitle"><p>Multidisciplinary Designer</p><p>Sculpture · Retail Design · Objects · Jewellery</p></div>

            </div>

          </div>

          <nav className="desktopNav" aria-label="Main navigation" onMouseLeave={() => setDropdown(null)}>

            <div className={`navItem ${dropdown === "work" ? "open" : ""}`} onMouseEnter={() => setDropdown("work")} onFocusCapture={() => setDropdown("work")}>

              <span className={`navText ${workActive ? "isCurrent" : ""}`} role="link" tabIndex={0} onClick={() => go("/work")} onKeyDown={e => {if(e.key==="Enter") go("/work");}}>Selected Work</span>

              <div className="navDropdownPanel"><div className="navDropdownInner">{selectedWorkLinks.map(link => <button className="navDropdownLink" key={link.path} onClick={() => go(link.path)}>{link.label}</button>)}</div></div>

            </div>

            <div className={`navItem ${dropdown === "jewellery" ? "open" : ""}`} onMouseEnter={() => setDropdown("jewellery")} onFocusCapture={() => setDropdown("jewellery")}>

              <span className={`navText ${jewelActive ? "isCurrent" : ""}`} role="link" tabIndex={0} onClick={() => go("/jewellery-design")} onKeyDown={e => {if(e.key==="Enter") go("/jewellery-design");}}>Jewellery Design</span>

              <div className="navDropdownPanel"><div className="navDropdownInner">{jewelleryLinks.map(link => <button className="navDropdownLink" key={link.path} onClick={() => go(link.path)}>{link.label}</button>)}</div></div>

            </div>

            <span className="navText" role="link" tabIndex={0} onMouseEnter={() => setDropdown(null)} onClick={() => go("/about")} onKeyDown={e => {if(e.key==="Enter") go("/about");}}>About</span>

            <span className="navText" role="link" tabIndex={0} onMouseEnter={() => setDropdown(null)} onClick={() => go("/contact")} onKeyDown={e => {if(e.key==="Enter") go("/contact");}}>Contact</span>

          </nav>

        </header>

      </div>

      <button type="button" className={`hamburger${menuOpen ? " isOpen" : ""}`}
          onClick={() => { setMenuOpen(value => !value); setMobileDropdown(null); }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen} aria-controls="concept-mobile-navigation">
          <span aria-hidden="true"/><span aria-hidden="true"/>
          <span aria-hidden="true"/><span aria-hidden="true"/>
        </button>

      <article className="editorial">

        <section className="intro" aria-labelledby="concept-title">

          <img className="heroPhoto" src="/concept-hero.jpg" alt="Red sculptural lips and flowing metallic botanical forms" />

          <div className="copy"><div className="goldLabel">Visual exploration</div><h2 id="concept-title" className="introTitle">Concept<br/>Studies</h2>

            <p>Every concept begins with a conversation. I listen closely to the client, interpret the brief and identify the character, emotions and visual language the project should express. I personally build the references, select the key motifs and develop an original direction through drawing and visual research.</p>

            <p>I consider each idea in relation to its setting, scale and intended audience. My aim is to turn a compelling first impression into a coherent design concept that can be presented, discussed and developed with purpose.</p>

          </div>

        </section>

        <hr className="rule"/>

        <section className="inspirationRow" aria-label="Inspiration and key elements">

          <div><div className="goldLabel">Inspiration</div><img className="inspirationImg" src="/concept-inspiration.jpg" alt="Inspiration references: lipstick, crimson leaves and fragrance" /></div>

          <div className="keyElements"><div className="goldLabel">Key elements</div><div className="iconRow">{icons.map(icon => <div key={icon.label}><img src={icon.image} alt=""/><strong>{icon.label}</strong><small>{icon.caption}</small></div>)}</div></div>

        </section>

        <hr className="rule"/>

        <section className="process" aria-labelledby="process-title">

          <div className="processCopy"><div className="goldLabel">From idea to form</div><h2 id="process-title" className="processHeading">The Creative<br/>Process</h2>

            <p>I draw every concept by hand, exploring silhouette, proportion, rhythm, texture and material character. From these studies, I develop sculptural models and digital visualizations, refining both the artistic expression and the physical structure of the piece.</p>

            <p>I also produce CAD models, measured drawings and technical details to study dimensions, construction, assembly and installation requirements. This constructive process allows me to develop an idea beyond appearance and communicate how it could be fabricated and experienced in its intended environment.</p>

            <button

              type="button"

              className="developmentStripButton"

              aria-label="Enlarge concept development image by 30 percent"

              onClick={(event) => {

                const preview = event.currentTarget.querySelector("img");

                if (!preview?.complete || !preview.naturalWidth) return;

                openDevelopmentLightbox({

                  src: preview.currentSrc || "/concept-development.jpg",

                  caption: "Concept Development · From Sketch to Sculptural Form",

                  previewWidth: preview.offsetWidth,

                  previewHeight: preview.offsetHeight,

                });

              }}

            >

              <img className="developmentStrip" src="/concept-development.jpg" alt="Progression from pencil sketch to model, finished surface and sculptural installation concept" />

            </button>

            <p className="conceptProcessCaption">From hand-drawn sketches and technical drawings to sculptural modelling, painting and the finished piece.</p>

          </div>

          <div className="processSketch">
            <img
              className="sketchPhoto"
              src="/concept-sketches.jpg"
              alt="Graphite studies of floral lips sculpture"
              role="button"
              tabIndex={0}
              aria-label="Enlarge Brainstorming image"
              onClick={(event) => {
                if (!window.matchMedia("(max-width: 720px)").matches) return;
                const preview = event.currentTarget;
                if (!preview.complete || !preview.naturalWidth) return;
                openDevelopmentLightbox({
                  src: preview.currentSrc || "/concept-sketches.jpg",
                  caption: "Brainstorming and visual exploration — discovering shapes, ideas and creative directions.",
                  previewWidth: preview.offsetWidth,
                  previewHeight: preview.offsetHeight,
                });
              }}
              onKeyDown={(event) => {
                if (!window.matchMedia("(max-width: 720px)").matches) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  event.currentTarget.click();
                }
              }}
            />
            <p className="conceptProcessCaption">Brainstorming and visual exploration — discovering shapes, ideas and creative directions.</p>
          </div>

        </section>

        <h2 className="centerHeading">From Concept to Presence</h2>

        <p className="centerSubtitle">An Idea Made Tangible</p>

      </article>

      <section className="finalFeature" aria-labelledby="final-title">

        <div className="finalCopy"><h3 id="final-title">The Final<br/>Vision</h3><p>I lead the creative development from the first conversation and initial sketches through sculptural studies, material exploration, CAD modelling and detailed drawings. I resolve proportion, finishes and structural considerations while preparing the visual presentation that brings the proposal to life.</p><p>My approach connects imagination with practical design development. It gives the client a clear understanding of the concept, its presence in space and the technical path toward fabrication and installation.</p></div>

        <img className="finalImage" src="/concept-installation.jpg" alt="Red floral-lips sculpture visualized for a luxury Sephora retail interior"/>

      </section>

      {developmentLightbox && (

        <div

          className={`developmentLightbox${lightboxVisible ? " isVisible" : ""}`}

          role="dialog"

          aria-modal="true"

          aria-label="Enlarged concept development image"

          onClick={(event) => { if (event.target === event.currentTarget) closeDevelopmentLightbox(); }}

        >

          <button type="button" className="developmentLightboxClose" onClick={closeDevelopmentLightbox} aria-label="Close image">×</button>

          <img

            src={developmentLightbox.src}

            alt={developmentLightbox.caption}

            style={{

              width: `${Math.round(developmentLightbox.previewWidth * 1.30)}px`,

              height: `${Math.round(developmentLightbox.previewHeight * 1.30)}px`,

            }}

            onClick={(event) => event.stopPropagation()}

          />

          <p>{developmentLightbox.caption}</p>

        </div>

      )}

      <footer className="footerWrap"><div className="footerLine"/><nav className="bottomNav" aria-label="Footer navigation">{bottomNavItems.map((item,i) => <div className="bottomNavItem" key={item.path}><span className={`bottomNavLink ${(item.path === "/work" && workActive) || (item.path === "/jewellery-design" && jewelActive) || item.path === activePath ? "isActive" : ""}`} role="link" tabIndex={0} onClick={(event) => {

          go(item.path);

        }} onKeyDown={(event) => {

          if (event.key === "Enter") {

            go(item.path);

          }

        }}>{item.label}</span>{i < bottomNavItems.length-1 && <div className="navDivider"/>}</div>)}</nav><div className="copyright">© ANDREI JILIAEV 2026</div></footer>

      <div className={menuOpen ? "mobileOverlay open" : "mobileOverlay"}
          onClick={() => { setMenuOpen(false); setMobileDropdown(null); }}
          aria-hidden="true" />
      <aside
        id="concept-mobile-navigation"
        className={menuOpen ? "mobilePanel open" : "mobilePanel"}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <button
          type="button"
          className="mobileMenuItem hasSubmenu"
          aria-expanded={mobileDropdown === "work"}
          aria-controls="concept-work-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "work" ? null : "work")}
        >SELECTED WORK</button>
        <div
          id="concept-work-submenu"
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
          aria-controls="concept-jewellery-submenu"
          onClick={() => setMobileDropdown(mobileDropdown === "jewellery" ? null : "jewellery")}
        >JEWELLERY DESIGN</button>
        <div
          id="concept-jewellery-submenu"
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
