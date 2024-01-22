import { useNavigate } from 'react-router-dom';
import { useBlog } from '../utils/useBlogs';

const DeleteModel = ({ blogId, setIsDelete, url }) => {
    const { handleDeleteBlog } = useBlog();

    const navigate = useNavigate()

    return (
        <div className="w-full h-screen bg-slate-900 bg-opacity-35 z-10 fixed inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-t md:w-1/3 w-10/12 h-1/3 flex flex-col justify-center items-center gap-y-10 from-teal-400 to-blue-400">
                <h1 className="font-semibold">Do you want to delete this blog?</h1>
                <div className='flex gap-x-10'>
                    <button onClick={() => { handleDeleteBlog(blogId); setIsDelete(false), navigate(url) }} className="px-8 py-2 rounded-lg bg-red-300 hover:bg-red-400">
                        Yes
                    </button>
                    <button onClick={() => setIsDelete(false)} className='px-8 py-2 rounded-lg bg-teal-300 hover:bg-teal-400'>No</button>
                </div>
            </div>
        </div >
    );
};

export default DeleteModel;
