import Head from "next/head";
import styles from "../styles/Home.module.css";
import { gql, useQuery } from "@apollo/client";
import { initializeApollo } from "../lib/client";

const TasksQueryDocument = gql`
  query Tasks {
    tasks {
      id
      title
      status
    }
  }
`;

interface TasksQuery {
  tasks: {
    id: number;
    title: string;
    status: string;
  }[];
}

export default function Home() {
  const result = useQuery<TasksQuery>(TasksQueryDocument);
  const tasks = result.data?.tasks;

  return (
    <div className={styles.container}>
      <Head>
        <title>Tasks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {tasks &&
        tasks.length &&
        tasks.map(({ id, title, status }) => {
          return (
            <div key={id}>
              {title} ({status})
            </div>
          );
        })}
    </div>
  );
}

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query<TasksQuery>({
    query: TasksQueryDocument,
  });

  return {
    props: {
      initializeApolloState: apolloClient.cache.extract(),
    },
  };
};
