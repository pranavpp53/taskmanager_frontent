import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editEmpl, getSingleEmployees, registerEmployee } from '../service/allapi';
import './add.css'
import { useNavigate, useParams } from 'react-router-dom';
import { editContext, registerContext } from './Contextshare';
import Alert from 'react-bootstrap/Alert';
import BASE_URL from '../service/baseurl';



function Edit() {

  const {editData,setEditData}=useContext(editContext)

    //to store data
    const [userData, setUser] = useState({
      fname: "",
      lname: "",
      email: "",
      phn: "",
      mobile: "",
      gender: "",
      status: "",
      location: ""
    })

  //state to store api response error message
  const [errorMessage,setErrorMessage]=useState("")

  //object for useNavigate
  const navigate = useNavigate()

  //store param id
  const {id}=useParams()



  //get details of the user
  const getUser=async()=>{
    const {data}=await getSingleEmployees(id)
    setUser(data)
    console.log(data);
  }



  
  //state to hold image file
  const [image, setImage] = useState('')

  //function to set image
  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  const handleEdit= async (e) => {
    e.preventDefault()
    const { fname, lname, email, phn, mobile, gender, status, location } = userData

    if (fname == '') {
      toast.error('First name required')
    }
    else if (lname == '') {
      toast.error('Last name required')
    }
    else if (email == '') {
      toast.error('Email required')
    }
    else if (phn == '') {
      toast.error('Phone Number 1 required')
    }
    else if (mobile == '') {
      toast.error('Phone Number 2 required')
    }
    else if (gender == '') {
      toast.error('Choose one gender')
    }
    else if (status == '') {
      toast.error('Employee status required')
    }
    else if (location == '') {
      toast.error('Employee location required')
    }
    else if (image == '') {
      toast.error('Profile Image required')
    }
    else {
      // toast.success("Registration success")

      //!API Call

      //? Headers Data ( the api contain file type data in body )
      const headerConfig = {
        "Content-Type": "multipart/form-data"
      }

      //? Body data as form data

      const data = new FormData()

      //? Add data to formdata object

      data.append('user_profile', image)
      data.append('fname', fname)
      data.append('lname', lname)
      data.append('email', email)
      data.append('phn', phn)
      data.append('mobile', mobile)
      data.append('gender', gender)
      data.append('status', status)
      data.append('location', location)

      //? API Call

      const response = await editEmpl(id,data, headerConfig)
      if(response.status==200){

        setEditData(response.data)

      //redirect to home page
      navigate('/')
      }
      else{
        setErrorMessage(response.response.data)
      }


    

    }

  }

  //create a state to store preview image
  const [preview, setPreview] = useState('')

  //a function toupdate user data when user enter the input in html
  const userDetails = (e) => {

    //to prevent that event
    e.preventDefault()
    //access value to update in userData
    const value = e.target.value
    //access key to update in userData
    const key = e.target.name
    //update the new input data with existing data
    setUser({ ...userData, [key]: value })
  }
  // console.log(userData);




  useEffect(() => {
    getUser()
    if (image) {
      setPreview(URL.createObjectURL(image))
    }

  }, [image])


  return (
    <div>
      <div>
        {
          errorMessage ? <Alert className='w-50 container mt-2 text-center' variant={"danger"} 
          onClose={()=>setErrorMessage("")} dismissible>
           {errorMessage} 
          </Alert> : ""
        }

      </div>

      <div>
        <h1 className='text-center my-2'>Enter Employee Details</h1>
      </div>

      <div className='text-center h-25 w-25 text-center container'>
        <img className='rounded-circle h-25 w-25 button-67' style={{ backgroundSize: 'cover' }} src={preview ? preview : `${BASE_URL}/uploads/${userData.profile}`} alt="" />
      </div>

      <div className='add container  pt-5 d-flex gap-5'>

        <div className='w-50 child'>
          <label htmlFor="firstname">First Name</label>
          <input required name='fname' value={userData.fname} onChange={userDetails} className='form-control' type="text" id='firstname' /><br />

          <label htmlFor="email">Email Address</label>
          <input required name='email' value={userData.email} onChange={userDetails} className='form-control' type="email" id='email' /><br />

          <p>Gender</p>

          <div className="form-check">
            <input required name='gender' checked={userData.gender=="male"?true:false} onChange={userDetails} value={'male'} className="form-check-input" type="radio" id="flexRadioDefault1" />
            <label className="form-check-label" for="flexRadioDefault1">
              Male
            </label>
          </div>
          <div className="form-check">
            <input required name='gender' checked={userData.gender=="female"?true:false} onChange={userDetails} value={'female'} className="form-check-input" type="radio" id="flexRadioDefault2" />
            <label className="form-check-label" for="flexRadioDefault2">
              Female
            </label>
          </div>

          <div className="input-group my-3">
            <input onChange={setProfile} required type="file" class="form-control" id="inputGroupFile02" />
          </div>

        </div>

        <div className='w-50 child'>
          <label htmlFor="lastname">Last Name</label>
          <input required name='lname'  value={userData.lname}  onChange={userDetails} className='form-control' type="text" id='lastname' /><br />

          <label htmlFor="num">Mobile Number 1</label>
          <input required name='phn'  value={userData.phn}  onChange={userDetails} className='form-control' type="text" id='num' /><br />

          <label htmlFor="num">Mobile Number 2</label>
          <input required name='mobile'  value={userData.mobile}  onChange={userDetails} className='form-control' type="text" id='num' /><br />



          <div className="input-group my-3">
            <label className="input-group-text" for="inputGroupSelect01">Select Employee Status</label>
            <select value={userData.status} name='status' onChange={userDetails} className="form-select bg-light text-dark" id="inputGroupSelect01">
              <option value="inactive">Inactive</option>
              <option value="active">Active</option>
            </select>
          </div>


          <label htmlFor="loc">Employee Location</label>
          <input required name='location' value={userData.location} onChange={userDetails} className='form-control' type="text" id='loc' /><br />


        </div>

      </div>

      <div className='container text-center'>
        <button className='button-66 bg-primary mb-2' onClick={handleEdit}>Submit</button>
      </div>

      <ToastContainer position="top-center"></ToastContainer>
    </div>
  )
}

export default Edit