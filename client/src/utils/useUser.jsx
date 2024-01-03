import { useContext } from "react"
import { AuthContext } from "../store/context"

export const useUser = () => {
    return useContext(AuthContext)
}