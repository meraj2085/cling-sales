import Link from "next/link";
import logo from "../../public/logo.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <header class="bg-white border-b">
      <div class="mx-auto flex h-16 max-w-[1200px] items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-1 items-center justify-end md:justify-between">
          <Link href="/">
            <Image className="w-20" src={logo} alt="" />
          </Link>

          <div class="flex items-center gap-4">
            <div class="sm:flex sm:gap-4">
              <a
                class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                href="/"
              >
                Login
              </a>
            </div>

            <button class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span class="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
