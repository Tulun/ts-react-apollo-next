import { useState } from "react";

const CreateTaskForm = () => {
  const [title, setTitle] = useState("");
  return (
    <form>
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
