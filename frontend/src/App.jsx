import React from 'react'
import LogIn from './LogIn'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import User from './User'
import Profile from './Profile'
import Home from './Home'
import AddUser from './AddUser'
import EditUser from './EditUser'
import Start from './Start'
import UserDashboard from './UserDashboard'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}>
        <Route path='' element={<Home />}></Route>
        <Route path='/user' element={<User />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/create' element={<AddUser />}></Route>
        <Route path='/userEdit/:id' element={<EditUser />}></Route>
      </Route>
      <Route path='/login' element={<LogIn />}></Route>
      <Route path='/start' element={<Start />}></Route>
      <Route path='/UserDashboard/:id' element={<UserDashboard />}>
      <Route path='' element={<Profile />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
