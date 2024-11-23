import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./Loader";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Others",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `https://personal-notes-manager-backend-geoo.onrender.com/api/notes/${id}`
        );
        if (isMounted) {
          setFormData({
            title: response.data.title || "",
            description: response.data.description || "",
            category: response.data.category || "Others",
          });
        }
      } catch (error) {
        if (isMounted) toast.error("Failed to fetch note. Please try again.");
        console.error("Error fetching note:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNote();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Title and Description are required!");
      return;
    }

    setUpdating(true);
    try {
      await axios.put(
        `https://personal-notes-manager-backend-geoo.onrender.com/api/notes/${id}`,
        formData
      );
      toast.success("Note updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note. Please try again.");
      console.error("Error updating note:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 min-h-screen flex items-center justify-center p-6">
  <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
    <h2 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
      Edit Note
    </h2>

    <button
      onClick={() => navigate("/")}
      className="mb-6 text-teal-600 hover:text-teal-800 transition-colors duration-300 focus:outline-none"
    >
      &lt; Back
    </button>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-800 mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="w-full p-4 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-800 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          rows="5"
          className="w-full p-4 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
        />
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-800 mb-2"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-4 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <button
        type="submit"
        className={`w-full py-3 text-white font-medium rounded-xl shadow-md transition-all duration-300 ${
          updating
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-teal-600 hover:bg-teal-700"
        }`}
        disabled={updating}
      >
        {updating ? "Updating..." : "Update Note"}
      </button>
    </form>
  </div>
</div>

  );
};

export default EditNote;
