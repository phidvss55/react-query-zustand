import React, { useState } from "react";
import { Navbar, Center, Stack, rem, Avatar } from "@mantine/core";
import { useGeneralStore } from "../stores/generalStore";
import {
  IconBrandMessenger,
  IconBrandWechat,
  IconLogin,
  IconUserCircle,
} from "@tabler/icons-react";
import NavbarLink from "./NavbarLink";
import { useUserStore } from "../stores/userStore";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "../graphql/mutations/Logout";

const mockdata = [{ icon: IconBrandWechat, label: "Chatrooms" }];
const Sidebar: React.FC = () => {
  const toggleProfileSettingsModal = useGeneralStore(
    (state) => state.toggleProfileSettingsModal
  );
  const [active, setActive] = useState<number>(0);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));
  const userId = useUserStore((state) => state.id);
  const user = useUserStore((state) => state);
  const setUser = useUserStore((state) => state.setUser);

  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [logoutUser] = useMutation(LOGOUT_USER, {
    onCompleted: () => {
      toggleLoginModal();
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleLogout = async () => {
    await logoutUser();
    setUser({
      id: undefined,
      fullname: "",
      avatarUrl: null,
      email: "",
    });
  };

  return (
    <Navbar fixed zIndex={100} w={rem(100)} p="md">
      <Center>
        <IconBrandMessenger type="mark" size={30} />
      </Center>

      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {userId && links}
        </Stack>
      </Navbar.Section>

      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          {userId && (
            <NavbarLink
              avatar={<Avatar src={user.avatarUrl} />}
              label={"Profile (" + user.fullname + ") "}
              onClick={toggleProfileSettingsModal}
            />
          )}

          {userId ? (
            <NavbarLink
              icon={() => <IconLogin size="36" />}
              label="Logout"
              onClick={handleLogout}
            />
          ) : (
            <NavbarLink
              icon={() => <IconUserCircle size="36" />}
              label="Login"
              onClick={toggleLoginModal}
            />
          )}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
