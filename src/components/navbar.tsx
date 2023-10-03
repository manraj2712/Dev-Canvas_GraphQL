import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/contants/links";
import { getCurrentSession } from "@/lib/session";
import AuthProviders from "./authProviders";
import ProfileMenu from "./profileMenu";

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
        <div className="flexCenter gap-4">
          <ProfileMenu session={session} />{" "}
          <Link href={"/create-project"}>Share Work</Link>
        </div>
      ) : (
        <AuthProviders />
      )}
    </nav>
  );
}
