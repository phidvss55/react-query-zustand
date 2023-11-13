import React, { memo } from "react";
import { useCatStore } from "../../store/useCatStore";
import { shallow } from "zustand/shallow";
// import { increaseBigCats } from "../../store/useCatStore";

const PostThree: React.FC = () => {
  // const { increaseBigCats, increaseSmallCats } = useCatStore();
  const increaseBigCats = useCatStore.use.increaseBigCats();
  const increaseSmallCats = useCatStore.use.increaseSmallCats();

  // const { increaseBigCats, increaseSmallCats } = useCatStore(
  //   (state) => ({
  //     increaseBigCats: state.increaseBigCats,
  //     increaseSmallCats: state.increaseSmallCats,
  //   }),
  // shallow,
  // );

  return (
    <div className="bg-green-100 text-center h-72 flex flex-col text-lg w-72">
      <h1 className="font-bold text-lg border border-b-green-900">Box 3</h1>

      {/* <p className="mt-4">big cats: {smallCats}</p> */}
      <p className="mt-2">{Math.random()}</p>
      <div className="flex justify-around mt-6">
        <button
          className="bg-slate-700 text-white px-2 py-1"
          onClick={increaseBigCats}
        >
          Add big cats
        </button>
        <button
          className="bg-slate-700 text-white px-2 py-1"
          onClick={increaseSmallCats}
        >
          Add small cats
        </button>
      </div>
    </div>
  );
};

export default PostThree;
