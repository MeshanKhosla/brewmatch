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
                <CardHeader>
                  <CardTitle>{cafe.name}</CardTitle>
                  <CardDescription>{cafe.description}</CardDescription>
                </CardHeader>
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
