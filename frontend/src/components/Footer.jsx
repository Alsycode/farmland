import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

/**
 * Footer
 * - Visual alignment with Homepage B
 * - Content & structure preserved
 */

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-200 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* LEFT */}
          <div className="md:col-span-7">
            <h3 className="text-2xl font-bold text-white">
              MyFarmland.co
            </h3>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-300">
              Your gateway to verified farmland listings, direct owners, and
              transparent property discovery.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-300 max-w-xl">
              <li>✔ Verified & targeted farmland listings</li>
              <li>✔ Zero brokerage, direct owner contact</li>
              <li>✔ Easy scheduling & secure communication</li>
              <li>✔ Simple, user-friendly experience</li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-5">
            <h4 className="font-semibold text-lg text-white">
              Follow us
            </h4>

            {/* SOCIAL */}
            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <button className="p-3 bg-white/10 rounded-full hover:bg-white/20">
                <FaFacebookF />
              </button>
              <button className="p-3 bg-white/10 rounded-full hover:bg-white/20">
                <FaInstagram />
              </button>
              <button className="p-3 bg-white/10 rounded-full hover:bg-white/20">
                <FaLinkedinIn />
              </button>
              <button className="p-3 bg-white/10 rounded-full hover:bg-white/20">
                <FaYoutube />
              </button>
            </div>

            {/* CONTACT */}
            <div className="mt-8 space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <FiPhone className="mt-1" />
                <span>+91 9036773900</span>
              </div>

              <div className="flex items-start gap-3">
                <FiMail className="mt-1" />
                <span>myfarmland6@gmail.com</span>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1" />
                <span>
                  Bengaluru Urban, Karnataka – 562125
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-gray-400 text-center md:text-left">
          © {new Date().getFullYear()} MyFarmland.co — All rights reserved
        </div>
      </div>
    </footer>
  );
}
