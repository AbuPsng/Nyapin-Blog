
import { useUser } from './useUser'
import { Outlet } from "react-router-dom"

const PrivateRoute = () => {
    const { user } = useUser()

    return (
        user ? <Outlet /> : "You are not login"
    )
}

export default PrivateRoute
