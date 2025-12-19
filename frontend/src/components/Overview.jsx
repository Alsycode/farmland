import React from "react";
import {
  Home,
  Ruler,
  Fence,
  BadgePercent,
  CheckCircle,
  Leaf,
  LayoutGrid,
  CalendarCheck,
  Repeat
} from "lucide-react";

function Item({ icon: Icon, label, value }) {
  return (
    <div
      className="
        flex items-start gap-4 p-4 rounded-2xl
        bg-[#eef4ee]
        shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
      "
    >
      {/* Icon well */}
      <div
        className="
          w-12 h-12 flex items-center justify-center rounded-xl
          bg-[#eef4ee] text-green-700 shrink-0
          shadow-[inset_2px_2px_4px_#cfd8cf,inset_-2px_-2px_4px_#ffffff]
        "
      >
        {Icon && <Icon size={20} strokeWidth={1.6} />}
      </div>

      {/* Text */}
      <div>
        <div className="text-[11px] tracking-wide text-green-700 font-semibold">
          {label}
        </div>
        <div className="text-green-900 font-medium">
          {value}
        </div>
      </div>
    </div>
  );
}


export default function OverviewGrid({ data = {} }) {
const items = [
  {
    label: "PROPERTY TYPE",
    value: data.propertyType || "Farmland",
    icon: Home,
  },
  {
    label: "PROJECT AREA",
    value: data.projectArea || "—",
    icon: Ruler,
  },
  {
    label: "BOUNDARY WALL",
    value: data.boundaryWall ? "Yes" : "No",
    icon: Fence,
  },
  {
    label: "PRICE NEGOTIABLE",
    value: data.priceNegotiable ? "Yes" : "No",
    icon: BadgePercent,
  },
  {
    label: "AVAILABILITY STATUS",
    value: data.availability || "Available",
    icon: CheckCircle,
  },
  {
    label: "MANAGED FARMS",
    value: data.managedFarms ? "Yes" : "No",
    icon: Leaf,
  },
  {
    label: "OPEN SIDES COUNT",
    value: data.openSides || "—",
    icon: LayoutGrid,
  },
  {
    label: "FREE YEARS OF MAINTENANCE",
    value: data.maintenanceYears || "—",
    icon: CalendarCheck,
  },
  {
    label: "TRANSACTION TYPE",
    value: data.transactionType || "New",
    icon: Repeat,
  },
];


  return (
    <section
      className="
        mt-8 rounded-3xl p-6
        bg-[#eef4ee]
        shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
      "
    >
      <h2 className="text-xl font-semibold text-green-900 mb-5">
        Overview
      </h2>

   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
  {items.map((it) => (
    <Item
      key={it.label}
      icon={it.icon}
      label={it.label}
      value={it.value}
    />
  ))}
</div>

    </section>
  );
}
