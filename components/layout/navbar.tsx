import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="p-4 flex flex-row justify-between">
      <div className="flex flex-row justify-between w-32 max-w-32">
        <Link href="/" passHref>
          <p className="mr-8 cursor-pointer">Home</p>
        </Link>
        <Link href="/new-recipe" passHref>
          <p className="cursor-pointer">Create</p>
        </Link>
      </div>

      {!session && <button onClick={() => signIn()}>Sign In</button>}
      {session && (
        <div className="flex flex-row justify-between w-1/6 max-w-1/6">
          <p>{session.user?.name}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
