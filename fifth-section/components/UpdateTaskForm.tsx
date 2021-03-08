import { useState } from "react";

interface Values {
  title: string;
}

interface Props {
  initialValues: Values;
}

const UpdateTaskForm: React.FC<Props> = ({ initialValues }) => {
  const [values, setValues] = useState<Values>(initialValues);

  return (
    <form>
      <p>
        <label className="field-label">Title</label>
        <input
          type="text"
          name="title"
          className="text-input"
          value={values.title}
          onChange={(event) => {
            const { name, value } = event.target;

            setValues((prevValues) => ({ ...prevValues, [name]: value }));
          }}
        />
      </p>
      <p>
        <button className="button" type="submit">
          Save
        </button>
      </p>
    </form>
  );
};

export default UpdateTaskForm;
