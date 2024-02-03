import React from "react";
import TaskList from "./TaskList.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Task from "./Task.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import { AddTask } from "./AddTask.jsx";
function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <TaskList />,
    },
    {
      path: "/:id",
      element: <Task />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  );
}

export default App;
