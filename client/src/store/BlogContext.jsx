import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const BlogContext = createContext()

export const BlogProvider = ({ children }) => {


    const [blogs, setBlogs] = useState([])
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
    }, [])

    const handleDeleteBlog = async (blogId) => {
        console.log("xdelete")
        try {
            const response = await axios.delete(`/blogs/${blogId}`)
            getAllBlogs()
            console.log(response)
        } catch (error) {
            console.log(error)
            console.log("axios error")
        }
    }

    return (
        <BlogContext.Provider value={{ blogs, setBlogs, handleDeleteBlog, isLoading }}>
            {children}
        </BlogContext.Provider>
    )
}
