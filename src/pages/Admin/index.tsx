import React, { useContext } from 'react'
import Login from './comps/Login';
import { AuthContext } from '../../hooks';
import BlogForm from './comps/BlogForm';

export default function Admin() {
  const {isLoggedIn}=useContext(AuthContext)
  return (
    <div>
     {
         isLoggedIn ? <BlogForm/> : <Login/>
     }
    </div>
  )
}
