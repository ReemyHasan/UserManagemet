import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddUser() {
    const [data, setData] = useState({
        userName: '',
        email: '',
        password: '',
        role: 'user'
    })
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/register', data)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate('/user');
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add User</h2>
            <form className="row g-3 w-50" onSubmit={handleSubmit}
            >
                <div className="col-12">
                    <label htmlFor="inputName" className="form-label">UserName</label>
                    <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                        onChange={e => setData({ ...data, userName: e.target.value })} />
                </div>
                <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
                        onChange={e => setData({ ...data, email: e.target.value })} />
                </div>
                <div className="col-12">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword4" placeholder='Enter Password'
                        onChange={e => setData({ ...data, password: e.target.value })} />
                </div>
                <div className="col-12">
                    <label htmlFor="inputPassword4" className="form-label">Role</label>
                    <select id="Roles" className="form-select" aria-label="Default select example" name="roles" placeholder='role'
                        onChange={e =>
                            setData({ ...data, role: e.target.value })
                        }>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>

    )
}


export default AddUser