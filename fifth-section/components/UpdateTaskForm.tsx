import { isApolloError } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUpdateTaskMutation } from "../generated/graphql-frontend";

interface Values {
  title: string;
}

interface Props {
  initialValues: Values;
  id: number;
}

const UpdateTaskForm: React.FC<Props> = ({ initialValues, id }) => {
  const [values, setValues] = useState<Values>(initialValues);

  const [updateTask, { loading, error }] = useUpdateTaskMutation();
  const router = useRouter();
  let errorMessage = "";
  if (error) {
    if (error.networkError) {
      errorMessage = "A network error occurred, please try again.";
    } else {
      errorMessage = "Sorry, an error occurred.";
    }
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        try {
          const result = await updateTask({
            variables: { input: { title: values.title, id } },
          });

          if (result.data?.updateTask) {
            router.push("/");
          }
        } catch (err) {
          // log the error.
          if (isApolloError(err)) {
          }
        }
      }}
    >
      {error && <p className="alert-error">{errorMessage}</p>}
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
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Loading" : "Save"}
        </button>
      </p>
    </form>
  );
};

export default UpdateTaskForm;
