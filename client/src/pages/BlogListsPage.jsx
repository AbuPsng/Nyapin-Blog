import Template from "../components/Template"
import BlogContainer from "../components/BlogContainer"
import { useEffect, useState } from "react"
import { IoFilterSharp } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import axios from "axios"
import { Link } from "react-router-dom";
import ShowModel from '../components/ShowModel'

const BlogListsPage = () => {

    const [search, setSearch] = useState("")
    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(false)

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
                    <button className="font-semibold hover:bg-teal-200 bg-teal-300 rounded-md md:py-2 md:px-8 ">Search</button>
                    <div className="h-full flex gap-x-1">
                        <button className="font-semibold hover:bg-teal-200 bg-teal-300 rounded-md h-full py-3 md:px-3 "><IoFilterSharp />
                        </button>
                        <Link to="/create_blog">
                            <button className="font-semibold hover:bg-teal-200 bg-teal-300 rounded-md h-full py-3 md:px-3"><IoAddOutline />
                            </button>
                        </Link>
                    </div>
                </form>
                {
                    isLoading ? <ShowModel message="Loading.." />
                        :
                        <div className="flex w-full gap-x-10 gap-y-6 justify-center items-start flex-wrap">
                            {
                                blogs?.map(blog => (
                                    <Link key={blog._id} to={blog._id} className="w-full md:w-5/12 lg:w-1/4">
                                        < BlogContainer blog={blog} handleDelete={handleDelete} />
                                    </Link>
                                ))
                            }
                        </div>
                }
            </main>
        </Template >
    )
}

export default BlogListsPage
