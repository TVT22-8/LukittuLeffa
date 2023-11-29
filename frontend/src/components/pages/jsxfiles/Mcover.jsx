import React, { useState } from 'react';

const Mcover = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    // Add more image URLs as needed
  ];

  const handleChangeImage = () => {
    // Cycle to the next image, reset to the first if at the end
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  return (
    <div>
      <img src={images[currentImage]} alt={`Image ${currentImage + 1}`} />
      <button onClick={handleChangeImage}>Change Image</button>
    </div>
  );
};

export default Mcover;
