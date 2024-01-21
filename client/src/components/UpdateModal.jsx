import axios from 'axios'
import { useEffect, useState } from 'react'

const UpdateModal = ({ review, setUpdateReviewId, handleGetAllReviews }) => {

    const [updateReview, setUpdateReview] = useState('')

    const handleUpdateReview = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.patch(`/reviews/${review._id}`, { review: updateReview }, { withCredentials: true })
            setUpdateReviewId(false)
            handleGetAllReviews()
            alert(response.data.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(review)

    useEffect(() => {
        setUpdateReview(review.review)
    }, [review])

    console.log(updateReview)

    return (
        <div className="h-screen w-full fixed z-10 flex bg-slate-900 bg-opacity-35 justify-center items-center right-0 top-0 left-0 bottom-0" >
            <form className="flex w-full md:w-1/2 gap-y-10 flex-col" onSubmit={handleUpdateReview}>
                <textarea className="bg-teal-100 w-full rounded-md focus:outline-teal-600 px-6 py-4" value={updateReview} onChange={(e) => setUpdateReview(e.target.value)} cols="20" rows="10"></textarea>
                <div className="flex gap-x-4 justify-end">
                    <button className="px-7 py-2 w-1/3 bg-teal-200 hover:bg-teal-400 rounded-md">New Review</button>
                    <button onClick={() => setUpdateReviewId(false)} className="px-7 py-2 w-1/3 bg-red-200 hover:bg-red-400 rounded-md">Cancel</button>
                </div>

            </form>
        </div >
    )
}

export default UpdateModal
