// 🌿 Neumorphic Navbar — earthy shadows only (white highlights removed)
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (loading) return null;

  const navLink =
    "block py-2 text-[#3f4f3f] hover:text-[#2f3a2f] font-medium";

  return (
    <header className="sticky top-0 z-40 bg-[#eef2df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* MAIN BAR */}
        <div
          className="
            mt-4 h-16 flex items-center justify-between
            rounded-2xl px-5
            bg-[#eef2df]
            shadow-[6px_6px_14px_rgba(163,175,147,0.6)]
          "
        >
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div
              className="
                w-10 h-10 rounded-full
                flex items-center justify-center
                bg-[#eef2df]
                shadow-[inset_3px_3px_6px_rgba(163,175,147,0.55)]
              "
            >
              🌿
            </div>
            <div>
              <div className="font-semibold leading-tight text-[#2f3a2f]">
                MyFarmland
              </div>
              <div className="text-xs text-[#6b7a5e]">
                Verified land
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-8">
            <Link className={navLink} to="/">Home</Link>
            <Link className={navLink} to="/search">Search</Link>
            <Link className={navLink} to="/blogs">Blogs</Link>
            <Link className={navLink} to="/contact">Contact</Link>
            <Link className={navLink} to="/terms-and-conditions">
              Terms & Conditions
            </Link>
            <Link className={navLink} to="/about">About us</Link>
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            {!user && (
              <Link
                to="/login"
                className="
                  px-4 py-2 rounded-full text-sm text-[#3f4f3f]
                  bg-[#eef2df]
                  shadow-[4px_4px_10px_rgba(163,175,147,0.55)]
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
                    bg-[#eef2df]
                    shadow-[3px_3px_8px_rgba(163,175,147,0.55)]
                  "
                >
                  <img src="/useravatar.webp" alt="User" />
                </button>

                <button
                  onClick={logout}
                  className="
                    px-4 py-2 rounded-full text-sm text-[#3f4f3f]
                    bg-[#eef2df]
                    shadow-[4px_4px_10px_rgba(163,175,147,0.55)]
                  "
                >
                  Logout
                </button>
              </>
            )}

            <Link
              to="/search"
              className="
                px-5 py-2 rounded-full
                bg-[#5a6f4d] text-white text-sm font-semibold
                shadow-[6px_6px_14px_rgba(90,111,77,0.45)]
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
              bg-[#eef2df]
              shadow-[3px_3px_8px_rgba(163,175,147,0.55)]
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
              bg-[#eef2df]
              shadow-[6px_6px_14px_rgba(163,175,147,0.6)]
              md:hidden
            "
          >
            <nav className="space-y-3">
              <Link onClick={() => setOpen(false)} className={navLink} to="/">Home</Link>
              <Link onClick={() => setOpen(false)} className={navLink} to="/search">Search</Link>
              <Link onClick={() => setOpen(false)} className={navLink} to="/blogs">Blogs</Link>
              <Link onClick={() => setOpen(false)} className={navLink} to="/contact">Contact</Link>
              <Link onClick={() => setOpen(false)} className={navLink} to="/terms-and-conditions">
                Terms & Conditions
              </Link>
              <Link onClick={() => setOpen(false)} className={navLink} to="/about">
                About us
              </Link>
            </nav>

            <div className="mt-5 space-y-3">
              {!user && (
                <Link
                  onClick={() => setOpen(false)}
                  to="/login"
                  className="
                    block text-center px-4 py-2 rounded-xl text-[#3f4f3f]
                    bg-[#eef2df]
                    shadow-[4px_4px_10px_rgba(163,175,147,0.55)]
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
                      w-full px-4 py-2 rounded-xl text-[#3f4f3f]
                      bg-[#eef2df]
                      shadow-[4px_4px_10px_rgba(163,175,147,0.55)]
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
                      w-full px-4 py-2 rounded-xl text-[#3f4f3f]
                      bg-[#eef2df]
                      shadow-[4px_4px_10px_rgba(163,175,147,0.55)]
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
                  block text-center px-4 py-2 rounded-xl
                  bg-[#5a6f4d] text-white font-semibold
                  shadow-[6px_6px_14px_rgba(90,111,77,0.45)]
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
