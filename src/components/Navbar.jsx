import Link from "next/link";
import logo from "../../public/logo.png";
import Image from "next/image";
import { getUserInfo, isLoggedIn } from "@/utils/authService";
import Loading from "../app/loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const { role } = getUserInfo();
  const router = useRouter();
  const userLoggedIn = isLoggedIn();

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/auth/login");
    }
  }, [userLoggedIn, router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <header className="bg-white border-b">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <Link href="/">
            <Image className="w-20" src={logo} alt="" />
          </Link>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Link
                href="/addSalesPerson"
                className="text-sm font-medium text-teal-600 transition hover:text-teal-600/75"
              >
                Add Sales Person
              </Link>
            </div>
            <div className="sm:flex sm:gap-4">
              <Link
                href="/auth/login"
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
              >
                Login
              </Link>
            </div>

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
