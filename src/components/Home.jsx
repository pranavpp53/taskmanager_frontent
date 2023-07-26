import React, { useContext, useEffect, useState } from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import TableC from './TableC'
import Loading from './Loading'
import { deleteContext, editContext, registerContext } from './Contextshare';
import Alert from 'react-bootstrap/Alert';
import { deleteEmp, getEmployees } from '../service/allapi'

function Home() {


  const deleteEmployee = async (id) => {
    const res = await deleteEmp(id)
    if (res.status == 200) {
      setDeleteData(res.data)
      getEmployeeCall()
    }
  }
  //edit context
  const { editData, setEditData } = useContext(editContext)


  //store all employee data
  const [allEmployee, setAllEmployee] = useState([])

  //state to store searching data
  const [searchKey, setSearchKey] = useState("")

  //define a function to call all employee data api
  const getEmployeeCall = async () => {
    const response = await getEmployees(searchKey)
    setAllEmployee(response.data);
    // console.log(allEmployee);
  }

  //to get context
  const { registerData, setRegisterData } = useContext(registerContext)

  //get delete context
  const { deleteData, setDeleteData } = useContext(deleteContext)


  const [showspin, setspin] = useState(true)

  useEffect(() => {
    getEmployeeCall()
    setTimeout(() => {
      setspin(false)
    }, 2000)


  }, [searchKey])
  return (
    <div>

      <div>
        {
          registerData ? <Alert className='w-50 container mt-2 text-center' variant={"success"}
            onClose={() => setRegisterData("")} dismissible>
            {registerData.fname} is succussfully registered
          </Alert> : ""
        }
        {
          deleteData ? <Alert className='w-50 container mt-2 text-center' variant={"danger"}
            onClose={() => setDeleteData("")} dismissible>
            {deleteData.fname} is deleted ....
          </Alert> : ""
        }
        {
          editData ? <Alert className='w-50 container mt-2 text-center' variant={"success"}
            onClose={() => setEditData("")} dismissible>
            {editData} your data edited successfully ....
          </Alert> : ""
        }

      </div>

      <div className='w-75 container '>
        <form class="d-flex mt-5  ">
          <input onChange={e => setSearchKey(e.target.value)}
            class="form-control me-sm-2 w-25 " type="search" placeholder="Search" />
          <button class="btn btn-primary my-2 my-sm-0 h-25" type="submit" fdprocessedid="xetxow">Search</button>
          <Link className='text-decoration-none h-25 ms-auto ' to={'add'}>
            <button class="btn btn-primary h-25 ms-auto " ><i class="fa-solid fa-user-plus "></i>  Add</button>

          </Link>
        </form>
      </div>
      {showspin ?
        <Loading></Loading>
        :


        <div>
          <h1 className='mt-5  w-75 textStyle  container'>List of employees</h1>

          <TableC displayData={allEmployee} removeEmp={deleteEmployee}></TableC>
        </div>}

    </div>
  )
}

export default Home