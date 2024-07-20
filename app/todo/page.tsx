"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function TodoList() {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([]);
  const [newTodo, setNewTodo] = useState("");

const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo("");
};

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <form onSubmit={addTodo} className="mb-4">
          <input
            type="text"
            placeholder="New Todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Todo
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(index)}
                  className="mr-2"
                />
                <span className={todo.completed ? "line-through" : ""}>
                  {todo.text}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
