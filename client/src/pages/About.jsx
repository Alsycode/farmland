import React from "react";
import { FaHome, FaLeaf, FaSearch } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import AboutFeatureCard from "../components/AboutFeatureCard";
import WhyChooseUsCard from "../components/WhyChooseUsCard";

export default function About() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ===== PAGE HEADER ===== */}
      <div className="text-center pt-16 pb-10">
        <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Have questions about who we are or what we do? Learn more about our mission and
          how we can help you find your perfect farmland property.
        </p>
      </div>

      {/* ===== ABOUT TEXT BOX ===== */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-10 text-gray-700 leading-relaxed">
          <p>
            There was a time when our parents woke up to the sound of birds, breathed in the
            crisp morning air, and walked barefoot on fertile soil. Life on the farm was
            simple—filled with hard work, fresh harvests, and the joy of living close to
            nature. Today, in a world of concrete walls and endless screens, we long for that
            lost connection to the land, to peace, to something real.
          </p>

          <p className="mt-6">
            At MyFarmland.Co we help you rediscover that simplicity. Whether you're looking
            to invest in farmland, own a farmhouse retreat, or start a new life closer to
            nature, we make it effortless.
          </p>

          <p className="mt-6">
            At MyFarmland.Co, we specialize in helping you find the perfect farmland property
            and farmhouses for rental. Whether you're looking to invest in agricultural land
            or secure a charming farmhouse for your next getaway or business venture, we make
            the process seamless and stress-free.
          </p>
        </div>
      </div>

      {/* ===== 3 TOP FEATURE CARDS ===== */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <AboutFeatureCard
          icon={<FaHome className="text-3xl text-brandGreen" />}
          title="Farmhouse Rentals"
          text="Experience countryside living with our exclusive farmhouse rental options."
        />
        <AboutFeatureCard
          icon={<FaLeaf className="text-3xl text-brandGreen" />}
          title="Farmland Purchases"
          text="Invest in fertile land for farming, recreation, or future development."
        />
        <AboutFeatureCard
          icon={<FaSearch className="text-3xl text-brandGreen" />}
          title="Expert Guidance"
          text="Our team provides in-depth market insights and hassle-free transactions."
        />
      </div>

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <div className="max-w-6xl mx-auto mt-16">
        <WhyChooseUsCard />
      </div>

      {/* ===== BOTTOM 3 CARDS ===== */}
      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <AboutFeatureCard
          icon={<FaLeaf className="text-3xl text-brandGreen" />}
          title="Buy Farmland"
          text="Secure your own piece of nature for farming, investment, or recreation."
        />
        <AboutFeatureCard
          icon={<FaHome className="text-3xl text-brandGreen" />}
          title="Farmhouse Rentals"
          text="Escape the city and enjoy the charm of countryside living."
        />
        <AboutFeatureCard
          icon={<FaSearch className="text-3xl text-brandGreen" />}
          title="Expert Guidance"
          text="We handle the details so you can focus on what truly matters."
        />
      </div>

      {/* ===== CONTACT CTA ===== */}
      <div className="text-center mt-14 mb-24">
        <p className="text-lg text-gray-700 mb-4">
          Let’s bring back the beauty of the past—one farmhouse at a time. 🌾🏡✨  
          <br />
          Let us help you turn your rural property dreams into reality!
        </p>

        <button className="bg-accent text-white font-semibold px-8 py-4 rounded-lg shadow-md inline-flex items-center gap-2 hover:bg-[#c74c4b] transition">
          <FiMail size={20} /> Contact us today at 9036773900
        </button>
      </div>
    </div>
  );
}
