import React, { useState,useEffect } from "react";

interface AddTaskModalProps {
  onClose: () => void;
  onTaskAdded: () => void;
}
interface StatusOptionProps {
  color: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setShowSelector: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: number | null;
}
interface Task {
  title: string;
  content: string;
  id: number;
  state: string;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose,onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    // 從本地儲存空間獲取當前的任務
    const currentTasks = JSON.parse(localStorage.getItem('taskList') || '[]');
    
    // 創建一個新的任務
    const newTask = { title, content, id: Date.now(),state: "Todo"};

    // 將新的任務添加到當前的任務
    const updatedTasks = [...currentTasks, newTask];

    // 將更新的任務保存回本地儲存空間
    localStorage.setItem('taskList', JSON.stringify(updatedTasks));

    // 關閉模態視窗
    onClose();
    onTaskAdded();
  };

  return (
    <div
      className="z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-stone-900 text-md w-full p-2 mb-2 focus:outline-amber-300 border-b border-amber-200 "
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-stone-900 text-sm w-full p-2 mb-2 focus:outline-amber-300 border-b border-amber-200 "
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className=" bg-white border border-amber-300 text-amber-300 p-2 mr-1 w-20 rounded-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className=" bg-amber-300 text-white p-2 ml-1 w-20 rounded-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

const StatusOption: React.FC<StatusOptionProps> = ({ color, state, setState, setShowSelector,selectedTask }) => {
  const handleClick = () => {
    // Get the current tasks from local storage
    const currentTasks = JSON.parse(localStorage.getItem('taskList') || '[]');

    // Find the task to update
    const taskToUpdate = currentTasks.find((task:Task) => task.id === selectedTask);

    // Update the task's state
    if (taskToUpdate) {
      taskToUpdate.state = state;

      // Save the updated tasks back to local storage
      localStorage.setItem('taskList', JSON.stringify(currentTasks));
      // Update the tasks in the component state
      setState(currentTasks);
    }

    // Close the status selector
    setShowSelector(false);
  };

  return (
    <div
      className={`flex items-center cursor-pointer hover:bg-${color} p-1`}
      onClick={handleClick}
    >
      <div className={`w-1 h-1  bg-${color} m-1`}></div>
      {state}
    </div>
  );
};

const TodoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState(() => {
    // 從 localStorage 獲取初始任務列表
    const savedTasks = localStorage.getItem('taskList');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // 當任務列表改變時，將新的任務列表儲存到 localStorage
  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(tasks));
  }, [tasks]);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const handleTaskAdded = () => {
    const savedTasks = localStorage.getItem('taskList');
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
  };

  return (
    <div className="w-[20rem] flex flex-col bg-white border-2 border-amber-300">
      {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} 
      onTaskAdded={handleTaskAdded}/>}
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

      <ul className="bg-gray-100 shadow-inner shadow-gray-300 m-2 rounded-sm  min-h-[20rem]">
      {tasks.map((task:Task) => (
  <li className="h-[4rem] p-2 m-2 bg-white flex flex-col pt-[6px]" key={task.id}>
    <div className="relative flex flex-row items-center justify-stretch w-full">
      <div className="text-sm text-stone-900 flex-grow">{task.title}</div>
      <div
        onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
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
            color="gray-500"
            state="Todo"
            setState={setTasks}
            setShowSelector={() => setSelectedTask(null)}
            selectedTask={selectedTask}
          />
          <StatusOption
            color="yellow-500"
            state="In Progress"
            setState={setTasks}
            setShowSelector={() => setSelectedTask(null)}
            selectedTask={selectedTask}
          />
          <StatusOption
            color="green-500"
            state="Done"
            setState={setTasks}
            setShowSelector={() => setSelectedTask(null)}
            selectedTask={selectedTask}
          />
        </div>
      )}
      <div className="p-1 pl-3">
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
      </div>
    </div>
    <div className="text-xxs text-stone-900 w-full">{task.content}</div>
  </li>
))}
      </ul>
    </div>
  );
};

export default TodoList;
