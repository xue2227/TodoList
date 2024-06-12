import React, { useState, useEffect } from "react";
import { Task,EditTaskModalProps } from "../types";


const EditTaskModal: React.FC<EditTaskModalProps> = ({ taskId , onClose,finishEdit }) => {
  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('taskList') || '[]');
    setCurrentTasks(tasks);
    if (taskId !== null) {
      const taskToEdit = tasks.find((task: Task) => task.id === taskId);
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setContent(taskToEdit.content);
      }
    }
  }, [taskId]);

  const handleEdit = () => {
    const updatedTasks = currentTasks.map(task => {
      if (task.id === taskId) {
        return { ...task, title, content };
      }
      return task;
    });

    localStorage.setItem("taskList", JSON.stringify(updatedTasks));
    
    finishEdit();
    onClose();
  };

  return (
    <div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-sm" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-stone-900 text-md w-full p-2 mb-2 focus:outline-amber-300 border-b border-amber-200"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-stone-900 text-sm w-full p-2 mb-2 focus:outline-amber-300 border-b border-amber-200"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-white border border-amber-300 text-amber-300 p-2 mr-1 w-20 rounded-sm">
            Cancel
          </button>
          <button onClick={handleEdit} className="bg-amber-300 text-white p-2 ml-1 w-20 rounded-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;