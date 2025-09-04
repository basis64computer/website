// import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function NotFound() {
  return (
    <main className="grid h-screen w-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-6xl font-semibold text-blue-600 text-stroke text-stroke-2 text-stroke-white">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Button as="a" variant="blue" className="text-sm py-2.5" href="/">Kembali</Button>
          <Button as="a" variant="transparent-blue" className="text-sm py-2.5" href="/about">Tentang Kami</Button>
        </div>
      </div>
    </main>

  );
}
