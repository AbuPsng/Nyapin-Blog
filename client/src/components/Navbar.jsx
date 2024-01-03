import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useUser } from "../utils/useUser"
import axios from "axios"

const pageLinks = [
    { name: "Home", link: "/" },
    { name: "Blogs", link: "/blog_lists" },
    { name: "Profile", link: "/my_details" },
]

const authLinks = [
    { name: "Sign In", link: "/sign_in" },
    { name: "Sign Up", link: "/sign_up" },
]

const Navbar = () => {

    const { user, setUser } = useUser()

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/sign_out`)
            const status = response.data.status
            if (status === "success") {
                localStorage.removeItem("user")
                alert(`See you soon ${user.name}`)
                setUser(null)
            }
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const [showLinks, setShowLinks] = useState(false)

    return (
        <>
            <header className="w-full z-20 left-0 px-4 right-0 bg-gradient-to-b from-blue-500 to-teal-400 sticky top-0  ">
                <div className="max-w-6xl mx-auto flex items-center justify-between py-5 text-sm font-semibold md:py-4">

                    {/* //**links lists */}
                    <ul className="flex ">
                        <Link to="/" className="tracking-wider flex items-center pr-4 text-xl font-bold">abupsng</Link>
                        {
                            pageLinks.map(links => (
                                <Link to={links.link} key={links.name} className="px-3 py-2 hidden hover:text-gray-600 md:flex" >{links.name}</Link>
                            ))
                        }
                    </ul>

                    <ul>

                        {/*//*  show links or not  */}

                        {
                            user ?
                                <>
                                    {/* for mobile screen */}
                                    <button className="w-6 h-6 bg-slate-900 text-white rounded-full flex justify-center items-top md:hidden " onClick={() => setShowLinks(!showLinks)}>
                                        {
                                            showLinks ? "x" : "+"
                                        }
                                    </button>

                                    {/* for big screen */}
                                    <div className="items-center justify-center hidden md:flex">
                                        <button onClick={handleLogout} className="px-4 py-2 ml-3 bg-black text-white rounded-sm">Sign Out</button>
                                    </div>
                                </>
                                :
                                // login and registration
                                authLinks.map(links => (
                                    <Link to={links.link} key={links.name} className={` hover:text-gray-600 px-4 py-2 rounded-base ${links.name === "Sign Up" ? "bg-black text-white hover:text-white hover:rounded-2xl" : ""}`} >{links.name}</Link>
                                ))
                        }
                    </ul>

                </div>
            </header>
            {/* nav models for links */}
            {showLinks ?
                <ul className="flex text-[12px] w-full items-center flex-col right-0 left-0 bg-teal-500  absolute  md:hidden">
                    {
                        pageLinks.map(links => (
                            <Link to={links.link} key={links.name} className="px-2 pt-1 flex md:hidden" >{links.name}</Link>
                        ))
                    }
                    <li className="px-3 py-1 flex md:hidden">Log out</li>
                </ul>
                :
                null
            }


        </>

    )
}

export default Navbar
