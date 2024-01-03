import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ name: "", email: "", userId: "" })


    //** */ Checking if user is already login

    const isUserExist = () => {
        const userData = localStorage.getItem("user")
        if (userData) {
            const user = JSON.parse(userData)
            return setUser({ ...user, name: user.name })
        }
    }

    useEffect(() => {
        isUserExist()
    }, [])

    //** */ logout function

    const handleLogout = async () => {
        const response = await axios.
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
