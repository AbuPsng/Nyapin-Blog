import { motion } from "framer-motion"

const sortByList = [
    { options: "A - Z", sortBy: "title", order: 1, delay: 0 },
    { options: "Z - A", sortBy: "title", order: -1, delay: 0.2 },
    { options: "Latest", sortBy: "createdAt", order: 1, delay: 0.4 },
    { options: "Oldest", sortBy: "createdAt", order: 1, delay: 0.6 },
]

const Filter = ({ handleSort }) => {


    return (
        <div className="flex flex-col w-full md:w-40   h-20 text-center">

            {
                sortByList.map(sort => (
                    <motion.div
                        key={sort.options}
                        className="w-full hover:bg-teal-200 bg-teal-100 text-[13px] font-semibold  rounded-md mt-0.5 py-2 h-full "
                        initial="hidden"
                        whileInView={"visible"}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: sort.delay, duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: 50 },
                            visible: { opacity: 1, x: 0 }
                        }}
                    >
                        <button type="button" onClick={() => handleSort(sort.sortBy, sort.order)} >{sort.options}</button>
                    </motion.div>
                ))
            }

        </div>
    )
}

export default Filter
