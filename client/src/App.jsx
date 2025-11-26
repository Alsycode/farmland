import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CardsGrid from './components/CardsGrid'
import Trending from './components/Trendin'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 lg:px-12">
        <Hero />
        <section className="mt-16">
          <CardsGrid />
        </section>
        <section className="mt-20">
          <Trending />
        </section>
      </main>

      <Footer />
    </div>
  )
}
