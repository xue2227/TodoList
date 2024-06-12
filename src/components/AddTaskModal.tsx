import React, { useState } from "react";
import { AddTaskModalProps } from '../types';

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
      className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
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

export default AddTaskModal
