const DeleteUser = ({ setDeleteUser, handleDeleteUser }) => {

    return (
        <div className="w-full h-screen bg-slate-900 bg-opacity-35 z-10 fixed inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-t w-1/2 h-1/3 flex flex-col justify-center items-center gap-y-10 from-teal-400 to-blue-400">
                <h1 className="font-semibold">Do you want to delete this blog?</h1>
                <div className='flex gap-x-10'>
                    <button onClick={handleDeleteUser} className="px-8 py-2 rounded-lg bg-red-300 hover:bg-red-400">
                        Yes
                    </button>
                    <button onClick={() => setDeleteUser(false)} className='px-8 py-2 rounded-lg bg-teal-300 hover:bg-teal-400'>No</button>
                </div>
            </div>
        </div >
    )
}

export default DeleteUser
