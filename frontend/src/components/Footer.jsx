import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

/**
 * Footer
 * - Green neumorphic nature style
 * - Consistent with Contact / Login / Property pages
 * - Content preserved
 */

export default function Footer() {
  return (
    <footer className="bg-[#eef4ee] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* TOP CONTAINER */}
        <div
          className="
            rounded-3xl p-10
            shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

            {/* LEFT */}
            <div className="md:col-span-7">
              <h3 className="text-2xl font-bold text-green-900">
                MyFarmland.co
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-green-700">
                Your gateway to verified farmland listings, direct owners, and
                transparent property discovery.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-green-800 max-w-xl">
                <li>✔ Verified & targeted farmland listings</li>
                <li>✔ Zero brokerage, direct owner contact</li>
                <li>✔ Easy scheduling & secure communication</li>
                <li>✔ Simple, user-friendly experience</li>
              </ul>
            </div>

            {/* RIGHT */}
            <div className="md:col-span-5">
              <h4 className="font-semibold text-lg text-green-900">
                Follow us
              </h4>

              {/* SOCIAL ICONS */}
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                {[
                  <FaFacebookF />,
                  <FaInstagram />,
                  <FaLinkedinIn />,
                  <FaYoutube />,
                ].map((Icon, i) => (
                  <button
                    key={i}
                    className="
                      w-11 h-11 rounded-full
                      bg-[#eef4ee] text-green-800
                      flex items-center justify-center
                      shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
                      hover:shadow-[inset_2px_2px_4px_#cfd8cf,inset_-2px_-2px_4px_#ffffff]
                      transition
                    "
                  >
                    {Icon}
                  </button>
                ))}
              </div>

              {/* CONTACT INFO */}
              <div className="mt-8 space-y-4 text-sm text-green-800">
                <div className="flex items-start gap-3">
                  <FiPhone className="mt-1 text-green-700" />
                  <span>+91 9036773900</span>
                </div>

                <div className="flex items-start gap-3">
                  <FiMail className="mt-1 text-green-700" />
                  <span>myfarmland6@gmail.com</span>
                </div>

                <div className="flex items-start gap-3">
                  <FiMapPin className="mt-1 text-green-700" />
                  <span>
                    Bengaluru Urban, Karnataka – 562125
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 text-xs text-green-700 text-center">
          © {new Date().getFullYear()} MyFarmland.co — All rights reserved
        </div>
      </div>
    </footer>
  );
}
