export interface AddTaskModalProps {
  onClose: () => void;
  onTaskAdded: () => void;
}
export interface StatusOptionProps {
  color: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setShowSelector: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: number | null;
}
export interface Task {
  title: string;
  content: string;
  id: number;
  state: string;
}
export interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onTaskUpdated: () => void;
}
