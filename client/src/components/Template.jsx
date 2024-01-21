import Navbar from './Navbar'
import Footer from './Footer'

const Template = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="w-full relative px-3 md:px-10 mx-auto">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Template
