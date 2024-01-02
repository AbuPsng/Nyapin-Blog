

const BlogContainer = () => {
    return (
        <div className="  py-4 flex flex-col gap-y-3 w-full md:w-[30%]">
            <img src="images/lake-land.jpg" className="h-44 w-full" alt="near lake" />
            <div className="flex flex-col gap-y-1">
                <p className="text-[13px] font-semibold">Abu - 02 Jan 2022</p>
                <h3 className="text-lg font-semibold">Sonar lake</h3>
                <p className="text-[14px]">Its a place near lake which is elegant in every nature. Its a must place if you are person who seek peace and silence</p>
            </div>
            <ul className="flex gap-x-4">
                <li className="text-[13px] font-semibold border-solid border-2 rounded-full border-slate-500  px-2">Nature</li>
                <li className="text-[13px] font-semibold border-solid border-2 rounded-full border-slate-500 px-2 ">Lake</li>
                <li className="text-[13px] font-semibold border-solid border-2 rounded-full border-slate-500  px-2">Snow</li>
            </ul>

        </div>
    )
}

export default BlogContainer
