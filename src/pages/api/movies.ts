"use server"

import type { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.MOVIE_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3/discover/movie';

const fetchMovies = async (page: number = 1, limit: number = 10) => {
  try {
    // TMDb API page size is fixed, so limit is handled client-side after fetching the data
    const response = await fetch(`${baseUrl}?api_key=${process.env.API_KEY}&sort_by=popularity.desc&vote_average.gte=7.5&page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching movies:", error);
    throw error;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { page = "1", limit = "10" } = req.query;

  try {
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      return res.status(400).json({ message: "Invalid page or limit query parameter" });
    }

    const movies = await fetchMovies(pageNumber, limitNumber);

    // Slice the results to match the limit if necessary
    const slicedResults = movies.results.slice(0, limitNumber);

    res.status(200).json({ success: "true", data: { ...movies, results: slicedResults } });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Error fetching movies" });
  }
}


// 