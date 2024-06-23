import React from 'react'
import { Metadata } from 'next'
import UnderConst from '@/components/shared/UnderConst'

export const metadata = {
  title:"View Votes",
  description:"A page to view all the users votes including your's"
}

const ViewVotes = () => {
  return (
    <section className='mt-[40px] w-full h-screen items-center justify-center flex'>
      <UnderConst />
      {/* <div className='mt-[40px] w-full flex flex-col gap-[20px] h-full overflow-y-scroll'>
      <MovieVoteCard title='Avatar last air bender' votes={19}/>
      <MovieVoteCard title='Spontaneous' votes={17}/>
      </div> */}
    </section>
  )
}

export default ViewVotes

const MovieVoteCard = ({title, votes}:{title:string, votes:number}) =>{
  return (
      <div className='w-full border border-[grey]/20 rounded-lg h-[40px] cursor-pointer flex flex-row justify-between px-4 py-6 items-center text-white capitalize'>
          <div className='underline cursor-pointer'>
            {title}
          </div>
          <div>
            <span className='text-[orangered]'>{votes} votes</span>
          </div>
      </div>
  )
}