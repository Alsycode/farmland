import React from "react";
import { FaHome, FaLeaf, FaSearch } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import AboutFeatureCard from "../components/AboutFeatureCard";
import WhyChooseUsCard from "../components/WhyChooseUsCard";

export default function About() {
  return (
    <section className="bg-[#f8fafc]">
      {/* PAGE HEADER */}
      <div className="pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            About Us
          </h1>
          <p className="text-gray-600 mt-4 text-sm sm:text-base">
            Have questions about who we are or what we do? Learn more about our mission
            and how we can help you find your perfect farmland property.
          </p>
        </div>
      </div>

      {/* ABOUT TEXT BOX */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 md:p-10 text-gray-700 leading-relaxed">
            <p className="text-sm sm:text-base">
              There was a time when our parents woke up to the sound of birds, breathed in the
              crisp morning air, and walked barefoot on fertile soil. Life on the farm was
              simple—filled with hard work, fresh harvests, and the joy of living close to
              nature. Today, in a world of concrete walls and endless screens, we long for that
              lost connection to the land, to peace, to something real.
            </p>

            <p className="mt-5 text-sm sm:text-base">
              At MyFarmland.Co we help you rediscover that simplicity. Whether you're looking
              to invest in farmland, own a farmhouse retreat, or start a new life closer to
              nature, we make it effortless.
            </p>

            <p className="mt-5 text-sm sm:text-base">
              At MyFarmland.Co, we specialize in helping you find the perfect farmland property
              and farmhouses for rental. Whether you're looking to invest in agricultural land
              or secure a charming farmhouse for your next getaway or business venture, we make
              the process seamless and stress-free.
            </p>
          </div>
        </div>
      </div>

      {/* TOP FEATURE CARDS */}
      <div className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <AboutFeatureCard
            icon={<FaHome className="text-3xl sm:text-4xl text-brandGreen" />}
            title="Farmhouse Rentals"
            text="Experience countryside living with our exclusive farmhouse rental options."
          />
          <AboutFeatureCard
            icon={<FaLeaf className="text-3xl sm:text-4xl text-brandGreen" />}
            title="Farmland Purchases"
            text="Invest in fertile land for farming, recreation, or future development."
          />
          <AboutFeatureCard
            icon={<FaSearch className="text-3xl sm:text-4xl text-brandGreen" />}
            title="Expert Guidance"
            text="Our team provides in-depth market insights and hassle-free transactions."
          />
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-6xl mx-auto">
          <WhyChooseUsCard />
        </div>
      </div>

      {/* BOTTOM 3 CARDS */}
      <div className="px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <AboutFeatureCard
            icon={<FaLeaf className="text-3xl sm:text-4xl text-brandGreen" />}
            title="Buy Farmland"
            text="Secure your own piece of nature for farming, investment, or recreation."
          />
          <AboutFeatureCard
            icon={<FaHome className="text-3xl sm:text-4xl text-brandGreen" />}
            title="Farmhouse Rentals"
            text="Escape the city and enjoy the charm of countryside living."
          />
          <AboutFeatureCard
            icon={<FaSearch className="text-3xl sm:text-4xl text-brandGreen" />}
            title="Expert Guidance"
            text="We handle the details so you can focus on what truly matters."
          />
        </div>
      </div>

      {/* CONTACT CTA */}
      <div className="px-4 sm:px-6 lg:px-8 mt-12 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base sm:text-lg text-gray-700 mb-6">
            Let’s bring back the beauty of the past—one farmhouse at a time. 🌾🏡✨
            <br />
            Let us help you turn your rural property dreams into reality!
          </p>

          <a
            href="tel:9036773900"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-accent text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#c74c4b] transition"
            aria-label="Call 9036773900"
          >
            <FiMail size={18} />
            <span>Contact us today at 9036773900</span>
          </a>
        </div>
      </div>
    </section>
  );
}
