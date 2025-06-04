import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { useAuthContext } from "../hooks/useAuthContext.js";

function LogOut() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <Button color="primary" variant="light" onPress={handleLogOut}>
      LogOut
    </Button>
  );
}

export default LogOut;
