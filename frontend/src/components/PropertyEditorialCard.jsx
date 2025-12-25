import React from "react";
import { Link } from "react-router-dom";

export default function PropertyEditorialCard({ property, reverse }) {
  const image =
    property.images?.[0]?.url || "/Farmland-Ownership.jpg";

  return (
    <article
      className={`
        grid lg:grid-cols-12 gap-16 items-center
        ${reverse ? "lg:flex-row-reverse" : ""}
      `}
    >
      <div className="lg:col-span-7">
        <img
          src={image}
          alt={property.title}
          className="rounded-3xl w-full h-[420px] object-cover"
        />
      </div>

      <div className="lg:col-span-5 space-y-8">
        <h3 className="text-3xl font-medium leading-snug">
          {property.title}
        </h3>

        <p className="text-[#555555] leading-relaxed">
          {property.description || "Strategically located agricultural land with long-term growth potential."}
        </p>

        <div className="text-2xl font-semibold">
          ₹{formatPrice(property.price)}
        </div>

        <Link
          to={`/properties/${property._id}`}
          className="
            inline-block mt-4
            text-[#2F5D50] font-medium
            underline underline-offset-8
          "
        >
          View property →
        </Link>
      </div>
    </article>
  );
}

function formatPrice(price) {
  if (!price) return "—";
  if (price >= 10000000) return (price / 10000000).toFixed(2) + " Cr";
  if (price >= 100000) return (price / 100000).toFixed(2) + " L";
  return price.toLocaleString();
}
