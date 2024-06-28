import React from "react";
import Menu from "./menu";
import { Outlet, useOutlet } from "react-router-dom";
import { AppProvider, useApp } from "../context/app-context.jsx";
import Task from "./task.jsx";

function HomepageContent() {
  const { selectedTask, isTaskOpen, handleTaskClick, handleCloseTask } =
    useApp();
  const outlet = useOutlet();

  return (
    <div className="flex p-4 h-screen">
      <Menu />
      <div className="hide-scroll-bar flex w-full overflow-y-scroll">
        <div
          className={`transition-all duration-300 ${
            isTaskOpen ? "pl-3 w-3/4" : "w-full"
          }`}
        >
          {React.cloneElement(outlet, { onTaskClick: handleTaskClick })}
        </div>
        {isTaskOpen && (
          <div className="w-1/3">
            <Task taskId={selectedTask} onClose={handleCloseTask} />
          </div>
        )}
      </div>
    </div>
  );
}

function Homepage() {
  return (
    <AppProvider>
      <HomepageContent />
    </AppProvider>
  );
}

export default Homepage;
