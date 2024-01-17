import { motion } from "framer-motion"

const Filter = () => {

    const variants = {
        hidden: { x: '100%' },
        visible: { x: 0 },
    };


    return (
        <div className="flex flex-col w-full md:w-40 h-20 text-center">
            <motion.div
                className="w-full hover:bg-teal-200 bg-teal-100  text-[13px] font-semibold  rounded-md mt-0.5 py-2 h-full "
                initial="hidden"
                whileInView={"visible"}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 }
                }}
            >
                A-Z
            </motion.div>
            <motion.div
                className="w-full hover:bg-teal-200 bg-teal-100  text-[13px] font-semibold  rounded-md mt-0.5 py-2 h-full "
                initial="hidden"
                whileInView={"visible"}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 }
                }}
            >
                A-Z
            </motion.div>
            <motion.div
                className="w-full hover:bg-teal-200 bg-teal-100  text-[13px] font-semibold  rounded-md mt-0.5 py-2 h-full "
                initial="hidden"
                whileInView={"visible"}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 }
                }}
            >
                A-Z
            </motion.div>
        </div>
    )
}

export default Filter
