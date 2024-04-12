"use client"

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"

interface LoginProps {
  session: Session | null;
}

const Login = (props: LoginProps) => {
  const { session } = props;

  return (
    <div className="flex gap-2 ml-1">
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src={session.user.image ?? undefined} />
                <AvatarFallback>
                  {session.user.name ? session.user.name[0] : "B"}
                </AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => signIn("google")} className="bg-transparent hover:bg-transparent text-black font-semibold py-2 px-4 dark:text-white">
          Sign in
        </Button>
      )}
    </div>
  )
}

export default Login;