import { useNavigate, useParams } from 'react-router-dom'
import './add.css'
import { useEffect, useState } from 'react'
import { editTask, getSingleTask } from '../service/allapi'
import { ToastContainer, toast } from 'react-toastify'







function Edit1() {
    const navigate = useNavigate()

    //state to store user data
    const [task, settask] = useState({
        taskName: "",
        taskStatus: "",
        taskDescription: "",
        taskStarts: "",
        taskEnds: ""
    })

    const { id } = useParams()

    const gettask = async () => {
        const { data } = await getSingleTask(id)
        settask(data);
    }

    //function to up to date data
    const userTasks=(e)=>{
        e.preventDefault()
        const value=e.target.value
        const key=e.target.name

        settask({...task,[key]:value})
    }

    //function for submit
    const handleEdit = async (e) => {
        e.preventDefault()
        const { taskName,taskDescription } = task
    
        if (taskName == '') {
          toast.error('task name required')
        }
        else if (taskDescription == '') {
          toast.error('description required')
        }
        
        
        else {
    
          const response = await editTask(id,task)
          // console.log(response);
          if (response.status == 200) {
            //redirect to home page
            alert(response.data)
            navigate('/')
          }
          else {
            console.log(response.response.data);
          }
    
    
    
    
        }
    
      }



    useEffect(() => {
        gettask()
    }, [])

    return (
        <div>
            <h5 class="card-title text-center mt-4 "><b>Task Details</b></h5>
            <div class="card edit-card-div m-auto mt-3 ">
                <div class="card-header p-3 view-card">
                    task name : <input className='bg-secondary' name='taskName' onChange={userTasks} value={task.taskName} type="text" />
                </div>
                <div class="card-body text-center view-card">

                <b>
                    <div className='text-start d-flex p-2 checkbox-option'>
                        status :
                        <div className="form-check ms-2">
                            <input required name='taskStatus' onChange={userTasks} checked={task.taskStatus == "false" ? true : false}  value={'false'} className="form-check-input" type="radio" id="flexRadioDefault1" />
                            <label className="form-check-label" for="flexRadioDefault1">
                                Pending
                            </label>
                        </div>
                        <div className="form-check ms-2">
                            <input required name='taskStatus' onChange={userTasks} checked={task.taskStatus== "true" ? true : false}  value={'true'} className="form-check-input" type="radio" id="flexRadioDefault2" />
                            <label className="form-check-label" for="flexRadioDefault2">
                                Running
                            </label>
                        </div>
                        <div className="form-check ms-2">
                            <input required name='taskStatus' onChange={userTasks} checked={task.taskStatus== "end" ? true : false}  value={'end'} className="form-check-input" type="radio" id="flexRadioDefault3" />
                            <label className="form-check-label" for="flexRadioDefault3">
                                Ended
                            </label>
                        </div>
                    </div>
                </b>
                    
                    <p class="card-text ">description : <input className='bg-secondary' name='taskDescription' onChange={userTasks} value={task.taskDescription} type="text" /></p>
                    <p>task started : <input className='bg-secondary' name='taskStarts' onChange={userTasks} value={task.taskStarts} type="text" /></p>
                    <p>task ends : <input className='bg-secondary' name='taskEnds' onChange={userTasks} value={task.taskEnds} type="text" /></p>
                    <div className='text-center view-ed-button'>
                        <a onClick={handleEdit} class="btn bg-success ms-2 edit-button-66  ">save changes</a>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center"></ToastContainer>
        </div>
    )
}

export default Edit1