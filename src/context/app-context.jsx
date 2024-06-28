import React, { createContext, useState, useContext, useEffect } from "react";
import { GetTasks, CreateTask } from "../services/task-api.jsx";
import { GetLists, SoftDeleteList } from "../services/list-api.jsx";
import { GetTags, SoftDeleteTag } from "../services/tag-api.jsx";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isNewTask, setIsNewTask] = useState(false);

  const [lists, setLists] = useState([]);
  const [tags, setTags] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = async () => {
    try {
      const allTasks = await GetTasks();
      setTaskList(allTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchLists = async () => {
    try {
      const fetchedLists = await GetLists();
      setLists(fetchedLists);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const fetchTags = async () => {
    try {
      const fetchedTags = await GetTags();
      setTags(fetchedTags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchLists();
    fetchTags();
  }, [refresh]);

  const handleTaskClick = (id) => {
    setSelectedTask(id);
    setIsTaskOpen(true);
    setIsNewTask(false);
  };

  const handleNewTaskClick = () => {
    setSelectedTask(null);
    setIsTaskOpen(true);
    setIsNewTask(true);
  };

  const handleCloseTask = () => {
    setSelectedTask(null);
    setIsTaskOpen(false);
    setIsNewTask(false);
  };

  const handleDeleteList = async (listId) => {
    try {
      await SoftDeleteList(listId);
      setRefresh((prev) => !prev);
      setLists(lists.filter((list) => list.id !== listId));
    } catch (error) {
      console.error("Failed to delete list:", error);
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      await SoftDeleteTag(tagId);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Failed to delete tag:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        taskList,
        selectedTask,
        isTaskOpen,
        isNewTask,
        lists,
        tags,
        searchQuery,
        setSearchQuery,
        setLists,
        setTags,
        setRefresh,
        fetchTasks,
        handleTaskClick,
        handleNewTaskClick,
        handleCloseTask,
        handleDeleteList,
        handleDeleteTag,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
