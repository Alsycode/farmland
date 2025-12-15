import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialCarousel() {
  // =========================
  // STATE
  // =========================
  const [current, setCurrent] = useState(1);

  // =========================
  // DUMMY DATA (used for now)
  // =========================
  const testimonials = [
    {
      id: 1,
      quote:
        "Working with them has been a game changer for our organization. Their commitment to safeguarding our data and ensuring compliance has given us peace of mind.",
      name: "Varun Kumar Thapliyal",
      role: "CEO, Reliance AI",
      avatar:
        "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      quote:
        "The team's expertise and proactive approach have not only enhanced our security posture but also built trust with our clients. Highly recommend their services!",
      name: "Varun Kumar Thapliyal",
      role: "CEO, Reliance AI",
      avatar:
        "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 3,
      quote:
        "They helped us scale securely without friction. The experience was smooth, professional, and reliable from start to finish.",
      name: "Varun Kumar Thapliyal",
      role: "CEO, Reliance AI",
      avatar:
        "https://randomuser.me/api/portraits/men/51.jpg",
    },
  ];

  // =========================
  // API CALL (COMMENTED)
  // =========================
  /*
  useEffect(() => {
    async function fetchTestimonials() {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(data);
    }
    fetchTestimonials();
  }, []);
  */

  // =========================
  // HANDLERS
  // =========================
  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  // =========================
  // RENDER
  // =========================
  return (
    <section className="bg-[#f8fafc] py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-900">
          Don’t take our word for it!
        </h2>
        <p className="text-4xl font-bold mt-2">
          Hear what our{" "}
          <span className="text-blue-500">Customers</span> say
        </p>
        <p className="text-gray-500 mt-4">
          With over 100k+ clients served, here's what they have to say
        </p>

        {/* Carousel */}
        <div className="relative mt-16 flex items-center justify-center">
          {/* Slides */}
          <div className="flex gap-6 items-center">
            {testimonials.map((item, index) => {
              const isActive = index === current;

              return (
                <div
                  key={item.id}
                  className={`transition-all duration-500 rounded-2xl bg-white p-8 shadow-md max-w-md
                    ${
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-90 opacity-40 blur-[1px]"
                    }`}
                >
                  {/* Quote Icon */}
                  <div className="text-6xl text-gray-200 text-left mb-4">
                    “
                  </div>

                  {/* Text */}
                  <p className="text-gray-700 leading-relaxed">
                    {item.quote}
                  </p>

                  {/* User */}
                  <div className="flex items-center gap-3 mt-6">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 -translate-x-6 bg-white shadow p-2 rounded-full"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 translate-x-6 bg-white shadow p-2 rounded-full"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all
                ${
                  current === i
                    ? "bg-blue-500 w-5"
                    : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
