import { useState, useEffect } from "react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { auth } from "../firebase/firebase"; // Import Firebase auth
import { onAuthStateChanged, signOut } from "firebase/auth";
import { profile } from "../data/profile";

const navItems = ["home", "about", "skills", "projects", "experience", "contact"];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Track the section under the top third of the viewport. Sections are
  // lazy-loaded, so this reads the DOM on scroll instead of observing nodes.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);

      let current = navItems[0];
      for (const id of navItems) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          current = id;
        }
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && document.getElementById("contact")) current = "contact";
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || isMenuOpen
          ? "border-stark-gold/15 bg-stark-void/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <a href="#home" className="group flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md border border-stark-red/70 bg-gradient-to-br from-stark-red/30 to-stark-crimson/10 font-display text-xs font-black text-white transition-shadow duration-300 group-hover:shadow-glow-red">
              {profile.initials}
            </span>
            <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
              {profile.brand}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 md:flex">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    aria-current={active === item ? "true" : undefined}
                    className={`relative py-2 font-display text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${
                      active === item
                        ? "text-stark-amber"
                        : "text-stark-silver hover:text-white"
                    }`}
                  >
                    {item}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-gradient-to-r from-stark-red to-stark-gold transition-transform duration-300 ${
                        active === item ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
            {/* <Link
                to={`${user ? '/dashboard':'/login'}`}
                className="text-lg font-semibold cursor-pointer hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                Admin
              </Link> */}
            {user && (
              <button
                onClick={handleLogout}
                className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-stark-silver transition-colors hover:text-stark-red"
              >
                Logout
              </button>
            )}
            {/* Decorative only: reflects that the page UI has loaded */}
            <span
              aria-hidden="true"
              className="hidden items-center gap-2 rounded-full border border-stark-cyan/25 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stark-cyan lg:flex"
            >
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-stark-cyan" />
              UI online
            </span>
          </div>

          {/* Mobile Navigation Button */}
          <button
            onClick={toggleMenu}
            className="rounded-md border border-stark-silver/20 p-2 text-stark-silver transition-colors hover:border-stark-gold/60 hover:text-white md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen
              ? "visible max-h-[28rem] opacity-100"
              : "invisible max-h-0 opacity-0"
          }`}
        >
          <ul className="space-y-1 border-t border-stark-gold/15 py-4">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={active === item ? "true" : undefined}
                  className={`block border-l-2 px-4 py-3 font-display text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                    active === item
                      ? "border-stark-red bg-stark-red/10 text-stark-amber"
                      : "border-transparent text-stark-silver hover:text-white"
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
            {/* <Link
                  to={`${user ? '/dashboard':'/login'}`}
              onClick={() => setIsMenuOpen(false)}
              className="block text-center py-2 text-lg font-semibold hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              Admin
            </Link> */}
            {user && (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full border-l-2 border-transparent px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-[0.2em] text-stark-red"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
