import React, { useEffect } from "react";
import { useUserStore } from "../stores/userStore";
import { useGeneralStore } from "../stores/generalStore";
import { Button, Center, Container, Group, Text } from "@mantine/core";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const userId = useUserStore((state) => state.id);
  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);

  useEffect(() => {
    if (!userId) {
      toggleLoginModal();
    }
  }, [toggleLoginModal, userId]);

  if (userId) {
    return children;
  }

  return (
    <Container ml={"40%"} w={"80vw"} mt={"30%"}>
      <Center>
        <Text fw={700} size="xl">
          Let's chat together
        </Text>
      </Center>

      <Center mt="xl">
        <Group>
          <Button variant="filled" color="pink">
            Login
          </Button>
          <Button variant="filled">Resigter</Button>
        </Group>
      </Center>
    </Container>
  );
};

export default ProtectedRoutes;
