import { Card } from '@chakra-ui/react'
import React from 'react'

export default function Dashboard() {
  return (
    <div className='w-full flex flex-row  justify-start'>
       <Card className='w-1/4 h-1/4 m-4 min-h-[200px] px-6 py-6 gap-4'>
            <h1 className='font-bold text-2xl' style={{
                
            }}>Total Blogs</h1> 
            <h1 className='text-4xl'>{10}</h1>
         </Card>

    </div>
  )
}
