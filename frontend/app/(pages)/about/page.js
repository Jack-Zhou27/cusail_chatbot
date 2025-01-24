"use client"
import React from 'react'
import TeamCard from '@/components/TeamCard'
import jack from '@/public/assets/jack.jpeg'
import nikil from '@/public/assets/nikil.jpeg'
import nicole from '@/public/assets/nicole.jpeg'
import sarvagna from '@/public/assets/sarvagna.jpeg'
import sean from '@/public/assets/sean.jpeg'
import animatedBg from '@/public/assets/animatedBg.svg'
import candy from '@/public/assets/candy.svg'
import wavy from '@/public/assets/wavy.svg'
import Image from 'next/image'
import ContactCard from '../../../components/ContactCard'
const page = () => {

    const now = new Date();
    const dayOfWeek = now.toLocaleDateString('en-US', {weekday: 'long'});
    const currTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
    const time = `Happy ${dayOfWeek}! It's currently ${currTime}`;

  return (
    <>
        <div 
            className="h-min-screen pt-28 pb-16"            
            style={{
                backgroundImage: `url(${animatedBg.src})`,
                backgroundSize: 'cover',        
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'center',  
        }}> 
            <h1 className="text-center text-4xl md:text-5xl font-normal text-stone-800 hover:text-stone-900 pb-10"> about the chat team</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 px-10 md:px-20 lg:px-40 gap-12" >
                <TeamCard
                    image={sean}
                    name="Sean Z"
                    role="Your description here"
                />
                <TeamCard
                    image={nikil}
                    name="Nikil S"
                    role="Your description here"
                />
                <TeamCard
                    image={jack}
                    name="Jack Z"
                    role="Your description herer"
                />
                <TeamCard
                    image={nicole}
                    name="Nicole L"
                    role="Your description here"
                />
                <TeamCard
                    image={sarvagna}
                    name="Sarvagna M"
                    role="Your description here"
                />
            </div>
        </div>

        <div 
            className="h-screen pt-16"
            style={{
                backgroundImage: `url(${candy.src})`,
                backgroundSize: 'cover',        
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'center',  
            }}>
            <h1 className="text-stone-800 hover:text-stone-950 text-center text-5xl mb-10">
                Like a friendly neighbor, cu_sail is here.
            </h1>
            <div className="gap-6 items-center justify-center"> 
                <ContactCard
                    animation="fade-left"
                    title={time}
                    description="Need support? We&apos;re here for you. Allways."
                />
                <ContactCard
                    animation="fade-right"
                    title="General Questions"
                    description="chat@cusail.edu"
                />
                <ContactCard
                    animation="fade-left"
                    title="Press Questions"
                    description="press@cusail.edu"
                />
            </div>
        </div>
        <div className="relative w-full">
            <Image 
                src={wavy}
                alt="wave"
                layout="responsive"
                width={900}
                height={600}
                className="absolute bottom-0 left-0 w-full z-10"
            />
        </div>
    </>
  )
}

export default page