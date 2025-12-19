// 🌿 Nature Neumorphism Responsive Navbar
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (loading) return null;

  const navLink = "block py-2 text-green-800 hover:text-green-600 font-medium";

  return (
    <header className="sticky top-0 z-40 bg-[#eef4ee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* MAIN BAR */}
        <div
          className="
            mt-4 h-16 flex items-center justify-between
            rounded-2xl px-5
            bg-[#eef4ee]
            shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
          "
        >
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 text-green-800">
            <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
              🌾
            </div>
            <div>
              <div className="font-bold leading-tight">MyFarmland</div>
              <div className="text-xs text-green-600">Verified land</div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-8">
            <Link className="text-green-800 hover:text-green-600" to="/">Home</Link>
            <Link className="text-green-800 hover:text-green-600" to="/search">Search</Link>
            <Link className="text-green-800 hover:text-green-600" to="/blogs">Blogs</Link>
            <Link className="text-green-800 hover:text-green-600" to="/contact">Contact</Link>
            <Link className="text-green-800 hover:text-green-600" to="/terms-and-conditions">Terms and Conditions</Link>
            <Link className="text-green-800 hover:text-green-600" to="/about">About us</Link>
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            {!user && (
              <Link
                to="/login"
                className="
                  px-4 py-2 rounded-full text-sm text-green-800
                  shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
                "
              >
                Login
              </Link>
            )}

            {user && (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="
                    w-10 h-10 rounded-full overflow-hidden
                    shadow-[3px_3px_6px_#cfd8cf,-3px_-3px_6px_#ffffff]
                  "
                >
                  <img src="/useravatar.webp" alt="User" />
                </button>

                <button
                  onClick={logout}
                  className="
                    px-4 py-2 rounded-full text-sm text-green-800 
                    shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
                    bg-green-50
                  "
                >
                  Logout
                </button>
              </>
            )}

            <Link
              to="/search"
              className="
                px-5 py-2 rounded-full bg-green-700 text-white text-sm font-semibold
                shadow-[6px_6px_12px_rgba(34,197,94,0.4),-6px_-6px_12px_rgba(255,255,255,0.8)]
              "
            >
              Explore
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="
              md:hidden w-10 h-10 rounded-full
              flex items-center justify-center
              bg-[#eef4ee]
              shadow-[3px_3px_6px_#cfd8cf,-3px_-3px_6px_#ffffff]
            "
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div
            className="
              mt-4 rounded-2xl p-5
              bg-[#eef4ee]
              shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
              md:hidden
            "
          >
            <nav className="space-y-3">
              <Link onClick={() => setOpen(false)} className={navLink} to="/">Home</Link>
              <Link onClick={() => setOpen(false)} className={navLink} to="/search">Search</Link>
              <Link onClick={() => setOpen(false)} className={navLink} to="/blogs">Blogs</Link>
              <Link onClick={() => setOpen(false)} className={navLink} to="/contact">Contact</Link>
              <Link onClick={() => setOpen(false)} className={navLink} to="/terms-and-conditions">Terms and Conditions</Link>
              <Link onClick={() => setOpen(false)} className={navLink} to="/about">About us</Link>
            </nav>

            <div className="mt-5 space-y-3">
              {!user && (
                <Link
                  onClick={() => setOpen(false)}
                  to="/login"
                  className="
                    block text-center px-4 py-2 rounded-xl text-green-800
                    shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
                  "
                >
                  Login
                </Link>
              )}

              {user && (
                <>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/dashboard");
                    }}
                    className="
                      w-full px-4 py-2 rounded-xl text-green-800
                      shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
                    "
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                    className="
                      w-full px-4 py-2 rounded-xl text-green-800 
                      shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
                      bg-green-50
                    "
                  >
                    Logout
                  </button>
                </>
              )}

              <Link
                onClick={() => setOpen(false)}
                to="/search"
                className="
                  block text-center px-4 py-2 rounded-xl bg-green-700 text-white font-semibold
                  shadow-[6px_6px_12px_rgba(34,197,94,0.4),-6px_-6px_12px_rgba(255,255,255,0.8)]
                "
              >
                Explore
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
