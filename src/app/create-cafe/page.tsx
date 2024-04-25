import { getServerSession } from "next-auth";
import CreateCafe from "~/components/CreateCafe";
import { getCafesByOwner } from "~/queries";
import { authOptions } from "~/server/auth";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Link from "next/link";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <h1 className="text-2xl font-semibold">Sign in to create a cafe!</h1>
    );
  }

  const myCafes = await getCafesByOwner(session.user.id);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="pt-4 text-4xl font-semibold">Your Cafes</h1>
      {myCafes.length === 0 ? (
        <p>
          You don&apos;t have any cafes yet. If you&apos;re a cafe owner, create
          one below!
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 pt-4 md:grid-cols-2">
          {myCafes.map((cafe) => (
            <Link href={`/cafe/${cafe.name}`} key={cafe.id}>
              <Card key={cafe.id}>
              <div
                className="group relative cursor-pointer bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl mx-auto max-w rounded-lg">
                <span className="absolute top-0 z-0 h-0.5 w-0.5 rounded-full bg-lime-600/50 transition-all duration-300 group-hover:scale-[800]"></span>
                <div className="relative z-10 mx-auto max-w-md">
                    <span className="grid h-full w-full rounded-lg transition-all duration-300 group-hover:bg-lime-500/50"></span>
                <CardHeader>
                  <CardTitle>{cafe.name}</CardTitle>
                  <CardDescription>{cafe.description}</CardDescription>
                </CardHeader>
                </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
      <CreateCafe />
    </div>
  );
};

export default Page;
