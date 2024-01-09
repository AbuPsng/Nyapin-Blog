

const BlogContainer = ({ blog }) => {
    console.log("blog container" + blog.genre)
    return (
        <div className="  py-4 flex flex-col gap-y-3 w-full">
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
