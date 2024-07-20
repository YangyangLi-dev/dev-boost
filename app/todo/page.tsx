"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { todoDao } from "@/lib/db";
import { Todo, TodoStatus } from "@/lib/types";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await todoDao.readAll();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newTodoItem: Omit<Todo, "id" | "created_at" | "updated_at"> = {
        title: newTodo,
        content: "",
        owner: "current_user", // Replace with actual user identification
        status: TodoStatus.INIT,
      };
      const createdTodo = await todoDao.create(newTodoItem);
      if (createdTodo) {
        setTodos([createdTodo, ...todos]);
        setNewTodo("");
      }
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const toggleTodo = async (id: string, currentStatus: TodoStatus) => {
    try {
      const newStatus =
        currentStatus === TodoStatus.COMPLETE
          ? TodoStatus.INIT
          : TodoStatus.COMPLETE;
      const updatedTodo = await todoDao.updateStatus(id, newStatus);
      if (updatedTodo) {
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      }
    } catch (error) {
      console.error("Failed to update todo status:", error);
    }
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
          {todos.map((todo) => (
            <li key={todo.id} className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.status === TodoStatus.COMPLETE}
                  onChange={() => toggleTodo(todo.id, todo.status)}
                  className="mr-2"
                />
                <span
                  className={
                    todo.status === TodoStatus.COMPLETE ? "line-through" : ""
                  }
                >
                  {todo.title}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
