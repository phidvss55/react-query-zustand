import React from "react";
import { useCatStore } from "../../store/useCatStore";

const PostTwo: React.FC = () => {
  // const {
  //   cats: { bigCats },
  //   increaseBigCats,
  //   increaseSmallCats,
  //   summary,
  // } = useCatStore();

  // console.log(summary());
  const bigCats = useCatStore((state) => state.cats.bigCats);

  return (
    <div className="bg-green-100 text-center h-72 flex flex-col text-lg w-72">
      <h1 className="font-bold text-lg border border-b-green-900">Box 2</h1>

      <p className="mt-4">Big cats: {bigCats}</p>
      <p className="mt-2">{Math.random()}</p>
    </div>
  );
};

export default PostTwo;
