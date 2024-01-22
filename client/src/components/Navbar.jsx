import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../utils/useUser"
import axios from "axios"
import { useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";

const pageLinks = [
    { name: "Home", link: "/" },
    { name: "Blogs", link: "/blog_lists" }
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
                        {
                            user && <Link to="/my_blogs" className="px-3 py-2 hidden hover:text-gray-600 md:flex">My Blogs</Link>
                        }
                        {
                            user?.userId === import.meta.env.VITE_ADMIN1 && <Link to="/all_users" className="px-3 py-2 hidden hover:text-gray-600 md:flex" >All Users</Link>
                        }
                    </ul>

                    <ul>

                        {/*//*  show links or not  */}

                        {
                            user ?
                                <>
                                    {/* for mobile screen */}
                                    <button className="p-1 bg-slate-900 text-white rounded-full flex  md:hidden " onClick={() => setShowLinks(!showLinks)}>
                                        {
                                            showLinks ? <IoCloseSharp />
                                                : <RxHamburgerMenu />

                                        }
                                    </button>
                                </>
                                :
                                <Link to={"/sign_in"} className={`text-white px-4 py-2 rounded-base bg-black hover:text-white  hover:rounded-2xl`} >Sign In</Link>
                        }
                        {user ?
                            < div className="items-center gap-x-2 justify-center hidden md:flex">
                                <Link to="/my_details">
                                    <img className="w-10 h-10 rounded-full object-cover" src={`${user?.profileImage || "images/default.png"}`} alt={`${user?.name} profile image`} />
                                </Link>
                                <button onClick={handleLogout} className="px-4 py-2 ml-3 bg-teal-400 hover:bg-teal-300 text-white rounded-sm">Sign Out</button>
                            </div>
                            :
                            null
                        }
                    </ul>
                    {/* // :
                            // login and registration
                            // authLinks.map(links => (
                            //     <Link to={links.link} key={links.name} className={` hover:text-gray-600 px-4 py-2 rounded-base ${links.name === "Sign In" ? "bg-black text-white hover:text-white hover:rounded-2xl" : ""}`} >{links.name}</Link>
                            // ))
                            // null
                        } */}
                </div >
            </header >


            {/* nav models for links */}
            {
                showLinks ?
                    <ul className="flex text-[12px] w-full items-center z-20 flex-col right-0 left-0 top-[67px] bg-teal-500  fixed  md:hidden">
                        {
                            pageLinks.map(links => (
                                <Link to={links.link} key={links.name} className="px-2 pt-1 flex md:hidden" >{links.name}</Link>
                            ))
                        }
                        {
                            user && <Link to="/my_blogs" className="px-3 text-center hover:text-gray-600 w-full">My Blogs</Link>
                        }
                        {
                            user?.userId === import.meta.env.VITE_ADMIN1 && <Link to="/all_users" className="px-3 py-2  hover:text-gray-600 md:flex" >All Users</Link>
                        }
                        {
                            user ?
                                <li className="px-3 py-1 flex "><button onClick={handleLogout} className="w-full font-semibold h-full">Sign Out</button></li>
                                :
                                <Link to="sign_in" className="px-3 py-1 flex  font-semibold">Sign In</Link>
                        }
                    </ul>
                    :
                    null
            }


        </>

    )
}

export default Navbar
