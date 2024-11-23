import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Plus } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-pink-100 via-orange-100 to-yellow-100 border-b border-gray-300 sticky top-0 z-50 shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <Link
        to="/"
        className="flex items-center gap-2 text-xl font-extrabold text-gray-900 hover:text-pink-600 transition-colors duration-300"
      >
        <BookOpen className="text-pink-600" />
        <span>Notes Manager</span>
      </Link>

      <nav className="flex items-center gap-4">
        <Link
          to="/add"
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2 rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Note</span>
        </Link>
      </nav>
    </div>
  </div>
</header>

  );
};

export default Header;
