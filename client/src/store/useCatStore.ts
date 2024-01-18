import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createSelectors from "./selectors";

type TCatStoreState = {
  cats: {
    bigCats: number;
    smallCats: number;
  };
  catsSize: number;
};

type TCatStoreActions = {
  increaseBigCats: () => void;
  increaseSmallCats: () => void;
  summary: () => void;
  clearCats: () => void;
};

export const useCatStore = create<TCatStoreState & TCatStoreActions>()(
  immer(
    devtools(
      subscribeWithSelector(
        persist(
          (set, get) => ({
            cats: {
              bigCats: 0,
              smallCats: 0,
            },
            catsSize: 100,
            increaseBigCats: () =>
              set(
                (store) => ({
                  // without immer middleware
                  cats: {
                    ...store.cats,
                    bigCats: store.cats.bigCats + 1,
                  },
                }),
                false,
                "cat/addBigCat",
              ),
            increaseSmallCats: () =>
              set((store) => {
                store.cats.smallCats++; // with immer middleware
              }),
            summary: () => {
              const total = get().cats.bigCats + get().cats.smallCats;
              return `There are ${total} cats in total. `;
            },
            clearCats: () => {
              set((store) => (store.cats.bigCats = 0));
            },
          }),
          {
            name: "cat-store",
            partialize: (store) => store.cats,
          },
        ),
      ),
      {
        enabled: true,
      },
    ),
  ),
);

// seperate actions from store
// export const increaseBigCats = () =>
//   useCatStore.setState((store) => ({
//     cats: {
//       ...store.cats,
//       bigCats: store.cats.bigCats + 1,
//     },
//   }));
