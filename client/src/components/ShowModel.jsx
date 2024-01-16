

const ShowModel = ({ message }) => {
    return (
        <div className="w-full h-screen fixed flex justify-center items-center top-0 bg-slate-900 bg-opacity-35 z-3">
            <div className="w-1/3 h-1/3 flex justify-center  items-center rounded-lg bg-gradient-to-t from-teal-400 to-blue-400">
                <h1 className="font-semibold text-2xl">{message}</h1>
            </div>
        </div>
    )
}

export default ShowModel
