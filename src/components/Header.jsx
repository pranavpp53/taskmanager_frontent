import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <Link className='text-decoration-none' to={''}>
    <div class="container-fluid ">
      <a class="navbar-brand ms-5" href="#"><i class="fa-solid fa-users-line " ></i><span className='ms-3 '>EMS Application</span></a>
      
    </div>
  </Link>
</nav>
    </div>
  )
}

export default Header