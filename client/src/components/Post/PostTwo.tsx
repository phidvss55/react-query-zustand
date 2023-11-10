import React, { memo, useState } from "react";
import { useCatStore } from "../../store/useCatStore";
import classNames from "classnames";
import { shallow } from "zustand/shallow";

const PostTwo: React.FC = () => {
  const bigCats = useCatStore((state) => state.cats.bigCats);
  // const smallCats = useCatStore((state) => state.cats.smallCats);

  // Demo about subscribe
  const [bg, setBg] = useState<string>("bg-green-100");

  React.useEffect(() => {
    const subscribe = useCatStore.subscribe(
      (state) => state.cats.smallCats,
      (next, prev) => {
        console.log(next, prev);
        if (prev <= 5 && next > 5) {
          setBg("bg-red-100");
        } else if (prev > 5 && next <= 5) {
          setBg("bg-green-100");
        }
      },
      {
        equalityFn: shallow,
      },
    );

    return subscribe;
  }, []);

  return (
    <div
      className={classNames(
        "text-center h-72 flex flex-col text-lg w-72",
        bg,
        // {
        //   "bg-green-100": smallCats <= 5,
        // },
        // {
        //   "bg-red-100": smallCats > 5,
        // },
      )}
    >
      <h1 className="font-bold text-lg border border-b-green-900">Box 2</h1>

      <p className="mt-4">Big cats: {bigCats}</p>
      <p className="mt-2">{Math.random()}</p>
    </div>
  );
};

export default memo(PostTwo);
