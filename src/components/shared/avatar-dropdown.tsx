import { Menu } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const AvatarDropdown = () => {
  const { data: session } = useSession();

  return (
    <Menu>
      <Menu.Button as="div" className="flex">
        <Image
          height={30}
          width={30}
          className="rounded-full"
          src={
            (session?.user?.image as string) ||
            `https://avatars.dicebear.com/api/bottts/${encodeURIComponent(
              session?.user?.name as string
            )}.svg`
          }
          alt="Current user's profile avatar"
        />
      </Menu.Button>
      <Menu.Items
        as="div"
        className="flex flex-col absolute mt-32 right-12 bg-black p-2 rounded-sm focus:outline-none"
      >
        <Menu.Item as="div" className="pb-2 border-b">
          {({ active }) => (
            <Link
              href={`/users/${encodeURIComponent(
                session?.user?.email as string
              )}`}
            >
              <a
                className={`${active && "bg-blue-500"}`}
                href="/account-settings"
              >
                Profile
              </a>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item as="div" className="pt-2">
          {({ active }) => (
            <button
              className={`${active && "bg-blue-500"}`}
              onClick={() => signOut()}
            >
              Logout
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default AvatarDropdown;
