import { getCountries } from "@/app/_lib/data-service";

type TSelectCountryProps = {
  defaultCountry?: string;
  name: string;
  id: string;
  className: string;
};

async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}: TSelectCountryProps) {
  const countries = await getCountries();
  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
