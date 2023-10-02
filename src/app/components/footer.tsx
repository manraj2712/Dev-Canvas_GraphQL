import { footerLinks } from "@/contants/links";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <section className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image src="/logo-purple.svg" width={116} height={38} alt="logo" />

          <p className="text-start text-sm font-normal mt-5 max-w-xs">
            Dribbble is the world&apos;s leading community for creatives to
            share, grow, and get hired.
          </p>
        </div>
        <div className="flex flex-wrap gap-12 justify-between">
          {
            footerLinks.map((column) => (
              <FooterColumn key={column.title} title={column.title} links={column.links} />
            ))
          }
        </div>
      </div>

      <div className="flexBetween footer_copyright">
        <p>@ 2023 Dribbble. All rights reserved</p>
        <p className="text-gray">
          <span className="text-black font-semibold">10,214</span> projects
          submitted
        </p>
      </div>
    </section>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<string>;
}) {
  return (
    <div className="footer-column">
      <h4 className="font-semibold">{title}</h4>
      <ul className="flex flex-col gap-2 font-normal">
        {links.map((link) => (
          <li key={link}>
            <Link href="/">{link}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
