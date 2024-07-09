"use server";


export default async function fetchSimilarMovies(movie_id: number | string){
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${process.env.API_KEY}&language=en-US&limit=6`)
        if (!response.ok){
            throw new Error("Failed to fetch similar movies")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error while fetching movies:", error);
        throw error;
    }
}