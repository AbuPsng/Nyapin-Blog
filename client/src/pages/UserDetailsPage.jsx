import { useEffect, useState } from "react"
import Template from "../components/Template"
import ShowPassword from "../components/ShowPassword"
import axios from "axios"

const UserDetailsPage = () => {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        number: "",
        address: "",
        profileImage: ""
    })
    const [newProfileImage, setNewProfileImage] = useState(null)

    const handleProfile = async () => {
        try {
            const response = await axios.get("/user/me")
            const data = response.data.data
            setProfile(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("name", profile.name)
            formData.append("email", profile.email)
            formData.append("number", profile.number)
            formData.append("address", profile.address)
            formData.append("profileImage", newProfileImage || profile.profileImage)
            const response = await axios.patch("/user/me", formData, { withCredentials: true })
            console.log("user Profile", response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleProfile()
    }, [])

    return (
        <Template>
            <section className="h-screen w-full">
                <form onSubmit={handleUpdateProfile} className="h-screen  items-center flex pt-8 gap-y-12  flex-col  w-full" >

                    {
                        newProfileImage ? (
                            <>
                                <img src={URL.createObjectURL(newProfileImage)} alt="product_coverImage" className="h-1/3 w-1/3 rounded-full" />
                            </>
                        ) : (
                            <>
                                <img src={`${(profile?.profileImage)}`} alt={`${profile?.name}-image`} className="h-1/3 w-1/3 rounded-full" />
                            </>
                        )
                    }
                    <input type="file" onChange={(e) => setNewProfileImage(e.target.files[0])} className='w-1/3 bg-teal-100   text-sm  rounded-md px-4  py-2' />

                    <div className="w-full md:w-1/2 flex flex-col justify-center gap-y-6">
                        <div className="flex gap-x-4">
                            <label className="font-semibold text-lg" htmlFor="name">Name :</label>{" "}
                            <input className="px-3 py-0.5" type="text" name="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                        </div>

                        <div className="flex gap-x-4">
                            <label className="font-semibold text-lg" htmlFor="email">Email :</label>{" "}
                            <input className="px-3 py-0.5" type="email" name="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                        </div>

                        {/* <div className="relative ">
                            <label className="font-semibold text-lg" htmlFor="password">Password :</label>{" "}
                            <input className="px-3 py-0.5 ml-3" value={"9358739485"} type={`${showPassword ? "text" : "password"}`} name="password" />
                            <ShowPassword showPassword={showPassword} setShowPassword={setShowPassword} />
                        </div> */}

                        <div className="flex gap-x-4">
                            <label className="font-semibold text-lg" htmlFor="number">Number :</label>{" "}
                            <input className="px-3 py-0.5" type="number" name="number" value={profile.number} onChange={(e) => setProfile({ ...profile, number: e.target.value })} />
                        </div>

                        <div className="flex gap-x-4">
                            <label className="font-semibold text-lg" htmlFor="address">Address :</label>{" "}
                            <input className="px-3 py-0.5" type="text" name="address" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
                        </div>
                    </div>
                    <button className="px-4 py-2 ml-3 bg-teal-400 hover:bg-teal-300 text-white rounded-sm">Update Profile</button>
                </form>
            </section>
        </Template>
    )
}

export default UserDetailsPage
