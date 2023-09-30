import BASE_URL from "./baseurl";
import { commonRequest } from "./commonReq";

//register
export const addNewTask=async(body)=>{
    return commonRequest('POST',`${BASE_URL}/api/tasks/addTask`,body)
}

//get all tasks
export const getTasks=async()=>{
    return commonRequest('GET',`${BASE_URL}/api/tasks/getAllTasks`)
}

//get single task
export const getSingleTask=async(id)=>{
    return commonRequest('GET',`${BASE_URL}/api/tasks/getSingleTask/${id}`)
}

// delete task
export const deleteSingleTask=async(id)=>{
    return commonRequest('DELETE',`${BASE_URL}/api/tasks/deleteTask/${id}`)
}

// change status
export const changeStatus=async(body)=>{
    return commonRequest('POST',`${BASE_URL}/api/tasks/changeStatus`,body)
}

// edit task details
export const editTask=async(id,body)=>{
    return commonRequest('PUT',`${BASE_URL}/api/tasks/editTask/${id}`,body)
}