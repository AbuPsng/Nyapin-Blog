import { Link } from "react-router-dom"
import Template from "../components/Template"
import { useState } from "react"
import axios from "axios"
import { useUser } from "../utils/useUser"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const { user, setUser } = useUser()


    //**Login function */

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sign_in`, { email, password })
            const data = response.data.data
            setUser({ ...user, name: data.name, email: data.email, userId: data._id })
            localStorage.setItem("user", JSON.stringify({ ...data, password: null }))
            navigate("/")
        } catch (error) {
            console.log(error.response.data.message)
            alert(error.response.data.message)
        }

    }

    return (
        <Template>
            <main className="h-screen flex justify-center items-center">
                <form onSubmit={handleLogin} className="bg-gradient-to-t from-teal-400 to-blue-400 flex rounded-sm flex-col gap-y-5 p-12">
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-80 text-sm py-2 rounded-md px-4" placeholder="Enter your email" />
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="w-80 text-sm py-2 rounded-md px-4" placeholder="Enter your password" />
                    <div className="flex flex-col my-2 gap-y-2 justify-center">
                        <button type="submit" className="border-solid border-2 py-1 w-1/2 mx-auto rounded-full hover:bg-white hover:text-teal-700">Sign In</button>
                        <p className="text-sm text-center">Dont have an account? <Link to="/sign_up" className="underline underline-offset-4 ">Sign Up</Link></p>
                    </div>
                </form>
            </main>
        </Template>
    )
}

export default LoginPage