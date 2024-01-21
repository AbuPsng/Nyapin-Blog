import { useState } from "react";
import { MdDelete } from "react-icons/md";
import DeleteUser from "./DeleteUserModal";
import axios from "axios";
// import { FaEdit } from "react-icons/fa";

const UserContainer = ({ user, handleGetAllUsers }) => {

    const [deleteUser, setDeleteUser] = useState(false)

    const date = (user?.createdAt ? new Date(user?.createdAt).toDateString() : "Not Available")

    const handleDeleteUser = async () => {
        try {
            const response = await axios.delete(`/admin/${user._id}`)
            handleGetAllUsers()
            setDeleteUser(false)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="relative  rounded-md bg-teal-100 bg-opacity-30 hover:shadow-xl flex flex-col gap-y-3 w-full">
            <div className="absolute right-0 top-0 rounded-lg " >
                {/* <button className="font-semibold bg-teal-200 hover:bg-teal-400 rounded-lg mr-1 md:py-2  md:px-3 "><FaEdit /></button> */}
                <button onClick={() => setDeleteUser(!deleteUser)} className="font-semibold bg-red-200 hover:bg-red-400 rounded-lg md:py-2 md:px-3 "><MdDelete /></button>
            </div>

            {
                deleteUser && <DeleteUser handleDeleteUser={handleDeleteUser} setDeleteUser={setDeleteUser} />
            }

            <img src={`${user.profileImage}`} className="w-16 h-16 text-center md:w-32 md:h-32  rounded-full  mx-auto object-cover" alt="near lake" />
            <div className="flex flex-col gap-y-1 rounded-md py-3 px-3 bg-teal-100">
                <h3 className="text-sm font-semibold">Name : {user?.name}</h3>
                <p className="text-sm font-semibold">Email : {user?.email}</p>
                <p className="text-sm font-semibold">Created At : {date}</p>
            </div>
        </div>
    )
}

export default UserContainer
