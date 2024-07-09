"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { MovieProps } from "@/components/shared/MovieSection";
import { fetcher } from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import getTrailer from "@/actions/getTrailer";
import fetchSimilarMovies from "@/actions/fetchSimilarMovies";
import { Metadata } from "next";
import MovieCard from "@/components/shared/MovieCard";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/router";
import getYear from "@/getYear";
import getRatings from "@/utils/getRatings";
import fetchCasts from "@/actions/fetchCasts";
import CastCard from "@/components/shared/CastCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export type SimilarMovie = {
  id: number;
  title: string;
  poster_path: string;
};

export type MovieCast = {
  original_name: string;
  profile_path: string;
  character: string;
};

const Overview = ({ params }: { params: { id: string } }) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const [movieTrailerKey, setMovieTrailerKey] = useState("");
  const [movieTrailerWatch, setMovieTrailerWatch] = useState<boolean>(false);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
  const [casts, setCasts] = useState<MovieCast[]>([]);

  const { data, error } = useSWR(`/api/${params.id}`, fetcher);

  const handleTrailerWatch = () => {
    setMovieTrailerWatch(true);
  };

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const movieCasts = await fetchCasts(params.id);
        setCasts(movieCasts?.cast);
      } catch (error) {
        console.log("Error occured:", error);
      }
    };

    fetchCast();
  }, [params.id]);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const movieData = await fetchSimilarMovies(params.id);
        setSimilarMovies(movieData?.results);
      } catch (error) {
        console.log("Error fetching similar movies: ", error);
      }
    };

    fetchSimilar();
  }, [params.id]);

  const handlePosterClick = (id: number) => {
    window.location.href = `/${id}`;
  };

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

  // movieTitle = movie.title

  return (
    <main className="p-6 mt-[40px] text-white w-full min-h-screen md:mt-[10vh]">
      <div
        className="mt-[40px] flex flex-col justify-between relative"
        key={movie.id}
      >
        <div className="bg-[grey]/20 w-full h-[70vh] rounded-lg md:w-[60%] md:mx-auto overflow-hidden">
          {movieTrailerWatch == true ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${movieTrailerKey}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          ) : (
            <iframe
              src={`https://embed.smashystream.com/playere.php?tmdb=${params.id}`}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </div>
        <div className="py-4 space-y-6 md:w-[60%] md:mx-auto">
          <div className="w-full flex justify-between">
            <h1 className="text-2xl capitalize">{movie.title}</h1>
            <Button
              className="bg-white text-black"
              onClick={handleTrailerWatch}
            >
              {movieTrailerWatch == true ? "Watch" : "Trailer"}
            </Button>
          </div>
          <div className="flex flex-row gap-[5px]">
            <Rating
              name="half-rating-read"
              defaultValue={getRatings(movie.vote_average)}
              precision={0.5}
              readOnly
            />
            <span className="text-sm capitalize">
              {getRatings(movie.vote_average)}
            </span>
          </div>
          <div className="flex flex-row gap-[10px]">
            <span className="text-sm capitalize">
              {getYear(movie.release_date)}
            </span>
          </div>
          <p className="text-base w-full text-white md:text-sm">
            {movie.overview}
          </p>
        </div>

        {/* casts */}

        <div className="py-4 space-y-6 md:w-[60%] md:mx-auto">
          <h1 className="text-xl capitalize">Casts</h1>
          <div className="w-full h-auto md:gap-[20px] gap-[10px] mt-[10px] relative ">
            <Slider {...settings}>
              {casts.map((cast) => {
                return (
                  <CastCard
                    actingName={cast.original_name}
                    alt={cast.original_name}
                    image={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                        : "https://ttwo.dk/wp-content/uploads/2017/08/person-placeholder.jpg"
                    }
                    realName={cast.original_name}
                    key={cast.profile_path}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="py-4 space-y-6 md:w-[60%] md:mx-auto">
          <h1 className="text-xl capitalize">More like this</h1>
          <div className="w-full h-auto grid grid-cols-2 md:grid-cols-6 md:gap-[20px] gap-[10px] mt-[10px] relative ">
            {similarMovies.slice(0, 6).map((movie) => (
              <MovieCard
                title="none"
                year="none"
                key={movie.id}
                alt={movie.title}
                onClick={() => {
                  handlePosterClick(movie.id);
                }}
                index={0}
                image={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://video-smo.geodata.gov.hk/AVideo/view/img/notfound_portrait.jpg"
                }
              />
            ))}
          </div>
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
