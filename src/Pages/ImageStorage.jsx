import React, { useState } from 'react';

export default function ImageStorage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Convert image to base64 string
      const base64Image = reader.result; 

      // Store base64 string in localStorage
      localStorage.setItem('image', base64Image); 

      setSelectedImage(base64Image); 
    };

    reader.readAsDataURL(file);
  };

  const handleImageLoad = () => {
    // Retrieve base64 string from localStorage
    const storedImage = localStorage.getItem('image');

    if (storedImage) {
      setSelectedImage(storedImage);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageLoad}>Load Image</button>

      {selectedImage && (
        <img src={selectedImage} alt="Stored Image" />
      )}
    </div>
  );
}
