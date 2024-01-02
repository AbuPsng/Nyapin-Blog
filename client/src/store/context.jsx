import { createContext, useState } from "react";

export const Store = createContext()

export const StoreProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false)

    return (
        <Store.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </Store.Provider>
    )
}
