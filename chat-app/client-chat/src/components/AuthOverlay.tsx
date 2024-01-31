import { Modal } from "@mantine/core";
import React, { useState } from "react";
import { useGeneralStore } from "../stores/generalStore";
import RegisterModal from "./modals/ResigterModal";
import LoginModal from "./modals/LoginModal";

const AuthOverlay: React.FC = () => {
  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);
  const isLoginModalOpen = useGeneralStore((state) => state.isLoginModalOpen);
  const [isRegister, setIsRegister] = useState<boolean>(true);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <Modal centered opened={isLoginModalOpen} onClose={toggleLoginModal}>
      {isRegister ? (
        <RegisterModal toggleForm={toggleForm} />
      ) : (
        <LoginModal toggleForm={toggleForm} />
      )}
    </Modal>
  );
};

export default AuthOverlay;
