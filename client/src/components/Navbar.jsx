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
        <div className="w-full ">
            {/* //**links lists */}
            <ul>
                {
                    pageLinks.map(links => (
                        <Link to={links.link} key={links.name} >{links.name}</Link>
                    ))
                }
            </ul>

            {/* //**login and registration */}
            <ul>
                {
                    authLinks.map(links => (
                        <Link to={links.link} key={links.name} >{links.name}</Link>
                    ))
                }
            </ul>
        </div>
    )
}

export default Navbar
