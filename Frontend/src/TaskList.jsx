import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE, formatDate } from "./constants";
import { API } from "./constants";
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Pagination from "./Pagination";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { AddTask } from "./AddTask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskList() {
  const [page, setPage] = useState(1);
  const [totalItems,setTotalItems] = useState(0);
  //   const dispatch = useDispatch();
  //   const Task = useSelector(selectTask);
  //   const totalTask = useSelector(selectTotalTask);
  const [editableTaskId, setEditableTaskId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableTaskId(order.id);
  };

  const {user} = useAuth();
  console.log(user)


  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "complete":
        return "bg-green-200 text-green-600";

    }
  };
  const [show,setShow] = useState(false);
const [Tasks,setTasks] = useState([])
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };

    fetchAllTask({ sort, pagination });
  }, [page, sort,show]);

  async function fetchAllTask({ sort, pagination }) {

    let queryString = "";

    for(let key in sort)
    queryString+= `${key}=${sort[key]}&`

    for(let key in pagination)
    queryString+= `${key}=${pagination[key]}&`

    const res = await fetch(API+"task?"+queryString,{
        credentials: 'include',
    });
    const data= await res.json();
    console.log(data)
    setTasks(data.tasks)
    setTotalItems(data.count)

  }
  const handleDelete = async (e, task) => {
    let queryString = "";
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    for(let key in sort)
    queryString+= `${key}=${sort[key]}&`

    for(let key in pagination)
    queryString+= `${key}=${pagination[key]}&`

    const res = await fetch(API+"task/"+task.id+"?"+queryString,{
        method:"DELETE",
        credentials: 'include',
    })
    const data = await res.json();
    console.log(data)
    setTasks(data.tasks)
    setTotalItems(data.count)
    toast.success("Task deleted")
  };

  const handleTaskUpdate = async (e,task)=>{
    const updated = {...task, status:e.target.value}
    console.log(updated)
    const res = await fetch(API+"task/"+task.id,{
        method:"PATCH",
        credentials: 'include',
        body:JSON.stringify(updated),
        headers: { "content-type": "application/json" },
    })
    const data = await res.json();
    toast.success("task updated")
    const newTaskList = Tasks.map(t=>t.id===data.id ? data : t)
    setTasks(newTaskList)

    setEditableTaskId(-1)
  }
  return (
    <div className="overflow-x-auto flex gap-4 flex-col items-center">
        <ToastContainer/>
       {user===null && <Navigate to="/login"></Navigate>}
        <h1 className=" text-center text-6xl">Task Manager</h1>
          <button
          onClick={() => setShow(show=>!show)}
          className="py-1 px-2 bg-gradient-to-r bg-gray-700 rounded-xl text-white"
        >
         Add Task
        </button>
       {show && <AddTask setShow={ setShow}/>}
      <div className="bg-gray-100 self-stretch flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full max-w-4xl">
          <div className="bg-white shadow-md rounded my-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-2 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "title",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Title{" "}
                    {sort._sort === "title" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "createdAt",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Due Date{" "}
                    {sort._sort === "createdAt" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "status",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Status{" "}
                    {sort._sort === "status" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-0 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {Tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-b cursor-pointer border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-0 text-left whitespace-nowrap">
                      {" "}
                      <Link to={{pathname:"/" + task._id,
                                state:{task:task}}}>
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{task.title}</span>
                        </div>{" "}
                      </Link>
                    </td>

                    <td className="py-3 px-0 text-left">
                    <Link to={{pathname:"/" + task._id,
                                state:{task:task}}}>{ formatDate(task.createdAt)}</Link>
                    </td>

                    <td className="py-3 px-0">
                      {" "}

                        {task.id === editableTaskId ? (
                          <select value = {task.status}
                            onChange={(e) => handleTaskUpdate(e, task)}
                          >
                            <option value="pending">Pending</option>
                            <option value="complete">Complete</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              task.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {task.status}
                          </span>
                        )}{" "}

                    </td>

                    <td className="py-3 px-0 text-center">
                      {" "}

                        <div className="flex items-center justify-center">
                          <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                            <PencilIcon
                              className="w-5 h-5"
                              onClick={(e) => handleEdit(task)}
                            ></PencilIcon>
                          </div>
                          <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                            <TrashIcon
                              className="w-5 h-5"
                              onClick={(e) => handleDelete(e,task)}
                            ></TrashIcon>
                          </div>
                        </div>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              page={page}
              setPage={setPage}
              // handlePage={handlePage}
              totalItems={totalItems}
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
