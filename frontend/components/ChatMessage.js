import logo from "@/public/assets/logo.png"
import Image from "next/image"
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
              <div className="markdown-content">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={dracula}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-md"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
            </div>
            : 
            <span className="mr-2 ml-2">{message.text}</span> }
        </div>
      </div>
    );
  }