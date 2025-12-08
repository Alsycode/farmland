import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CardsGrid from './components/CardsGrid'
import Trending from './components/Trendin'
import Footer from './components/Footer'

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home"; // if you have
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import About from "./pages/About";
import PropertiesList from './pages/PropertiesList'
import PropertyDetail from './pages/PropertyDetail'
// import Contact from "./pages/";
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* <main className="max-w-7xl mx-auto px-6 lg:px-12">
        <Hero />
        <section className="mt-16">
          <CardsGrid />
        </section>
        <section className="mt-20">
          <Trending />
        </section>
      </main> */}
<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
           <Route path="/properties" element={<PropertiesList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
         <Route path="/about" element={<About />} />
           <Route path="/properties/:id" element={<PropertyDetail />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  )
}
