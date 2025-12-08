import React from "react";

export default function AboutSection({ companyOverview }) {
  // If the property has a company overview, show it. Otherwise fall back to default promotional text.
  const content = companyOverview || {
    title: "Sai Properties and Projects (SPP) Overview",
    paragraphs: [
      "Sai Properties and Projects (SPP) is an ISO 9001:2016 certified company with a proven track record in commercial development and a specialized focus on Red Sandalwood plantations.",
      "Our Expertise & Scale: Total Experience: 18 years in commercial development, with 8 dedicated years in Red Sandalwood cultivation. Completed Ventures: 53. Total Acreage: Over 4,421 acres developed. Customer Base: Serving more than 13,500 satisfied customers. Plantation Volume: Over 16 lakh (1.6 million) Red Sandalwood saplings planted across all ventures.",
      "The Red Sandalwood Advantage: We are fully committed to providing sustainable, excellent, and expert Red Sandalwood plantation cultivation through organic farming methods."
    ]
  };

  return (
    <section className="mt-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">ABOUT</h2>
      <div className="prose max-w-none">
        <h3 className="text-2xl font-bold mb-3">{content.title}</h3>
        {content.paragraphs.map((p, i) => (
          <p key={i} className="text-gray-700">{p}</p>
        ))}
      </div>
    </section>
  );
}
