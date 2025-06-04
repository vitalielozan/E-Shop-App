import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { toast } from "react-toastify";

function LoginForm() {
  const [error, setError] = useState(null);
  const { users, login } = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const foundUser = users.find(
      (user) => user.email === data.email && user.password === data.password,
    );
    if (foundUser) {
      login(foundUser);
      toast.success(`Wellcome dear ! ${foundUser.email}`);
      navigate("/");
    } else {
      setError("Incorrect email or password.");
    }
  };

  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <Input
        isRequired
        label="Email"
        name="email"
        labelPlacement="outside"
        placeholder="Enter your email"
        type="email"
      />
      <Input
        isRequired
        label="Passwort"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your Passwort"
        type="password"
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Login
        </Button>
        <Button type="reset" variant="flat">
          Reset
        </Button>
      </div>
      {error && (
        <div className="pt-2 text-sm font-medium text-red-500">{error}</div>
      )}
    </Form>
  );
}

export default LoginForm;
