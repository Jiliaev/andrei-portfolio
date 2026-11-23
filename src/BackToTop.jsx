import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Site-wide return-to-top control.
 * Visual language references the slim gold scroll pill on Design & Process.
 * Mount once in App.jsx, not in individual pages.
 */
export default function BackToTop() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = null;
    const update = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        const doc = document.documentElement;
        const canScroll = doc.scrollHeight > window.innerHeight + 120;
        setVisible(canScroll && window.scrollY > 260);
        frame = null;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? "instant" : "smooth" });
  };

  return (
    <>
      <style>{`
        .siteBackToTop {
          position: fixed;
          right: 50px;
          bottom: 28px;
          width: 44px;
          height: 60px;
          z-index: 900;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translateY(10px);
          transition: opacity 450ms ease, transform 450ms ease, visibility 450ms;
          -webkit-tap-highlight-color: transparent;
        }
        .siteBackToTop.isVisible {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateY(0);
        }
        .siteBackToTopPill {
          width: 25px;
          height: 42px;
          box-sizing: border-box;
          border: 1px solid #9C8664;
          border-radius: 18px;
          background: rgba(255,255,255,0.76);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9C8664;
          box-shadow: 0 2px 9px rgba(70,65,58,0.035);
          transition: background 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
        }
        .siteBackToTopArrow {
          width: 11px;
          height: 16px;
          overflow: visible;
          transform: translateY(1px);
          transition: transform 320ms ease;
        }
        .siteBackToTop:hover .siteBackToTopPill,
        .siteBackToTop:focus-visible .siteBackToTopPill {
          background: #fbf9f5;
          border-color: #9C8664;
          box-shadow: 0 3px 12px rgba(70,65,58,0.075);
        }
        .siteBackToTop:hover .siteBackToTopArrow,
        .siteBackToTop:focus-visible .siteBackToTopArrow {
          transform: translateY(-3px);
        }
        .siteBackToTop:focus-visible {
          outline: 2px solid #9C8664;
          outline-offset: 2px;
          border-radius: 22px;
        }
        @media (max-width: 720px) {
          .siteBackToTop { right: 24px; bottom: 15px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .siteBackToTop,
          .siteBackToTopPill,
          .siteBackToTopArrow { transition: none; }
        }
      `}</style>
      <button
        type="button"
        className={`siteBackToTop${visible ? " isVisible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        tabIndex={visible ? 0 : -1}
      >
        <span className="siteBackToTopPill" aria-hidden="true">
          <svg className="siteBackToTopArrow" viewBox="0 0 12 18" fill="none">
            <path d="M6 15V3M2 7L6 3L10 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </>
  );
}
