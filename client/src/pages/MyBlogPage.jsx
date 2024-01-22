import { useEffect, useState } from 'react'
import Template from '../components/Template'
import axios from 'axios'
import BlogContainer from "../components/BlogContainer"
import { useBlog } from '../utils/useBlogs'
import { Link } from 'react-router-dom'

const MyBlogPage = () => {

    const [myBlogs, setMyBlogs] = useState([])

    const { handleDeleteBlog } = useBlog()

    const handleMyBlogs = async () => {
        try {
            const response = await axios.get("/blogs/my_blogs", { withCredentials: true })
            const data = response.data.data
            console.log(response.data)
            setMyBlogs(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        handleMyBlogs()
    }, [])

    return (
        <Template>
            <section className='min-h-screen flex flex-col py-16 w-full gap-y-10'>
                <h1 className='text-4xl text-center'>My Blogs</h1>
                <main className="flex w-full gap-x-8 gap-y-6 justify-center items-start flex-wrap">
                    <div className="flex w-full gap-x-10 gap-y-6 justify-center items-start flex-wrap">
                        {
                            myBlogs.length > 0 ? myBlogs.map(blog => (
                                <div key={blog._id} className="w-full md:w-5/12 lg:w-1/4">
                                    < BlogContainer blog={blog} handleDelete={handleDeleteBlog} />
                                </div>
                            )) :
                                <div className='flex w-full bg-teal-200 py-20 flex-col gap-y-3 text-center '>
                                    <h1 className="text-3xl">You don't have any blog  </h1>
                                    <Link to="/create_blog">
                                        <span className='underline under underline-offset-2 text-blue-700'> Want to create Blogs??</span>
                                    </Link>
                                </div>
                        }
                    </div>
                </main>
            </section>
        </Template>
    )
}

export default MyBlogPage
