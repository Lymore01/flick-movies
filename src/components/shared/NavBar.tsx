import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";

const NavBar = () => {
  return (
    <section className="text-white w-full backdrop-blur-lg border border-[grey]/20 shadow-lg h-auto md:h-[60px] py-2 px-4 flex justify-between items-center rounded-[99em] relative md:w-[80%] mx-auto z-30">
      <Logo />
      <div className="hidden md:flex md:flex-row gap-[20px] md:items-center">
        <Link href={"/view-votes"} className="text-sm">Votes</Link>
        <button className="flex items-center w-fit px-4 py-3 bg-[white] md:rounded-[99em] rounded-lg text-black font-semibold cursor-pointer shadow-sm">
        <Link href={"/create-vote"} className="text-sm">Create Vote</Link>
      </button>
      </div>
      <div className="block md:hidden text-white">
        <Sheet>
          <SheetTrigger>
            <RiMenu3Fill className="size-[30px] cursor-pointer" />
          </SheetTrigger>
          <SheetContent className="text-white flex flex-col gap-6 bg-black">
            <div className="p-3">
              <Logo />
            </div>
            <Separator className="border border-black/20" />
            <Menu />
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
};

export default NavBar;

const Menu = () => {
  return (
    <div className="flex items-start gap-[20px] flex-col md:flex-row justify-start text-white p-3 md:p-0 h-screen">
      <Link href={"/view-votes"}>Votes</Link>
      <Link href={"/create-vote"}>Create Vote</Link>
    </div>
  );
};
