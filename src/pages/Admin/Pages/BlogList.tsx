import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Button,
    Stack,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    FormControl,
    FormLabel,
    Input
  } from '@chakra-ui/react';
  import React, { useEffect } from 'react'
import { API_URL } from '../../../config/api'
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function BlogList() {
    const [blogs,setBlogs]=React.useState([])
    const [selectedBlog,setSelectedBlog]=React.useState<any>({}) ;
    const [isModalOpen,setIsModalOpen]=React.useState(false);
    const fetchBlogs=async()=>{
        fetch(API_URL+'posts')
        .then(res=>res.json())
        .then(data=>{
            setBlogs(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
       fetchBlogs()
    }
    ,[])

  return (
   
   <>
    <Modal isOpen={isModalOpen} onClose={   ()=>{
                    setIsModalOpen(false)
                }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
                <FormLabel>Title</FormLabel>
                <Input type='text'
                onChange={(e)=>{
                    setSelectedBlog({...selectedBlog,title:e.target.value})
                }
                }
                value={selectedBlog.title} />
            </FormControl>
            <FormControl>
                <FormLabel>Content</FormLabel>
                <ReactQuill
                onChange={(value)=>{
                    setSelectedBlog({...selectedBlog,content:value})
                }
                }
                value={selectedBlog.content} />
            </FormControl>
        

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={
                ()=>{
                    setIsModalOpen(false)
                }
            }>
              Close
            </Button>
            <Button colorScheme='blue' onClick={async()=>{
                    const response=await axios.put(API_URL+'posts/'+selectedBlog.id,selectedBlog,{
                        headers:{
                            Authorization:'Bearer '+sessionStorage.getItem('token')
                        }
                    })
                    if(response.status===200){
                        Swal.fire('Updated','Post Updated','success'
                        )
                        fetchBlogs()

                        setIsModalOpen(false)
                    }
                    else{
                        Swal.fire('Error','Post Not Updated','error')
                    }
                }
                }>Update</Button>
                          </ModalFooter>
        </ModalContent>
      </Modal>



<Box className='w-[100vh]  h-max p-4 overflow-auto'>
<TableContainer>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>Title</Th>
        <Th>Creation Date</Th>
        <Th >Action</Th>

      </Tr>
    </Thead>
    <Tbody>
        {
            blogs.map((blog:any,index)=>{
                return(
                    <Tr key={blog.id}>
                    <Td>{blog.id}</Td>
                    <Td>{blog.title}</Td>
                    <Td>{new Date(blog.createdAt).toDateString()}</Td>
                    <Td><Stack flexDir={'row'} display={'flex'}>
                    <Button colorScheme='red' onClick={async()=>{
                       Swal.fire({
                            title:'Are you sure?',
                            text:'You want to delete this post',
                            icon:'warning',
                            showCancelButton:true,
                            confirmButtonText:'Yes',
                            cancelButtonText:'No'
                          }).then(async(result)=>{
                            if(result.isConfirmed){
                                 const response=await axios.delete(API_URL+'posts/'+blog.id,{
                                    headers:{
                                        Authorization:'Bearer '+sessionStorage.getItem('token')
                                    }

                                 })
                                 if(response.status===200){
                                      Swal.fire('Deleted','Post Deleted','success')
                                      setBlogs(blogs.filter((b:any)=>b.id!==blog.id))
                                 }
                                 else{
                                      Swal.fire('Error','Post Not Deleted','error')
                                 }
                            }
                          })
                        




                    }}>Delete</Button>
                    <Button colorScheme='blue'
                    onClick={()=>{
                        setSelectedBlog(blog)
                        setIsModalOpen(true)
                    }
                    }
                    >Edit</Button>
                        </Stack></Td>
                  </Tr>
                )
            })
        }
    
    </Tbody>
  </Table>
</TableContainer>
</Box>
</>
  )
}
