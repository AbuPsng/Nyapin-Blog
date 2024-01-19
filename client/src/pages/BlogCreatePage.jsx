import { useState } from 'react'
import Template from '../components/Template'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ShowModel from '../components/ShowModel'
import { useBlog } from '../utils/useBlogs'

const genres = ["nature", "sea", "technology", "anime", "wallpaper", "cars", "luxury", "mobile", "bird", "place", "hometown", "country", "forest", "animal", "space"]

const BlogCreatePage = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [coverImage, setCoverImage] = useState(null)
    const [genre, setGenre] = useState([])

    const { getAllBlogs } = useBlog()

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

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
            formData.append("title", title)
            formData.append("description", description)
            formData.append("file", coverImage)
            formData.append("genre", genre)
            const response = await axios.post("/blogs/create_blog", formData, { withCredentials: true })
            alert(response.data.message)
            getAllBlogs()
            navigate("/blog_lists")
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            alert(error.data.message)
            console.log(error)
        }
    }

    return (
        <Template>
            <main className=' flex justify-center items-center'>
                {isLoading && <ShowModel message={"Uploading..."} />}
                <div className='w-full  py-14 px-8 '>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-10'>
                        <div className='flex gap-x-5 items-center'>
                            <p className='text-lg '>Title :</p>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='w-1/3 bg-teal-100  text-sm  rounded-md px-4  py-2' />
                        </div>

                        <div className='flex gap-x-5 items-center'>
                            <p className='text-lg '>Description :</p>
                            <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} className='w-1/2 bg-teal-100   text-sm  rounded-md px-4  py-2' />
                        </div>

                        <div className='flex gap-x-5 py-10  gap-y-10 items-center'>
                            <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} className='w-1/3 bg-teal-100   text-sm  rounded-md px-4  py-2' />
                            <div className="flex flex-col w-full justify-center">
                                {
                                    coverImage && (
                                        <div >
                                            <img src={URL.createObjectURL(coverImage)} alt="product_coverImage" className="h-48 w-1/2 object-cover rounded-md" />
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
                                        genre.includes(g) ?
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

export default BlogCreatePage
