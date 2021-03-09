import { Task } from "../generated/graphql-frontend";
import Link from "next/link";

interface Props {
  task: Task;
}

const TaskListItem: React.FC<Props> = ({ task }) => {
  return (
    <li className="task-list-item" key={task.id}>
      <Link href="/update/[id]" as={`/update/${task.id}`}>
        <a className="task-list-item-title">{task.title}</a>
      </Link>
    </li>
  );
};

export default TaskListItem;
