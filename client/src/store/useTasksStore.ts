import { getAllTasks } from "./../apis/tasks.api";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { produce } from "immer";

export enum TaskState {
  PLANNED = "PLANNED",
  ONGOING = "ONGOING",
  DONE = "DONE",
}

type Task = {
  title: string;
  state: TaskState;
};

interface Tasks {
  tasks: Task[];
  draggedTask: string | null;
}

interface Actions {
  addTask: (title: string, state: TaskState) => void;
  deleteTask: (title: string) => void;
  setDraggedTask: (title: string | null) => void;
  moveTask: (title: string, state: TaskState) => void;
  removeAllTask: () => void;
  loadAsync: () => void;
}

const mockTasks = [
  {
    title: "Task 1",
    state: TaskState.PLANNED,
  },
  {
    title: "Task 2",
    state: TaskState.ONGOING,
  },
  {
    title: "Task 3",
    state: TaskState.DONE,
  },
];

// persist store
export const useTasksStore = create<Tasks & Actions>()(
  devtools(
    persist(
      (set) => ({
        tasks: mockTasks,
        draggedTask: null,
        removeAllTask: () => set((_) => ({ tasks: [] })),
        addTask: async (title, state) =>
          set(
            (store) => ({ tasks: [...store.tasks, { title, state }] }),
            false,
            "addTask",
          ),
        deleteTask: (title) =>
          produce((store) =>
            store.tasks.filter((t: Task) => t.title !== title),
          ),
        setDraggedTask: (title) => set((_) => ({ draggedTask: title })),
        moveTask: (title, state) =>
          set((store) => ({
            tasks: store.tasks.map((t) =>
              t.title === title ? { title, state } : t,
            ),
          })),
        loadAsync: async () => {
          const { data } = await getAllTasks();
          set((_) => ({
            tasks: data.data,
          }));
        },
      }),
      {
        name: "task-storage",
        storage: createJSONStorage(() => sessionStorage), // default: localStorage, change to sessionStorage
      },
    ),
    { enabled: import.meta.env.VITE_NODE_ENV !== "production" }, // disable on production
  ),
);
