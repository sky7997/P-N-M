import React, { useState, useEffect } from 'react';
import { createNote, updateNote } from '../services/api';

function NoteForm({ selectedNote, setSelectedNote, notes, setNotes }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Others',
  });

  useEffect(() => {
    if (selectedNote) {
      setFormData(selectedNote);
    } else {
      setFormData({ title: '', description: '', category: 'Others' });
    }
  }, [selectedNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedNote) {
      const response = await updateNote(selectedNote._id, formData);
      setNotes(
        notes.map((note) => (note._id === selectedNote._id ? response.data : note))
      );
    } else {
      const response = await createNote(formData);
      setNotes([response.data, ...notes]);
    }
    setFormData({ title: '', description: '', category: 'Others' });
    setSelectedNote(null);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow max-h-[300px]">
      <h2 className="mb-2 text-xl font-bold">{selectedNote ? 'Edit Note' : 'Add Note'}</h2>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-2">
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-2">
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        {selectedNote ? 'Update Note' : 'Add Note'}
      </button>
    </form>
  );
}

export default NoteForm;
