import SideNavigation from "../_components/SideNavigation";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-y-8 md:grid md:grid-cols-[9.5rem_1fr] lg:grid-cols-[14rem_1fr] h-full md:gap-5 lg:gap-12 ">
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
};

export default AccountLayout;
