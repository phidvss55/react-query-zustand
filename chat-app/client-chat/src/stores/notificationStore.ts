import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Notification {
  type: "error" | "success" | "warning";
  message: string;
  duration: number;
  show: boolean;
}

type NotifyState = {
  notification: Notification;
};

type NotifyAction = {
  setNotification: (notification: Notification) => void;
  resetNotification: () => void;
  setShowNotification: (show: boolean) => void;
};

const INITIAL_NOTIFY: Notification = {
  type: "success",
  message: "",
  duration: 3000,
  show: false,
};

export const useNotifyStore = create<NotifyState & NotifyAction>()(
  devtools(
    (set) => ({
      notification: INITIAL_NOTIFY,
      setNotification: (payload: Notification) =>
        set({ notification: payload }),
      setShowNotification: (setShow: boolean) =>
        set(
          (store) => ({
            notification: {
              ...store.notification,
              show: setShow,
            },
          }),
          false,
          "notification/setShowNotification"
        ),
      resetNotification: () => set({ notification: INITIAL_NOTIFY }),
    }),
    {
      name: "notify-store",
    }
  )
);
