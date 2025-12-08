import React from "react";
import SearchBar from "./SearchBar";
import { CiSearch } from "react-icons/ci";
import ThemeToggle from "./ThemeToggle.jsx";
import en from "../locals/en.json";

/**
 * Hero component
 * - Uses Tailwind utility classes (mobile-first)
 * - Accessible buttons and semantic structure
 * - Strings moved to src/locales/en.json for i18n readiness
 */

export default function Hero() {
  const heroImage = "/Farmland-Ownership.jpg";
  const t = en.hero;

  return (
    <section
      aria-labelledby="hero-heading"
      className="pt-8 pb-6 sm:pt-10 sm:pb-8"
    >
      <div className="max-w-7xl mx-auto px-2">
        {/* <div className="flex items-start justify-between mb-6">
         
          <div className="sr-only">Theme control</div>
          <div aria-hidden className="hidden sm:block" />
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left / Text */}
          <div className="md:col-span-7">
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-xl font-display"
              style={{ fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto" }}
            >
              <span className="block">
                {t.titleLine1}{" "}
                <span className="text-primary-600 dark:text-primary-400">
                  {t.titleAccent}
                </span>
              </span>
              <span className="block">{t.titleLine2}</span>
            </h1>

            <p className="mt-4 sm:mt-6 text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl">
              {t.subtitle}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                aria-label={t.ctaExplore}
                className="w-full sm:w-auto inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 active:scale-98 text-white px-5 py-3 rounded-lg font-semibold shadow-sm transform transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-300"
              >
                <CiSearch className="text-white text-2xl" aria-hidden />
                <span>{t.ctaExplore}</span>
              </button>

              <button
                type="button"
                aria-label={t.ctaNearMe}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-primary-700 dark:text-primary-200 px-4 py-3 rounded-lg font-semibold border border-primary-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                {t.ctaNearMe}
              </button>
            </div>
          </div>

          {/* Right / Image */}
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-2xl shadow-sm bg-white dark:bg-slate-800">
              <img
                src={heroImage}
                alt="Aerial view of farmland and boundaries"
                loading="lazy"
                className="w-full h-56 sm:h-64 md:h-[360px] object-cover"
                style={{ display: "block" }}
              />
            </div>
          </div>
        </div>

        {/* Search card (kept visible on all widths with good spacing) */}
        <div className="mt-6 sm:mt-8">
          <div className="w-full">
            <SearchBar placeholder={t.searchPlaceholder} />
          </div>
        </div>
      </div>
    </section>
  );
}
