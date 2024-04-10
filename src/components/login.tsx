"use client"

import { signIn, signOut } from "next-auth/react";
import { Button } from "~/components/ui/button"

interface LoginProps {
  session: any | null;
}

const Login = (props: LoginProps) => {
  const { session } = props;

  return (
    <div className="flex gap-2 ml-1">
      {session ? (
        <div className="flex flex-col">
          <Button onClick={() => signOut()}>Sign out</Button>
          Hello {session.user.name}
        </div>
      ) : (
        <Button onClick={() => signIn('google')}>Sign in</Button>
      )}
    </div>
  )
}

export default Login;