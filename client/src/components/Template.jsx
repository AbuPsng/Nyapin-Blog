import Navbar from './Navbar'
import Footer from './Footer'

const Template = ({ children }) => {
    return (
        <>
            <div className="w-full px-2 max-w-[1200px] md:px-10 mx-auto">
                <Navbar />
                {children}
                <Footer />
            </div>
        </>
    )
}

export default Template
