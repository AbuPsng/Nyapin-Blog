import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";

const ShowPassword = ({ showPassword, setShowPassword }) => {

    return (
        <button type="button" onClick={() => setShowPassword(!showPassword)} className='absolute top-0 bottom-0'>
            {
                showPassword ? <RiEyeCloseFill />
                    : <FaEye />

            }
        </button>
    )
}

export default ShowPassword
