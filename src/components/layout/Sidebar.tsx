import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import GoogleLogin from "../ui/GoogleLogin";
import { Button } from "../ui";
import useAuth from "../../state/useAuth";
import useLoginModal from "../../state/useLoginModal";

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const loginModal = useLoginModal();
  const auth = useAuth();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const isMobile = () => window.innerWidth < 640;
  const handleMenuClick = () => {
    if (isMobile()) setSidebarOpen(false);
  };

  const menuItems = [
    { id: "home", label: "Halaman awal", icon: "bi-house", to: "/" },
    { id: "dev", label: "Opsi pengembang", icon: "bi-braces", to: "/developer" },
    { id: "pricing", label: "Harga produk", icon: "bi-tags", to: "/pricing" },
    { id: "feedback", label: "Feedback", icon: "bi-chat-right-quote", to: "/feedback" },
    { id: "faq", label: "FAQ", icon: "bi-question-square", to: "/faq" },
    { id: "about", label: "Tentang kami", icon: "bi-info-square", to: "/about" },
  ];

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-300 dark:bg-neutral-900 dark:border-neutral-600 transition-transform duration-500 ease-in-out shadow-sm border-r ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col px-3 pb-4">
        {/* Menu list (scrollable) */}
        <ul className="flex-1 overflow-y-auto space-y-2 text-sm">
          {menuItems.map(({ id, label, icon, to }) => {
            const isActive = location.pathname === to;
            return (
              <li key={id}>
                <Link
                  to={to}
                  onClick={handleMenuClick}
                  className={`flex items-center p-2 rounded-sm font-medium transition duration-150 ${isActive
                      ? "font-semibold bg-blue-100 border border-blue-600 text-blue-600 dark:bg-blue-900 dark:text-white"
                      : "text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                    }`}
                >
                  <i
                    className={`bi ${icon} w-5 h-7 text-xl align-middle transition duration-75 ${isActive ? "text-blue-600" : "text-gray-700"
                      }`}
                  />
                  <span className="ms-3 whitespace-nowrap align-middle">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Sticky bottom login section */}
        {auth.user ? (<div className="mt-4">
          <p className="font-semibold text-gray-600 text-base text-center">Login sebagai</p>
          <p className="text-gray-500 text-md text-center mb-4">
            {auth.name}
          </p>
          <Button as="button" variant="red" className="w-full">Logout</Button>
        </div>) : (
          <div className="space-y-2 mt-4">
            <p className="font-semibold text-gray-600 text-base text-center">Belum login?</p>
            <p className="text-gray-500 text-md text-center mb-4">
              Login untuk menggunakan sebagian besar fitur di BASIS-64
            </p>
            <Button as="button" variant="blue" className="w-full" onClick={() => loginModal.show()}>Login</Button>
          </div>
        )}

      </div>
    </aside>

  );
}
