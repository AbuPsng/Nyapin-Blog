import React, { useEffect, useState } from 'react'
import axios from "axios"
import BlogContainer from '../components/BlogContainer'

const BlogsSection = () => {

    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getAllBlogs = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs/`)
            console.log(response.data.data)
            const { data } = response.data
            setBlogs(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }

    }

    useEffect(() => {
        getAllBlogs()
    }, [])
    console.log(blogs?.[0]?.title)
    return (
        <main className='flex flex-col gap-y-8'>
            <h2 className='text-2xl font-semibold tracking-wider text-center'>Blogs</h2>
            <div className='flex gap-x-10 gap-y-6 justify-start items-start flex-wrap'>
                {
                    blogs?.map(blog => (
                        <div key={blog._id} className='w-1/3'>
                            <BlogContainer blog={blog} />
                        </div>
                    )
                    )
                }
            </div>
        </main>
    )
}

export default BlogsSection
