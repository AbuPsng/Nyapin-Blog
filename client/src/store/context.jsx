import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null)

    //** */ Checking if user is already login

    const isUserExist = () => {
        const userData = localStorage.getItem("user")
        if (userData) {
            const user = JSON.parse(userData)
            return setUser({ ...user, name: user.name, profilePicture: user.profilePicture })
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
