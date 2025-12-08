import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import properties from "../data/properties";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import AmenitiesGrid from "../components/AmenitiesGrid";
import ContactButtons from "../components/ContactButtons";
import SidebarAd from "../components/SidebarAd";
import { FiShare2, FiHeart } from "react-icons/fi";

import MasterPlan from "../components/MasterPlan";
import OverviewGrid from "../components/OverviewGrid";
import AboutSection from "../components/AboutSection";
import InvestmentSection from "../components/InvestmentSection";
import AmenitiesSection from "../components/AmenitiesSection";

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <main className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <h2 className="text-2xl font-semibold">Property not found</h2>
            <div className="mt-6">
              <button
                onClick={() => navigate("/properties")}
                className="px-4 py-2 bg-accent text-white rounded-md"
              >
                Back to listings
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* <Navbar /> */}

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 ">
            {/* Header */}
            <div className="flex items-start justify-between gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold">{property.title}</h1>
                <div className="mt-3 flex items-center gap-3">
                  {property.verified && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Verified
                    </span>
                  )}
                  <div className="text-sm text-gray-600">Project Size: {property.projectSize}</div>
                </div>

                <div className="mt-4 text-gray-600">
                  <div>Plot Size: {property.plotSize}</div>
                  <div className="mt-2">Available Units: </div>
                  <div className="mt-2">{property.address}</div>
                </div>

                <div className="mt-6 text-2xl text-red-600 font-extrabold">
                  {property.price} <span className="font-medium text-gray-600 text-base">Onwards</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex gap-3">
                  <button className="p-2 rounded-md border text-gray-600">
                    <FiShare2 />
                  </button>
                  <button className="p-2 rounded-md border text-gray-600">
                    <FiHeart />
                  </button>
                </div>

                <div>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow">
                    Site Visit Scheduled
                  </button>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="mt-8">
              <Gallery images={property.images} videoUrl={property.video} />
            </div>

            {/* MASTER PLAN */}
            <div className="mt-10">
              <MasterPlan src={property.masterPlanImage} />
            </div>

            {/* Description */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </section>

            {/* LOCATION MAP */}
            <section className="mt-8">
              <h3 className="text-xl font-semibold mb-4">LOCATION MAP</h3>
              <div className="bg-white rounded-md p-4 shadow-sm">
                <iframe
                  src={property.locationEmbed}
                  width="100%"
                  height="420"
                  className="rounded"
                  title="location-map"
                  style={{ border: 0 }}
                />
              </div>
            </section>

            {/* Overview */}
            <div className="mt-8">
              <OverviewGrid
                data={{
                  propertyType: property.propertyType || "Farmland",
                  projectArea: property.projectSize,
                  boundaryWall: property.boundaryWall,
                  priceNegotiable: property.priceNegotiable,
                  availability: property.availability,
                  managedFarms: property.managedFarms,
                  openSides: property.openSides,
                  maintenanceYears: property.maintenanceYears,
                  transactionType: property.transactionType,
                }}
              />
            </div>

            {/* About */}
            <div className="mt-8">
              <AboutSection companyOverview={property.companyOverview} />
            </div>

            {/* Investment details */}
            <div className="mt-8">
              <InvestmentSection
                data={{
                  oneAcrePrice: property.oneAcrePrice,
                  fiveAcrePrice: property.fiveAcrePrice,
                  returnsNote: property.returnsNote,
                }}
              />
            </div>A

            {/* AMENITIES (new full-width section like screenshot) */}
            <div className="mt-8">
              {/* If you already have an AmenitiesGrid component you can pass property.amenities to it.
                  Here we render a full AMENITIES section based on property.amenities array. */}
              <AmenitiesSection items={property.amenities || []} />
            </div>

            {/* Property details & amenities (existing right column area) */}
            <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                <div className="text-gray-700 space-y-3">
                  <div>
                    <strong>Project Size:</strong> {property.projectSize}
                  </div>
                  <div>
                    <strong>Plot Size:</strong> {property.plotSize}
                  </div>
                  <div>
                    <strong>Available Units:</strong> —
                  </div>
                  <div>
                    <strong>Address:</strong> {property.address}
                  </div>

                  <ContactButtons />
                </div>

                {/* <div className="mt-6">
                  <div className="bg-white rounded-md p-4 shadow-sm">
                    <iframe
                      src={property.locationEmbed}
                      width="100%"
                      height="200"
                      className="rounded"
                      title="map"
                      style={{ border: 0 }}
                    />
                  </div>
                </div> */}

                <div className="mt-8">
                  <h4 className="font-medium text-gray-800">Developer</h4>
                  <div className="mt-3 bg-white rounded-md p-6 text-gray-500 border border-gray-100">
                    {property.developer || "No landowners information available"}
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold">Rating</h4>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="#ffcc33"
                          className="inline-block"
                        >
                          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.175L12 18.896 4.664 23.172l1.402-8.175L.132 9.21l8.2-1.192z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-gray-600">({property.ratingCount})</div>
                  </div>

                  <div className="mt-4">
                    <button className="bg-emerald-700 text-white px-4 py-2 rounded-md">Rate this property</button>
                  </div>
                </div>
              </div>

              {/* <div>
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <AmenitiesGrid items={property.amenities} />
                </div>

                <div className="mt-6">
                  <SidebarAd />
                </div>
              </div> */}
            </section>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
