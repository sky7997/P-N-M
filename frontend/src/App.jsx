import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import NoteList from "./components/NoteList";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/add" element={<AddNote />} />
        <Route path="/edit/:id" element={<EditNote />} />
      </Routes>
    </Router>
  );
};

export default App;
