"use client";

import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

export default function ModelBox({ children, isOpen, onClose, className }) {
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div>
      {isOpen && (
        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen px-4 text-center'>
            <div
              className='fixed inset-0 transition-opacity'
              aria-hidden='true'
            >
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <div
              ref={modalRef}
              className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-md w-full ${className}`}
            >
              {children}
              <div
                className='absolute top-0 right-0 cursor-pointer text-2xl text-black'
                onClick={onClose}
              >
                <IoClose />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
