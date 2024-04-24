import { SearchBar } from "~/components/SearchBar";
import { getAllCafes } from "~/queries";
import { ClosestCafes } from "~/components/ClosestCafes";

const Page = async () => {
  const allCafes = await getAllCafes();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-center bg-[#F7F0DD] p-4 py-12 text-center text-black">
        <h2 className="text-center text-4xl">DISCOVER</h2>
      </div>
      <h3 className="text-itim items-center text-2xl">Locate Your Cafe</h3>
      <div className="grid grid-cols-1 gap-3">
        <SearchBar cafes={allCafes} />
        <h3 className="text-itim items-center text-2xl">Nearby Cafes</h3>
        <ClosestCafes cafes={allCafes} />
      </div>
    </div>
  );
};

export default Page;
