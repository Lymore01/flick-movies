"use server";

import { revalidatePath } from "next/cache";

const baseUrl = "https://api.themoviedb.org/3/discover/movie";

export default async function fetchMovies(page:number = 1, genreId:number|string = "") {
  try {
    const response = await fetch(`${baseUrl}?api_key=c27d978617c8d6aa99cec43c764351f5&sort_by=popularity.desc&vote_average.gte=7.5&page=${page}&with_genres=${genreId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching movies:", error);
    throw error;
  }
}



