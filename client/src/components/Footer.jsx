import { Link } from "react-router-dom"

const one = ["Product", "Overview", "Features", "Solutions"]

const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-b from-blue-400 to-teal-400 pt-20 pb-10 flex justify-center px-3 md:px-0">
            <div className="mx-auto w-full max-w-6xl flex flex-col gap-y-12 md:px-10 ">

                {/* Description container */}
                <div className="flex flex-col justify-center items-center gap-y-3">
                    <h2 className="text-2xl font-semibold tracking-wider text-center">Lets get started on something Great</h2>
                    <p className="text-[14px] text-center">Join over 4,000+ start sup already growing with Untitled</p>
                    <Link className="text-sm border-solid border-2 w-52 text-center rounded-full border-teal-300">Start your 7-days free trial</Link>
                </div>

                {/* Footer links */}
                <div className="flex justify-between">
                    <ul className="flex flex-col gap-y-1 ">
                        {
                            one.map(el => (
                                <li className="text-sm " key={el}>{el}</li>
                            ))
                        }
                    </ul>
                    <ul className=" flex-col gap-y-1 hidden md:flex">
                        {
                            one.map(el => (
                                <li className="text-sm " key={el}>{el}</li>
                            ))
                        }
                    </ul>
                    <ul className=" flex-col gap-y-1 hidden md:flex">
                        {
                            one.map(el => (
                                <li className="text-sm " key={el}>{el}</li>
                            ))
                        }
                    </ul>
                    <ul className="flex flex-col gap-y-1 ">
                        {
                            one.map(el => (
                                <li className="text-sm " key={el}>{el}</li>
                            ))
                        }
                    </ul>
                    <ul className="flex flex-col gap-y-1 ">
                        {
                            one.map(el => (
                                <li className="text-sm " key={el}>{el}</li>
                            ))
                        }
                    </ul>
                    <ul className=" flex-col gap-y-1 hidden md:flex">
                        {
                            one.map(el => (
                                <li className="text-sm " key={el}>{el}</li>
                            ))
                        }
                    </ul>
                </div>

                {/* copyright container */}
                <div className="flex justify-between w-full text-sm">
                    <p className="">abuPsng</p>
                    <p>&copy; 2024 abuPsng Ul. All rights reserved</p>
                </div>

            </div>
        </footer>
    )
}

export default Footer
