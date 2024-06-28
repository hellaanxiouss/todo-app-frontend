import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import moment from "moment";
import Modal from "react-modal";
import {
  UpdateTask,
  SoftDeleteTask,
  GetTaskById,
  CreateTask,
} from "../services/task-api.jsx";
import { useApp } from "../context/app-context.jsx";
import { GetLists } from "../services/list-api.jsx";

function Task({ taskId, onClose }) {
  const { fetchTasks, isNewTask, lists, tags } = useApp();
  const [taskData, setTaskData] = useState({
    task_name: "",
    task_description: "",
    list: "",
    tags: [],
    subtasks: [],
    duedate: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await GetTaskById(taskId);
        setTaskData({
          ...task,
          duedate: task.duedate
            ? moment(task.duedate, "DD-MM-YYYY").format("YYYY-MM-DD")
            : null,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    if (taskId && !isNewTask) {
      fetchTask();
    }
  }, [taskId, isNewTask]);

  const handleSaveTask = async () => {
    setLoading(true);
    try {
      if (isNewTask) {
        await CreateTask(taskData);
      } else {
        await UpdateTask(taskId, taskData);
      }
      fetchTasks();
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = () => {
    setIsModalOpen(true);
  };

  const confirmDeleteTask = async () => {
    setIsModalOpen(false);
    setLoading(true);
    try {
      await SoftDeleteTask(taskId);
      fetchTasks();
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelDeleteTask = () => {
    setIsModalOpen(false);
  };

  if (!taskId && !isNewTask) return null;

  const [newSubtask, setNewSubtask] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && newSubtask.trim() !== "") {
      const updatedSubtasks = [...taskData.subtasks, newSubtask.trim()];
      setTaskData({ ...taskData, subtasks: updatedSubtasks });
      setNewSubtask("");
    }
  };

  return (
    <div className="h-[555px] bg-bg1 w-72 shadow-lg rounded-xl p-4 absolute z-10 right-5 transition-all text-black">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">{taskData.task_name}</h2>
        <button className="text-icon text-xl" onClick={onClose}>
          <IoClose />
        </button>
      </div>
      <div>
        <div className="mb-4">
          <input
            type="text"
            value={taskData.task_name}
            onChange={(e) =>
              setTaskData({ ...taskData, task_name: e.target.value })
            }
            placeholder="Task title"
            className="w-full p-2 border rounded mb-2 bg-transparent focus:border-yellow-500 outline-none"
          />
          <textarea
            value={taskData.task_description}
            onChange={(e) =>
              setTaskData({ ...taskData, task_description: e.target.value })
            }
            placeholder="Description"
            className="hide-scroll-ba w-full p-2 border rounded bg-transparent focus:border-yellow-500 outline-none"
            rows="2"
          ></textarea>
        </div>
        <div
          className={`overflow-y-scroll ${
            taskData.task_name.length > 24 ? "h-[273px]" : "h-[300px]"
          }`}
        >
          <div className="mb-4 flex items-center">
            <label className="block mb-2 mt-2 mr-5">List</label>
            <select
              value={taskData.list}
              onChange={(e) =>
                setTaskData({ ...taskData, list: e.target.value })
              }
              className="p-2 border rounded-md bg-transparent focus:border-yellow-500 outline-none"
            >
              {lists.map((list) => (
                <option>{list.list_name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <label className="block mb-2 mt-2 mr-5">Due date</label>
            <input
              type="date"
              className="p-2 border rounded bg-transparent focus:border-yellow-500 outline-none"
              value={taskData.duedate}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  duedate: moment(e.target.value).format("YYYY-MM-DD"),
                })
              }
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block mb-2 mt-2 mr-5">Tags</label>
            <div className="hide-scroll-bar flex items-center gap-2 overflow-x-scroll">
              {taskData.tags &&
                taskData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-blue-200 rounded px-2 py-1 min-w-16"
                  >
                    {tag}
                  </div>
                ))}
              {/* <div className="bg-gray-200 rounded px-3 py-1 flex justify-center items-center min-w-28">
                <FaPlus className="pr-1" />
                Add Tag
              </div> */}
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-lg mb-2">Subtasks</h4>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-full flex justify-start items-center border-b px-3 py-1">
                <span className="mr-2">
                  <FaPlus />
                </span>
                <input
                  type="text"
                  className="w-full bg-transparent border-none focus:outline-none"
                  placeholder="Add New Subtask"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
            {taskData.subtasks &&
              taskData.subtasks.map((subtask, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-black">{subtask}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        {!isNewTask && (
          <button
            className="border rounded p-2 hover:bg-gray-200 transition-all"
            onClick={handleDeleteTask}
            disabled={loading}
          >
            Delete Task
          </button>
        )}
        <button
          className="bg-yellow-500 hover:bg-yellow-600 rounded p-2 text-white hover:text-black"
          onClick={handleSaveTask}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save changes"}
        </button>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={cancelDeleteTask}
          contentLabel="Confirm Delete"
          className="fixed inset-0 z-20 flex items-center justify-center text-black bg-black bg-opacity-50"
        >
          <div className="bg-gray-100 p-4 rounded-xl shadow-md text-center">
            <h2 className="mb-4">Are you sure you want to delete this task?</h2>
            <div className="flex justify-around">
              <button
                className="border rounded px-4 py-2 text-white hover:text-black bg-yellow-400 hover:bg-yellow-500 transition-all"
                onClick={confirmDeleteTask}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                className="border rounded px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-all"
                onClick={cancelDeleteTask}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Task;
