import Link from "next/link";
import Image from "next/image";

import { NavLinks } from "@/contants/links";
import { getCurrentSession } from "@/lib/session";
import AuthProviders from "./authProviders";

export default async function Navbar() {
  const session = await getCurrentSession();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={115} height={43} alt="Dribbble Clone" />
        </Link>
        <ul className="xl:flex hidden text-sm gap-7">
          {NavLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.url}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      {session ? (
        <Link href="/profile">
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              width={30}
              height={30}
              alt={session?.user?.name}
            />
          ) : (
            <div></div>
          )}
        </Link>
      ) : (
        <AuthProviders />
      )}
    </nav>
  );
}
