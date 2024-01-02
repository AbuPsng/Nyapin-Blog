import { useContext } from "react"
import { Store } from "../store/context"

export const useStore = () => {
    return useContext(Store)
}