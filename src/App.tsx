import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./index.css";
import { Navbar, Sidebar } from "./components/layout";
import { pages } from "./pages";
import NotFound from "./pages/NotFound";
import { Footer } from "./components/layout/Footer";
import { CookieManager } from "./utils/CookieManager";
import { LoginModal } from "./components/layout/LoginModal";
import useLoginModal from "./state/useLoginModal";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const validPaths = pages.map((p) => p.path);
  const shouldHideLayout = !validPaths.includes(location.pathname);

  useEffect(() => {
    // cek session
    const checkSession = async () => {
      const status = await CookieManager.check();
      if (!status) {
        return <Navigate to="/internal-server-error" replace />;
      }
    };
    checkSession();

    // handle resize sidebar
    const handleResize = () => {
      if (window.innerWidth < 640) setSidebarOpen(false);
      else setSidebarOpen(true);
    };

    handleResize(); // panggil sekali saat mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideLayout && (
        <>
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </>
      )}

      <main
        className={`flex-1 ${sidebarOpen && !shouldHideLayout ? "sm:ml-64" : "sm:ml-0"
          } ${!shouldHideLayout ? "pt-16" : ""} bg-gray-50 dark:bg-neutral-950 transition-all duration-500`}
      >
        <Routes>
          {pages.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <div
        className={`${sidebarOpen && !shouldHideLayout ? "sm:ml-64" : "sm:ml-0"
          } transition-all duration-500 bg-gray-50 dark:bg-neutral-950`}
      >
        {!shouldHideLayout && <Footer />}

      </div>
      {useLoginModal().modal ? <LoginModal/> : <></> }
    </div>
  );
}
