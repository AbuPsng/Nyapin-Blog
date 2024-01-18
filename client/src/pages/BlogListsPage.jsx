import Template from "../components/Template"
import BlogContainer from "../components/BlogContainer"
import { useState } from "react"
import { IoFilterSharp } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ShowModel from '../components/ShowModel'
import { useBlog } from "../utils/useBlogs";
import Filter from "../components/Filter";

const BlogListsPage = () => {

    const [search, setSearch] = useState("")

    const [sortBy, setSortBy] = useState(false)

    const { blogs, isLoading, handleDeleteBlog } = useBlog()

    return (
        <Template>
            <main className="w-full flex flex-wrap gap justify-center items-center py-24">
                <form className="flex gap-x-6 w-full justify-center pb-16" >
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="w-2/3 border-2 border-solid border-teal-600 rounded-full focus:outline-teal-400 px-3" />
                    <button className="font-semibold hover:bg-teal-200 bg-teal-300 rounded-md md:py-2 md:px-8 ">Search</button>
                    <div className="h-full flex gap-x-1 relative">
                        <Link to="/create_blog">
                            <button className="font-semibold hover:bg-teal-200 bg-teal-300 rounded-md h-full py-3 md:px-3"><IoAddOutline />
                            </button>
                        </Link>
                        <button type="button" onClick={() => setSortBy(!sortBy)} className="font-semibold hover:bg-teal-200 bg-teal-300 rounded-md h-full py-3 md:px-3 "><IoFilterSharp />
                        </button>
                        {
                            sortBy &&
                            <div className="absolute z-50 right-0 top-10 py-4" >
                                <Filter />
                            </div>
                        }
                    </div>
                </form>
                {
                    isLoading ? <ShowModel message="Loading.." />
                        :
                        <div className="flex w-full gap-x-10 gap-y-6 justify-center items-start flex-wrap">
                            {
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
