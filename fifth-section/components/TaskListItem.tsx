import { useEffect } from "react";

import { Task, useDeleteTaskMutation } from "../generated/graphql-frontend";
import Link from "next/link";

interface Props {
  task: Task;
}

const TaskListItem: React.FC<Props> = ({ task }) => {
  const [deleteTask, { loading, error }] = useDeleteTaskMutation({
    variables: { id: task.id },
  });

  const handleDeleteClick = () => {
    deleteTask();
  };

  useEffect(() => {
    if (error) {
      alert("An error occured, please try again.");
    }
  }, [error]);

  return (
    <li className="task-list-item" key={task.id}>
      <Link href="/update/[id]" as={`/update/${task.id}`}>
        <a className="task-list-item-title">{task.title}</a>
      </Link>
      <button
        onClick={handleDeleteClick}
        disabled={loading}
        className="task-list-item-delete"
      >
        &times;
      </button>
    </li>
  );
};

export default TaskListItem;
