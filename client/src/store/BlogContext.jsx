import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useUser } from "../utils/useUser";

export const BlogContext = createContext()

export const BlogProvider = ({ children }) => {

    const { user } = useUser()
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
            const response = await axios.get("/blogs")
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
    }, [user])

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
        <BlogContext.Provider value={{ blogs, setBlogs, blog, handleDeleteBlog, isLoading, handleGetSingleBlog, setBlog }}>
            {children}
        </BlogContext.Provider>
    )
}
