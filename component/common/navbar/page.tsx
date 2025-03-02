"use client";

import { useSession, signOut } from "next-auth/react";
import LoginButton from "../../LoginButton";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-gray-900 to-black backdrop-blur-sm shadow-lg"
          : "bg-black"
      }`}
    >
      <div className="max-w-7xl flex items-center justify-between px-4 py-3 mx-auto">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <Link href="/pages/homepage" className="group">
            <h1 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
              Vendor <span className="text-blue-500">Management</span>
            </h1>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center">
          {status === "authenticated" && session?.user ? (
            <div className="flex items-center">
              <nav className="flex items-center mr-6"></nav>
              <div className="flex items-center space-x-3 border-l border-gray-700 pl-6">
                {session.user.image ? (
                  <div className="relative">
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-9 h-9 rounded-full border-2 border-blue-500"
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black"></div>
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                    {session.user.name?.charAt(0) || "U"}
                  </div>
                )}
                <span className="font-medium text-white text-sm">
                  {session.user.name || "User"}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 animate-fadeIn">
          {status === "authenticated" && session?.user ? (
            <div className="px-4 py-3 space-y-1">
              <div className="pt-3 mt-3 border-t border-gray-800">
                <div className="flex items-center px-4 py-2">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-8 h-8 mr-3 rounded-full border-2 border-blue-500"
                    />
                  ) : (
                    <div className="w-8 h-8 mr-3 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                      {session.user.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <span className="font-medium text-white">
                    {session.user.name || "User"}
                  </span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full mt-3 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 py-3">
              <LoginButton />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
