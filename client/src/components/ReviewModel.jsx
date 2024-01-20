import axios from "axios"
import { useState } from "react"

const ReviewModal = ({ blogId, handleGetAllReviews, setPostReview }) => {

    const [review, setReview] = useState("")

    const handleCreateReview = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`/reviews/create_review/${blogId}`, { review }, { withCredentials: true })
            handleGetAllReviews()
            setPostReview(false)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="h-screen w-full fixed z-10 flex bg-slate-900 bg-opacity-35 justify-center items-center right-0 top-0 left-0 bottom-0" >
            <form className="flex w-full md:w-1/2 gap-y-10 flex-col" onSubmit={handleCreateReview}>
                <textarea className="bg-teal-100 w-full rounded-md focus:outline-teal-600 px-6 py-4" value={review} onChange={(e) => setReview(e.target.value)} cols="20" rows="10"></textarea>
                <div className="flex gap-x-4 justify-end">
                    <button className="px-7 py-2 w-1/3 bg-teal-200 hover:bg-teal-400 rounded-md">Post Review</button>
                    <button onClick={() => setPostReview(false)} className="px-7 py-2 w-1/3 bg-red-200 hover:bg-red-400 rounded-md">Cancel</button>
                </div>

            </form>
        </div>
    )
}

export default ReviewModal
