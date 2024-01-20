import { useEffect, useState } from 'react'
import Template from '../components/Template'
import axios from 'axios'
import BlogContainer from "../components/BlogContainer"
import { useBlog } from '../utils/useBlogs'

const MyBlogPage = () => {

    const [myBlogs, setMyBlogs] = useState([])

    const { handleDeleteBlog } = useBlog()

    const handleMyBlogs = async () => {
        try {
            const response = await axios.get("/blogs/my_blogs")
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
                            myBlogs?.map(blog => (
                                <div key={blog._id} className="w-full md:w-5/12 lg:w-1/4">
                                    < BlogContainer blog={blog} handleDelete={handleDeleteBlog} />
                                </div>
                            ))
                        }
                    </div>
                </main>
            </section>
        </Template>
    )
}

export default MyBlogPage
