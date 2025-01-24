"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactCard = ({ animation, title, description }) => { // Properly destructuring props
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div data-aos={animation} className="flex justify-center mb-6 drop-shadow-lg"> {/* Use the correct AOS attribute */}
        <div className="rounded-lg bg-gradient-to-tr from-stone-300 to-rose-300 flex flex-col p-6">
            <h1 className="text-black font-normal text-3xl">{title}</h1>
            <p className="text-stone-700 font-thin text-xl">{description}</p>
        </div>
    </div>
  );
};

export default ContactCard;
