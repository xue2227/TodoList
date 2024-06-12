import { useState, useEffect } from "react";
import StatusOption from "./StatusOption";
import AddTaskModal from "./AddTaskModal";
import EditOption from "./EditOption";
import { Task } from "../types";
import EditTaskModal from "./EditTaskModal";

export default function TodoList() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState(() => {
    // 從 localStorage 獲取初始任務列表
    const savedTasks = localStorage.getItem("taskList");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null); 
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredTasks:Task[] = tasks.filter((task: Task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));


  const handleTaskAdded = () => {
    const savedTasks = localStorage.getItem("taskList");
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
  };
  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((t: Task) => t.id !== taskId));
  };

  const handleEditTask = (taskId: number) => {
    setEditingTaskId(taskId);
    setIsEditModalOpen(true);
  };
  const finishEdit = () => {
    const savedTasks = localStorage.getItem("taskList");
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
  };

  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  // 當任務列表改變時，將新的任務列表儲存到 localStorage
  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="w-[20rem] flex flex-col bg-white border-2 border-amber-300">
      {isAddModalOpen && (
        <AddTaskModal
          onClose={() => setIsAddModalOpen(false)}
          onTaskAdded={handleTaskAdded}
        />
      )}

      <div className="flex items-center w-full ">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-amber-300 p-2 m-2 mr-0 h-10 flex-grow focus:outline-none caret-amber-500 focus:shadow-inner focus:shadow-gray-300"
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
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
        {filteredTasks.map((task: Task) => (
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
                  className={`w-1 h-1 ${
                    task.state === "Todo"
                      ? "bg-gray-500"
                      : task.state === "In Progress"
                        ? "bg-yellow-500"
                        : "bg-green-500"
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

              {isEditModalOpen && (
                <EditTaskModal
                  taskId={editingTaskId}
                  onClose={() => setIsEditModalOpen(false)}
                  finishEdit={() => finishEdit()}
                />
              )}
              <EditOption
                onEdit={() => {
                  handleEditTask(task.id);
                }}
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
}
