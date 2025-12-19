import React from "react";
import { Leaf, Target, Sprout } from "lucide-react";

export default function About() {
  return (
    <div className="bg-[#eef4ee] min-h-screen text-green-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 space-y-28">

        {/* ================= HERO ================= */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <div
            className="
              inline-flex items-center gap-2 px-4 py-2 rounded-full
              bg-[#eef4ee]
              shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
            "
          >
            <Leaf size={16} className="text-green-700" />
            <span className="text-sm font-medium text-green-700">
              About myFarmland
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            India’s trusted marketplace for
            <span className="text-green-700"> managed farmlands</span>
          </h1>

          <p className="text-lg text-green-700 leading-relaxed">
            Connecting people with land, nature, and long-term value through a
            transparent and purpose-built platform.
          </p>
        </section>

        {/* ================= MAIN CONTENT ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 space-y-8">

            <div
              className="
                p-8 rounded-3xl
                bg-[#eef4ee]
                shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
                space-y-6
              "
            >
              <h2 className="text-2xl font-semibold">
                Welcome to myFarmland
              </h2>

              <p className="text-green-700 leading-relaxed">
                myFarmland is India’s first and leading online marketplace
                dedicated exclusively to the buying and selling of managed
                farmland, agricultural land, estates, and farmhouses. Our
                mission is to bridge the gap between buyers and sellers in this
                niche sector by making the process seamless, transparent, and
                efficient.
              </p>

              <p className="text-green-700 leading-relaxed">
                Built with your needs in mind, myFarmland serves everyone —
                from those seeking a scenic farmhouse getaway to investors
                looking for high-potential agricultural opportunities. Easily
                filter listings by location, budget, and property type without
                the clutter of generic property platforms.
              </p>

              <p className="text-green-700 leading-relaxed">
                We take pride in offering only verified listings and operate on
                a zero-brokerage model, ensuring a direct, hassle-free
                transaction process that saves both time and money.
              </p>
            </div>
          </div>

          {/* RIGHT HIGHLIGHTS */}
          <div className="lg:col-span-5 space-y-6">

            <HighlightCard
              icon={Sprout}
              title="Trust & Transparency"
              text="Verified listings only, no middlemen, and a focused audience of serious buyers and sellers."
            />

            <HighlightCard
              icon={Leaf}
              title="Built Around Nature"
              text="We believe land ownership should bring people closer to nature, sustainability, and mindful living."
            />

            <HighlightCard
              icon={Target}
              title="Purpose-Driven Platform"
              text="Designed exclusively for farmland, estates, and farmhouses — no distractions, no clutter."
            />
          </div>
        </section>

        {/* ================= VISION & MISSION ================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* VISION */}
          <div
            className="
              p-8 rounded-3xl
              bg-[#eef4ee]
              shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
              space-y-4
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  w-12 h-12 rounded-xl flex items-center justify-center
                  bg-[#eef4ee]
                  shadow-[inset_3px_3px_6px_#cfd8cf,inset_-3px_-3px_6px_#ffffff]
                "
              >
                <Leaf className="text-green-700" />
              </div>
              <h3 className="text-xl font-semibold">Our Vision</h3>
            </div>

            <p className="text-green-700 leading-relaxed">
              Our vision is to help build a new India by transforming lives,
              landscapes, and living habitats — bringing people closer to
              nature while creating long-term value.
            </p>
          </div>

          {/* MISSION */}
          <div
            className="
              p-8 rounded-3xl
              bg-[#eef4ee]
              shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
              space-y-4
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  w-12 h-12 rounded-xl flex items-center justify-center
                  bg-[#eef4ee]
                  shadow-[inset_3px_3px_6px_#cfd8cf,inset_-3px_-3px_6px_#ffffff]
                "
              >
                <Target className="text-green-700" />
              </div>
              <h3 className="text-xl font-semibold">Our Mission</h3>
            </div>

            <p className="text-green-700 leading-relaxed">
              We aim to create top-tier farmland communities by leveraging new
              technology and innovative investment avenues, fostering trust,
              integrity, and growth in long-term business relationships.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}

/* ================= HELPER COMPONENT ================= */

function HighlightCard({ icon: Icon, title, text }) {
  return (
    <div
      className="
        p-6 rounded-2xl
        bg-[#eef4ee]
        shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
        space-y-3
      "
    >
      <div
        className="
          w-12 h-12 rounded-xl flex items-center justify-center
          bg-[#eef4ee]
          shadow-[inset_3px_3px_6px_#cfd8cf,inset_-3px_-3px_6px_#ffffff]
        "
      >
        <Icon className="text-green-700" />
      </div>

      <h4 className="font-semibold text-green-900">
        {title}
      </h4>

      <p className="text-sm text-green-700 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
