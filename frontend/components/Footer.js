import React from 'react'
import Image from 'next/image'
import logo from '@/public/assets/logo.png'
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <>
      <div className="grid grid-cols-4 md:grid-cols-12 justify-end bg-deepBlue p-4 pb-14">

        {/* first col */}
        <div className="col-span-2 md:col-span-6 flex flex-row items-center justify-start md:ml-10 lg:ml-16 xl:ml-28">
          <Image
            src = {logo}
            alt = "logo"
            className = "w-12 h-12 mr-4"
          />
          <div className="flex flex-col"> 
            <h1 className="text-semibold text-2xl text-white hover:text-slate-100">CU Sail Chatbot</h1>
            <p className="text-sm font-light text-slate-300 hover:text-slate-400">&copy; CU Sail. All rights reserved. </p>
            <p className="text-xs font-thin text-slate-300 hover:text-slate-400">Made with <FontAwesomeIcon icon={faHeart}/> </p> 
          </div>
        </div>

        {/* second col */}
        <div className = "col-span-1 md:col-span-3 flex flex-col">
            <h1 className="text-2xl text-white font-normal hover:text-slate-200">Quick Links</h1>
            <li className="text-xl font-light hover:text-slate-200">
                <a href="/chat">
                  chat
                </a>
            </li>
            <li className="text-xl font-light hover:text-slate-200">
                <a href="/about">
                  about
                </a>
            </li>
        </div>

        {/* third col */}
        <div className="col-span-1 md:col-span-3 flex flex-col">
          <h1 className="text-2xl font-normal text-white hover:text-slate-200">
            Follow our Socials! 
          </h1>
          <li className="text-xl font-light hover:text-slate-200">
            <a href="/chat">
              Insta
            </a>
          </li>
          <li className="text-xl font-light hover:text-slate-200">
            <a href="/about">
              LinkedIn
            </a>
          </li>
        </div>
      </div>
    </>
  )
}

export default Footer