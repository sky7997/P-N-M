import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";
import Loader from "./Loader";
import ConfirmationModal from "./ConfirmationModal";
import SearchBar from "./SearchBar";

const NoteList = () => {
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [noNotesMessage, setNoNotesMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchNotes = async () => {
      setNoNotesMessage("");

      try {
        const params = {};
        if (search.trim()) params.search = search;
        if (category) params.category = category;

        const { data } = await axios.get(
          "https://personal-notes-manager-backend-geoo.onrender.com/api/notes",
          { params }
        );

        if (isMounted) {
          setFilteredNotes(data);
        }
      } catch (error) {
        if (isMounted) {
          if (error.response?.status === 404) {
            // Backend returned 404 with "No notes found" message.
            setFilteredNotes([]);
            setNoNotesMessage("No notes found.");
          } else {
            toast.error("Failed to fetch notes. Please try again.");
            console.error("Error fetching notes:", error);
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNotes();

    return () => {
      isMounted = false;
    };
  }, [search, category]);

  const toggleCompleted = async (id, currentStatus) => {
    try {
      await axios.put(
        `https://personal-notes-manager-backend-geoo.onrender.com/api/notes/${id}`,
        {
          isCompleted: !currentStatus,
        }
      );

      setFilteredNotes((prevFilteredNotes) =>
        prevFilteredNotes.map((note) =>
          note._id === id ? { ...note, isCompleted: !currentStatus } : note
        )
      );

      toast.success(
        `Note marked as ${!currentStatus ? "Completed" : "Not Completed"}`
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
      console.error("Error updating note status:", errorMessage);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(
        `https://personal-notes-manager-backend-geoo.onrender.com/api/notes/${id}`
      );
      setFilteredNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );
      toast.success("Note deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete note.");
    }
  };

  const handleDeleteClick = (id) => {
    setNoteToDelete(id);
    setIsModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setNoteToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete);
    }
    setIsModalOpen(false);
    setNoteToDelete(null);
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-gradient-to-br from-pink-50 to-orange-50 min-h-screen p-6">
  <div className="max-w-7xl mx-auto">
    <div className="flex items-center justify-between mb-8 flex-col sm:flex-row">
      <h1 className="text-4xl sm:text-3xl md:text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-600">
        Your Notes
      </h1>
      <SearchBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />
    </div>

    {noNotesMessage ? (
      <div className="text-center text-lg text-gray-600 italic">
        {noNotesMessage}
      </div>
    ) : (
      <div className="flex flex-wrap gap-6 justify-center">
        {filteredNotes.map((note) => (
          <div
            key={note._id}
            className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-pink-300"
          >
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800 hover:text-pink-600 transition-colors duration-300">
                    {note.title}
                  </h3>
                  <span className="px-3 py-1 text-xs font-medium bg-pink-100 text-pink-800 rounded-full shadow-sm">
                    {note.category}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{note.description}</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <button
                  onClick={() =>
                    toggleCompleted(note._id, note.isCompleted)
                  }
                  className={`px-4 py-2 rounded-md shadow-md transition-colors duration-300 ${
                    note.isCompleted
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {note.isCompleted ? (
                    <CheckCircle size={16} />
                  ) : (
                    <XCircle size={16} />
                  )}
                </button>
                <Link
                  to={`/edit/${note._id}`}
                  className="flex items-center gap-1 text-orange-600 hover:text-orange-800 transition-colors duration-300"
                >
                  <Edit2 size={16} />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDeleteClick(note._id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors duration-300"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  <ConfirmationModal
    isOpen={isModalOpen}
    onConfirm={handleConfirmDelete}
    onCancel={handleCancelDelete}
    message="Are you sure you want to delete this note?"
  />
</div>

  );
};

export default NoteList;
