import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import SiteCommandPalette from "./SiteCommandPalette.jsx";

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (isShortcut) {
        event.preventDefault();
        setSearchOpen((open) => !open);
        return;
      }

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        setSearchOpen(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen text-[var(--chrome-text-secondary)]">
      <SiteHeader onOpenSearch={() => setSearchOpen(true)} />
      <Outlet />
      <SiteFooter />
      <SiteCommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
