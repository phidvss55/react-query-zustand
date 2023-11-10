import React from "react";
import { useCatStore } from "../../store/useCatStore";

const PostOne: React.FC = () => {
  // const bigCats = useCatStore((state) => state.cats.bigCats);
  // const smallCats = useCatStore((state) => state.cats.smallCats);
  // const increaseBigCats = useCatStore((state) => state.increaseBigCats);
  // const increaseSmallCats = useCatStore((state) => state.increaseSmallCats);
  // const summary = useCatStore((state) => state.summary);

  const {
    cats: { bigCats, smallCats },
    increaseBigCats,
    increaseSmallCats,
    summary,
  } = useCatStore();
  console.log(summary());

  return (
    <div className="bg-green-100 text-center h-72 flex flex-col text-lg w-72">
      <h1 className="font-bold text-lg border border-b-green-900">Box 1</h1>

      <p className="mt-4">big cats: {bigCats}</p>
      <p className="mt-2">small cats: {smallCats}</p>
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

export default PostOne;
