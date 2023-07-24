import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleEmployees } from '../service/allapi'
import BASE_URL from '../service/baseurl'

function View() {

  //state to store user data
  const [user,setUser]=useState({})

  const {id}=useParams()

  const getUser=async()=>{
    const {data}=await getSingleEmployees(id)
    setUser(data);
  }


  useEffect(()=>{
    getUser()
  },[])
  return (
    <div>
      <h5 class="card-title text-center mt-4">Employee Details</h5>

      {
        user?
        <div class="card container mt-5 text-center" style={{ width: "40rem" }}>
        <img  src={`${BASE_URL}/uploads/${user.profile}`} class="card-img-top w-50 rounded-circle container mt-2 h-50" alt="..." />
        <div class="card-body">
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Full Name : <strong>{user.fname}</strong></li>
          <li class="list-group-item">Email Address : <strong>{user.email}</strong></li>
          <li class="list-group-item">Contact Number : <strong>{user.phn}</strong></li>
          <li class="list-group-item">Employee Status : <strong>{user.status}</strong> </li>

        </ul>

      </div>:''
      }
    </div>
  )
}

export default View