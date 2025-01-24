import React from "react";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import Card from "@/components/Card";
import earth from "@/public/assets/earth.gif";
import stackedwaves from "@/public/assets/stackedwaves.svg";
import leaves_left from "@/public/assets/leaves_left.png";
import leaves_right from "@/public/assets/leaves_right.png";
import leaves1 from "@/public/assets/leaves1.jpeg";
import leaves2 from "@/public/assets/leaves2.png";
import leaves3 from "@/public/assets/leaves3.webp";
import usa from "@/public/assets/usa.jpg";
import tree1 from "@/public/assets/tree1.jpeg";
import insane from "@/public/assets/insane.png";
import insane_left from "@/public/assets/insane_left.png";
import leaves32 from "@/public/assets/leaves32.webp";
import jack from "@/public/assets/jack.jpeg";
import nikil from "@/public/assets/nikil.jpeg";
import {faCoffee, faBook, faHeart, faLeaf} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const page = () => {
  return (
    <>
      <div className="relative flex items-center justify-center h-screen bg-gradient-to-b from-orange-700 to-orange-300">
        <Image
          src={insane_left}
          alt="leaves left"
          className="absolute right-0 overflow-x-hidden object-cover opacity-85 z-0"
        />
        <Image
          src={insane}
          alt="leaves right"
          className="hidden xl:block absolute top-1/3 left-0 object-cover opacity-5 lg:opacity-95 z-0"
        />
<div className="relative z-10 items-center justify-center">
  <h1 className="xl:text-center font-outline-white-1 md:font-outline-1 drop-shadow-xl text-6xl ml-2 md:ml-16 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-black to-black md:from-violet-700 md:to-orange-600">
    Learn with AI powered insights.
  </h1>
  <p className="xl:w-1/4 mt-4 text-4xl ml-2 md:ml-16 font-extraold drop-shadow-xl text-white text-left xl:text-center xl:mx-auto">
    Embrace the next generation of personalized and intelligent learning.
  </p>
</div>

        {/* <div className="flex justify-center items-center">
          <Image
            src={earth}
            alt="Rotating Earth"
            className="w-192 h-108"
            priority
          />
        </div> */}
      </div>

{/* Cards Section */}
<div className="min-h-screen bg-customRed py-10 px-10 md:px-20 flex flex-col md:flex-row items-center">
  <div className="w-full md:w-1/2 flex pl-10 lg:pl-20 justify-center md:order-2 mb-8 md:mb-0">
    <Image 
      src={leaves32}
      alt="leaves1"
      className="w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] object-cover border-8 border-black opacity-95 shadow-xl"
    />
  </div>
  <div className="w-full md:w-1/2 md:order-1 lg:text-left flex flex-col justify-center">
    <h1 className="text-purple text-4xl md:text-5xl font-semibold drop-shadow-xl mb-2 text-center md:text-left">
      Everyone deserves equal access to information.
    </h1>
    <p className="text-lg text-black drop-shadow-md mb-6 text-center md:text-left">
      CU Sail believes that everyone deserves access to learning that goes beyond the traditional, classroom setting. Apply real engineering to real problems the world is facing, and see your impact fast.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5 md:px-0"> 
      <Card 
        icon={faCoffee} 
        title="Chat Anytime"
        description="The team at CU Sail would love to get to know you! Schedule coffee chats anytime. "
      />
      <Card 
        icon={faBook} 
        title="Real Engineering"
        description="Participate in active, hands-on engineering."
      />
      <Card 
        icon={faLeaf} 
        title="Echo-Minded Tech"
        description="Sailing - powered by wind. Doesn't get more clean than that!"
      />
      <Card 
        icon={faHeart} 
        title="24/7/365 Never Ending Support"
        description="Simply get the help you need at anytime of the day!"
      />
    </div>
  </div>
</div>

      {/* Image Gallery */}
      <div className="h-screen bg-gradient-to-b from-customGreen to-customBlue">
        <h1 className="text-center drop-shadow-xl text-5xl font-bold pt-16 mb-8">Image Gallery</h1>
        <Image
          src={leaves_left}
          alt="leaves left"
          className="hidden lg:block absolute left-0 object-cover z-10"
        />
        <Image
          src={leaves_right}
          alt="leaves right"
          className="hidden xl:block absolute right-0 object-cover z-10"
        />
        <div className="flex items-center justify-center z-10">
          <Carousel images={[usa,tree1,leaves1,leaves2,leaves3]} />
        </div>
      </div>

      {/* Wavy Divider */}
      <div
        className="relative flex flex-col h-screen justify-center items-center"
        style={{
          backgroundImage: `url(${stackedwaves.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute md:left-1/3 top-1/4 text-white text-9xl font-bold drop-shadow-xl">
          Dive
        </div>
        <div className="absolute md:right-1/3 top-2/4 text-white text-9xl font-bold drop-shadow-xl">
          Right
        </div>
        <div className="absolute md:left-1/3 top-3/4 text-white text-9xl font-bold drop-shadow-xl">
          In
        </div>
      </div>

      {/* button section */}
      <div className="w-full h-1/5 -pt-10 pb-16 flex items-center justify-center bg-deepBlue">
        <a href="/chat" className="block">
          <button className="p-4 pr-8 pl-8 rounded-lg shadow-xl text-4xl bg-gradient-to-br from-orange-400 to-red-400 text-white">
            Chatbot @ CU Sail
          </button>
        </a>
      </div>
    </>
  );
};

export default page;
