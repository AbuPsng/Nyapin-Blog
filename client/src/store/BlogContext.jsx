import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const BlogContext = createContext()

export const BlogProvider = ({ children }) => {

    const [blogs, setBlogs] = useState([])
    const [blog, setBlog] = useState({
        title: "",
        description: "",
        coverImage: "",
        genre: [],
        author: {}
    })
    const [isLoading, setIsLoading] = useState(false)

    //** */ Checking if user is already login

    const getAllBlogs = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get("/api/v1/blogs")
            const data = response.data.data
            setIsLoading(false)
            setBlogs([...data])
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        getAllBlogs()
    }, [])

    const handleDeleteBlog = async (blogId) => {
        try {
            // eslint-disable-next-line
            const response = await axios.delete(`/blogs/${blogId}`)
            getAllBlogs()
            // console.log(response.data.data.author.name)
        } catch (error) {
            console.log(error)
            console.log("axios error")
        }
    }

    const handleGetSingleBlog = async (blogId) => {
        setIsLoading(true)
        try {
            const response = await axios.get(`/blogs/${blogId}`)
            const data = response.data.data
            setBlog({ ...data })
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            console.log("axios error")
        }
    }

    return (
        <BlogContext.Provider value={{ blogs, setBlogs, blog, handleDeleteBlog, isLoading, getAllBlogs, handleGetSingleBlog, setBlog }}>
            {children}
        </BlogContext.Provider>
    )
}
