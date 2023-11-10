import React from "react";
import classNames from "classnames";
import trash from "../assets/trash-2.svg";
import { TaskState, useTasksStore } from "../store/useTasksStore";

type Props = {
  title: string;
};

const Task: React.FC<Props> = ({ title }: Props) => {
  const task = useTasksStore((store) =>
    store.tasks.find((task) => task.title === title),
  );
  const setDraggedTask = useTasksStore((store) => store.setDraggedTask);
  const deleteTask = useTasksStore((store) => store.deleteTask);

  return (
    <div
      className="bg-slate-50 w-[90%] m-auto mt-2 py-2 rounded font-medium"
      draggable
      onDragStart={() => setDraggedTask(task?.title ?? "")}
    >
      <div className="text-left ml-4">{task?.title}</div>
      <div className="flex justify-between mt-5">
        <div className="ml-2">
          <img
            className="cursor-pointer"
            src={trash}
            onClick={() => deleteTask(task?.title ?? "")}
          />
        </div>
        <div
          className={classNames(
            "mr-2 text-white py-1 px-2 rounded-sm",
            {
              "bg-slate-700": task?.state === TaskState.PLANNED,
            },
            {
              "bg-purple-950": task?.state === TaskState.ONGOING,
            },
            {
              "bg-green-800": task?.state === TaskState.DONE,
            },
          )}
        >
          {task?.state}
        </div>
      </div>
    </div>
  );
};

export default Task;
