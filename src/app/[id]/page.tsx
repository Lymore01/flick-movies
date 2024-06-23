"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { MovieProps } from "@/components/shared/MovieSection";
import { fetcher } from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import getTrailer from "@/actions/getTrailer";

const Overview = ({ params }: { params: { id: string } }) => {
  const [movieTrailerKey, setMovieTrailerKey] = useState("");

  const { data, error } = useSWR(`/api/${params.id}`, fetcher);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const key = await getTrailer(params.id);
        setMovieTrailerKey(key);
      } catch (error) {
        console.error("Error fetching trailer key:", error);
      }
    };

    fetchTrailer();
  }, [params.id]);

  if (error) return <div>Error loading data...</div>;
  if (!data) return <div>Loading...</div>;

  const movie: MovieProps = data?.data;


  return (
    <main className="p-6 mt-[40px] text-white w-full min-h-screen md:mt-[10vh]">
      
      <div
        className="mt-[40px] flex flex-col justify-between relative"
        key={movie.id}
      >
        <div className="bg-[grey]/20 w-full h-[70vh] rounded-lg md:w-[60%] md:mx-auto overflow-hidden">
        <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${movieTrailerKey}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
        </div>
        <div className="py-4 space-y-6 md:w-[60%] md:mx-auto">
          <h1 className="text-2xl capitalize">{movie.title}</h1>
          <p className="text-base w-full text-white">{movie.overview}</p>
        </div>
        
        <div className="flex w-full h-auto items-end justify-end mt-[40px] backdrop-blur-md md:w-[60%] md:mx-auto">
          <Button asChild className="bg-white text-black">
            <Link href={"/vote"}>Vote</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Overview;
