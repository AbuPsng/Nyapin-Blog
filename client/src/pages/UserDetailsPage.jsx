import { useState } from "react"
import Template from "../components/Template"
import ShowPassword from "../components/ShowPassword"
import axios from "axios"

const UserDetailsPage = () => {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        number: "",
        address: ""
    })
    const [showPassword, setShowPassword] = useState(false)

    const handleProfile = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get("/user/me")
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Template>
            <section className="h-screen w-full">
                <form onSubmit={handleProfile} className="h-screen  items-center flex pt-8 gap-y-12  flex-col  w-full" >
                    <img className="h-1/3 w-1/3 rounded-full" src="images/default.png" alt="user_profile" />
                    <div className="w-full md:w-1/2 flex flex-col justify-center gap-y-6">
                        <div className="flex gap-x-4">
                            <label className="font-semibold text-lg" htmlFor="name">Name :</label>{" "}
                            <input className="px-3 py-0.5" type="text" name="name" value={"hero Honda"} />
                        </div>

                        <div className="flex gap-x-4">
                            <label className="font-semibold text-lg" htmlFor="email">Email :</label>{" "}
                            <input className="px-3 py-0.5" type="email" name="email" value={"test@test.com"} />
                        </div>

                        <div className="relative ">
                            <label className="font-semibold text-lg" htmlFor="password">Password :</label>{" "}
                            <input className="px-3 py-0.5 ml-3" value={"9358739485"} type={`${showPassword ? "text" : "password"}`} name="password" />
                            <ShowPassword showPassword={showPassword} setShowPassword={setShowPassword} />
                        </div>

                        <div className="flex gap-x-4">
                            <label className="font-semibold text-lg" htmlFor="number">Number :</label>{" "}
                            <input className="px-3 py-0.5" type="number" name="number" value={3485970} />
                        </div>

                        <div className="flex gap-x-4">
                            <label className="font-semibold text-lg" htmlFor="address">Address :</label>{" "}
                            <input className="px-3 py-0.5" type="address" name="address" value={"test@test.com"} />
                        </div>
                    </div>
                    <button className="px-4 py-2 ml-3 bg-teal-400 hover:bg-teal-300 text-white rounded-sm">Update Profile</button>
                </form>
            </section>
        </Template>
    )
}

export default UserDetailsPage
