import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Card = ({icon, title, description}) => {
  return (
    <div className="flex flex-row items-center shadow-lg rounded-lg bg-gradient-to-tr from-blue-200 to-purple-200 overflow-hidden">
      <div className="w-1/4 h-full bg-amber-100 flex items-center justify-center pl-2 pr-2">
        <FontAwesomeIcon 
          icon={icon} 
          size="2xl" 
          className="text-amber-800 m-auto"
        />
      </div>
      <div className="flex-grow p-4">
        <h1 className="text-lg text-purple-700 font-semibold hover:text-purple-800 transition-colors">
          {title}
        </h1>
        <p className="text-sm text-slate-800 font-normal hover:text-slate-900 transition-colors"> 
          {description}
        </p>
      </div>
    </div>
  )
}

export default Card