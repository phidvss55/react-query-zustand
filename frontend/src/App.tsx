import React from "react";
import AuthModal from "./components/AuthModal";
import useGeneralStore from "./store/generalStore";
import EditProfileModal from "./components/EditProfileModal";

const App = () => {
  const isLoginOpen = useGeneralStore((state) => state.isLoginOpen);
  const isEditProfileOpen = useGeneralStore((state) => state.isEditProfileOpen);

  return (
    <div>
      <div className="bg-red-500">{isLoginOpen && <AuthModal />}</div>
      {isEditProfileOpen && <EditProfileModal />}
    </div>
  );
};

export default App;
