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
            {title} ({status})
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
