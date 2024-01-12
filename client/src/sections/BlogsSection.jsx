import BlogContainer from '../components/BlogContainer'
import { useBlog } from '../utils/useBlogs'

const BlogsSection = () => {

    const { blogs, isLoading, handleDeleteBlog } = useBlog()

    return (
        <main className='flex flex-col gap-y-8 py-12'>
            <h2 className='text-4xl text-center'>Latests Blogs</h2>
            {
                isLoading ? <p className="text-3xl text-teal-500">Loading....</p>
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
    )
}

export default BlogsSection
