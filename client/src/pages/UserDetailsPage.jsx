import { useState } from "react"
import Template from "../components/Template"
import axios from "axios"
import { useUser } from "../utils/useUser"
import ShowModel from "../components/ShowModel"

const UserDetailsPage = () => {

    const [newUserImage, setNewUserImage] = useState(null)

    const { user, setUser, isUserExist } = useUser()

    const [isLoading, setIsLoading] = useState(false)

    console.log(user)

    const handleUpdateUser = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", user.name)
            formData.append("email", user.email)
            formData.append("phone", user.phone)
            formData.append("address", user.address)
            formData.append("profileImage", newUserImage || user.profilePicture)
            const response = await axios.patch("/user/me", formData, { withCredentials: true })
            const data = response.data.data
            setUser({
                name: data.name,
                email: data.email,
                profileImage: data.profileImage,
                address: data.address,
                phone: data.phone
            })
            setNewUserImage(null)
            localStorage.setItem("user", JSON.stringify({ ...data }))
            isUserExist()
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    return (
        <Template>
            <section className="h-screen w-full">
                {
                    isLoading ? <ShowModel message={"Wait...Updating your profile"} />
                        :
                        <form onSubmit={handleUpdateUser} className="h-screen  items-center flex pt-6 gap-y-12  flex-col  w-full" >

                            {
                                newUserImage ? (
                                    <>
                                        <img src={URL.createObjectURL(newUserImage)} alt="product_coverImage" className="h-64 w-1/3 object-cover rounded-full" />
                                    </>
                                ) : (
                                    <>
                                        <img src={`${(user?.profileImage)}`} alt={`${user?.name}-image`} className="h-64 w-1/3 object-cover rounded-full" />
                                    </>
                                )
                            }
                            <input type="file" onChange={(e) => setNewUserImage(e.target.files[0])} className='w-1/3 bg-teal-100   text-sm  rounded-md px-4  py-2' />

                            <div className="w-full md:w-1/2 flex flex-col justify-center gap-y-6">
                                <div className="flex gap-x-4">
                                    <label className="font-semibold text-lg" htmlFor="name">Name :</label>{" "}
                                    <input className="px-3 py-0.5" type="text" name="name" value={user?.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                                </div>

                                <div className="flex gap-x-4">
                                    <label className="font-semibold text-lg" htmlFor="email">Email :</label>{" "}
                                    <input className="px-3 py-0.5" readOnly type="email" name="email" value={user?.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                </div>

                                {/* <div className="relative ">
                            <label className="font-semibold text-lg" htmlFor="password">Password :</label>{" "}
                            <input className="px-3 py-0.5 ml-3" value={"9358739485"} type={`${showPassword ? "text" : "password"}`} name="password" />
                            <ShowPassword showPassword={showPassword} setShowPassword={setShowPassword} />
                        </div> */}

                                <div className="flex gap-x-4">
                                    <label className="font-semibold text-lg" htmlFor="number">Number :</label>{" "}
                                    <input className="px-3 py-0.5" type="number" name="number" value={user?.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                                </div>

                                <div className="flex gap-x-4">
                                    <label className="font-semibold text-lg" htmlFor="address">Address :</label>{" "}
                                    <input className="px-3 py-0.5" type="text" name="address" value={user?.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
                                </div>
                            </div>
                            <button className="px-4 py-2 ml-3 bg-teal-400 hover:bg-teal-300 text-white rounded-sm">Update user</button>
                        </form>
                }
            </section>
        </Template>
    )
}

export default UserDetailsPage
