import React from 'react';
// import '../../assets/main.css';
import CustomButton from '../custom-button';

const ItemAdded = (props) => {
  
  const goHome = () => {
    window.location = "/";
  };

  return(
    <div className="bg-gray-300 bg-opacity-25 left-0 fixed flex w-full h-full z-50 justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <p className="justify">Item successfully added!</p>
        <CustomButton onClick={goHome}>Return Home</CustomButton>
      </div>
    </div>
  )
};

export default ItemAdded;