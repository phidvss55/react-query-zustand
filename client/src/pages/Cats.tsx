import React from "react";
import PostOne from "../components/Post/PostOne";
import PostTwo from "../components/Post/PostTwo";
import PostThree from "../components/Post/PostThree";
// import { useCatStore } from "../store/useCatStore";

const Cats: React.FC = () => {
  // const { clearCats } = useCatStore();

  return (
    <>
      <div className="flex justify-around">
        <PostOne />
        <PostTwo />
        <PostThree />
      </div>

      <div className="mt-6">
        <button
          className="bg-slate-800 text-white px-4 py-2"
          // onClick={() => clearCats()}
        >
          Clear Cat Storage
        </button>
      </div>
    </>
  );
};

export default Cats;
