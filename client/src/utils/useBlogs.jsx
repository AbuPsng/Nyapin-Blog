import { useContext } from "react"
import { BlogContext } from "../store/BlogContext"

export const useBlog = () => {
    return useContext(BlogContext)
}