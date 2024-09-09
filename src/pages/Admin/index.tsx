import React, { useContext } from 'react'
import Login from './comps/Login';
import { AuthContext } from '../../hooks';
import BlogForm from './comps/BlogForm';
import AdminUi from './UI';

export default function Admin() {
  const {isLoggedIn}=useContext(AuthContext)
  return (
    <div>
     {
         isLoggedIn ? <AdminUi/> : <Login/>
     }
    </div>
  )
}
