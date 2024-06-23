"use client";
import MovieSection from "./MovieSection";


export default function Hero() {
  // List of genres
  
  return (
    <section className="text-white flex flex-col items-center justify-center w-full md:w-[80%] mx-auto mt-[40px] md:mt-[20vh]">
      <h1 className="text-3xl font-bold capitalize text-center md:text-4xl">
        Discover & Vote for the next <br className="hidden md:block"></br> movie night hit!
      </h1>
      <div className="mt-[30px] w-full flex items-start flex-col gap-[10px] z-10">
        <div className="flex flex-col gap-[10px] w-full items-center justify-center">
          <div className="w-fit py-1 px-2 flex items-center justify-center border border-[orangered] rounded-[99em]">
            <span className="text-xs font-semibold text-[orangered]">Yomune</span>
          </div>
          <p className="text-sm text-[grey]/100 mt-[20px]">
            Simply search for any movie you want😉
          </p>
        </div>
      </div>
      <MovieSection />
    </section>
  );
}
