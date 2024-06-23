import Image from "next/image";
import React from "react";
import { movieCardProps } from "./MovieCard";

const SearchCard = ({ title, image, alt, onClick, year }: movieCardProps) => {
  return (
    <div className="cursor-pointer gap-4 p-4 w-full items-center flex flex-row h-auto hover:bg-[grey]/30" onClick={onClick}>
      <div className="w-[50px] h-[60px] bg-[grey]/30 rounded-lg">
        <Image
          src={image}
          alt={alt}
          className="object-center object-cover size-full rounded-lg"
          width={100}
          height={100}
        />
      </div>
      <div className="gap-2 flex flex-col items-start">
        <span className="text-sm">{title}</span>
        <span className="text-xs w-fit px-2 py-1 rounded-lg cursor-pointer bg-[red]/30">
          {year}
        </span>
      </div>
    </div>
  );
};

export default SearchCard;
