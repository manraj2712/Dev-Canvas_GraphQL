import Modal from "@/components/modal";
import React from "react";

function loading() {
  return (
    <Modal>
      <div className="flex-1 flex items-start gap-5 w-full ">
        <div className="bg-neutral-300 animate-pulse w-16 h-16 rounded-full"></div>
        <div>
          <div className="bg-neutral-300 animate-pulse w-28 h-4 rounded-md"></div>
          <div className="mt-3 bg-neutral-300 animate-pulse w-32 h-4 rounded-md"></div>
        </div>
      </div>
      <section className="mt-14 flexCenter">
        <div className="bg-neutral-300 animate-pulse w-[1064px] h-[798px] rounded-2xl"></div>
      </section>

      <section className="flexCenter flex-col mt-20">
        <div className="bg-neutral-300 animate-pulse w-96 h-8 rounded-md"></div>
      </section>

      <section className="flexCenter w-full gap-8 mt-28">
        <div className="w-full h-0.5 bg-light-white-200"></div>
        <div className="bg-neutral-300 animate-pulse w-82 h-82 rounded-full"></div>
        <div className="w-full h-0.5 bg-light-white-200"></div>
      </section>

      <section className="flexStart flex lg:mt-28 mt-16 w-full gap-8">
        <div className="h-44 w-52 bg-neutral-300 animate-pulse  rounded-md"></div>
        <div className="h-44 w-52 bg-neutral-300 animate-pulse  rounded-md"></div>
        <div className="h-44 w-52 bg-neutral-300 animate-pulse  rounded-md"></div>
      </section>
    </Modal>
  );
}

export default loading;
