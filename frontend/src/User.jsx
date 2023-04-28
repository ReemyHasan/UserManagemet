import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function User() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        if (res.data.Status === "Success") {
          setData(res.data.users);
        } else {
          alert("Error")
        }
      })
      .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:5000/api/users/' + id)
      .then(res => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Error")
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>User List</h3>
      </div>
      <Link to="/create" className='btn btn-success'>Add User</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => {
              
              return <tr key={index}>
                <td>
                  {user.userName}
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.role}
                </td>

                <td>
                  <Link to={`/userEdit/` + user._id} className='btn btn-primary btn-sm me-2'>edit</Link>
                  <button className='btn btn-sm btn-danger'
                    onClick={e => handleDelete(user._id)}>delete</button>
                </td>
              </tr>
            })}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User