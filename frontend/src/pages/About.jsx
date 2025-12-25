import React from "react";

export default function About() {
  return (
    <div className="bg-[#eef2df] text-[#2f3a2f] min-h-screen">
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-24 space-y-32">

        {/* ================= HERO ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-8">
            <span className="inline-block text-sm tracking-wide text-[#6b7a5e]">
              About Us
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              Helping you reconnect
              <br />
              <span className="text-[#5a6f4d]">with land & nature</span>
            </h1>

            <p className="text-base text-[#5f6f5f] leading-relaxed max-w-lg">
              myFarmland is a focused platform built to help people discover,
              invest in, and care for managed farmlands with clarity,
              transparency, and long-term value.
            </p>

            <div className="flex gap-10 pt-6">
              <div>
                <div className="text-2xl font-semibold text-[#5a6f4d]">0%</div>
                <div className="text-sm text-[#7a8773] mt-1">
                  Brokerage
                </div>
              </div>

              <div>
                <div className="text-2xl font-semibold text-[#5a6f4d]">
                  100%
                </div>
                <div className="text-sm text-[#7a8773] mt-1">
                  Verified Listings
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden bg-[#dfe6d2] aspect-[4/3]" />
          </div>
        </section>

        {/* ================= ABOUT CONTENT ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-medium">
              Our Philosophy
            </h2>

            <p className="text-[#5f6f5f] leading-relaxed">
              We believe land ownership should be calm, informed, and deeply
              connected to nature. myFarmland exists to remove noise and
              complexity from farmland discovery.
            </p>

            <p className="text-[#5f6f5f] leading-relaxed">
              Every listing is carefully verified, every interaction is direct,
              and every experience is designed for people who value long-term
              growth over short-term transactions.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FeatureCard
              title="Nature First"
              text="Built around sustainability, land stewardship, and mindful ownership."
            />
            <FeatureCard
              title="Transparent Process"
              text="Zero brokerage, direct connections, and verified owners only."
            />
            <FeatureCard
              title="Focused Platform"
              text="Only farmlands, estates, and farmhouses — nothing else."
            />
            <FeatureCard
              title="Long-Term Value"
              text="Designed for investors and families seeking enduring value."
            />
          </div>
        </section>

        {/* ================= HOW WE WORK ================= */}
        <section className="space-y-12">
          <h2 className="text-3xl font-medium text-center">
            How We Work
          </h2>

          <div className="rounded-3xl overflow-hidden bg-[#dde4cf] aspect-[16/7] flex items-center justify-center">
            <span className="tracking-widest text-[#6b7a5e]">
              HOW WE WORK
            </span>
          </div>
        </section>

        {/* ================= VISION / MISSION ================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-medium">Our Vision</h3>
            <p className="text-[#5f6f5f] leading-relaxed">
              To bring people closer to land and nature while creating
              sustainable, long-term communities rooted in trust.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-medium">Our Mission</h3>
            <p className="text-[#5f6f5f] leading-relaxed">
              To simplify farmland ownership through technology, transparency,
              and a calm, human-centered experience.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div className="bg-[#f4f7ec] rounded-2xl p-6 space-y-3">
      <h4 className="font-medium text-[#2f3a2f]">
        {title}
      </h4>
      <p className="text-sm text-[#6b7a5e] leading-relaxed">
        {text}
      </p>
    </div>
  );
}
