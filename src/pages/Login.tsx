// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import GoogleLogin from '../components/ui/GoogleLogin';

export default function NotFound() {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  // listen class dark di document
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return (
    <main className="grid h-screen w-full place-items-center bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="p-4 text-xl space-y-4 font-semibold tracking-tight text-balance text-gray-900 border border-gray-300 rounded-sm bg-white">
          <span className="mb-8 p-4">Login dengan Google</span>
        </h1>
      </div>
    </main>

  );
}
