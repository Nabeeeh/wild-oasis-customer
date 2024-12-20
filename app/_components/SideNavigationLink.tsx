"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

const SideNavigationLink = () => {
  const pathName = usePathname();

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathName === link.href;

        return (
          <li key={link.name} className="md:w-full">
            <Link
              className={`${
                isActive && "bg-primary-900 text-primary-100"
              } px-1 py-2 md:py-3 md:px-1 lg:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-2 lg:gap-4 font-semibold text-primary-200`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default SideNavigationLink;
