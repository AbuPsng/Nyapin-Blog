import { Link, useNavigate } from "react-router-dom"
import Template from "../components/Template"
import { useState } from "react"
import ShowModel from "../components/ShowModel"
import axios from "axios"


const RegisterPage = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (password !== confirmPassword) return alert("Password doesn't match")
        try {
            const formData = new FormData();
            formData.append("name", name)
            formData.append("email", email)
            formData.append("password", password)
            formData.append("file", profileImage)
            const response = await axios.post('/sign_up', formData)
            console.log(response.data)
            navigate("/sign_in")
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            alert(error.response.data.message)
        }
    }


    return (
        <Template>
            <main className="h-screen flex justify-center items-center">
                {isLoading && <ShowModel message='Loading....' />}
                <form onSubmit={handleRegister} className="bg-gradient-to-t w-full from-teal-400 to-blue-400 flex rounded-sm flex-col gap-y-4 p-12">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full md:w-80 text-sm py-2 rounded-md px-4" placeholder="Enter your name" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full md:w-80 text-sm py-2 rounded-md px-4" placeholder="Enter your email" />
                    <div className=" w-full flex justify-center">
                        {
                            profileImage && (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(profileImage)} alt="product_profileImage" className="h-20 w-full md:w-80 object-cover rounded-full" />
                                </div>
                            )
                        }
                    </div>
                    <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} className="w-full md:w-80 text-sm py-2 rounded-md px-4" placeholder="Enter your email" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full md:w-80 text-sm py-2 rounded-md px-4" placeholder="Enter your password" />
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full md:w-80 text-sm py-2 rounded-md px-4" placeholder="Confirm password" />
                    <button type="submit" className="border-solid border-2 my-1 py-1 w-1/2 mx-auto rounded-full hover:bg-white hover:text-teal-700">Sign Up</button>
                    <p className="text-sm">Already have an account? <Link to="/sign_in" className="underline underline-offset-2">Sign In</Link></p>
                </form>
            </main>
        </Template>
    )
}

export default RegisterPage
