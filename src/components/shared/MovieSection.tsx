// components/MovieSection.js
"use client";
import React, { Suspense, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import fetchMovies from "@/actions/fetchMovies";
import searchMovies from "@/actions/searchMovies";
import { FiSearch } from "react-icons/fi";
import SearchCard from "./SearchCard";
import getYear from "@/getYear";
import Loader from "@/utils/Loader";
import { IoFilter } from "react-icons/io5";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { genres } from "@/utils/genres";

export type MovieProps = {
  release_date: string;
  adult: boolean;
  original_title: string;
  overview: string;
  poster_path: string;
  title: string;
  id: number;
  releaseDate: string;
  vote_average:number ;
};

const MovieSection = () => {
  const router = useRouter();
  const { ref, inView } = useInView();
  const [selectedGenre, setSelectedGenre] = useState("Action");
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [results, setResults] = useState<MovieProps[]>([]);
  const [search, setSearch] = useState("");
  const [isFilterOpen, setFilterOpen] = useState<Boolean>(false);
  const [genreID, setGenreId] = useState<number | string>("");
  const [page, setPage] = useState(2)


  useEffect(() => {
    const fetchFilteredMovies = async () => {
      try {
        if (genreID !== "") {
          const res = await fetchMovies(page, genreID);
          const movieData = res.results || [];
          if (page === 1) {
            setMovies(movieData); // Reset movies if it's the first page
          } else {
            setMovies((prevMovies) => [...prevMovies, ...movieData]); 
          }
        }else{
          setGenreId(35)
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchFilteredMovies();
  }, [genreID, page]);

  useEffect(() => {
    if (inView && !search) {
      setPage(prevPage => prevPage+1)
    }
  }, [inView, search]);

  useEffect(() => {
    const fetchSearchedMovies = async () => {
      if (search !== "") {
        const res = await searchMovies(search);
        const movieData = res.results || [];
        setResults(movieData);
      } else {
        setResults([]);
      }
    };

    fetchSearchedMovies();
  }, [search]);

  const handleClick = (id: number) => {
    router.push(`/${id}`);
  };

  const handleFilterOpen = () => {
    setFilterOpen(!isFilterOpen);
  };

  const handleFilter = () => {
    const genre = genres.find((genre) => genre.name === selectedGenre);
    if (genre) {
      setGenreId(genre.id);
      setMovies([]); 
      setPage(1); 
    }
    setFilterOpen(false); 
  };


  return (
    <>
      <form className="rounded-lg flex h-[60px] w-full flex-row bg-transparent border border-[grey]/20 p-4 divide-[grey]/20 divide-x-2 items-center gap-[10px] z-20 md:w-[35%] md:mx-auto mt-[20px]">
        <div className="w-auto h-full flex items-center justify-center cursor-pointer mr-2">
          <FiSearch className="stroke-white size-[20px]" />
        </div>
        <input
          type="text"
          placeholder="Search here..."
          className="bg-transparent w-full p-4 rounded-r-[99em] text-white outline-none peer/input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </form>

      {search && (
        <div className="w-full h-auto max-h-[200px] bg-[grey]/20 rounded-b-lg flex overflow-y-scroll flex-col z-20 md:w-[35%]">
          {results.map((result, index: number) => (
            <SearchCard
              alt={result.title}
              key={result.id}
              title={result.title}
              image={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
              onClick={() => handleClick(result.id)}
              year={getYear(result.release_date)}
              index={index}
            />
          ))}
        </div>
      )}

      <div className="w-full h-auto flex items-center justify-end mt-[40px] flex-row gap-[10px]">
        <IoFilter
          className="size-[24px] cursor-pointer"
          onClick={handleFilterOpen}
        />
      </div>

      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeInOut", type: "spring" }}
          className="w-full h-auto border border-[grey]/20 rounded-lg p-4 flex flex-col gap-[20px] mt-[10px] md:w-[35%]"
        >
          <span className="font-semibold">Filter By</span>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label htmlFor="year" className="w-1/4 text-right text-gray-300">
                Year
              </label>
              <input
                id="year"
                defaultValue="2024"
                className="h-10 w-full bg-black border border-gray-600 outline-none px-4 rounded text-gray-200"
                type="number"
                min="1900"
                max="2100"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="genre" className="w-1/4 text-right text-gray-300">
                Genre
              </label>
              <select
                id="genre"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="h-10 w-full bg-black border border-gray-600 outline-none px-4 rounded text-gray-200"
              >
                {genres.map(({id, name}) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end w-full">
            <div>
              <button className="w-fit px-3 py-2 rounded-md cursor-pointer bg-white text-black" onClick={handleFilter}>
                Filter
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="w-full h-auto grid grid-cols-2 md:grid-cols-6 md:gap-[20px] gap-[10px] mt-[10px] relative">
        {movies.map((movie) => (
          <MovieCard
            title="none"
            year="none"
            key={movie.id}
            alt={movie.title}
            onClick={() => {
              handleClick(movie.id);
            }}
            index={0}
            image={movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://video-smo.geodata.gov.hk/AVideo/view/img/notfound_portrait.jpg"}
          />
        ))}
      
      </div>
      <div className="py-4 w-full items-center justify-center flex" ref={ref}>
        <Loader />
      </div>
    </>
  );
};

export default MovieSection;
