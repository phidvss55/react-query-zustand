import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createSelectors from "./selectors";

type TCatStoreState = {
  cats: {
    bigCats: number;
    smallCats: number;
  };
  increaseBigCats: () => void;
  increaseSmallCats: () => void;
  summary: () => void;
  clearCats: () => void;
};

export const useCatStore = createSelectors(
  create<TCatStoreState>()(
    immer(
      devtools(
        persist(
          (set, get) => ({
            cats: {
              bigCats: 0,
              smallCats: 0,
            },
            increaseBigCats: () =>
              set(
                (store) => ({
                  // without immer middleware
                  cats: {
                    ...store.cats,
                    bigCats: store.cats.bigCats + 1,
                  },
                }),
                // false,
                // "cat/addBigCat",
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
          },
        ),
        {
          enabled: true,
        },
      ),
    ),
  ),
);
