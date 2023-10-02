import Link from "next/link";
import Image from "next/image";

import { NavLinks } from "@/contants/links";

export default function Navbar() {
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
    </nav>
  );
}
