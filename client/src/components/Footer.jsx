import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="mt-20 footer-deep py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-7">
            <h3 className="text-3xl font-bold text-white">MyFarmland.co</h3>
            <p className="mt-4 text-gray-200 max-w-xl">
              Your Gateway to Quick and Efficient Farmland & Farmhouse Discovery
            </p>

            <ul className="mt-6 text-gray-200 space-y-4 max-w-xl">
              <li><strong>Verified and Highly Targeted Leads :</strong> Directly connect with genuine buyers and sellers.</li>
              <li><strong>Digital Project Promotion :</strong> Amplify your listings to a relevant and engaged audience.</li>
              <li><strong>Zero Brokerage, Direct Deals :</strong> Simplify interactions ensuring transparency.</li>
              <li><strong>User-Friendly Platform :</strong> Navigate effortlessly for a seamless property search.</li>
            </ul>
          </div>

          <div className="col-span-5">
            <h4 className="text-white font-semibold text-xl">Follow us on</h4>
            <div className="flex items-center gap-3 mt-4">
              <button className="p-2 bg-white/10 rounded-full"><FaFacebookF /></button>
              <button className="p-2 bg-white/10 rounded-full"><FaInstagram /></button>
              <button className="p-2 bg-white/10 rounded-full">X</button>
              <button className="p-2 bg-white/10 rounded-full"><FaLinkedinIn /></button>
              <button className="p-2 bg-white/10 rounded-full"><FaYoutube /></button>
            </div>

            <div className="mt-8 space-y-3 text-gray-100">
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
                <div className="text-sm">
                  NO. 56/1, Handenahalli road, Sollepura village, Handenahalli Panchayath, Bengaluru, Bengaluru Urban, Karnataka, 562125
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-gray-300 text-sm">
          © {new Date().getFullYear()} MyFarmland.co • All rights reserved.
        </div>
      </div>
    </footer>
  )
}
