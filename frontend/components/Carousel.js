"use client"
import React, {useState, useEffect} from 'react'
import Image from 'next/image'

const Carousel = (props) => {
    const [position, setPosition] = useState(0);
    useEffect(() => {
        var timerId = setInterval(() => {
            setPosition((prevPosition) => (prevPosition + 1) % props.images.length);
        }, 2500);
        return () => {
            clearInterval(timerId);
        };
    }, []);
    return (
        <> 
            <div className="relative h-[480px] w-[480px]">
                {props.images.map((image, index) => {
                    return (
                        <Image
                            key={index}
                            src={image}
                            alt="carousel"
                            className={`object-cover absolute rounded-lg drop-shadow-md duration-500
                                ${index == position ? "opacity-100 scale-100" : "opacity-0"}`}
                        />
                    );
                })}
            </div>
        </>
    )
}

export default Carousel