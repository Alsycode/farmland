import React from "react";
import Hero from "../components/Hero";
import CardsGrid from "../components/CardsGrid";
import Trending from "../components/Trendin"; // kept existing import (file name as provided)
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * Home page
 * - Small layout polish (container paddings centralized)
 * - Kept business logic & imports unchanged
 */
const Home = () => {
  return (
    <div className="bg-neutral-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen">
      

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Hero />

        <section className="mt-16">
          <CardsGrid />
        </section>

        <section className="mt-20">
          <Trending />
        </section>
      </main>

   
    </div>
  );
};

export default Home;
