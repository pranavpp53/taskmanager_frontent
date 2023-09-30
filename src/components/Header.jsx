import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='w-100'>
      <nav class="navbar navbar-expand-lg Header-button-66 w-100 bg-primary" data-bs-theme="dark">
  <Link className='text-decoration-none' to={''}>
    <div class="container-fluid ">
      <a class="navbar-brand ms-5" href="#"><i class="fa-solid fa-list-check" ></i><span className='ms-3 '>Task manager</span></a>
      
    </div>
  </Link>
</nav>
    </div>
  )
}

export default Header