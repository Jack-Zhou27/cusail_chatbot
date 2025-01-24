"use client"
import React, {useState, useEffect, useRef} from 'react'
import ChatMessage from '../../../components/ChatMessage'
import Image from 'next/image'
import earth from '@/public/assets/earth.gif'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clouds from '@/public/assets/clouds.svg';

const Page = () => {
  const[messages, setMessages] = useState([]);
  const[input, setInput] = useState('');
  const[showText, setShowText] = useState(true);
  const[isLoading, setIsLoading] = useState(false);
  const autoScrollToBottom = useRef(null);

  const sendMessage = async (message) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message}),
      });

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Chat error:', error);  //ESLint demands "error" to be used
      return 'Sorry, we are unable to process your request at the moment!';
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = input.trim();
    // Stop empty messages
    if(!message){
      return;
    }

    // Add user message using 'input'
    setMessages((prev) => [...prev, {text: message, isUser:true}]);
    setInput('');
    setIsLoading(true);
    setShowText(false);
  
    // Get chat response
    const response = await sendMessage(message);
    setMessages(prev => [...prev, {text: response, isUser:false}]);
    setIsLoading(false);
  };

  //autoscroll to bottom of chat history
  useEffect(() => {
    const container = autoScrollToBottom.current;
    if(container){
      container.scrollTop = container.scrollHeight;
    }
  }, [messages])

  return (
    <>
      <div
        className="flex flex-col h-screen"
        style={{
          backgroundImage: `url(${clouds.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Show text */}
        {showText && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold drop-shadow-md mb-4">
              Hey, I&apos;m your personal CU_Sail assistant!
            </h1>
            <Image
              src={earth}
              alt="chat buddy"
              className="w-80 h-45"
            />
          </div>
        )}

        {/* Chat */}  
        <div
          ref={autoScrollToBottom}
          className="flex-1 overflow-y-auto p-6 mt-28 mx-2 md:mx-10 lg:mx-20"
        >
          {messages.map((message,index) => (
            <ChatMessage key={index} message={message}/>
          ))}
          {isLoading && (
            <div className="text-black animate-pulse">Thinking... </div>
          )}
        </div>

        <div className="mb-10 px-5 md:px-10 lg:px-20">
          <form onSubmit={handleSubmit} className="flex p-4 gap-4 md:gap-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className=" text-black text-sm bg-slate-100 font-light drop-shadow-md flex-1 p-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400"
              placeholder="Ask us anything, even your deepest, darkest secrets!"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="flex p-4 pl-6 pr-6 gap-2 items-center justify-center bg-gradient-to-br from-sky-300 to-orange-300 text-black text-2xl md:text-3xl font-normal drop-shadow-xl rounded-lg hover:from-sky-400 hover:to-orange-400 disabled:bg-slate-300"
            >
              Send <FontAwesomeIcon icon={faArrowRight} className=""/>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Page