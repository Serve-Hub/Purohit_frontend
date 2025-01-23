import React from 'react';

const LetterAvatar = ({ name = 'User', size = 112, className = '' }) => {
  // Get the first letter and convert to uppercase
  const firstLetter = name.charAt(0).toUpperCase();
  
  // Generate a consistent background color based on the name
  const generateColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  const bgColor = generateColor(name);

  return (
    <div
      className={` border flex items-center justify-center rounded-full text-white font-semibold ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        fontSize: `${size * 0.4}px`,
      }}
    >
      {firstLetter}
    </div>
  );
};

export default LetterAvatar;