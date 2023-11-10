import React from "react";
import Column from "../components/Column";
import { TaskState, useTasksStore } from "../store/useTasksStore";

const Tasks: React.FC = () => {
  const loadAsync = useTasksStore((store) => store.loadAsync);
  const removeAllTasks = useTasksStore((store) => store.removeAllTask);

  // useEffect(() => {
  //   loadAsync();
  // }, []);

  return (
    <>
      <hr className="mb-6" />
      {/* Demo detail about zustand */}
      <div className="flex justify-around h-[90%]">
        <Column state={TaskState.PLANNED} />
        <Column state={TaskState.ONGOING} />
        <Column state={TaskState.DONE} />
      </div>

      <div>
        <button
          className="bg-slate-800 text-white px-4 py-2 rounded-sm absolute right-[5%] bottom-[10%]"
          onClick={() => {
            loadAsync();
          }}
        >
          Reload from server
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-sm absolute right-[15%] bottom-[10%]"
          onClick={() => removeAllTasks()}
        >
          Clear Task
        </button>
      </div>
    </>
  );
};

export default Tasks;
