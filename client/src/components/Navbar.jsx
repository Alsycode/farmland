import React, { useState, useRef, useEffect } from "react";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle.jsx";
import en from "../locals/en.json";

/**
 * Navbar.jsx
 * - Semantic header, accessible mobile menu, integrated ThemeToggle
 * - Avoids changing existing navigation labels (strings extracted)
 */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const t = en.navbar;

  // close on Escape and outside click
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-40">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between py-3">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary-600">
                  <circle cx="12" cy="12" r="10" fill="#e9f5ef" />
                  <path d="M12 6v8" stroke="#153f35" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M9 12c0 1.7 1.2 3 3 3s3-1.3 3-3" stroke="#153f35" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>

              <div className="hidden sm:block">
                <div className="font-semibold text-lg text-slate-900 dark:text-slate-100">{t.brand}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 -mt-0.5">{t.tagline}</div>
              </div>
            </a>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-700 dark:text-slate-300" aria-label="Main navigation">
            <a className="text-slate-900 dark:text-slate-100 border-b-2 border-transparent hover:border-primary-300 hover:text-slate-900 py-3" href="/home">
              {t.links.home}
            </a>
            <a className="hover:text-slate-900" href="/blog">
              {t.links.blog}
            </a>
            <a className="hover:text-slate-900" href="/about">
              {t.links.about}
            </a>
            <a className="hover:text-slate-900" href="/contact">
              {t.links.contact}
            </a>
            <a className="hover:text-slate-900" href="/post">
              {t.links.post}
            </a>
          </nav>

          {/* ACTIONS */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            <button className="flex items-center gap-2 border rounded-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
              <FiUser aria-hidden />
              <span>{t.login}</span>
            </button>

            <button className="inline-flex items-center gap-2 text-white font-semibold px-3 py-2 rounded-lg bg-gradient-to-r from-[#cd4a6c] to-[#92332e] shadow-sm hover:scale-[.99] transform transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 12h18" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M12 3v18" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span>{t.exploreStay}</span>
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
              onClick={() => setOpen((s) => !s)}
              aria-label={open ? t.closeMenu : t.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE NAV MENU */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`${open ? "block" : "hidden"} md:hidden border-t border-slate-200 dark:border-slate-800 py-4`}
        >
          <div className="flex flex-col gap-3 px-1">
            <a href="/home" className="py-2 px-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800">{t.links.home}</a>
            <a href="/blog" className="py-2 px-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800">{t.links.blog}</a>
            <a href="/about" className="py-2 px-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800">{t.links.about}</a>
            <a href="/contact" className="py-2 px-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800">{t.links.contact}</a>
            <a href="/post" className="py-2 px-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800">{t.links.post}</a>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
              <button className="flex items-center gap-2 border rounded-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200 w-max mt-2">
                <FiUser />
                {t.login}
              </button>

              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#cd4a6c] to-[#92332e] text-white font-semibold px-3 py-2 rounded-[10px] w-max mt-3">
                {t.exploreStay}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
