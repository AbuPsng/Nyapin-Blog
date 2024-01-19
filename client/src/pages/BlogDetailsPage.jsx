import { useEffect, useState } from "react"
import Template from "../components/Template"
import { useBlog } from "../utils/useBlogs"
import { Link, useParams } from "react-router-dom"
import { useUser } from "../utils/useUser"
import DeleteModel from "../components/DeleteModel"

const BlogDetailsPage = () => {

    const [isDelete, setIsDelete] = useState(false)

    const { blogId } = useParams()
    const { user } = useUser()

    const { handleGetSingleBlog, blog } = useBlog()

    const date = (blog?.createdAt ? new Date(blog?.createdAt).toDateString() : "Not Available")


    useEffect(() => {
        handleGetSingleBlog(blogId)
    }, [blogId])

    return (
        <Template>
            <main className="pt-10 pb-20 flex flex-col items-center gap-y-7" >
                {
                    isDelete ? <DeleteModel blogId={blogId} setIsDelete={setIsDelete} url={"/blog_lists"} />
                        :
                        <>

                            <div className="pt-20 pb-12 w-full flex flex-col gap-y-14">
                                <img className="w-full h-96 object-cover" src={`${blog?.coverImage}`} alt="" />
                                <div className="relative">
                                    {blog?.author?._id === user?.userId || user?.userId === import.meta.env.VITE_ADMIN1 && <div className="absolute right-2 top-2 ">
                                        <Link to={`/update_blog/${blogId}`}> <button className="py-2 px-7 rounded-md mr-4 bg-teal-200 hover:bg-teal-400">edit</button></Link>
                                        <button onClick={() => setIsDelete(!isDelete)} className="py-2 px-7 rounded-md bg-red-200 hover:bg-red-400">delete</button>
                                    </div>}
                                    <div className="flex flex-col gap-y-4 py-10 px-5">
                                        <div className="flex  gap-x-3 justify-start items-center">
                                            <img src={`${blog.author.profileImage}`} alt={`${blog.author.name}-profile image`} className="w-14 rounded-full h-14 object-cover" />
                                            <h3 className="font-semibold">{blog?.author?.name}</h3>
                                        </div>
                                        <h3 className="text-lg font-semibold">{blog?.title}</h3>
                                        <p className="pb-6">{blog?.description}</p>
                                        <ul className="flex gap-x-3">
                                            {
                                                blog?.genre?.map(gen => (
                                                    <li key={gen} className="text-sm px-3 py-0.5 bg-teal-200 hover:bg-teal-400 rounded-full">{gen}</li>
                                                ))
                                            }
                                        </ul>
                                        <p className="text-sm pt-1"><span className="text-sm font-semibold">Created At : </span>{date} </p>
                                    </div>
                                </div>
                            </div>


                            <div className="flex w-full overflow-x-auto rounded-md bg-teal-100 px-10 py-6 gap-x-4" >
                                <div className=" flex flex-none flex-col px-2 py-2 gap-y-3 w-1/4 rounded-lg text-sm bg-white" >
                                    <h3 className="text-sm font-semibold">Ani</h3>
                                    <p>It was a very wonderful blog written with such style that it make you feel as you have been there</p>
                                </div>
                                <div className=" flex flex-none flex-col px-2 py-2 gap-y-3 w-1/4 rounded-lg text-sm bg-white" >
                                    <h3 className="text-sm font-semibold">Ani</h3>
                                    <p>It was a very wonderful blog written with such style that it make you feel as you have been there</p>
                                </div>
                                <div className=" flex flex-none flex-col px-2 py-2 gap-y-3 w-1/4 rounded-lg text-sm bg-white" >
                                    <h3 className="text-sm font-semibold">Ani</h3>
                                    <p>It was a very wonderful blog written with such style that it make you feel as you have been there</p>
                                </div>
                                <div className=" flex flex-none flex-col px-2 py-2 gap-y-3 w-1/4 rounded-lg text-sm bg-white" >
                                    <h3 className="text-sm font-semibold">Ani</h3>
                                    <p>It was a very wonderful blog written with such style that it make you feel as you have been there</p>
                                </div>
                                <div className=" flex flex-none flex-col px-2 py-2 gap-y-3 w-1/4 rounded-lg text-sm bg-white" >
                                    <h3 className="text-sm font-semibold">Ani</h3>
                                    <p>It was a very wonderful blog written with such style that it make you feel as you have been there</p>
                                </div>
                                <div className=" flex flex-none flex-col px-2 py-2 gap-y-3 w-1/4 rounded-lg text-sm bg-white" >
                                    <h3 className="text-sm font-semibold">Ani</h3>
                                    <p>It was a very wonderful blog written with such style that it make you feel as you have been there</p>
                                </div>
                            </div>
                            <button className="px-7 py-2 w-1/5 bg-teal-200 hover:bg-teal-400 rounded-md">Give Review</button>
                        </>
                }
            </main>
        </Template>
    )
}

export default BlogDetailsPage
