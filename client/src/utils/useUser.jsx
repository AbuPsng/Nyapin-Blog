import { useContext } from "react"
import { AuthContext } from "../store/AuthContext"

export const useUser = () => {
    return useContext(AuthContext)
}