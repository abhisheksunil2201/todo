import useTodoStore, { Todo } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import CircleCheckbox from "./StyledCheckbox";
import { PenIcon, Trash2Icon } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleCompletion, deleteTodo, setAddEditOpen, setSelectedTask } =
    useTodoStore();

  const handleEdit = () => {
    setAddEditOpen(true);
    setSelectedTask(todo);
  };

  return (
    <>
      <li className="group relative flex items-center justify-between mb-2 border-b bg-white w-full p-8 h-30 shadow-xl truncate">
        <div className="flex">
          <CircleCheckbox
            checked={todo.completed}
            onChange={() => toggleCompletion(todo.id, todo.date)}
          />
          <div className="flex-[0.9] w-full">
            <p
              className={`font-bold text-xl ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.text}
            </p>
            <p
              className={`font-medium text-md w-full truncate text-wrap ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.subtext}
            </p>
          </div>
        </div>
        <div className="self-end gap-2 flex group-hover:flex absolute right-8 md:hidden top-8">
          <Button onClick={handleEdit} className="w-10 h-8 lg:w-12 lg:h-10">
            <PenIcon className="w-2 h-2" />
          </Button>
          <Button
            onClick={() => deleteTodo(todo.id, todo.date)}
            className="w-10 h-8 lg:w-12 lg:h-10"
          >
            <Trash2Icon className="w-2 h-2" />
          </Button>
        </div>
      </li>
    </>
  );
};

export default TodoItem;
