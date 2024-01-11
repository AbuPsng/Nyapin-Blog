import Template from "../components/Template"
import BlogContainer from "../components/BlogContainer"
import { useEffect, useState } from "react"
import { IoFilterSharp } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";


import axios from "axios"
import { Link } from "react-router-dom";

const BlogListsPage = () => {

    const [search, setSearch] = useState("")
    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getAllBlogs = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get("/blogs")
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

    const handleDelete = async (blogId) => {
        try {
            const response = await axios.delete(`/blogs/${blogId}`)
            const data = response.data
            console.log(response, "response")
            console.log(data, "data")
            getAllBlogs()
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Template>
            <main className="w-full flex flex-wrap gap justify-center items-center py-24">
                <form className="flex gap-x-6 w-full justify-center pb-16" >
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="w-2/3 border-2 border-solid border-teal-600 rounded-full focus:outline-teal-400 px-3" />
                    <button className="font-semibold bg-teal-400 rounded-md md:py-2 md:px-8 ">Search</button>
                    <div className="h-full flex gap-x-1">
                        <button className="font-semibold bg-teal-400 rounded-md h-full py-3 md:px-3 "><IoFilterSharp />
                        </button>
                        <Link to="/create_blog">
                            <button className="font-semibold  bg-teal-400 rounded-md h-full py-3 md:px-3"><IoAddOutline />
                            </button>
                        </Link>
                    </div>
                </form>
                {
                    isLoading ? <p className="text-3xl text-teal-500">Loading....</p>
                        :
                        <div className="flex w-full gap-x-10 gap-y-6 justify-start items-start flex-wrap">
                            {
                                blogs?.map(blog => (
                                    <div key={blog._id} className="w-1/4">
                                        < BlogContainer blog={blog} handleDelete={handleDelete} />
                                    </div>
                                ))
                            }
                        </div>
                }


            </main>
        </Template >
    )
}

export default BlogListsPage
