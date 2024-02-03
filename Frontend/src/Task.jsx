import React, { useEffect, useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useLocation,useParams } from "react-router-dom"
import { API ,formatDate} from "./constants";
import { AddTask } from "./AddTask";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { ToastContainer, toast } from "react-toastify";
export default function Task() {

    const {user} = useAuth()
    const [task,setTask] = useState({})
  const handleEdit = (order) => {
    setShow((show) => !show);
  };
  const handleUpdate = () => {
    console.log("handleShow");
  };

  const {id} = useParams();

  useEffect(()=>{
    fetchTask(id)
  },[id])

  const handleDelete = async () => {
    const res = await fetch(API+"task/"+task.id,{
        method:"DELETE",
        credentials: 'include',
    })
    const data = await res.json();
    setTask(null)
    toast.success("Task deleted")
  };

  async function fetchTask()
  {
    const res = await fetch(API+"task/"+id,
    {
        credentials: 'include',
    })
    const data = await res.json();
    setTask(data)
  }

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };
  const [show, setShow] = useState(false);
  return (

    <div className="overflow-x-auto ">
         <ToastContainer/>
        {show && <AddTask oldTask={task} update={true} setShow={setShow} setTask = {setTask}/>}
        {user===null && <Navigate to="/login"></Navigate>}
        {task===null && <Navigate to="/"></Navigate>}
        {task &&
      <div className="bg-gray-100 flex  h-screen py-10 justify-center font-sans overflow-hidden">
        <div className="w-full max-w-4xl">
          <div className="bg-white shadow-md rounded-xl my-6 p-5 flex flex-col gap-5">
            <div className="flex justify-between">
              <h3 className="text-5xl font-semibold">{task.title}</h3>
              <div className="flex items-center justify-center">
                <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                  <PencilIcon
                    className="w-5 h-5 cursor-pointer"
                    onClick={(e) => handleEdit(task)}
                  ></PencilIcon>
                </div>
                <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                  <TrashIcon
                    className="w-5 h-5 cursor-pointer"
                    onClick={(e) => handleDelete(task)}
                  ></TrashIcon>
                </div>

              </div>
            </div>

            <p className="">
             {task.description}
            </p>
            <div className="flex items-center gap-3">
              <div className="text-xl ">Due Date : </div>
              <div>{formatDate(task.createdAt)}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xl ">Status : </div>
              <div>{task.status}</div>
            </div>

          </div>
        </div>
      </div>}
    </div>
  );
}
