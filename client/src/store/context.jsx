import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null)

    //** */ Checking if user is already login

    const isUserExist = () => {
        const userData = localStorage.getItem("user")
        if (userData) {
            const user = JSON.parse(userData)
            return setUser({ ...user, name: user.name, profilePicture: user.profilePicture, userId: user.userId })
        }
    }

    useEffect(() => {
        isUserExist()
    }, [])

    //** */ logout function



    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
