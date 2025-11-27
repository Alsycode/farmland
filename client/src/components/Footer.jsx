import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="footer-deep py-10 sm:py-14 md:py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* LEFT SECTION */}
          <div className="md:col-span-7">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">MyFarmland.co</h3>

            <p className="mt-4 text-gray-200 max-w-xl text-sm sm:text-base leading-relaxed">
              Your Gateway to Quick and Efficient Farmland & Farmhouse Discovery
            </p>

            <ul className="mt-6 text-gray-200 space-y-3 max-w-xl text-sm sm:text-base leading-relaxed">
              <li><strong>Verified and Highly Targeted Leads :</strong> Directly connect with genuine buyers and sellers.</li>
              <li><strong>Digital Project Promotion :</strong> Amplify your listings to a relevant and engaged audience.</li>
              <li><strong>Zero Brokerage, Direct Deals :</strong> Simplify interactions ensuring transparency.</li>
              <li><strong>User-Friendly Platform :</strong> Navigate effortlessly for a seamless property search.</li>
            </ul>
          </div>

          {/* RIGHT SECTION */}
          <div className="md:col-span-5">
            <h4 className="text-white font-semibold text-lg sm:text-xl">Follow us on</h4>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <button className="p-2 sm:p-3 bg-white/10 rounded-full hover:bg-white/20 transition">
                <FaFacebookF size={18} />
              </button>
              <button className="p-2 sm:p-3 bg-white/10 rounded-full hover:bg-white/20 transition">
                <FaInstagram size={18} />
              </button>
              <button className="p-2 sm:p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition">
                X
              </button>
              <button className="p-2 sm:p-3 bg-white/10 rounded-full hover:bg-white/20 transition">
                <FaLinkedinIn size={18} />
              </button>
              <button className="p-2 sm:p-3 bg-white/10 rounded-full hover:bg-white/20 transition">
                <FaYoutube size={18} />
              </button>
            </div>

            {/* CONTACT INFO */}
            <div className="mt-8 space-y-4 text-gray-100 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <FiPhone className="mt-1" />
                <div>+91 9036773900</div>
              </div>

              <div className="flex items-start gap-3">
                <FiMail className="mt-1" />
                <div>myfarmland6@gmail.com</div>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1" />
                <div className="text-sm leading-relaxed">
                  NO. 56/1, Handenahalli road, Sollepura village, Handenahalli Panchayath, Bengaluru, Bengaluru Urban, Karnataka, 562125
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 text-gray-300 text-xs sm:text-sm text-center md:text-left">
          © {new Date().getFullYear()} MyFarmland.co • All rights reserved.
        </div>
      </div>
    </footer>
  )
}
