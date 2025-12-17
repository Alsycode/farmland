export default function ContactCard({ property }) {
  const whatsappLink = `https://wa.me/918891581416?text=${encodeURIComponent(
    `Hi, I'm interested in "${property.title}"`
  )}`;

  return (
    <div
      className="
        bg-[#eef4ee] rounded-3xl p-5 space-y-5
        border border-green-200
        shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
      "
    >
      {/* AGENT */}
      {/* <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-green-200 flex items-center justify-center">
          🏡
        </div>
        <div>
          <div className="font-semibold text-green-900">
            Modern House Real Estate
          </div>
          <div className="text-sm text-green-700 hover:underline cursor-pointer">
            View Listings
          </div>
        </div>
      </div> */}

      {/* VISIT FORM */}
      <VisitForm propertyId={property._id} />

      {/* ACTION BAR */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <a
          href="tel:+918891581416"
          className="
            text-center py-2.5 rounded-xl
            border border-green-600 text-green-800 font-medium
          "
        >
          Call
        </a>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="
            text-center py-2.5 rounded-xl
            bg-green-600 text-white font-medium
          "
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
