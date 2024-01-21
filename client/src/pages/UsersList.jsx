import { useEffect, useState } from "react"
import Template from "../components/Template"
import UserContainer from "../components/UserContainer"
import axios from "axios"


const UsersList = () => {

    const [allUsers, setAllUsers] = useState([])

    const handleGetAllUsers = async () => {
        try {
            const response = await axios.get('/admin/')
            const data = response.data.data
            setAllUsers(data)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetAllUsers()
    }, [])

    return (
        <Template>
            <section className=" flex justify-center flex-col gap-y-16 items-center py-10">
                <h1 className="text-4xl">All users</h1>
                <main className="flex w-full gap-x-10 gap-y-6 justify-center items-start flex-wrap ">
                    {
                        allUsers?.map(user => (

                            <div key={1} className="w-full md:w-1/3">
                                <UserContainer handleGetAllUsers={handleGetAllUsers} user={user} />
                            </div>
                        ))
                    }

                </main>
            </section>
        </Template>
    )
}

export default UsersList
