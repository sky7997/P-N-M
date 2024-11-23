import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import SearchBar from './components/SearchBar';
import { fetchNotes } from './services/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  // Fetch notes on load
  useEffect(() => {
    async function getNotes() {
      const response = await fetchNotes();
      setNotes(response.data);
      setFilteredNotes(response.data);
    }
    getNotes();
  }, []);

  // Filter notes when search changes
  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(lowerSearch) ||
          note.category.toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, notes]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Personal Notes Manager</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <NoteForm
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          notes={notes}
          setNotes={setNotes}
        />
        <NoteList
          notes={filteredNotes}
          setNotes={setNotes}
          setSelectedNote={setSelectedNote}
        />
      </div>
    </div>
  );
}

export default App;
