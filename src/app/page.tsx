import Image from "next/image";
import Hero from "@/components/shared/Hero";
import fetchMovies from "@/actions/fetchMovies";

export default async function Home() {
  return (
    <main className="text-white p-6 mt-[40px]">
      <Hero />
    </main>
  );
}
