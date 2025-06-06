import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { useAuthContext } from "../hooks/useAuthContext.js";

function RegisterForm({ onRegisterSuccess }) {
  const [action, setAction] = useState(null);
  const { users, setUsers } = useAuthContext();
  const validatePassword = (value) => {
    if (value.length < 6) return "Password must be at 6 characters";
    if (!/A-Z/.test(value))
      return "Mast caontain at least one uppercase letter";
    if (!/0=9/.test(value)) return "Mast caontain at least one number";
    if (!/[!@#$%^&*(),._<>:|?{}]/.test(value))
      return "Mast caontain at least one simbol";
    return null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const alreadyExists = users.some((user) => user.email === data.email);
    if (alreadyExists) {
      setAction("This email is already registered!");
    } else {
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers, data];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return updatedUsers;
      });
      setAction("Account created successfully! You can now log in.");

      setTimeout(() => {
        if (onRegisterSuccess) {
          onRegisterSuccess();
        }
      }, 1000);
    }
  };

  return (
    <Form
      validationBehavior="aria"
      className="flex w-full max-w-xs flex-col gap-4"
      onReset={() => setAction("Form reset.")}
      onSubmit={handleSubmit}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
        validate={(value) => {
          if (!value.includes("@")) return "Must be a valid email";
          return null;
        }}
      />

      <Input
        isRequired
        errorMessage="Please create a strong passwort"
        label="Passwort"
        labelPlacement="outside"
        name="password"
        placeholder="Create a Passwort"
        type="password"
        validate={validatePassword}
      />

      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Register
        </Button>
        <Button type="reset" variant="flat">
          Reset
        </Button>
      </div>
      {action && (
        <div className="pt-2 text-sm font-medium text-default-500">
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
  );
}

export default RegisterForm;
