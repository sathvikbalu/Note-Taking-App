//Renders a button. When clicked, it navigates to a new route where we can create a new note.
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as AddIcon } from '../assets/add.svg';

const AddButton = () => {
  return (
    //Navigating to the link when the button is clicked
    <Link to="/note/new" className="floating-button">
      <AddIcon />
    </Link>
  );
};

export default AddButton;
