
import { useEffect, useState } from 'react'
import Template from '../components/Template'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import ShowModel from '../components/ShowModel'
import { useBlog } from '../utils/useBlogs'

const genres = ["nature", "sea", "technology", "mobile", "bird", "place", "hometown", "country", "forest", "animal", "space"]

const BlogUpdatePage = () => {
    const [coverImage, setCoverImage] = useState(null)
    const [genre, setGenre] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const { blogId } = useParams()
    const navigate = useNavigate()

    const { handleGetSingleBlog, blog, setBlog } = useBlog()

    useEffect(() => {
        handleGetSingleBlog(blogId)
    }, [blogId])

    const handleSelected = (g) => {
        if (genre.includes(g)) return
        setGenre([...genre, g])
    }

    const handleDisSelect = (g) => {
        if (!genre.includes(g)) return
        setGenre([...genre.filter(gen => gen !== g)])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append("title", blog.title)
            formData.append("description", blog.description)
            formData.append("file", blog.coverImage)
            formData.append("genre", blog.genre)
            console.log(formData)
            const response = await axios.patch(`/blogs/${blog._id}`, formData, { withCredentials: true })
            alert(response.data.message)
            navigate(`/blog_details/${blog._id}`)
            setCoverImage(null)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            alert(error.response.data.message)
        }
    }


    return (
        <Template>
            <main className='h-screen flex justify-center items-center'>
                {isLoading && <ShowModel message={"Uploading..."} />}
                <div className='w-full h-full py-14 px-8 '>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-10'>
                        <div className='flex gap-x-5 items-center'>
                            <p className='text-lg '>Title :</p>
                            <input type="text" value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} className='w-1/3 bg-teal-100  text-sm  rounded-md px-4  py-2' />
                        </div>

                        <div className='flex gap-x-5 items-center'>
                            <p className='text-lg '>Description :</p>
                            <textarea type="text" value={blog.description} onChange={(e) => setBlog({ ...blog, description: e.target.value })} className='w-1/2 bg-teal-100   text-sm  rounded-md px-4  py-2' />
                        </div>

                        <div className='flex gap-x-5 py-10  gap-y-10 items-center'>
                            <input type="file" onChange={(e) => setBlog({ ...blog, coverImage: e.target.files[0] })} className='w-1/3 bg-teal-100   text-sm  rounded-md px-4  py-2' />
                            <div className="flex flex-col w-full justify-center">
                                {
                                    coverImage ? (
                                        <div >
                                            <img src={URL.createObjectURL(coverImage)} alt="product_coverImage" className="h-48 w-1/2 object-cover rounded-md" />
                                        </div>
                                    ) : (
                                        <div>
                                            <img src={`${blog?.coverImage}`} alt={`${blog?.title}-image`} className="h-48 w-1/2 object-cover rounded-md" />
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className='flex gap-x-5 '>
                            <p className='text-lg w-20'>Genre :</p>
                            <div className='flex gap-x-3 gap-y-2 flex-wrap'>
                                {
                                    genres.map(g => (
                                        genre.includes(g) || blog.genre.includes(g) ?
                                            <button type="button" onClick={() => handleDisSelect(g)} className='px-3 py-1 rounded-full bg-teal-400 ' key={g}>{g}</button>
                                            :
                                            <button type="button" onClick={() => handleSelected(g)} className='px-3 py-1 bg-teal-100 rounded-full hover:bg-teal-200 ' key={g}>{g}</button>
                                    ))
                                }
                            </div>
                        </div>
                        <button type="submit" className='px-3 py-1 rounded-full bg-indigo-400 w-28 mt-10' >Create Blog</button>

                    </form>
                </div>
            </main>
        </Template>
    )
}

export default BlogUpdatePage
