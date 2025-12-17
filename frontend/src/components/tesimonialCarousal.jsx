import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "Smooth, transparent and reliable farmland buying experience.",
      name: "Varun Kumar",
      role: "Investor",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      quote: "Direct owners and verified listings saved me months of work.",
      name: "Rahul Mehta",
      role: "Entrepreneur",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 3,
      quote: "Professional support and great after-sales guidance.",
      name: "Anil Sharma",
      role: "Farmland Buyer",
      avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold">What our customers say</h2>
        <p className="text-green-700 mt-3">
          Trusted by hundreds of farmland investors
        </p>

        <div className="relative mt-16 flex justify-center items-center">
          <div className="flex gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`
                  max-w-md p-8 rounded-3xl
                  bg-[#eef4ee]
                  shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
                  transition-all
                  ${i === current ? 'scale-100' : 'scale-95 opacity-50'}
                `}
              >
                <p className="text-green-800">{t.quote}</p>

                <div className="flex items-center gap-3 mt-6">
                  <img src={t.avatar} className="w-10 h-10 rounded-full" />
                  <div className="text-left">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-green-700">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrent(c => (c === 0 ? testimonials.length - 1 : c - 1))}
            className="
              absolute left-0 p-2 rounded-full
              bg-[#eef4ee]
              shadow-[3px_3px_6px_#cfd8cf,-3px_-3px_6px_#ffffff]
            "
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => setCurrent(c => (c === testimonials.length - 1 ? 0 : c + 1))}
            className="
              absolute right-0 p-2 rounded-full
              bg-[#eef4ee]
              shadow-[3px_3px_6px_#cfd8cf,-3px_-3px_6px_#ffffff]
            "
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
