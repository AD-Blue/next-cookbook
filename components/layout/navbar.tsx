import Link from "next/link";

const Navbar = () => {
  return (
    <div className="p-4 flex flex-row">
      <Link href="/" passHref>
        <p className="mr-8 cursor-pointer">Home</p>
      </Link>
      <Link href="/new-recipe" passHref>
        <p className="cursor-pointer">Create</p>
      </Link>
    </div>
  );
};

export default Navbar;
