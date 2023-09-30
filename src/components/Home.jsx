import React, { useEffect, useState } from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import { changeStatus, getTasks } from '../service/allapi'



function TableC() {

    const [allTasks, setAllTasks] = useState("")
    const [status, setStatus] = useState("")

    useEffect(() => {
        getAllTasks()
    }, [status]);

    const updateStatusStart = async (e) => {
        const currentDate = new Date();
        const currentDateTime = currentDate.toLocaleString();
        const body = { id: e, status: 'true', start: currentDateTime }
        const response = await changeStatus(body)
        setStatus(response.status);

    }

    const updateStatusEnd = async (e) => {
        const currentDate = new Date();
        const currentDateTime = currentDate.toLocaleString();
        const body = { id: e, status: 'end',end:currentDateTime }
        const response = await changeStatus(body)
        setStatus(response.satus)
    }



    const getAllTasks = async () => {
        const response = await getTasks()
        setAllTasks(response.data);
    }

    console.log(allTasks);


    return (
        <div className='w-100'>
            <div className='home-table-div'>
                <table class="table mt-5 align-middle mb-0 bg-white  w-75 text-center container" style={{ border: 'grey 2px solid' }}>
                    <thead class="bg-light">
                        <tr>
                            
                            <th>Task</th>
                            <th>status</th>
                            <th>Description</th>
                            <th>started time</th>
                            <th>end time</th>
                            <th></th>
    
                        </tr>
    
                    </thead>
                    <tbody>
    
                        {
                            allTasks.length > 0 ? allTasks.map(i => (
    
    
    
                                <tr>
                                    
                                    <td>
                                        {i.taskName}
                                    </td>
                                    <td>
                                        {i.taskStatus === 'true' ? (
                                            <span className='text-success'><b>running</b></span>
                                        ) : i.taskStatus === 'false' ? (
                                            <span className='text-warning'><b>pending</b></span>
                                        ) : (
                                            <span className='text-danger'><b>Finished</b></span>
                                        )}
                                    </td>
                                    <td>
                                        {i.taskDescription}
                                    </td>
    
                                    <td>
                                        {i.taskStarts}
                                    </td>
                                    <td>
                                        {i.taskEnds}
                                    </td>
                                    <td>
                                        <div className='d-flex w-100 text-end '>
                                            {i.taskStatus == 'false' ? (<button onClick={() => updateStatusStart(i._id)} className='home-button-66 bg-success'>Start</button>
                                            ) : i.taskStatus == 'true' ? (<button onClick={() => updateStatusEnd(i._id)} className='home-button-66 bg-danger'>End</button>
                                            ) : (<button onClick={() => updateStatusEnd(i._id)} className='home-button-66 bg-primary'>Finished</button>
                                            )}
                                            <Link to={`view/${i._id}`}><button className='ms-3 home-button-66 bg-primary'>View</button></Link>
                                        </div>
                                    </td>
                                </tr>
                            )) : <tr><h1>no tasks present</h1></tr>
                        }
    
    
                    </tbody>
    
                </table>
            </div>


            <div className='table-add-div text-center'>
                <Link to={'add'}>
                    <button className='text-center mt-3 table-add-button bg-primary button-66 '>add new task</button>

                </Link>
            </div>
        </div>
    )
}

export default TableC