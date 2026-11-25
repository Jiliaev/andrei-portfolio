import { useEffect, useState } from "react";

/**
 * Site-wide editorial designer mark: AJ / wide rule / vertical credit.
 * Mount ONCE in App.jsx, outside <Routes>. Do not mount in individual pages.
 */
export default function SiteSignature() {
  // Start completely invisible. A scroll threshold alone is not enough:
  // the signature appears only once the actual header leaves the viewport.
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let animationFrame = null;

    const update = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        // Prefer the site's actual page header, not an arbitrary scroll distance.
        const headers = document.querySelectorAll(".header, header");
        const pageHeader = Array.from(headers).find(
          (header) => header.getBoundingClientRect().height > 0 &&
            window.getComputedStyle(header).display !== "none"
        );
        const headerOutOfView = pageHeader
          ? pageHeader.getBoundingClientRect().bottom <= 0
          : window.scrollY > 260; // Graceful fallback for a page without a header.
        setHasScrolled(headerOutOfView);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("pageshow", update);

    // The signature is mounted once in App.jsx; detect header changes on routes.
    const root = document.getElementById("root");
    const observer = root && typeof MutationObserver !== "undefined"
      ? new MutationObserver(update)
      : null;
    observer?.observe(root, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("pageshow", update);
      observer?.disconnect();
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');

        .siteDesignerSignature {
          position: fixed;
          right: 12px;
          top: 46%; /* Slightly above center to balance the bottom Up button. */
          transform: translateY(-50%);
          z-index: 10;
          width: 64px;
          max-height: calc(100dvh - 60px);
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0;
          padding: 0;
          pointer-events: none;
          user-select: none;
          -webkit-user-select: none;
          opacity: 0;
          transition: opacity 2400ms cubic-bezier(.22, .61, .36, 1);
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
        }

        .siteDesignerSignature.isVisible {
          opacity: 0.78;
        }

        /* Exact Georgia treatment from the supplied reference SVG (not Bodoni). */
        .siteDesignerSignatureMonogramBlock {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          width: max-content;
          max-width: 100%;
        }
        .siteDesignerSignatureMonogram {
          display: block;
          font-family: Georgia, serif;
          font-weight: 400;
          font-size: 34.56px;
          line-height: 1;
          letter-spacing: -4px;
          color: #BBA78C;
          text-shadow: 0 1px 1px rgba(255,255,255,.84);
        }

        /* The rule inherits the monogram's own measured width, not the outer column. */
        .siteDesignerSignatureRule {
          display: block;
          width: calc(90.25% - 2.7075px);
          height: 1px;
          margin: 12px auto 14px;
          background: rgba(156, 134, 100, 0.84);
        }

        .siteDesignerSignatureName,
        .siteDesignerSignatureRole {
          display: block;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          white-space: nowrap;
          text-transform: uppercase;
          line-height: 1;
          text-align: left;
        }

        .siteDesignerSignatureName {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-weight: 400;
          font-size: 16px;
          letter-spacing: 0.14em;
          color: #676D74;
          text-shadow: 0 1px 1px rgba(255,255,255,.82);
        }

        .siteDesignerSignatureRole {
          margin-top: 14px;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 400;
          font-size: 10px;
          letter-spacing: 0.22em;
          color: #9C8664;
          text-shadow: 0 1px 1px rgba(255,255,255,.76);
        }

        @media (max-width: 720px), (max-height: 440px) {
          .siteDesignerSignature { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .siteDesignerSignature { transition: none; }
        }
      `}</style>
      <div
        className={`siteDesignerSignature${hasScrolled ? " isVisible" : ""}`}
        role="img"
        aria-label="Andrei Jiliaev — Creative Designer, Sculptor and Artist"
      >
        <span className="siteDesignerSignatureMonogramBlock" aria-hidden="true">
          <span className="siteDesignerSignatureMonogram">AJ</span>
          <span className="siteDesignerSignatureRule" />
        </span>
        <span className="siteDesignerSignatureName" aria-hidden="true">ANDREI JILIAEV</span>
        <span className="siteDesignerSignatureRole" aria-hidden="true">CREATIVE DESIGNER · SCULPTOR · ARTIST</span>
      </div>
    </>
  );
}
