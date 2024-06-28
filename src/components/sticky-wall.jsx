import React, { useState } from "react";
import stickyWallData from "../data/sticky-wall-data.json";

function StickyWall() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [color, setColor] = useState("#E5E7EB");
  const [noteName, setNoteName] = useState("");
  const [noteDescription, setNoteDescription] = useState("");

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
    setNoteDescription(event.target.value);
  };

  return (
    <div className="text-black px-3 h-full">
      <h1 className="text-4xl font-semibold pl-2 pb-4 pt-1">Sticky Wall</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 px-6 py-5 mt-5 border border-border rounded-lg">
        {stickyWallData.map((item, index) => (
          <div
            key={index}
            className={`${item.bgColor} p-4 rounded-lg shadow-md h-72 cursor-pointer`}
          >
            <h3 className="font-bold mb-2 text-2xl">{item.title}</h3>
            {Array.isArray(item.content) ? (
              <ul className="custom-list pl-4">
                {item.content.map((contentItem, idx) => (
                  <li key={idx}>{contentItem}</li>
                ))}
              </ul>
            ) : (
              <p>{item.content}</p>
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
                value={noteDescription}
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
                <button className="border border-gray-700 hover:bg-gray-400 rounded p-2 hover:text-white transition-all">
                  Save changes
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
