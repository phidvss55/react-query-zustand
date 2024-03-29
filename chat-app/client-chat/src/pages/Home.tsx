import React from "react";
import Sidebar from "../components/Sidebar";
import ProtectedRoutes from "../components/ProtectedRoutes";
import ProfileSettings from "../components/ProfileSettings";
import RoomList from "../components/RoomList";
import { Flex } from "@mantine/core";
import MainLayouts from "../layouts/MainLayouts";
import JoinRoomOrChatwindow from "../components/JoinRoomOrChatWindow";
import AuthOverlay from "../components/AuthOverlay";
import AddChatRoom from "../components/AddChatRoom";
import ShowNotification from "../components/notification/Notification";
import { useNotifyStore } from "../stores/notificationStore";

const Home: React.FC = () => {
  const { notification } = useNotifyStore();
  return (
    <MainLayouts>
      <div
        style={{
          position: "absolute",
        }}
      >
        {notification.show && <ShowNotification />}
        <AuthOverlay />
        <ProfileSettings />
        <Sidebar />

        <ProtectedRoutes>
          <AddChatRoom />

          <Flex direction={{ base: "column", md: "row" }}>
            <RoomList />
            <JoinRoomOrChatwindow />
          </Flex>
        </ProtectedRoutes>
      </div>
    </MainLayouts>
  );
};

export default Home;
