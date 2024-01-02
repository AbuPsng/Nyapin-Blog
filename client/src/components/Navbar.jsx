import { Link } from "react-router-dom"

const pageLinks = [
    { name: "Home", link: "/" },
    { name: "Blogs", link: "/blog_lists" },
    { name: "Profile", link: "/my_details" },
]

const authLinks = [
    { name: "Login", link: "/sign_in" },
    { name: "Register", link: "/sign-up" },
]

const Navbar = () => {
    return (
        <div className="w-full flex items-center justify-between py-3 text-sm font-semibold">
            {/* //**links lists */}
            <Link to="/" className="tracking-wider font-bold">abupsng</Link>
            <ul className=" hidden md:flex">
                {
                    pageLinks.map(links => (
                        <Link to={links.link} key={links.name} className="px-3 py-2" >{links.name}</Link>
                    ))
                }
            </ul>

            {/* //**login and registration */}
            <ul>
                {
                    authLinks.map(links => (
                        <Link to={links.link} key={links.name} className={`px-4 py-2 rounded-sm ${links.name === "Register" ? "bg-black text-white" : ""}`} >{links.name}</Link>
                    ))
                }
            </ul>
        </div>
    )
}

export default Navbar
