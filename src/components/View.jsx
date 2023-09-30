import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteSingleTask, getSingleTask } from '../service/allapi'
import './view.css'




function View() {

  const navigate = useNavigate()

  //state to store user data
  const [task, settask] = useState({})

  const { id } = useParams()

  const gettask = async () => {
    const { data } = await getSingleTask(id)
    settask(data);
  }

  const deleteTask = async (e) => {
    e.preventDefault()
    const response = await deleteSingleTask(id)
    alert(response.data)
    if (response.status == 200) {
      navigate('/')
    }
  }


  useEffect(() => {
    gettask()
  }, [])
  return (
    <div>
      <h5 class="card-title text-center mt-4 "><b>Task Details</b></h5>

      {
        task ?
          <div class="card m-auto mt-3 view-card-div ">
            <div class="card-header p-3 view-card">
              task name : <b>{task.taskName}</b>
            </div>
            <div class="card-body text-center view-card">
              {task.taskStatus == 'false' ? (<h5 className='text-warning'><b>task pending</b></h5>) 
              : task.taskStatus=='true' ?(<h5 className='text-success'><b>task running</b></h5>)
            :(<h5 className='text-danger'><b>task ended</b></h5>)}
              <p class="card-text ">description : <b>{task.taskDescription}</b></p>
              <p>task started : <b>{task.taskStarts}</b></p>
              <p>task ends : <b>{task.taskEnds}</b></p>
              <div className='text-center view-ed-button'>
                <Link to={`edit/${task._id}`}  class="btn bg-primary delete-button-66  ">Edit</Link>
                <a onClick={deleteTask} class="btn bg-danger ms-2 delete-button-66  ">delete</a>
              </div>
            </div>
          </div>
          : ''
      }
    </div>
  )
}

export default View