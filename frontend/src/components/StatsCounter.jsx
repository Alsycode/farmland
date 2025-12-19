import React, { useEffect, useState } from "react";

function Counter({ value, label, duration = 1200 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <div
      className="
        bg-[#eef4ee] rounded-3xl p-8 text-center
        shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
      "
    >
      <div className="text-4xl sm:text-5xl font-bold text-green-800">
        {count.toLocaleString()}+
      </div>
      <div className="mt-2 text-sm sm:text-base font-medium text-green-700">
        {label}
      </div>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section
      className="
        bg-[#eef4ee] rounded-3xl p-10
        shadow-[10px_10px_20px_#cfd8cf,-10px_-10px_20px_#ffffff]
      "
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-green-900">
          Our Impact So Far
        </h2>
        <p className="text-green-700 mt-3 max-w-xl mx-auto">
          Trusted by landowners, developers, and investors across regions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Counter value={1382} label="Properties" />
        <Counter value={1109} label="Developers" />
        <Counter value={1491} label="Inquiries" />
        <Counter value={178} label="Sold Out Properties" />
      </div>
    </section>
  );
}
