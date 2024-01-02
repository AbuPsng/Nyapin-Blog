import Navbar from './Navbar'
import Footer from './Footer'

const Template = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="w-full relative  max-w-[1200px] md:px-10 mx-auto">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Template
