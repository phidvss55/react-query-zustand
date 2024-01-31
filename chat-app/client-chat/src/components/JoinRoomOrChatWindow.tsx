import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Text } from "@mantine/core";
import ChatWindow from "./ChatWindow";

const JoinRoomOrChatwindow: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [content, setContent] = React.useState<string | React.ReactNode>("");

  useEffect(() => {
    if (!id) {
      setContent("Please choose a room");
    } else {
      setContent(<ChatWindow />);
    }
  }, [setContent, id]);

  return (
    <Flex h="100vh" align={"center"} justify={"center"}>
      <Text ml={!id ? "xl" : "none"} size={!id ? "xl" : ""}>
        {content}
      </Text>
    </Flex>
  );
};

export default JoinRoomOrChatwindow;
