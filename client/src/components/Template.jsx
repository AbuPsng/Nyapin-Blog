import Navbar from './Navbar'
import Footer from './Footer'

const Template = ({ children }) => {
    return (
        <>
            <div className="w-full md:px-20 px-2">
                <Navbar />
                {children}
                <Footer />
            </div>
        </>
    )
}

export default Template
