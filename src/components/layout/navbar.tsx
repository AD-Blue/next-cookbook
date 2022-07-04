import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import AvatarDropdown from "../shared/avatar-dropdown";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="py-6 px-20 flex flex-row items-center justify-between text-brandWhite text-xl font-semibold">
      <div className="flex flex-row justify-between w-32 max-w-32">
        <Link href="/" passHref>
          <p className="mr-8 cursor-pointer">Home</p>
        </Link>
        {session && (
          <Link href="/new-recipe" passHref>
            <p className="cursor-pointer">Create</p>
          </Link>
        )}
      </div>

      {!session && (
        <button className="font-semibold" onClick={() => signIn()}>
          Sign In
        </button>
      )}
      {session && <AvatarDropdown />}
    </div>
  );
};

export default Navbar;
