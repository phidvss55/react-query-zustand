import React, { useEffect } from "react";
import { Notification, rem } from "@mantine/core";
import { IconAlertCircle, IconCheck, IconX } from "@tabler/icons-react";
import { useNotifyStore } from "../../stores/notificationStore";
import { Dialog } from "@mantine/core";

const ShowNotification: React.FC = () => {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const alertIcon = (
    <IconAlertCircle style={{ width: rem(20), height: rem(20) }} />
  );

  const { notification, setShowNotification } = useNotifyStore();

  useEffect(() => {
    setTimeout(() => {
      if (notification.show) {
        setShowNotification(false);
      }
    }, notification.duration ?? 3000);
  }, [notification.duration, notification.show, setShowNotification]);

  return (
    <Dialog
      opened={true}
      withCloseButton
      onClose={close}
      size="lg"
      radius="md"
      p={0}
      mb={"10%"}
    >
      {/* warning */}
      {notification.type === "warning" && (
        <Notification
          icon={alertIcon}
          withBorder
          color="yellow"
          onClick={() => setShowNotification(false)}
          title="Warning!"
          py="lg"
        >
          {notification.message}
        </Notification>
      )}
      {/* error */}
      {notification.type === "error" && (
        <Notification
          icon={xIcon}
          withBorder
          color="red"
          onClick={() => setShowNotification(false)}
          title="Error!"
          py="lg"
        >
          {notification.message}
        </Notification>
      )}
      {/* success */}
      {notification.type === "success" && (
        <Notification
          icon={checkIcon}
          withBorder
          color="teal"
          onClick={() => setShowNotification(false)}
          title="Success!"
          py="lg"
        >
          {notification.message}
        </Notification>
      )}
    </Dialog>
  );
};

export default ShowNotification;
