import React from 'react';
import CreateModal from './CreateModal';

const CreateButton = ({ label}) => {
  const handleClick = (e) => {
    console.log(e.target);
    return <CreateModal isOpen ={true}/>
  };
  return (
    <button type='button' onClick={handleClick}>{label}</button>
  );
};

export default CreateButton;
