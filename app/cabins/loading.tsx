import Spinner from "../_components/Spinner";

const loading = () => {
  return (
    <div className="grid justify-center items-center">
      <Spinner />
      <p className="text-lg text-primary-200">Loading Cabins ...</p>
    </div>
  );
};

export default loading;
