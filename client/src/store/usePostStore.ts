import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Post = {
  id?: number;
  name: string;
  like: number;
};

type PostState = {
  posts: Array<Post>;
};

type PostActions = {
  addPost: (post?: Post) => void;
  addLike: (id: number) => void;
  removeLike: (id: number) => void;
};

export const usePostStore = create<PostState & PostActions>()(
  devtools(
    immer((set) => ({
      posts: [],
      addPost: (post) => {
        set((store) => {
          store.posts.push({
            id: store.posts.length + 1,
            name: post?.name ?? (Math.random() + 1).toString(36).substring(7),
            like: 1,
          });
        });
      },
      addLike: (id) =>
        set(
          (state) => {
            let find = state.posts.find((post) => post.id === id);
            if (find) {
              find.like++;
            }
          },
          false,
          "addLike", // used for naming action names instead of anounymous name
        ),
      removeLike: (id) =>
        set((state) => {
          return { likedPosts: state.posts.filter((p) => p.id !== id) };
        }),
    })),
  ),
);
