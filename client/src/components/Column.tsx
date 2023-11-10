import React, { useState } from "react";
import { TaskState, useTasksStore } from "../store/useTasksStore";
import Task from "./Task";
import { toast } from "react-toastify";
import classNames from "classnames";

type Props = {
  state: TaskState;
};

const Column: React.FC<Props> = ({ state }: Props) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [drop, setDrop] = useState<boolean>(false);

  const tasks = useTasksStore((store) =>
    store.tasks.filter((task) => task.state === state),
  );
  const addTask = useTasksStore((store) => store.addTask);
  const setDraggedTask = useTasksStore((store) => store.setDraggedTask);
  const draggedTask = useTasksStore((store) => store.draggedTask);
  const moveTask = useTasksStore((store) => store.moveTask);

  return (
    <div
      className={classNames("bg-green-100 w-96 text-center", {
        "bg-slate-100": drop,
      })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={(_) => {
        setDrop(false);
        moveTask(draggedTask ?? "", state);
        toast.success("Task dropped");
        setDraggedTask(null);
      }}
    >
      <div className="font-semibold bg-green-700 text-md text-white py-4 flex justify-between">
        <p className="ml-4">{state}</p>
        <button
          className="mr-2 bg-slate-50 text-black px-2 py-1 rounded-sm"
          onClick={() => setOpen(true)}
        >
          Add
        </button>
      </div>

      {tasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}

      {/* Modal popup */}
      {open && (
        <div className="bg-gray-100 fixed top-0 left-0 w-full h-full bg-opacity-80">
          <div className="mt-[15%] bg-slate-500 w-96 m-auto !h-32">
            <input
              className="w-80 rounded-sm mt-6 py-2 px-3"
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <div className="mt-4">
              <button
                className="bg-slate-50 px-6 py-2 rounded-sm"
                onClick={() => {
                  setText("");
                  addTask(text, state);
                  toast.success("Task added successfully");
                  setOpen(false);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Column;
