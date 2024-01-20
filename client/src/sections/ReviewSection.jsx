import axios from "axios"
import { useEffect, useState } from "react"


const ReviewSection = ({ blogId }) => {

    const [reviews, setReviews] = useState([])

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
        <div className="flex w-full flex-col gap-y-20 overflow-x-auto rounded-md px-10  gap-x-4" >
            <h2 className="text-4xl text-center">Reviews</h2>
            {
                !reviews.length > 0 ? <h3 className="text-sm font-semibold">No Reviews Yet</h3>
                    :
                    reviews?.map(review => (


                        <div key={review._id} className="flex rounded-md flex-col items-start py-4 gap-y-6 px-4 bg-teal-200  w-full md:w-1/3 h-full">
                            <div className="flex items-center w-full gap-x-3">
                                <img src={review.user.profileImage} className="w-12 h-12 rounded-full object-cover" alt={`${review.user.name}-profile_image`} />
                                <h3 className="text-md font-semibold">{review.user.name}</h3>
                            </div>
                            <p className="text-sm ">{review.review.length > 60 ? `${review.review.split(0, 10)}...` : review.review}</p>
                        </div>
                    ))
            }

        </div >
    )
}

export default ReviewSection
