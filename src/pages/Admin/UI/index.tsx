import React from 'react'
import logo from '../../../logo.svg'
import { LayoutDashboard, LucideNewspaper, Newspaper } from 'lucide-react';
import Dashboard from '../Pages/Dashboard';
import CreateBlog from '../Pages/CreateBlog';
import BlogList from '../Pages/BlogList';
type state='home'|'create-blog'|'blog-list';
export default function AdminUi() {
    const [state,setstate]=React.useState('home')
  return (
    <div className='min-h-[100vh] max-h-[100vh] overflow-hidden'>
        <nav className="bg-[#f7f7f8] h-screen fixed top-0 left-0 min-w-[250px] py-6 px-4 font-[sans-serif]">
      <div className="relative">
        <a href="javascript:void(0)"><img src={logo} alt="logo" className='w-[160px]' />
        </a>

       
      </div>

      <div className="overflow-auto py-6 h-full mt-4">
        <ul className="space-y-1">
          <li>
            <a 
            onClick={()=>setstate('home')}
              className={state==='home'? " text-blue-600 text-[15px] cursor-pointer flex items-center gap-4 bg-white rounded px-4 py-3 transition-all" : "text-black cursor-pointer hover:text-blue-600 text-[15px] flex items-center gap-4 hover:bg-white rounded px-4 py-3 transition-all"}>
             <LayoutDashboard/>
              <span>Dashboard</span>
            </a>
          </li>
         
         
        
          <li>
            <a 
            onClick={()=>setstate('create-blog')}
              className={state==='create-blog'? " text-blue-600 text-[15px] flex items-center gap-4 bg-white cursor-pointer rounded px-4 py-3 transition-all" : "text-black cursor-pointer hover:text-blue-600 text-[15px] flex items-center gap-4 hover:bg-white rounded px-4 py-3 transition-all"}>
              <LucideNewspaper/>
              <span>Create Blogs</span>
            </a>
          </li>
          
          <li>
            <a 
            onClick={()=>setstate('blog-list')}
              className={state==='blog-list'? " text-blue-600 text-[15px] flex items-center gap-4 bg-white rounded px-4 py-3 cursor-pointer transition-all" : "text-black cursor-pointer hover:text-blue-600 text-[15px] flex items-center gap-4 hover:bg-white rounded px-4 py-3 transition-all"}>
              <Newspaper/>
              <span>Blog List</span>
            </a>
          </li>
         
          <li>
            <a 
            onClick={()=>{
                sessionStorage.removeItem('token')
                window.location.href='/'
            }}
              className="text-black cursor-pointer hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-4"
                viewBox="0 0 6.35 6.35">
                <path
                  d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                  data-original="#000000" />
              </svg>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div className='w-full ml-[250px]'>
    {state==='home' && <Dashboard/>}
    {state==='create-blog' && <CreateBlog/>}
    {state==='blog-list' && <BlogList/>}
    </div>

      
    </div>
  )
}
