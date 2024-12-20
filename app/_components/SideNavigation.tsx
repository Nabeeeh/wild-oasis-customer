import SignOutButton from "./SignOutButton";
import SideNavigationLink from "./SideNavigationLink";

function SideNavigation() {
  return (
    <nav className="md:border-r border-primary-900">
      <ul className="flex items-center gap-2 h-full text-xs sm:text-sm md:flex-col md:items-start md:text-base lg:text-lg">
        <SideNavigationLink />
        <li className="ml-auto md:ml-0 md:mt-auto pr-2 md:w-full">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
