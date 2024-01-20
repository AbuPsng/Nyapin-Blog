import axios from "axios"
import { useEffect, useState } from "react"
import CreateReview from "../components/ReviewModel"
import { useUser } from "../utils/useUser"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ReviewSection = ({ blogId }) => {

    const [reviews, setReviews] = useState([])

    const [postReview, setPostReview] = useState(false)


    const { user } = useUser()

    const handleGetAllReviews = async () => {
        try {
            const response = await axios.get(`/reviews/${blogId}`)
            const data = response.data.data
            setReviews(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetAllReviews()
        //eslint-disable-next-line
    }, [blogId])

    return (
        <div className="flex w-full flex-col gap-y-20  rounded-md px-10  gap-x-4" >
            <h2 className="text-4xl text-center">Reviews</h2>
            <div className="flex justify-center gap-x-8 overflow-x-auto w-full bg-teal-100 px-3 py-6">
                {
                    !reviews.length > 0 ? <h3 className="text-xl font-semibold text-center">No Reviews Yet</h3>
                        :
                        reviews?.map(review => (


                            <div key={review._id} className={` ${review?.user?._id === user?.userId ? "order-first" : ""} flex relative rounded-md flex-col items-start py-4 gap-y-6 px-4 bg-blue-200 hover:bg-blue-400 w-full md:w-1/3 h-full`}>
                                {(review?.user?._id === user?.userId || user?.userId === import.meta.env.VITE_ADMIN1) && <div className="absolute right-2 top-2 ">
                                    <button className="font-semibold bg-teal-200 hover:bg-teal-400 rounded-lg mr-1 md:py-2  md:px-3"><FaEdit /></button>
                                    <button className="font-semibold bg-red-200 hover:bg-red-400 rounded-lg md:py-2 md:px-3 "><MdDelete /></button>
                                </div>}
                                <div className="flex items-center w-full gap-x-3">
                                    <img src={review.user.profileImage} className="w-12 h-12 rounded-full object-cover" alt={`${review.user.name}-profile_image`} />
                                    <h3 className="text-md font-semibold">{review.user.name}</h3>
                                </div>
                                <p className="text-sm ">{review.review.length > 60 ? `${review.review.split(0, 10)}...` : review.review}</p>
                            </div>
                        ))
                }
            </div>

            {
                postReview ?
                    <CreateReview blogId={blogId} setPostReview={setPostReview} handleGetAllReviews={handleGetAllReviews} />
                    :
                    null
            }
            <button onClick={() => setPostReview(!postReview)} className="px-7 py-2 w-1/4 bg-teal-200 hover:bg-teal-400 rounded-md">Give Review</button>

        </div >
    )
}

export default ReviewSection
