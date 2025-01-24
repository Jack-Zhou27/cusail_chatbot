import logo from "@/public/assets/logo.png"
import Image from "next/image"
export default function ChatMessage({ message }) {
    return (
      <div className={`flex py-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[70%] p-3 rounded-lg ${
            message.isUser
              ? 'bg-indigo-500 hover:bg-indigo-600 text-white drop-shadow-xl'
              : 'drop-shadow-xl bg-gradient-to-bl from-purple-200 via-cyan-100 hover:to-orange-300 hover:from-purple-300 hover:via-cyan-100 to-orange-200 text-gray-900'
          }`}
        >
          {/* If else statement so logo only shows for bot's response */}
          {!message.isUser ? 
            <div className="flex mr-2 ml-2 items-center">
              <Image src={logo} alt="Logo" width={70} height={70} className="pr-4"/>
              {message.text}
            </div>
            : 
            <span className="mr-2 ml-2">{message.text}</span> }
        </div>
      </div>
    );
  }