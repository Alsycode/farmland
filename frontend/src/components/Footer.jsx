// 🌿 Neumorphic Footer — earthy shadows only (no white highlights)
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[#eef2df] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* MAIN FOOTER CARD */}
        <div
          className="
            rounded-3xl p-12
            bg-[#eef2df]
            shadow-[10px_10px_22px_rgba(163,175,147,0.55)]
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-14">

            {/* LEFT CONTENT */}
            <div className="md:col-span-7 space-y-6">
              <h3 className="text-2xl font-semibold text-[#2f3a2f]">
                MyFarmland
              </h3>

              <p className="max-w-xl text-sm leading-relaxed text-[#5f6f5f]">
                A calm, transparent platform for discovering verified farmland,
                estates, and long-term land investments — without noise or
                intermediaries.
              </p>

              <ul className="space-y-3 text-sm text-[#4f5f4f]">
                <li>• Verified, farmland-only listings</li>
                <li>• Zero brokerage & direct owner access</li>
                <li>• Secure communication & visit scheduling</li>
                <li>• Designed for long-term value seekers</li>
              </ul>
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:col-span-5 space-y-8">

              {/* SOCIAL */}
              <div>
                <h4 className="text-lg font-medium text-[#2f3a2f]">
                  Connect with us
                </h4>

                <div className="flex gap-4 mt-4 flex-wrap">
                  {[FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube].map(
                    (Icon, i) => (
                      <button
                        key={i}
                        className="
                          w-11 h-11 rounded-full
                          flex items-center justify-center
                          bg-[#eef2df] text-[#4f5f4f]
                          shadow-[4px_4px_10px_rgba(163,175,147,0.6)]
                          hover:shadow-[inset_3px_3px_6px_rgba(163,175,147,0.55)]
                          transition
                        "
                      >
                        <Icon size={16} />
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* CONTACT */}
              <div className="space-y-4 text-sm text-[#4f5f4f]">
                <div className="flex items-start gap-3">
                  <FiPhone className="mt-1 text-[#6b7a5e]" />
                  <span>+91 90367 73900</span>
                </div>

                <div className="flex items-start gap-3">
                  <FiMail className="mt-1 text-[#6b7a5e]" />
                  <span>myfarmland6@gmail.com</span>
                </div>

                <div className="flex items-start gap-3">
                  <FiMapPin className="mt-1 text-[#6b7a5e]" />
                  <span>
                    Bengaluru Urban, Karnataka – 562125
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-12 text-center text-xs text-[#6b7a5e]">
          © {new Date().getFullYear()} MyFarmland — All rights reserved
        </div>
      </div>
    </footer>
  );
}
