const baseUrl = "https://api.themoviedb.org/3/search/movie";


export default async function searchMovies(query:string | number){
    try {
      const response = await fetch(`${baseUrl}?api_key=c27d978617c8d6aa99cec43c764351f5&query=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      return data
    } catch (error) {
      console.error("Error while searching for movies:", error);
      throw error;
    }
  }