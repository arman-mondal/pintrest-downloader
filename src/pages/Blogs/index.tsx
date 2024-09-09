import React from 'react'
import NavBar from '../../components/NavBar'
import bg from '../assets/bg.svg'
import { Loader2Icon } from 'lucide-react'
import axios from 'axios'
import { API_URL } from '../../config/api'
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
    fetch('http://localhost:3004/posts')
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
  

  return (
   <>
   <div className='w-full h-screen bg-[rgba(0,0,0,0.5)] top-0 z-50 fixed flex justify-center items-center' style={{display:loading?'flex':'none'}}>
    <div className='bg-white p-5 rounded-lg'>
      <Loader2Icon size={40} className=' animate-spin'/>
    
    </div>
    </div>
    <div className='min-h-screen w-full ' >
        <NavBar/>
        <section className="py-24 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-16">Our latest  blog</h2>
          <div className="flex justify-center  gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
            {
              blogs.map((blog:any,index)=>{
                return(
                  <div key={index} className="max-w-md w-full lg:w-[30%] bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="px-6 py-4">
                    <h3 className="font-manrope text-2xl font-bold text-gray-900 mb-2">{blog?.title}</h3>
                    <p className="text-gray-700 text-base">{blog?.content}</p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <a href="#" className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Read More</a>
                  </div>
                </div>
                )


            }
            )
            }
            </div>
        </div>
    </section>
                                            
    </div>
   </>
  )
}
