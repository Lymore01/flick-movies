"use server";


export default async function fetchCasts(movie_id: number | string){
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.API_KEY}&language=en-US`)
        if (!response.ok){
            throw new Error("Failed to fetch casts")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error while fetching casts:", error);
        throw error;
    }
}