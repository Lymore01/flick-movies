import React from 'react'
import { IoIosHeart } from "react-icons/io";

const Footer = () => {
  return (
    <section className='w-full mx-auto p-6 flex items-center justify-center text-xs text-white flex-col gap-[10px]'>
      <span className='py-2'>Made with <span className='inline-flex'><IoIosHeart className='fill-[red]'/></span> by Kelly Limo.</span>
    </section>
  )
}

export default Footer