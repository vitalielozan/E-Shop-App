import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "@heroui/react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <Form
      className="flex w-full max-w-xs flex-row gap-3"
      onSubmit={handleSearch}
    >
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-xs"
      />
      <Button
        type="submit"
        radius="full"
        color="primary"
        variant="flat"
        className="bg-gray-900 from-cyan-600 to-indigo-600 text-white dark:bg-gradient-to-r dark:text-white"
      >
        Go
      </Button>
    </Form>
  );
}

export default SearchBar;
