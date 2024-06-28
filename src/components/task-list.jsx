import React, { useState, useEffect } from "react";
import { useApp } from "../context/app-context.jsx";
import { FaAngleRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import moment from "moment";

function TaskList() {
  const { taskList, handleTaskClick, handleNewTaskClick, searchQuery, lists } =
    useApp();
  const { pathname } = useLocation();
  const path = pathname.split("/")[3];
  const today = moment().format("DD-MM-YYYY");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    let tasks;
    if (path === "today") {
      tasks = taskList?.filter((task) => task.duedate === today);
    } else if (path === "upcoming") {
      tasks = taskList?.filter((task) =>
        moment(task.duedate, "DD-MM-YYYY").isAfter(moment())
      );
    } else if (path === "personal" || path === "work" || path === "list-1") {
      tasks = filterTasksByList(taskList, capitalizeFirstLetter(path));
    }

    if (searchQuery) {
      tasks = tasks?.filter((task) =>
        task.task_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(tasks);
  }, [taskList, path, searchQuery]);

  function filterTasksByList(taskList, listName) {
    return taskList?.filter((task) => task.list.includes(listName));
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getColorForList(listName) {
    const list = lists.find((l) => l.list_name === listName);
    return list ? list.list_color : "#D1D5DB";
  }

  return (
    <div className="flex w-full">
      <div className="p-4 pt-3 w-full">
        <div className="flex items-center mb-4">
          <h2 className="font-bold text-3xl text-black mr-6 capitalize">
            {path.replace("-", " ")}{" "}
          </h2>
          <div className="text-lg font-bold text-black border px-3 rounded">
            {filteredTasks?.length}
          </div>
        </div>
        <div className="mb-4">
          <button
            className="w-full flex items-center border rounded py-2 px-4 text-gray-600 hover:bg-gray-50"
            onClick={handleNewTaskClick}
          >
            <div className="flex items-center">
              <p className="text-3xl font-bold pr-3 pb-2">+</p>
              <p className="text-xl">Add New Task</p>
            </div>
          </button>
        </div>
        <div className="space-y-2 text-black">
          {filteredTasks?.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between py-2 border-b cursor-pointer"
              onClick={() => handleTaskClick(task.id)}
            >
              <div>
                {task?.task_name}
                {task?.duedate && (
                  <div className="flex items-center text-sm text-black mt-1">
                    <span>{task?.duedate}</span>
                    <span className="mx-2">|</span>
                    <span>{task?.subtasks.length} Subtasks</span>
                    <span className="mx-2">|</span>
                    <span style={{ color: getColorForList(task?.list) }}>
                      {task?.list}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <FaAngleRight className="text-icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
