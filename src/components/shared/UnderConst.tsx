import Image from 'next/image'
import React from 'react'

const UnderConst = () => {
  return (
    <div className="text-white w-[90%] flex flex-col gap-[20px] rounded-lg border border-slate-600 p-4">
        <div className="w-full flex flex-row gap-[5px] h-auto items-center">
          <div className="size-[60px] rounded-full"> 
            <Image src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7aHQGmMNWUwu1ZOZCBkI17UfYJcPC2ShR1Q&s"} alt="profile pic" width={100} height={100} className="size-full object-cover object-center rounded-full"/>
          </div>
          <div className="flex flex-col text-sm">
            <span>👩‍💻</span>
            <span>@_Kelly</span>
          </div>
        </div>
        <div className="w-full"> 
          <span>oops,This page is currently under construction🧐</span>
        </div>
        <div className="flex-row items-center justify-start flex gap-[5px]">
          <span>11:11pm</span>
          <span>.</span>
          <span>6/19/24</span>
          <span>.</span>
          <span className="font-semibold text-[orangered]">Twitter for android</span>
        </div>
        <div className="border border-transparent border-t-slate-500 border-b-slate-300 py-4 w-full flex flex-row justify-start items-center gap-[10px]">
          <p><span className="font-semibold">67.5K {" "}</span>Retweets</p>
          <p><span className="font-semibold">264K </span>Likes</p>
        </div>
        
      </div> 

  )
}

export default UnderConst