import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

const NotePage = () => {
  let { id } = useParams();
  let [note, setNote] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    getNote();
  }, [id]);

  //Fetches a note by its id and updates the note state with the fetched data.
  let getNote = async () => {
    if (id === 'new') return;
    let response = await fetch(`/api/notes/${id}`);
    let data = await response.json();
    setNote(data);
  };

  //Sends a POST request to create a new note with the data from the note state.
  let createNote = async () => {
    await fetch(`/api/notes/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
  };

  //Sends a PUT request to update the existing note identified by id with the data from the note state.
  let updateNote = async () => {
    await fetch(`/api/notes/${id}/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
  };

  //Sends a DELETE request to remove the note with the given id. After deleting, it navigates to the home page ('/').
  let deleteNote = async () => {
    await fetch(`/api/notes/${id}/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    navigate('/');
  };

  //Determines whether to create, update, or delete a note based on the id and note.body content. After performing the operation, it navigates to the home page.
  let handleSubmit = () => {
    if (id !== 'new' && note.body === '') {
      deleteNote();
    } else if (id !== 'new') {
      updateNote();
    } else if (id === 'new' && note.body !== null) {
      createNote();
    }
    navigate('/');
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          //ArrowLeft: An SVG icon that triggers the handleSubmit function when
          clicked. This button typically represents a "back" action but in this
          case is used to save the note.
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        //Conditional Button: Displays "Delete" if the id is not 'new' (i.e.,
        editing an existing note). Displays "Done" if the id is 'new' (i.e.,
        creating a new note).
        {id !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      //Allows users to input or edit the note's content. It updates the note
      state whenever the content changes.
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
