import { createContext, useEffect, useState } from "react";

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

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        try {
            console.log("hero")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, isUserExist, handleUpdateProfile }}>
            {children}
        </AuthContext.Provider>
    )
}
