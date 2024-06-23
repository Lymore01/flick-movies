import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export type movieCardProps = {
  title: string;
  image: string;
  alt: string;
  onClick: () => void;
  year: string;
  index: number;
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const MovieCard = ({ image, alt, onClick, index }: movieCardProps) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: 1,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="border border-[grey]/20 w-full h-[200px] md:h-[210px] rounded-lg cursor-pointer bg-[grey]/20 overflow-hidden"
      onClick={onClick}
    >
      <Image
        src={image}
        alt={alt}
        className="object-center object-cover size-full"
        width={100}
        height={100}
      />
    </motion.div>
  );
};

export default MovieCard;
