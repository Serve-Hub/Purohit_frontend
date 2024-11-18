'use client'
import React from 'react'

const PasswordValidation = ({validation }: { validation: any})=> {
  return (
    <ul className="mb-4 text-sm flex flex-wrap gap-2">
      <li className="text-gray-500"> Requirements: </li>
      <li className={validation.isUpperCase ? 'text-green-600' : 'text-gray-500'}>
        {validation.isUpperCase ? '✔' : undefined}1 uppercase letter
      </li>
      <span className="text-gray-400">/</span>
      <li className={validation.isMinLength ? 'text-green-600' : 'text-gray-500'}>
        {validation.isMinLength ? '✔' : undefined}8 characters long
      </li>
      <span className="text-gray-400">/</span>
      <li className={validation.isNumber ? 'text-green-600' : 'text-gray-500'}>
        {validation.isNumber ? '✔' : undefined}1 number
      </li>
      <span className="text-gray-400">/</span>
      <li className={validation.isSpecialChar ? 'text-green-600' : 'text-gray-500'}>
        {validation.isSpecialChar ? '✔' : undefined}1 special character
      </li>
      <span className="text-gray-400">/</span>
      <li className={validation.isLowerCase ? 'text-green-600' : 'text-gray-500'}>
        {validation.isLowerCase ? '✔' : undefined}1 lowercase letter
      </li>
    </ul>
  );
  
};

export default PasswordValidation;