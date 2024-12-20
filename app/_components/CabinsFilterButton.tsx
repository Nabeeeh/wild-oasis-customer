import { TCabinFilter } from "../_types/index";

type TCabinsFilterButtonProps = {
  children: React.ReactNode;
  cabinsFilterHandler: (filter: TCabinFilter) => void;
  filter: TCabinFilter;
  activeFilter: TCabinFilter;
};

const CabinsFilterButton = ({
  children,
  cabinsFilterHandler,
  filter,
  activeFilter,
}: TCabinsFilterButtonProps) => {
  return (
    <button
      className={`px-2 sm:px-5 py-2 border-l border-primary-800 hover:bg-primary-700 ${
        activeFilter === filter && "bg-primary-700 text-primary-50"
      }`}
      onClick={() => cabinsFilterHandler(filter)}
    >
      {children}
    </button>
  );
};

export default CabinsFilterButton;
