import { useState, useEffect } from "react";
import StatusOption from "./StatusOption";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import { Task } from "../types";

interface EditMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const EditMenu: React.FC<EditMenuProps> = ({ onEdit, onDelete}) => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="p-1 pl-3 relative" onClick={() => setIsOpen(!isOpen)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 26 26"
        strokeWidth={1}
        stroke="currentColor"
        className="size-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
      {isOpen && (
        <div className="absolute right-[-20px] top-[20px] text-xxs bg-white border border-amber-300 flex flex-col items-start w-10 z-10">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-500 p-1 w-full text-left"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-rose-500 p-1 w-full text-left"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

const TodoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState(() => {
    // 從 localStorage 獲取初始任務列表
    const savedTasks = localStorage.getItem("taskList");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  // 當任務列表改變時，將新的任務列表儲存到 localStorage
  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(tasks));
  }, [tasks]);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const handleTaskAdded = () => {
    const savedTasks = localStorage.getItem("taskList");
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
  };

  return (
    <div className="w-[20rem] flex flex-col bg-white border-2 border-amber-300">
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onTaskAdded={handleTaskAdded}
        />
      )}
      {isEditModalOpen && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      <div className="flex items-center w-full ">
        <input
          type="text"
          placeholder="Search"
          className="border-2 border-amber-300 p-2 m-2 mr-0 h-10 flex-grow focus:outline-none caret-amber-500 focus:shadow-inner focus:shadow-gray-300"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-300 text-white p-2 m-2 ml-0 h-10 hover:bg-amber-200 w-10 pr-[34px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>

      <ul className="bg-gray-100 shadow-inner shadow-gray-300 m-2 rounded-sm  min-h-[20rem] max-h-60 overflow-scroll  ">
        {tasks.map((task: Task) => (
          <li
            className="h-[4rem] p-2 m-2 bg-white flex flex-col pt-[6px]"
            key={task.id}
          >
            <div className="relative flex flex-row items-center justify-stretch w-full">
              <div className="text-sm text-stone-900 flex-grow">
                {task.title}
              </div>
              <div
                onClick={() =>
                  setSelectedTask(selectedTask === task.id ? null : task.id)
                }
                className={`text-xxs p-1 flex flex-row items-center w-20   ${
                  task.state === "Todo"
                    ? "text-gray-500"
                    : task.state === "In Progress"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                <div
                  className={`w-1 h-1 bg-${
                    task.state === "Todo"
                      ? "gray-500"
                      : task.state === "In Progress"
                      ? "yellow-500"
                      : "green-500"
                  } m-1`}
                ></div>
                {task.state}
              </div>
              {selectedTask === task.id && (
                <div className="absolute right-[34px] top-[22px] bg-white border border-amber-300  text-xxs z-10">
                  <StatusOption
                    state="Todo"
                    setState={setTasks}
                    setShowSelector={() => setSelectedTask(null)}
                    selectedTask={selectedTask}
                  />
                  <StatusOption
                    state="In Progress"
                    setState={setTasks}
                    setShowSelector={() => setSelectedTask(null)}
                    selectedTask={selectedTask}
                  />
                  <StatusOption
                    state="Done"
                    setState={setTasks}
                    setShowSelector={() => setSelectedTask(null)}
                    selectedTask={selectedTask}
                  />
                </div>
              )}
              <EditMenu
                onEdit={handleEditTask}
                onDelete={() => {
                  handleDeleteTask(task.id);
                }}
              />
            </div>
            <div className="text-xxs text-stone-900 w-full">{task.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
