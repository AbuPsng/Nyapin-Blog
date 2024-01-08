import Template from "../components/Template"
import BlogContainer from "../components/BlogContainer"
import { useState } from "react"

const array = [1, 2, 3, 4, 5, 6]

const BlogListsPage = () => {

    const [search, setSearch] = useState()

    return (
        <Template>
            <main className="w-full flex flex-wrap gap justify-center items-center py-24">
                <form className="flex gap-x-6 w-full justify-center pb-16" >
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="w-2/3 border-2 border-solid border-teal-600 rounded-full focus:outline-teal-400 px-3" />
                    <button className="font-semibold bg-teal-400 rounded-md md:py-2 md:px-8 ">Search</button>
                </form>
                <div className="flex gap-x-10 gap-y-6 justify-start items-start flex-wrap">
                    {
                        array.map(i => (
                            < BlogContainer key={i} />
                        ))
                    }
                </div>

            </main>
        </Template >
    )
}

export default BlogListsPage
