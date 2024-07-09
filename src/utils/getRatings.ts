export default function getRatings(vote_count:number){
    // 7.695
    const rating = vote_count/10 * 5
    return rating.toFixed(1).toString()
} 