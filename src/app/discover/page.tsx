import { SearchBar } from "~/components/SearchBar";
import { getAllCafes } from "~/queries";
import { ClosestCafes } from "~/components/ClosestCafes";

const Page = async () => {
  const allCafes = await getAllCafes();

  return (
    <div className="flex flex-col gap-5 pt-4">
      <h2 className="text-4xl font-semibold">Discover</h2>
      <h3 className="text-2xl pt-4">Locate Your Cafe</h3>
      <div className="grid grid-cols-1 gap-3">
        <SearchBar cafes={allCafes} />
        <h3 className="text-itim items-center text-2xl">Nearby Cafes</h3>
        <ClosestCafes cafes={allCafes} />
      </div>
    </div>
  );
};

export default Page;
