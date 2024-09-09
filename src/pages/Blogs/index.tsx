import React from 'react'
import NavBar from '../../components/NavBar'
import bg from '../assets/bg.svg'
import { Loader2Icon } from 'lucide-react'
import axios from 'axios'
import { API_URL } from '../../config/api'
import Footer from '../Admin/comps/Footer'
export default function Blogs() {
  const [url,setUrl]=React.useState('')
  const [loading,setLoading]=React.useState(false)
  const [download,setDownload]=React.useState('')
  const downloadVideo=async()=>{
    setLoading(true)
   try {
    await axios.post(API_URL+'video',{
      url:url
    })
    .then(res=>{
      setDownload(res.data.videoSrc)
      setLoading(false)
    }
    )
    .catch(err=>{
      console.log(err)
      setLoading(false)
    })

    
   } catch (error) {
      console.log(error)
      setLoading(false)
   }
   finally{
      setLoading(false)
   }
  }
  const downloadImage=async()=>{
    setLoading(true)
   try {
    await axios.post(API_URL,{
      url:url
    })
    .then(res=>{
      setDownload(res.data.imgSrc)
      setLoading(false)
    }
    )
    .catch(err=>{
      console.log(err)
      setLoading(false)
    })

    
   } catch (error) {
      console.log(error)
      setLoading(false)
   }
   finally{
      setLoading(false)
   }
  }
  const downloadGif=()=>{
    setLoading(true)
    fetch(`http://localhost:3002/downloadGif?url=${url}`)
    .then(res=>res.json())
    .then(data=>{
      setDownload(data.url)
      setLoading(false)
    })
    .catch(err=>{
      console.log(err)
      setLoading(false)
    })
  }
  const downloadAll=()=>{
    setLoading(true)
    fetch(`http://localhost:3002/downloadAll?url=${url}`)
    .then(res=>res.json())
    .then(data=>{
      setDownload(data.url)
      setLoading(false)
    })
    .catch(err=>{
      console.log(err)
      setLoading(false)
    })
  }
  const [blogs,setBlogs]=React.useState([])
  React.useEffect(()=>{
    setLoading(true)
    fetch(API_URL+'posts')
    .then(res=>res.json())
    .then(data=>{
      setBlogs(data)
      setLoading(false)
    })
    .catch(err=>{
      console.log(err)
      setLoading(false)
    }
    )
  }
  ,[])
  const dateTimeFormat=(date:any)=>{
    const d=new Date(date)
    return d.toLocaleString()
  }

  return (
   <>
   <div className='w-full h-screen bg-[rgba(0,0,0,0.5)] top-0 z-50 fixed flex justify-center items-center' style={{display:loading?'flex':'none'}}>
    <div className='bg-white p-5 rounded-lg'>
      <Loader2Icon size={40} className=' animate-spin'/>
    
    </div>
    </div>
    <div className='min-h-screen w-full ' >
        <NavBar/>
        <div className="bg-gray-100 md:px-10 px-4 py-12 font-[sans-serif]">
      <div className="max-w-5xl max-lg:max-w-3xl max-sm:max-w-sm mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Latest Blog Posts</h2>
       {blogs.length> 0 ?  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-sm:gap-8">
         {blogs.map((blog:any,index)=>{
          return(
            <div className="bg-white rounded overflow-hidden" key={index}> 
            <img src={blog?.banner} alt="Blog Post 1" className="w-full h-52 object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">{blog?.title}</h3>
              <p className="text-orange-500 text-[13px] font-semibold mt-4">{dateTimeFormat(blog?.createdAt)}</p>
              <a href={"/blogs/"+blog?.id} className="mt-4 inline-block px-4 py-2 rounded tracking-wider bg-orange-500 hover:bg-orange-600 text-white text-[13px]">Read More</a>
            </div>
          </div>
          )
        })}
          
         
          </div>
        :
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-gray-500 text-lg">No blogs found</p>
        </div>

        }
      </div>
    </div>
    <Footer/>
                             
    </div>
   </>
  )
}
