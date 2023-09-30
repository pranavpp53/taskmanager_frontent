import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewTask} from '../service/allapi';
import './add.css'
import { useNavigate } from 'react-router-dom';




function Add() {


  //object for useNavigate
  const navigate = useNavigate()



  //to store data
  const [taskData, settask] = useState({
    taskName: "",
    taskDescription: ""
  })
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { taskName,taskDescription,taskEnds } = taskData

    if (taskName == '') {
      toast.error('task name required')
    }
    else if (taskDescription == '') {
      toast.error('description required')
    }
    
    
    else {

      const response = await addNewTask(taskData)
      // console.log(response);
      if (response.status == 200) {
        //reset all states datas
        settask({
          taskName: "",
          taskDescription: ""
        })

        //redirect to home page
        navigate('/')
      }
      else {
        console.log(response.response.data);
      }




    }

  }

  const taskDetails = (e) => {
    e.preventDefault()
    const value = e.target.value
    const key = e.target.name
    settask({ ...taskData, [key]: value })
  }
  // console.log(taskData);



  return (
    <div>
      <div>
        <h1 className='text-center my-2'>Add new task</h1>
      </div>

      <div className='add container  pt-5 d-flex gap-5'>

        <div className='w-50 container child'>
          <label htmlFor="firstname">Task name</label>
          <input required name='taskName' onChange={taskDetails} className='form-control' type="text" id='firstname' /><br />

          <label htmlFor="email">Task description</label>
          <input required name='taskDescription' onChange={taskDetails} className='form-control' type="email" id='email' /><br />


        </div>
      </div>

      <div className='container text-center'>
        <button className='add-button-66 mt-3 bg-primary mb-2' onClick={handleSubmit}>Submit</button>
      </div>

      <ToastContainer position="top-center"></ToastContainer>
    </div>
  )
}

export default Add