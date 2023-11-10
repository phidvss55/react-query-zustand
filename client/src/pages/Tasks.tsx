import React from "react";
import Column from "../components/Column";
import { TaskState, useTasksStore } from "../store/useTasksStore";
import { usePostStore } from "../store/usePostStore";
import { shallow } from "zustand/shallow";

const Tasks: React.FC = () => {
  const loadAsync = useTasksStore((store) => store.loadAsync);
  const removeAllTasks = useTasksStore((store) => store.removeAllTask);

  // useEffect(() => {
  //   loadAsync();
  // }, []);

  // short syntax
  // const { posts, addPost, addLike, removeLike } = usePostStore();

  // clear define
  const { posts, addPost, addLike, removeLike } = usePostStore(
    (state) => ({
      posts: state.posts,
      addPost: state.addPost,
      addLike: state.addLike,
      removeLike: state.removeLike,
    }),
    shallow,
  );

  console.log("posts", posts);

  return (
    <>
      {/* Demo about zustand immer middleware */}
      <div className="flex gap-2 mb-5 justify-center text-white">
        <button className="bg-slate-500 px-4 py-2" onClick={() => addPost()}>
          Add post
        </button>
        <button className="bg-slate-500 px-4 py-2" onClick={() => addLike(1)}>
          Add like
        </button>
        <button
          className="bg-slate-500 px-4 py-2"
          onClick={() => removeLike(1)}
        >
          Remove like
        </button>
      </div>
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
