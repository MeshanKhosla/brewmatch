import { getServerSession } from "next-auth";
import CreateDrinkProfile from "~/components/CreateDrinkProfile";
import { authOptions } from "~/server/auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <h1 className="text-2xl font-semibold">Sign in to view your profile!</h1>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center bg-[#F7F0DD] p-4 py-12 text-center text-black">
        <h2 className="text-center text-4xl">PROFILE</h2>
      </div>
      <h1 className="py-3 text-2xl font-semibold">
        Create a new Drink Profile
      </h1>
      <CreateDrinkProfile />
    </div>
  );
};

export default Page;
