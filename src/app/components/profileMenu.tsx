'use client';
import Link from "next/link";
import Image from "next/image";
import {signOut} from "next-auth/react";
import { SessionInterface } from "@/common/types";
export default function ProfileMenu({session}:{session: SessionInterface}) {
    return (
    <div className="flex">
          {session?.user?.image ? (
            <div className="flex gap-2">
            <Link href={`/profile/${session?.user?.id}`}>
              <Image
                src={session?.user?.image}
                width={30}
                height={30}
                alt={session?.user?.name}
              />
            </Link>
            <button onClick={()=>{
                signOut();
            }}>Sign Out</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        )
}