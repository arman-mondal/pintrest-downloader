import React from 'react'
import { API_URL } from '../../config/api';
import { Loader2Icon } from 'lucide-react';
import { Image } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Footer from '../Admin/comps/Footer';

export default function BlogDetail() {
    const {id}=useParams();
    console.log(id)
    const [blogs,setBlogs]=React.useState<any>({})
    const [loading,setLoading]=React.useState(false)
  React.useEffect(()=>{
    setLoading(true)
    fetch(API_URL+'posts/'+id)
    .then(res=>res.json())
    .then(data=>{
      setBlogs(data)
      console.log(data)
      setLoading(false)
    })
    .catch(err=>{
      console.log(err)
      setLoading(false)
    }
    )
  }
  ,[id])
  return (
   <>
   <div className='w-full h-screen bg-[rgba(0,0,0,0.5)] top-0 z-50 fixed flex justify-center items-center' style={{display:loading?'flex':'none'}}>
    <div className='bg-white p-5 rounded-lg'>
      <Loader2Icon size={40} className=' animate-spin'/>
    
    </div>
    </div>
    <NavBar/>
  {blogs?   <div className='w-full h-max flex justify-center' >
    <div className='w-[50%] flex flex-col gap-4'>
    <Image src={blogs?.banner} alt={blogs?.title}  className='' />
    <h1 className='text-3xl font-semibold'>{blogs?.title}</h1>
    <div dangerouslySetInnerHTML={{__html:blogs?.content}} className='text-lg mt-4'></div>


    </div>

    </div>
    : 
    <div className='w-full h-screen bg-[rgba(0,0,0,0.5)] top-0 z-50 fixed flex justify-center items-center' style={{display:loading?'flex':'none'}}>
    <div className='bg-white p-5 rounded-lg'>
      <Loader2Icon size={40} className=' animate-spin'/>
    
    </div>
    </div>
    
    }
      <Footer/>

   </>
  )
}
