import UserProfile from './UserProfile'

import Logo from '../../assets/img/logo.png'

interface NavbarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
  return (
    <nav className="fixed top-0 z-50 w-full bg-neutral-900 border-b border-neutral-700 dark:bg-neutral-900 dark:border-neutral-700 shadow-md">
      <div className="px-3 py-2 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="inline-flex items-center order-1 sm:order-2 p-2 text-sm text-white rounded-lg hover:bg-neutral-700 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <div className="flex ms-2 md:me-24 order-2 sm:order-1">
              <img
                src={Logo}
                className="h-12 me-3"
                alt="BASIS-64 Logo"
              />
              <span className="self-center text-lg text-white font-semibold sm:text-xl whitespace-nowrap dark:text-white">
                BASIS-64
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <UserProfile />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}