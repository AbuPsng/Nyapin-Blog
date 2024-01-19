import { useUser } from "../utils/useUser"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteModel from "./DeleteModel";

const BlogContainer = ({ blog }) => {
    const { user } = useUser()
    const [isDelete, setIsDelete] = useState(false)

    return (
        <div className="relative py-4 px-3 rounded-md bg-teal-100 bg-opacity-30 hover:shadow-xl flex flex-col gap-y-3 w-full">

            {
                isDelete && <DeleteModel blogId={blog._id} setIsDelete={setIsDelete} />
            }

            {
                user?.userId === blog?.author || user?.userId === import.meta.env.VITE_ADMIN1 ?
                    <div className="absolute right-0 top-4 rounded-lg " >
                        <Link to={`/update_blog/${blog._id}`}>
                            <button className="font-semibold bg-teal-200 hover:bg-teal-400 rounded-lg mr-1 md:py-2  md:px-3 "><FaEdit /></button>
                        </Link>
                        <button onClick={() => setIsDelete(true)} className="font-semibold bg-red-200 hover:bg-red-400 rounded-lg md:py-2 md:px-3 "><MdDelete /></button>
                    </div>
                    :
                    null
            }

            {/* link */}
            <Link to={`/blog_details/${blog._id}`} className="p-2 bg-teal-200 hover:bg-teal-400 rounded-md absolute right-3 bottom-20">
                <FaExternalLinkAlt />
            </Link>

            <img src={`${blog.coverImage}`} className="h-44 w-full object-cover" alt="near lake" />
            <div className="flex flex-col gap-y-1">
                <h3 className="text-lg font-semibold">{blog.title.length >= 3 ? blog.title.split(" ").slice(0, 3).join(" ") : blog.title}</h3>
                <p className="text-[14px]">{blog.description.length >= 7 ? `${blog.description.split(" ").slice(0, 7).join(" ")}...` : blog.description}</p>
            </div>
            <ul className="flex gap-x-2 gap-y-2 flex-wrap">
                {
                    blog?.genre?.map(gen => (
                        <li key={gen} className="text-[13px] font-semibold border-solid border-2 rounded-full border-teal-300 hover:bg-teal-500  px-2">{gen}</li>
                    ))
                }
            </ul>

        </div>
    )
}

export default BlogContainer
