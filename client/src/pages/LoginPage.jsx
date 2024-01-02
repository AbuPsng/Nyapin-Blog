import { Link } from "react-router-dom"
import Template from "../components/Template"


const LoginPage = () => {

    return (
        <Template>
            <main className="h-screen flex justify-center items-center">
                <form className="bg-gradient-to-t from-teal-400 to-blue-400 flex rounded-sm flex-col gap-y-4 p-12">
                    <input type="text" className="w-80 text-sm py-2 rounded-md px-4" placeholder="Enter your email" />
                    <input type="text" className="w-80 text-sm py-2 rounded-md px-4" placeholder="Enter your password" />
                    <button className="border-solid border-2 my-1 py-1 w-1/2 mx-auto rounded-full hover:bg-white hover:text-teal-700">Sign Up</button>
                    <p className="text-sm">Dont have an account? <Link to="/sign_up" className="underline underline-offset-2">Sign In</Link></p>
                </form>
            </main>
        </Template>
    )
}

export default LoginPage