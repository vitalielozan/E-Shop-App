import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";

function LogOut() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("cart");
    localStorage.removeItem("favorites");
    navigate("/login");
  };

  return (
    <Button color="primary" variant="light" onPress={handleLogOut}>
      LogOut
    </Button>
  );
}

export default LogOut;
