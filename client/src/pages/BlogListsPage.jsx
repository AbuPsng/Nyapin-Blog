import Template from "../components/Template"
import BlogContainer from "../components/BlogContainer"
import { useState } from "react"
import { IoFilterSharp } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ShowModel from '../components/ShowModel'
import { useBlog } from "../utils/useBlogs";
import Filter from "../components/Filter";
import axios from "axios";

const BlogListsPage = () => {

    const [searchTerm, setSearchTerm] = useState("")
    const [searchBlogs, setSearchBlogs] = useState([])
    const [sortBy, setSortBy] = useState(false)

    const { blogs, isLoading, handleDeleteBlog } = useBlog()

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            setSearchBlogs([])
            const response = await axios.get(`/blogs/search/?searchTerm=${searchTerm}`)
            const data = response.data.data
            setSearchBlogs(data)
            setSearchTerm("")
        } catch (error) {
            console.log(error)
        }
    }

    const handleSort = async (sortBy, order) => {
        try {
            setSearchBlogs([])
            const response = await axios.get(`/blogs/sorted/?sortBy=${sortBy}&order=${order}`)
            const data = response.data.data
            setSearchBlogs(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Template>
            <main className="w-full flex flex-wrap gap justify-center items-center py-24">
                <div className="flex flex-col items-end w-full gap-y-4 justify-start md:justify-center md:items-center pb-10 md:pb-16 md:flex-row">
                    <form className="flex px-3 gap-x-2 md:gap-x-6  w-full  md:w-10/12" >
                        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-4/5  border-2 border-solid border-teal-600 rounded-full focus:outline-teal-400 px-3" />
                        <button type="submit" onClick={handleSearch} className="font-semibold hover:bg-teal-200 bg-teal-300   rounded-md py-2 px-4 ">Search</button>
                    </form>
                    <div className="h-full px-3 flex justify-end md:justify-start gap-x-3 relative">
                        <Link to="/create_blog">
                            <button className="font-semibold hover:bg-teal-200 bg-teal-300 rounded-md h-full py-3 px-3"><IoAddOutline />
                            </button>
                        </Link>
                        <button type="button" onClick={() => setSortBy(!sortBy)} className="font-semibold hover:bg-teal-200 bg-teal-300 rounded-md h-full py-3 px-3 "><IoFilterSharp />
                        </button>
                        {
                            sortBy &&
                            <div className="absolute z-10 right-0 top-10 py-4" >
                                <Filter handleSort={handleSort} />
                            </div>
                        }
                    </div>
                </div>
                {
                    isLoading ? <ShowModel message="Loading.." />
                        :
                        <div className="flex w-full gap-x-10 gap-y-6 justify-center items-start flex-wrap">
                            {
                                searchBlogs.length > 0 ? searchBlogs?.map(blog => (
                                    <div key={blog._id} className="w-full md:w-5/12 lg:w-1/4">
                                        < BlogContainer blog={blog} handleDelete={handleDeleteBlog} />
                                    </div>))
                                    :
                                    blogs?.map(blog => (
                                        <div key={blog._id} className="w-full md:w-5/12 lg:w-1/4">
                                            < BlogContainer blog={blog} handleDelete={handleDeleteBlog} />
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
