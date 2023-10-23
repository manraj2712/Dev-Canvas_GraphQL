"use client";
function Loading() {
  return (
    <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
      <section className="flexBetween max-lg:flex-col gap-10 w-full">
        <div className="flex items-start flex-col w-full">
          <div className="bg-neutral-300 animate-pulse  w-28 h-28 rounded-full"></div>
          <div className="text-4xl font-bold mt-10 bg-neutral-300 animate-pulse  w-40 h-12 rounded-md"></div>
          <div className="text-4xl font-bold mt-10 bg-neutral-300 animate-pulse  w-96 h-12 rounded-md"></div>
          <div className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg bg-neutral-300 animate-pulse  h-12"></div>
        </div>

        <div className="bg-neutral-300 animate-pulse  w-[1000px] h-[400px] rounded-xl object-cover"></div>
      </section>
      <section className="flexStart flex lg:mt-28 mt-16 w-full gap-8">
        <div className="h-72 w-96 bg-neutral-300 animate-pulse  rounded-md"></div>
        <div className="h-72 w-96 bg-neutral-300 animate-pulse  rounded-md"></div>
        <div className="h-72 w-96 bg-neutral-300 animate-pulse  rounded-md"></div>
      </section>
    </section>
  );
}

export default Loading;
