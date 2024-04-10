import { getServerSession } from "next-auth";
import Login from "~/components/login";
import { ModeToggle } from "~/components/mode-toggle";
import { authOptions } from "~/server/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <ModeToggle />
      <Login session={session} />
    </main>
  );
}
