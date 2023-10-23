import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/contants/links";
import AuthProviders from "./authProviders";
import ProfileMenu from "./profileMenu";
import { getCurrentServerSession } from "@/lib/session";

export default async function Navbar() {
  const session = await getCurrentServerSession();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={225} height={75} alt="Dribbble Clone" />
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
          <Link href={"/create-project"} className="hidden sm:flex px-5 py-3 rounded-3xl bg-black text-white">Share Work</Link>
        </div>
      ) : (
        <AuthProviders />
      )}
    </nav>
  );
}
