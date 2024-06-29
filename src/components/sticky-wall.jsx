import React, { useState, useEffect } from "react";
import { GetStickyNotes, CreateStickyNote } from "../services/sticky-notes-api";

function StickyWall() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [color, setColor] = useState("#E5E7EB");
  const [noteName, setNoteName] = useState("");
  const [noteDescription, setNoteDescription] = useState([]); // Initialize as an array
  const [stickyNotes, setStickyNotes] = useState([]);

  useEffect(() => {
    const fetchStickyNotes = async () => {
      try {
        const notes = await GetStickyNotes();
        setStickyNotes(notes);
      } catch (error) {
        console.error("Error fetching Sticky Notes:", error);
      }
    };

    fetchStickyNotes();
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleNoteNameChange = (event) => {
    setNoteName(event.target.value);
  };

  const handleNoteDescriptionChange = (event) => {
    const value = event.target.value;
    const lines = value.split("\n");
    setNoteDescription(lines); // Update state with array of lines
  };

  const handleSaveChanges = async () => {
    try {
      const newNote = await CreateStickyNote(noteName, noteDescription, color);
      setStickyNotes([...stickyNotes, newNote]);
      setIsFlipped(false); // Flip back to the front side
      setNoteName(""); // Reset note name
      setNoteDescription([]); // Reset note description to empty array
      setColor("#E5E7EB"); // Reset color
    } catch (error) {
      console.error("Failed to create a new sticky note:", error);
    }
  };

  return (
    <div className="text-black px-3 h-full">
      <h1 className="text-4xl font-semibold pl-2 pb-4 pt-1">Sticky Wall</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 px-6 py-5 mt-5 border border-border rounded-lg">
        {stickyNotes.map((note, index) => (
          <div
            key={index}
            className="p-4 rounded-lg shadow-md h-72 cursor-pointer"
            style={{ backgroundColor: note.bgColor }}
          >
            <h3 className="font-bold mb-2 text-2xl">{note.title}</h3>
            {Array.isArray(note.content) ? (
              <ul className="custom-list pl-4">
                {note.content.map((contentItem, idx) => (
                  <li key={idx}>{contentItem}</li>
                ))}
              </ul>
            ) : (
              <p>{note.content}</p>
            )}
          </div>
        ))}
        <div
          className={`flip-card h-72 ${isFlipped ? "is-flipped" : ""}`}
          onClick={handleFlip}
        >
          <div className="flip-card-inner">
            <div
              className="flip-card-front flex items-center justify-center rounded-lg shadow-md"
              style={{ backgroundColor: color }}
            >
              <div className="text-5xl cursor-pointer">+</div>
            </div>
            <div
              className="flip-card-back rounded-lg shadow-md flex flex-col justify-center p-4"
              style={{ backgroundColor: color }}
            >
              <input
                type="text"
                value={noteName}
                onChange={handleNoteNameChange}
                placeholder="Enter title"
                className="w-full border-b bg-transparent outline-none font-bold text-2xl"
              />
              <textarea
                value={noteDescription.join("\n")} // Convert array back to string
                onChange={handleNoteDescriptionChange}
                placeholder="Enter description"
                className="hide-scroll-bar w-full p-2 bg-transparent outline-none"
                rows="7"
              ></textarea>
              <div className="flex items-center justify-between w-full">
                <input
                  type="color"
                  value={color}
                  onChange={handleColorChange}
                  className="color-picker"
                />
                <button
                  className="border border-gray-700 hover:bg-gray-400 rounded p-1 px-2 hover:text-white transition-all"
                  onClick={handleSaveChanges}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StickyWall;
