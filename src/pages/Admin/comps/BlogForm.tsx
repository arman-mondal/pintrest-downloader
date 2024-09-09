import React from 'react'
import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'
import axios from 'axios'
import { API_URL } from '../../../config/api'
export default function BlogForm() {
    const [title,setTitle]=React.useState('')
    const [content,setContent]=React.useState('')
   const data={
         title,
         content
   }
    const handlePost=async()=>{
        try {
            const response=await axios.post(API_URL+'create-post',data,{
                headers:{
                    Authorization:'Bearer '+sessionStorage.getItem('token')
                }
            });

            if(response.status===200){
                alert('Blog Post Created')
            }
            else{
                alert('Error')
            }

            
        } catch (error) {

            alert('Error')

        }
    }
  return (
    <>
    <Box minH={'100vh'} minW={'100%'} pos={'absolute'} top={0} bgColor={'rgba(0,0,0,0.5)'} display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
        <Box minW={'100vh'} rounded={'xl'} bgColor={'white'} p={10} >
            <FormControl>
                <FormLabel>Blog Title</FormLabel>
                <Input value={title} onChange={(e)=>setTitle(e.target.value)} type={'text'} />

            </FormControl>
            <FormControl>
                <FormLabel>Blog Content</FormLabel>
                <Textarea value={content} onChange={(e)=>setContent(e.target.value)}  />

            </FormControl>
            <FormControl mt={5}>
            <Button minW={'100%'} onClick={handlePost} colorScheme={'blue'}>Submit</Button>

            </FormControl>

        </Box>

    </Box>
    </>
  )
}
