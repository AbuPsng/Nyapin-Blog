import { Link } from "react-router-dom"
import Template from "../components/Template"
import { useState } from "react"
import axios from "axios"


const RegisterPage = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) return alert("Password doesn't match")
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sign_up`, { name, email, password, confirmPassword })
            console.log(response)

        } catch (error) {
            alert(error.response.data.message)
        }
    }


    return (
        <Template>
            <main className="h-screen flex justify-center items-center">
                <form onSubmit={handleRegister} className="bg-gradient-to-t from-teal-400 to-blue-400 flex rounded-sm flex-col gap-y-4 p-12">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-80 text-sm py-2 rounded-md px-4" placeholder="Enter your name" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-80 text-sm py-2 rounded-md px-4" placeholder="Enter your email" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-80 text-sm py-2 rounded-md px-4" placeholder="Enter your password" />
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-80 text-sm py-2 rounded-md px-4" placeholder="Confirm password" />
                    <button type="submit" className="border-solid border-2 my-1 py-1 w-1/2 mx-auto rounded-full hover:bg-white hover:text-teal-700">Sign Up</button>
                    <p className="text-sm">Already have an account? <Link to="/sign_in" className="underline underline-offset-2">Sign In</Link></p>
                </form>
            </main>
        </Template>
    )
}

export default RegisterPage
