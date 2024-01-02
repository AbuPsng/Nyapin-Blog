import { createContext, useContext, useState } from "react";

const Store = createContext()

export const StoreProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <Store.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </Store.Provider>
    )
}

export const useStore = () => {
    return useContext(Store)
}