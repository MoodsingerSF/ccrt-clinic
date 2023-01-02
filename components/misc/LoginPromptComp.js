import React, { useContext } from "react";
import { Context } from "../../contexts/LoginPromptContext";
import LoginDialog from "../modal/LoginDialog";

const LoginPromptComp = () => {
  const { isOpen, closeLoginPrompt } = useContext(Context);
  return <LoginDialog open={isOpen()} onClose={closeLoginPrompt} />;
};

export default LoginPromptComp;
