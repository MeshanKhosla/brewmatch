import Link from "next/link";
import { Home, Menu, Coffee, UserRound, CirclePlus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "~/components/ui/sheet";
import { type Session } from "next-auth";
import Login from "~/components/login";
import { ModeToggle } from "~/components/mode-toggle";
import NavLinkBolder from "~/components/NavLinkBolder";

type Props = {
  session: Session | null;
  children: React.ReactNode;
};

/** Layout including sidebar and navbar */
export function Main(props: Props) {
  const { session, children } = props;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/discover"
              className="flex items-center gap-2 font-semibold"
            >
              <Coffee className="h-6 w-6" />
              <span className="">BrewMatch</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium md:fixed lg:px-4">
              <Link
                href="/discover"
                id="discover-link"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" // bg-muted text-primary
              >
                <Home className="h-4 w-4" />
                Discover
              </Link>
              <Link
                href="/profile"
                id="profile-link"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <UserRound className="h-4 w-4" />
                Profile
              </Link>
              <Link
                href="/create-cafe"
                id="create-cafe-link"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CirclePlus className="h-4 w-4" />
                Create Cafe{" "}
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <SheetClose asChild>
                  <Link
                    href="/discover"
                    className="mt-[-0.9rem] flex items-center gap-2 pb-3 text-lg font-semibold"
                  >
                    <Coffee className="h-8 w-8" />
                    <span className="sr-only">BrewMatch</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/discover"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Discover
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/profile"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <UserRound className="h-5 w-5" />
                    Profile
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/create-cafe"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <CirclePlus className="h-5 w-5" />
                    Create Cafe
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex w-full justify-end gap-2">
            <ModeToggle />
            <Login session={session} />
          </div>
        </header>

        <div className="p-3">{children}</div>
      </div>
      <NavLinkBolder />
    </div>
  );
}
