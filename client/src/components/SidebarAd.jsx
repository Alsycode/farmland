import React from "react";

export default function SidebarAd({ image = "/mnt/data/Screenshot 2025-12-03 094934.png" }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <img src={image} alt="ad" className="w-full object-cover" />
    </div>
  );
}
