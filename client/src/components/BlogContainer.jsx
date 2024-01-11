import { useUser } from "../utils/useUser"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogContainer = ({ blog }) => {
    const { user } = useUser()
    console.log(blog.coverImage)
    return (
        <div className="relative py-4 flex flex-col gap-y-3 w-full">
            {
                user?.userId === blog?.author ?
                    <div className="absolute right-0 top-4 rounded-lg " >
                        <Link to="/update_blog">
                            <button className="font-semibold bg-teal-400 rounded-lg mr-1 md:py-2  md:px-3 "><FaEdit /></button>
                        </Link>
                        <button className="font-semibold bg-red-400 rounded-lg md:py-2 md:px-3 "><MdDelete /></button>
                    </div>
                    :
                    null
            }

            <img src={`${blog.coverImage}`} className="h-44 w-full" alt="near lake" />
            <div className="flex flex-col gap-y-1">
                <p className="text-[13px] font-semibold">{blog.author} - 02 Jan 2022</p>
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="text-[14px]">{blog.description}</p>
            </div>
            <ul className="flex gap-x-4">
                {
                    blog?.genre?.map(gen => (
                        <li key={gen} className="text-[13px] font-semibold border-solid border-2 rounded-full border-slate-500  px-2">{gen}</li>
                    ))
                }
            </ul>

        </div>
    )
}

export default BlogContainer
