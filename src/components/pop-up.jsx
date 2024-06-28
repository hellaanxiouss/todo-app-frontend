import React, { useState } from "react";
import { CreateList } from "../services/list-api";
import { CreateTag } from "../services/tag-api";

const Popup = ({ type, onSave, onClose }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  const handleSave = async () => {
    try {
      let result;
      if (type === "List") {
        result = await CreateList(name, color);
        console.log("List created successfully:", result);
      } else if (type === "Tag") {
        result = await CreateTag(name, color);
        console.log("Tag created successfully:", result);
      }
      onSave(result);
    } catch (error) {
      console.error("Failed to create:", error);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-50 z-20">
      <div className="bg-bg1 p-4 rounded-2xl shadow-lg">
        <h2 className="mb-2 text-lg font-bold">Add New {type}</h2>
        <input
          type="text"
          placeholder={`${type} Name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-2 bg-transparent focus:border-yellow-500 outline-none"
        />
        <div className="flex items-center gap-2">
          <label htmlFor="colorPicker" className="text-gray-400 pl-2">
            Color
          </label>
          <input
            type="color"
            id="colorPicker"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="color-picker"
          />
        </div>
        <div className="flex justify-between pt-3">
          <button
            onClick={onClose}
            className="mr-2 p-2 bg-gray-100 rounded hover:bg-gray-200 border"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="p-2 px-6 bg-yellow-500 text-white rounded hover:bg-yellow-600 hover:text-black"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
