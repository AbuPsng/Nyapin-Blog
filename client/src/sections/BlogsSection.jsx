import { useEffect, useState } from 'react'
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
            <div className='flex gap-x-3 gap-y-6 justify-center w-full items-start flex-wrap md:justify-start'>
                {isLoading ? <p className='text-2xl text-teal-500'>Loading....</p>
                    :
                    blogs?.map(blog => (
                        <div key={blog._id} className='w-[30]'>
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
