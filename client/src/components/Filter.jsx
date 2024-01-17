import { motion } from "framer-motion"

const Filter = () => {

    const variants = {
        hidden: { x: '100%' },
        visible: { x: 0 },
    };


    return (
        <div className="flex flex-col w-full md:w-40 h-20 text-center">
            <motion.div
                className="w-full hover:bg-teal-200 bg-teal-100  text-[13px] font-semibold  rounded-md mt-0.5 py-2 h-full"
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                A-Z
            </motion.div>
            <motion.div
                className="w-full hover:bg-teal-200 bg-teal-100  text-[13px] font-semibold  rounded-md mt-0.5 py-2 h-full"
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                A-Z
            </motion.div>
            <motion.div
                className="w-full hover:bg-teal-200 bg-teal-100  text-[13px] font-semibold  rounded-md mt-0.5 py-2 h-full"
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                A-Z
            </motion.div>
        </div>
    )
}

export default Filter
