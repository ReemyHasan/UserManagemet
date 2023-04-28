import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Style.css'
function UserDashboard() {
	const navigate = useNavigate()
	axios.defaults.withCredentials = true;
	const handleLogout = () => {
		axios.get('http://localhost:5000/api/logout')
			.then(res => {
				navigate('/start')
			}).catch(err => console.log(err));
	}
	return (
		<div className="container-fluid" >
			<div className="row flex-nowrap" id='background'>
				<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark" id='nav'>
					<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
						<a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
							<span className="fs-5 fw-bolder d-none d-sm-inline">User Dashboard</span>
						</a>
						<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
							
							<li>
								<Link to="" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Profile</span></Link>
							</li>
							<li onClick={handleLogout}
							>
								<Link to="/login" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="col p-0 m-0">
					<div className='p-2 d-flex justify-content-center shadow'>
						<h4>User Management System</h4>
					</div>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default UserDashboard