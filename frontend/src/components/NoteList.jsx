import React from 'react';
import { deleteNote } from '../services/api';

function NoteList({ notes, setNotes, setSelectedNote }) {
  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note._id !== id));
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-2">Notes</h2>
      {notes.length === 0 ? (
        <p>No notes available</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li
              key={note._id}
              className="p-2 border-b last:border-b-0 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{note.title}</h3>
                <p className="text-gray-600">{note.description}</p>
                <span className="text-sm text-blue-500">{note.category}</span>
              </div>
              <div>
                <button
                  onClick={() => setSelectedNote(note)}
                  className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NoteList;
