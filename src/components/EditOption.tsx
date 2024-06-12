import React, { useState } from "react";
import { EditOptionProps } from "../types";



const EditOption: React.FC<EditOptionProps> = ({ onEdit, onDelete}) => {
    const [isOpen, setIsOpen] = useState(false);
  
  
    return (
      <div className="p-1 pl-3 relative" onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 26 26"
          strokeWidth={1}
          stroke="currentColor"
          className="size-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
        {isOpen && (
          <div className="absolute right-[-20px] top-[20px] text-xxs bg-white border border-amber-300 flex flex-col items-start w-10 z-10">
            <button
              onClick={onEdit}
              className="text-gray-500 p-1 w-full text-left"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="text-rose-500 p-1 w-full text-left"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  export default EditOption;