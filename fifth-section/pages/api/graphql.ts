import { ApolloServer, gql } from "apollo-server-micro";
import mysql from "serverless-mysql";
import { OkPacket } from "mysql";
import { Resolvers, TaskStatus } from "../../generated/graphql-backend";

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

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

interface TaskDbRow {
  id: number;
  title: string;
  task_status: TaskStatus;
}

type TasksDbQueryResult = TaskDbRow[];

type TaskDbQueryResult = TaskDbRow[];

const getTaskById = async (id: number, db: mysql.ServerlessMysql) => {
  const tasks = await context.db.query<TaskDbQueryResult>(
    "SELECT ID, title, task_status from tasks WHERE id = ?",
    [id]
  );

  return tasks.length
    ? {
        id: tasks[0].id,
        title: tasks[0].title,
        status: tasks[0].task_status,
      }
    : null;
};

const resolvers: Resolvers<ApolloContext> = {
  Query: {
    async tasks(parent, args, context) {
      const { status } = args;
      let query = "SELECT id, title, task_status FROM tasks";
      const queryParams: string[] = [];
      if (status) {
        query += " WHERE task_status = ?";
        queryParams.push(status);
      }
      const tasks = await context.db.query<TasksDbQueryResult>(
        query,
        queryParams
      );
      await db.end();
      return tasks.map(({ id, title, task_status }) => ({
        id,
        title,
        status: task_status,
      }));
    },
    async task(parent, args, context) {
      return getTaskById(args.id, db);
    },
  },
  Mutation: {
    async createTask(parent, args, context) {
      const result = await context.db.query<OkPacket>(
        "INSERT INTO tasks (title, task_status) VALUES(?, ?)",
        [args.input.title, TaskStatus.Active]
      );
      return {
        id: result.insertId,
        title: args.input.title,
        status: TaskStatus.Active,
      };
    },
    async updateTask(parent, args, context) {
      const columns: string[] = [];
      const sqlParams: any[] = [];

      if (args.input.title) {
        columns.push("title = ?");
        sqlParams.push(args.input.title);
      }

      if (args.input.status) {
        columns.push("task_status = ?");
        sqlParams.push(args.input.status);
      }
      sqlParams.push(args.input.id);

      await context.db.query(
        `UPDATE tasks SET ${columns.join(",")} WHERE id = ?`,
        sqlParams
      );

      const updatedTask = getTaskById(args.input.id, db);

      return updatedTask;
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
