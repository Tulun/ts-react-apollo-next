import { create } from "domain";
import { useState } from "react";
import { useCreateTaskMutation } from "../generated/graphql-frontend";

interface Props {
  onSuccess: () => void;
}

const CreateTaskForm: React.FC<Props> = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [createTask, { loading, error }] = useCreateTaskMutation({
    onCompleted: () => onSuccess(),
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!loading) {
          try {
            await createTask({ variables: { input: { title } } });
            setTitle("");
          } catch (err) {
            // Log the error.
          }
        }
      }}
    >
      {error && <p className="alert-error">An error occured.</p>}
      <input
        type="test"
        name="title"
        placeholder="What would you like to get done?"
        autoComplete="off"
        className="text-input new-task-text-input"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
    </form>
  );
};

export default CreateTaskForm;
