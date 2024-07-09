import Image from 'next/image'
import React from 'react'

export type Cast = {
    image: string, 
    alt: string,
    realName:string, 
    actingName:string,
}

const CastCard = ({image, alt, realName, actingName} : Cast) => {
  return (
    <div
      className="flex flex-col gap-[5px] w-full h-auto md:h-[300px] rounded-lg cursor-pointer overflow-hidden relative"
    >
      <Image
        src={image}
        alt={alt}
        className="object-center object-cover w-full h-[220px] rounded-lg border border-[grey]/20"
        width={100}
        height={100}
      />
      <div className='flex flex-col gap-[10px] h-[20px]'> 
        <h1 className='text-sm white capitalize'>{realName}</h1>
        <h1 className='text-xs capitalize text-[white]/60'>{actingName}</h1>
      </div>
    </div>
  )
}

export default CastCard