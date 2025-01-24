"use client"
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/assets/logo.png';

import {faBars, faClose} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
    {/* */}
    // const router = useRouter();

    {/*Hamburger for Mobile*/}
    const[isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    
    const handleHamburgerClick = () => {
        setIsHamburgerOpen(!isHamburgerOpen);
    };

    useEffect(() => {
        //close hamburger if screen size > 640px
        const resizeScreen = () => {
            if(window.innerWidth >= 640) {
                setIsHamburgerOpen(false);
            }
        };

        window.addEventListener("resize", resizeScreen);
        resizeScreen(); //Check screen size intially
        return () => {
            window.removeEventListener("resize", resizeScreen);
        }
    }, []);


    {/*Navbar Animation*/}
    const [isScrolled, setIsScrolled] = useState(false);
    const handleScroll = () => {
        if(window.scrollY > 80){
            setIsScrolled(true);
            setIsHamburgerOpen(false)
        }
        else{
            setIsScrolled(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <nav className={`w-full top-0 z-50 fixed transition-all duration-300 p-1 ${isScrolled ? "bg-gradient-to-r from-blue-300 via-indigo-300 to-pink-300" : "bg-transparent"}`}>
                <div className='flex justify-between items-center mx-auto'>
                    {/* logo */}
                    <Link 
                        href="/"
                        className="flex items-center font-space font-extrabold text-white text-2xl hover:text-purple transition-colors ml-10 md:ml-20 mt-3"
                    >
                        <Image src={logo} alt="logo" className="w-12 h-12 mr-4"/>
                        Chatbot @ CU Sail
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:block">
                        <Link
                            href="/chat"
                            className="text-white text-2xl font-semibold font-space mr-5 md:mr-10 mt-3"
                        >
                            Chat
                        </Link>

                        <Link
                            href="/about"
                            className="text-white text-2xl font-semibold font-space mr-10 md:mr-20 mt-3" 
                        >
                            About
                        </Link>
                    </div>

                    {/* hamburger for mobile */}
                    <div className="md:hidden"> 
                        <button
                            onClick = {handleHamburgerClick}
                            aria-label="Toggle Menu"
                        >
                            <FontAwesomeIcon
                                icon={isHamburgerOpen ? faClose : faBars}
                                alt = "toggle"
                                className="w-12 h-12 mt-3 mr-10"
                            />
                        </button>

                        {/* Mobile Nav*/}
                        {isHamburgerOpen && (
                            <div className={`p-5 flex flex-col absolute top-full left-0 w-full ${isScrolled ? "bg-gradient-to-r from-blue-300 via-indigo-300 to-pink-300" : "bg-transparent"}`}>
                                <Link
                                    href="/chat"
                                    className="text-white text-center text-2xl font-semibold font-space mr-5 md:mr-10 mt-3"
                                >
                                    Chat
                                </Link>
        
                                <Link
                                    href="/about"
                                    className="text-white text-center text-2xl font-semibold font-space mr-10 md:mr-20 mt-3" 
                                >
                                    About
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>

    )
}

export default Navbar