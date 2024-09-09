import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React,{ChangeEvent} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { API_URL } from '../../../config/api';
import axios from 'axios';
import { InputFiles } from 'typescript';

export default function CreateBlog() {
    const [value, setValue] = React.useState('');
    const [imgUrl, setImgUrl] = React.useState('');
    const [title, setTitle] = React.useState('');
    const handleUpload = async (e:any) => {
        try {
            const file=e.target.files[0];

            const body=new FormData()
            body.append('image',file);

            const res=await axios.post(API_URL+'upload',body)
            if(res.status===200){
                console.log(res.data)
                setImgUrl(res.data.imageUrl)
            }
            else{
                alert('Error')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-[100%] min-h-[100vh] flex justify-start px-4 py-4 overflow-y-scroll'>
       <div className='w-full max-w-[70%] bg-white p-4 gap-2 flex flex-col rounded-lg shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)]'>
       <FormControl className='w-full h-max'>
           <FormLabel className='w-full h-max'>Title</FormLabel>
           <Input onChange={
            (e:ChangeEvent<HTMLInputElement>)=>{
                setTitle(e.target.value)
            }
              } 
              value={title} className='w-full h-max' type='text' />

        </FormControl>
        <FormControl className='w-full h-max'>
           <FormLabel className='w-full h-max'>Content</FormLabel>
           <ReactQuill theme="snow" value={value} onChange={setValue} />

        </FormControl>
        <FormControl className='w-full h-max'>
            <FormLabel className='w-full h-max'>Upload Banner</FormLabel>
            <Input id='imgUpload' className='w-full h-max' onChange={handleUpload} type='file' hidden   />
            <Button onClick={()=>{
                document.getElementById('imgUpload')?.click()
                
            }} colorScheme='gray'>{imgUrl==='' ? 'Upload' : 'Uploaded'}</Button>
        </FormControl>
        <FormControl className='w-full h-max'>
            <Button onClick={()=>{
                if(title==='' || value==='' || imgUrl===''){
                    alert('All fields are required')
                    console.log(title,value,imgUrl)
                }
                else{
                    const data={
                        title,
                        content:value,
                        banner:imgUrl
                    }
                    axios.post(API_URL+'create-post',data,{
                        headers:{
                            Authorization:'Bearer '+sessionStorage.getItem('token')
                        }
                    })
                    .then(res=>{
                        if(res.status===200){
                            alert('Blog Post Created')
                        }
                        else{
                            alert('Error')
                        }
                    })
                    .catch(err=>{
                        alert('Error')
                    })
                }
            }} colorScheme='blue' className='w-full h-max'>Submit</Button>
        </FormControl>

        </div>

        
      
    </div>
  )
}
