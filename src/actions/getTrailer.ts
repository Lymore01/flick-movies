export default async function getTrailer(id:string){
    const baseUrl = `https://api.themoviedb.org/3/movie/${id}/videos`;
    try {
      const response = await fetch(`${baseUrl}?api_key=c27d978617c8d6aa99cec43c764351f5`);
      if (!response.ok) {
        throw new Error("Failed to fetch trailer");
      }
      const data = await response.json();
      return(data.results[0].key)
    } catch (error) {
      console.error("Error while fetching trailer:", error);
      throw error;
    }
}
