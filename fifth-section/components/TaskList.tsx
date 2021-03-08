import Link from "next/link";
import { Task } from "../generated/graphql-frontend";

interface Props {
  tasks: Task[];
}

const TaskList: React.FC<Props> = ({ tasks }) => {
  return (
    <ul className="task-list">
      {tasks.map(({ id, title, status }) => {
        return (
          <li className="task-list-item" key={id}>
            <Link href="/update/[id]" as={`/update/${id}`}>
              <a className="task-list-item-title">{title}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
