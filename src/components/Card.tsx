import React from 'react'

export default function Card({totalBlogs}:{totalBlogs?:number}) {
  return (
  <div
    className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
    <div className="p-6">
      <h3 className="text-lg font-semibold">Total Blogs</h3>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed">{totalBlogs ?? 0}</p>
      
    </div>
  </div>
  )
}
