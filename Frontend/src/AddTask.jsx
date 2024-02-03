import { useState } from "react";
import { API } from "./constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddTask({ setShow,update,setTask, oldTask}) {
  const [title, setTitle] = useState(oldTask ?  oldTask.title:"");
  const [desc, setDesc] = useState(oldTask ? oldTask.description :"");
  const [status, setStatus] = useState(oldTask ? oldTask.status: "pending");

  async function handleAdd() {
    const taskInfo = { title, description:desc, status };

    if(update)
    {
        const res = await fetch(API+"task/"+oldTask.id,{
            method:"PATCH",
            credentials: 'include',
            body:JSON.stringify(taskInfo),
            headers: { "content-type": "application/json" },
        })
        const data = await res.json();
        setTask(data);
        toast.success("task updated")

    }
    else
    {
     const res = await fetch(API + "task", {
      method: "POST",
      body: JSON.stringify(taskInfo),
      headers: { "content-type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();
    toast.success("task added")
    }


        setShow(false)

  }
  return (

    <div className=" w-full m-auto flex max-w-4xl flex-col py-5 gap-2 items-center">

      <div className="flex w-full flex-col px-3">
        <h4 className="text-xl">Task Title</h4>
        <div class="mb-5">
          <input
            type="text"
            id="username-success"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 w-full text-gray-500 rounded-xl resize-none"
          ></input>
        </div>
      </div>
      <div className="w-full flex flex-col px-3">
        <h4 className="text-xl">Task Description</h4>
        <textarea
          rows="3"
          className="p-4 text-gray-500 rounded-xl resize-none"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </div>
      <div className="w-full flex flex-col px-3">
        <h4 className="text-xl">Task Status</h4>
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          <option>Pending</option>
          <option>Complete</option>
        </select>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          className="py-1 px-2  bg-gradient-to-r bg-indigo-600 rounded-xl text-white"
        >
          Save
        </button>
        <button
          className="py-1 px-2  bg-gradient-to-r bg-gray-600  rounded-xl text-white"
          onClick={() => setShow(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
