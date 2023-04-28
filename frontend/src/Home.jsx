import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [adminCount, setAdminCount] = useState(0)
  const [userCount, setUserCount] = useState(0)
  useEffect(() => {
    axios.get('http://localhost:5000/api/adminCount')
      .then(res => {
        setAdminCount(res.data.count)
      }).catch(err => console.log(err));

    axios.get('http://localhost:5000/api/userCount')
      .then(res => {
        setUserCount(res.data.count)
      }).catch(err => console.log(err));

  }, [])
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {adminCount}
            </h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>User</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {userCount}</h5>
          </div>
        </div>
      </div>

      <div className='mt-4 px-5 pt-3'>
        <h3>###</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>#</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#</td>
              <td>#</td>
              <td>
                #
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home