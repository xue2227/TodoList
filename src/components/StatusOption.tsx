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

const StatusOption: React.FC<StatusOptionProps> = ({ state, setState, setShowSelector,selectedTask }) => {
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
      className={`flex items-center cursor-pointer p-1 ${
        state === "Todo"
          ? "text-gray-500"
          : state === "In Progress"
          ? "text-yellow-500"
          : "text-green-500"
      } `}
      onClick={handleClick}
    >
      <div className={`w-1 h-1 ${
          state === "Todo"
            ? "bg-gray-500"
            : state === "In Progress"
            ? "bg-yellow-500"
            : "bg-green-500"
        } m-1`}></div>
      {state}
    </div>
  );
};

export default StatusOption;