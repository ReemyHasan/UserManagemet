import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {
    const [data, setData] = useState({
        userName: '',
        email: '',
        password: '',
        role: ''
    })
    const navigate = useNavigate()

    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:5000/api/users/' + id)
            .then(res => {
                setData({
                    ...data, userName: res.data.user.userName,
                    email: res.data.user.email,
                    password: res.data.user.password,
                    role: res.data.user.role,
                })
            })
            .catch(err => console.log(err));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/register/' + id, data)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/user')
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Edit User</h2>
            <form className="row g-3 w-50" onSubmit={handleSubmit}
            >
                <div className="col-12">
                    <label for="inputName" className="form-label">UserName</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        placeholder='Enter Name'
                        autoComplete='off'
                        value={data.userName}
                        onChange={e => setData({ ...data, userName: e.target.value })} />
                </div>
                <div className="col-12">
                    <label for="inputEmail4" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        placeholder='Enter Email'
                        autoComplete='off'
                        value={data.email}
                        onChange={e => setData({ ...data, email: e.target.value })} />
                </div>
                <div className="col-12">
                    <label for="inputPassword4" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                        placeholder='Enter Password'
                        value={data.password}
                        onChange={e => setData({ ...data, password: e.target.value })} />
                </div>
                <div className="col-12">
                    <label for="inputPassword4" className="form-label">Role</label>
                    <select
                        id="Roles"
                        className="form-select"
                        aria-label="Default select example"
                        name="roles"
                        placeholder='role'
                        value={data.role}
                        onChange={e =>
                            setData({ ...data, role: e.target.value })
                        }>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    )
}


export default EditUser