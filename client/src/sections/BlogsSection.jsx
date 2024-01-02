import React from 'react'
import BlogContainer from '../components/BlogContainer'

const BlogsSection = () => {
    return (
        <main className='flex flex-col gap-y-8'>
            <h2 className='text-2xl font-semibold tracking-wider text-center'>Blogs</h2>
            <div className='flex gap-x-10 gap-y-6 justify-start items-start flex-wrap'>
                <BlogContainer />
                <BlogContainer />
                <BlogContainer />
                <BlogContainer />
            </div>
        </main>
    )
}

export default BlogsSection
