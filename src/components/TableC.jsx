import React, { useState } from 'react'
import './tableC.css'
import BASE_URL from '../service/baseurl'
import Dropdown from 'react-bootstrap/Dropdown';

function TableC({ displayData,removeEmp}) {

    
    return (
        <div>
            <table class="table align-middle mb-0 bg-white  w-75 text-center container" style={{ border: 'grey 2px solid' }}>
                <thead class="bg-light">
                    <tr>
                        <th>No</th>
                        <th>profile</th>
                        <th>Full Name</th>
                        <th>email</th>
                        <th>mobile</th>
                        <th>status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        displayData.length>0?displayData.map(i=>(


                        <tr>
                            <td>
                                1
                            </td>
                            <td>
                                <img
                                    src={`${BASE_URL}/uploads/${i.profile}`}
                                    alt=""
                                    class="rounded-circle"
                                />
                            </td>
                            <td>
                                <strong>{i.fname} .  {i.lname}</strong>
                            </td>

                            <td>
                                <p class="fw-normal mb-1">{i.email}</p>
                            </td>
                            <td>
                                <span>{i.phn}</span>
                            </td>
                            <td>
                            <Dropdown.Toggle className='w-75' variant={i.status=='active'?"success":"danger"} id="dropdown-basic">
                                       {i.status}
                                    </Dropdown.Toggle>
                            </td>
                            <td>
                                <div class="dropdown-center text-center">
                                    <button class="btn border-0 dropdown-toggle m-0 p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Select
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href={`view/${i._id}`}>View</a></li>
                                        <li><a class="dropdown-item" href={`edit/${i._id}`}>Edit</a></li>
                                        <li><a class="dropdown-item" onClick={(e)=>removeEmp(i._id)}>Delete</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        )): <h1>no employees present</h1>
                    }




                </tbody>
            </table>
        </div>
    )
}

export default TableC