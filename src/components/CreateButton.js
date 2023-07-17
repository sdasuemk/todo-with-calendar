import React from 'react';

const CreateButton = ({ label}) => {
  const handleClick = (e) => {
    console.log(e.target)
  };
  return (
    <button type='button' onClick={handleClick}>{label}</button>
  );
};

export default CreateButton;
