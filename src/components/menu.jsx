import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import {
  FaSearch,
  FaAngleDoubleRight,
  FaCalendarAlt,
  FaPlus,
  FaSquare,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { RiStickyNoteFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoMdTrash } from "react-icons/io";
import Popup from "./pop-up.jsx";
import { useApp } from "../context/app-context";
import { FaTimes } from "react-icons/fa";

function Menu() {
  const navigate = useNavigate();
  const {
    lists,
    tags,
    setLists,
    setTags,
    setRefresh,
    handleDeleteList,
    handleDeleteTag,
    searchQuery,
    setSearchQuery,
  } = useApp();
  const [isExpanded, setIsExpanded] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");

  useEffect(() => {
    if (window.innerWidth < 400) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }, []);

  const handleNavigation = (path) => {
    navigate(`/home/${path}`);
  };

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const openPopup = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const saveNewEntry = (entry) => {
    if (popupType === "List") {
      const updatedLists = [...lists, { id: lists.length + 1, ...entry }];
      setLists(updatedLists);
    } else if (popupType === "Tag") {
      const updatedTags = [...tags, entry];
      setTags(updatedTags);
    }
  };

  const handleSingOut = () => {
    localStorage.clear();
    console.log("Local storage is cleared!");
    navigate("/login");
  };

  return (
    <div
      className={`h-full flex flex-col bg-bg1 text-text1 rounded-xl py-1.5 transition-all duration-300 ease-in-out overflow-x-scroll ${
        isExpanded ? "w-full md:max-w-64 px-4" : "max-w-10 bg-transparent pt-4 px-2"
      }`}
    >
      <div>
        <div className="flex justify-between items-center mb-2 mt-0.5">
          {isExpanded && <h3 className="font-semibold text-lg">Menu</h3>}
          <IoMenu
            className="text-icon cursor-pointer"
            size={18}
            onClick={toggleMenu}
          />
        </div>
        {isExpanded && (
          <div className="mb-2 flex items-center border border-border rounded pl-2">
            <FaSearch className="text-icon" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-2 py-1 bg-transparent outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </div>
      {isExpanded && (
        <div className="flex flex-col gap-16">
          <div>
            <div className="border-b border-border py-1">
              <div className="flex items-center">
                <span className="font-semibold text-xs">TASKS</span>
              </div>
              <div className="grid grid-flow-row">
                <div
                  onClick={() => handleNavigation("tasks/upcoming")}
                  className="flex text-sm items-center hover:bg-hover rounded pl-3 py-1 cursor-pointer"
                >
                  <FaAngleDoubleRight className="text-icon mr-2" size={18} />
                  Upcoming
                </div>
                <div
                  onClick={() => handleNavigation("tasks/today")}
                  className="flex text-sm items-center hover:bg-hover rounded pl-3 py-1 cursor-pointer"
                >
                  <FaListCheck className="text-icon mr-2" size={18} />
                  Today
                </div>
                <div
                  // onClick={() => handleNavigation("tasks/calendar")}
                  className="flex text-sm items-center hover:bg-hover rounded pl-3 py-1 cursor-pointer"
                >
                  <FaCalendarAlt className="text-icon mr-2" size={18} />
                  Calendar
                </div>
                <div
                  onClick={() => handleNavigation("stickywall")}
                  className="flex text-sm items-center hover:bg-hover rounded pl-3 py-1 cursor-pointer"
                >
                  <RiStickyNoteFill className="text-icon mr-2" size={18} />
                  Sticky Wall
                </div>
              </div>
            </div>
            <div className="border-b border-border">
              <div className="flex justify-between items-center pt-2">
                <span className="font-semibold text-xs">LISTS</span>
              </div>
              <div className="grid grid-flow-row pb-1">
                {lists.map((list) => (
                  <div
                    className="flex justify-between items-center w-full"
                    key={list.id}
                  >
                    <div
                      onClick={() =>
                        handleNavigation(
                          `lists/${list.list_name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`
                        )
                      }
                      className="flex w-full text-sm items-center hover:bg-hover rounded pl-3 py-1 cursor-pointer"
                    >
                      <FaSquare
                        className={`mr-2`}
                        style={{ color: list.list_color }}
                      />
                      {list.list_name}
                    </div>
                    <div
                      onClick={() => handleDeleteList(list.id)}
                      className="hover:bg-hover text-icon hover:text-black rounded px-2 py-1 cursor-pointer"
                    >
                      <IoMdTrash className="" />
                    </div>
                  </div>
                ))}
                <div
                  onClick={() => openPopup("List")}
                  className="flex text-sm items-center hover:bg-hover rounded pl-3 py-1 cursor-pointer"
                >
                  <FaPlus className="pr-1 text-icon" />
                  Add New List
                </div>
              </div>
            </div>
            <div className="border-b border-border py-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xs">TAGS</span>
              </div>
              <div className="flex gap-1 py-1 overflow-x-scroll">
                {tags.map((tag) => (
                  <div key={tag.id} className="flip-card w-11">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div
                          className="flex items-center text-xs font-bold py-1 justify-center rounded cursor-pointer"
                          style={{ backgroundColor: tag.tag_color }}
                        >
                          {tag.tag_name}
                        </div>
                      </div>
                      <div
                        className="flip-card-back text-white rounded cursor-pointer"
                        style={{ backgroundColor: tag.tag_color }}
                        onClick={() => handleDeleteTag(tag.id)}
                      >
                        <FaTimes />
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  onClick={() => openPopup("Tag")}
                  className="flex items-center text-xs font-bold py-1 w-24 justify-center bg-gray-200 rounded cursor-pointer"
                >
                  <FaPlus className="pr-1" />
                  Add Tag
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center cursor-pointer">
              <IoMdSettings className="text-icon mr-2" size={18} />
              <p className="font-semibold">Settings</p>
            </div>
            <div
              onClick={() => handleSingOut()}
              className="flex items-center mt-2 cursor-pointer"
            >
              <FaSignOutAlt className="text-icon mr-2" size={18} />
              <p className="font-semibold">Sign out</p>
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <Popup type={popupType} onSave={saveNewEntry} onClose={closePopup} />
      )}
    </div>
  );
}

export default Menu;
