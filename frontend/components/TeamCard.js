import React from 'react'
import Image from 'next/image'
const TeamCard = ({image,name,role}) => {
  return (
    <div className="flex flex-col items-center justify-center">
        <div className="mb-4"> 
            <Image
                src={image}
                alt="people"
                className="w-24 h-24 object-cover rounded-lg"
            />
        </div>
        <div>
            <h1 className="text-center text-xl text-black hover:text-slate-900">{name}</h1>
        </div>
        <div>
            <p className="text-center text-md text-stone-800 hover:text-sone-900">{role}</p>
        </div>
    </div>
  )
}

export default TeamCard