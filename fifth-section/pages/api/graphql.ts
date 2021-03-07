import { ApolloServer, gql, IResolvers } from "apollo-server-micro";
import mysql from "serverless-mysql";

const typeDefs = gql`
  enum TaskStatus {
    active
    completed
  }

  type Task {
    id: Int!
    title: String!
    status: TaskStatus!
  }

  input CreateTaskInput {
    title: String!
  }

  input UpdateTaskInput {
    id: Int!
    title: String
    status: TaskStatus
  }

  type Query {
    tasks(status: TaskStatus): [Task!]!
    task(id: Int!): Task
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task
    updateTask(input: UpdateTaskInput!): Task
    deleteTask(id: Int!): Task
  }
`;

interface ApolloContext {
  db: mysql.ServerlessMysql;
}

enum TaskStatus {
  active = "active",
  completed = "completed",
}

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

interface TaskDBRow {
  id: number;
  title: string;
  task_status: TaskStatus;
}

type TasksDbQueryResult = TaskDBRow[];
const resolvers: IResolvers<any, ApolloContext> = {
  Query: {
    async tasks(parent, args, context): Promise<Task[]> {
      const tasks = await context.db.query<TasksDbQueryResult>(
        `SELECT id, title, task_status FROM tasks`
      );

      await db.end();

      return tasks.map(({ id, title, task_status }) => ({
        id,
        title,
        status: task_status,
      }));
    },
    task(parent, args, context) {
      return null;
    },
  },
  Mutation: {
    createTask(parent, args, context) {
      return null;
    },
    updateTask(parent, args, context) {
      return null;
    },
    deleteTask(parent, args, context) {
      return null;
    },
  },
};
const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
  },
});

const apolloServer = new ApolloServer({ typeDefs, resolvers, context: { db } });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
