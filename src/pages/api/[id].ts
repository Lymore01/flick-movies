"use server"

import { NextApiRequest, NextApiResponse } from "next";



const fetchMoviesById = async(id:any) =>{
    
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c27d978617c8d6aa99cec43c764351f5&language-en-US`)
        const data = await response.json()
        return data;
    } catch (error) {
        console.log("Error while fetching movies")
    }
}

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    switch(req.method){
        case "GET":
        try {
            const {id} = req.query
            const movies = await fetchMoviesById(id)
            res.status(200).json({success:"true", data:movies})
            // console.log(movies)
            
        } catch (error) {
            res.status(400).json({message:"Error fetching movies"})
        }
        break;
        default:
    }

}